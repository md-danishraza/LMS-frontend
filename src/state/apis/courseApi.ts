import { api } from "../api";

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<
      Course,
      { teacherId: string; teacherName: string }
    >({
      query: ({ teacherId, teacherName }) => ({
        url: `/courses`,
        method: "POST",
        body: { teacherId, teacherName },
      }),
      // refetching all courses
      invalidatesTags: ["Courses"],
    }),
    updateCourse: builder.mutation<
      Course,
      { courseId: string; formData: FormData }
    >({
      query: ({ courseId, formData }) => ({
        url: `/api/courses/${courseId}`,
        method: "PUT",
        body: formData,
        // NO 'Content-Type' header here.
        // fetchBaseQuery sets it to 'multipart/form-data'
        // automatically when the body is FormData.
      }),
      // Invalidate the specific course cache
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Courses", id: courseId },
      ],
    }),
    deleteCourse: builder.mutation<{ message: string }, { courseId: string }>({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
      // refetching all courses
      invalidatesTags: ["Courses"],
    }),

    // This mutation gets a pre-signed URL from the backend
    getUploadVideoUrl: builder.mutation<
      { uploadUrl: string; videoUrl: string },
      {
        courseId: string;
        sectionId: string;
        chapterId: string;
        fileName: string;
        fileType: string;
      }
    >({
      query: (body) => ({
        url: "/api/uploads/video-url", // Your new backend endpoint
        method: "POST",
        body,
      }),
      // We extract the 'data' part of the response
      // transformResponse: (response: { message: string; data: any }) => response.data,
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetUploadVideoUrlMutation,
} = courseApi;
