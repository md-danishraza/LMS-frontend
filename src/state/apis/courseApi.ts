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
        url: `/courses/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      // refetching that course
      invalidatesTags: (result, error, { courseId }) => [
        { type: "Courses", courseId },
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
  }),
});

export const {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
