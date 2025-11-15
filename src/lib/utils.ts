import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CourseFormData } from "./schemas";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number | undefined): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(cents || 0);
}

/**
 * Creates the FormData object to be sent to the backend.
 * This runs AFTER video files have been uploaded and replaced with URLs.
 */
export const createCourseFormData = (
  data: CourseFormData,
  sections: Section[]
): FormData => {
  const formData = new FormData();
  formData.append("title", data.courseTitle);
  formData.append("description", data.courseDescription || "");
  formData.append("category", data.courseCategory);
  formData.append("price", data.coursePrice.toString());
  formData.append("status", data.courseStatus ? "Published" : "Draft");

  // --- THIS IS THE ADDED LOGIC ---
  // Handle the course image
  if (data.courseImage && data.courseImage instanceof File) {
    // If it's a new file, append it
    formData.append("image", data.courseImage);
  }
  // --- END OF ADDED LOGIC ---

  // Append the sections (which now contain video URLs, not Files)
  formData.append("sections", JSON.stringify(sections));

  return formData;
};

/**
 * Uploads all new video files found in the sections.
 * Returns a new sections array where File objects are replaced with S3 URLs.
 */
export const uploadAllVideos = async (
  localSections: Section[],
  courseId: string,
  // This is the useGetUploadVideoUrlMutation hook from RTK Query
  getUploadVideoUrl: (args: any) => { unwrap: () => Promise<any> }
): Promise<Section[]> => {
  // Create a deep copy to avoid mutating Redux state directly
  const sectionsCopy: Section[] = JSON.parse(JSON.stringify(localSections));

  // Create an array of all upload promises
  const uploadPromises: Promise<void>[] = [];

  sectionsCopy.forEach((section) => {
    section.chapters.forEach((chapter) => {
      // Check if the video field is a File object
      // Note: We can't check 'instanceof File' after JSON.stringify/parse,
      // so we rely on the object structure.
      // In a real app, you'd check the original `localSections` File object.
      // For simplicity, we'll assume the `onSubmit` provides the *original* sections.

      const originalChapter = localSections
        .find((s) => s.sectionId === section.sectionId)
        ?.chapters.find((c) => c.chapterId === chapter.chapterId);

      if (originalChapter?.video && originalChapter.video instanceof File) {
        // Push the upload task to the promises array
        uploadPromises.push(
          (async () => {
            try {
              const updatedChapter = await uploadVideo(
                originalChapter, // Pass the original chapter with the File
                courseId,
                section.sectionId,
                getUploadVideoUrl
              );
              // Find and replace the chapter in the 'sectionsCopy'
              const secIndex = sectionsCopy.findIndex(
                (s) => s.sectionId === section.sectionId
              );
              const chapIndex = sectionsCopy[secIndex].chapters.findIndex(
                (c) => c.chapterId === chapter.chapterId
              );
              sectionsCopy[secIndex].chapters[chapIndex] = updatedChapter;
            } catch (error) {
              console.error(
                `Failed to upload video for chapter ${chapter.chapterId}:`,
                error
              );
              // Let others succeed even if one fails
            }
          })()
        );
      }
    });
  });

  // Wait for all uploads to complete in parallel
  await Promise.all(uploadPromises);

  return sectionsCopy;
};

/**
 * Uploads a single video and returns the updated chapter object.
 */
async function uploadVideo(
  chapter: Chapter,
  courseId: string,
  sectionId: string,
  getUploadVideoUrl: (args: any) => { unwrap: () => Promise<any> }
) {
  const file = chapter.video as File;

  try {
    // 1. Get pre-signed URL from our backend
    const { uploadUrl, videoUrl } = await getUploadVideoUrl({
      courseId,
      sectionId,
      chapterId: chapter.chapterId,
      fileName: file.name,
      fileType: file.type,
    }).unwrap();

    // 2. Upload the file directly to S3
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    toast.success(`Video uploaded successfully for chapter ${chapter.title}`);

    // 3. Return the chapter with the S3 URL, not the File
    return { ...chapter, video: videoUrl };
  } catch (error) {
    console.error(
      `Failed to upload video for chapter ${chapter.chapterId}:`,
      error
    );
    toast.error(`Failed to upload video: ${chapter.title}`);
    throw error;
  }
}
