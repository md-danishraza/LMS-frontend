import { api } from "../api";

export const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // teacher apis

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
        url: "/uploads/video-url", // Your new backend endpoint
        method: "POST",
        body,
      }),
      // We extract the 'data' part of the response
      // transformResponse: (response: { message: string; data: any }) => response.data,
    }),

    // user api

    // get user enrolled courses with userId
    getUserEnrolledCourses: builder.query<Course[], string>({
      query: (userId) => `users/course-progress/${userId}/enrolled-courses`,
      providesTags: ["Courses", "UserCourseProgress"],
    }),
    // get user course progress with userId,courseId
    getUserCourseProgress: builder.query<
      UserCourseProgress,
      { userId: string; courseId: string }
    >({
      query: ({ userId, courseId }) =>
        `users/course-progress/${userId}/courses/${courseId}`,
      providesTags: ["UserCourseProgress"],
    }),

    updateUserCourseProgress: builder.mutation<
      UserCourseProgress,
      {
        userId: string;
        courseId: string;
        progressData: {
          sections: SectionProgress[];
        };
      }
    >({
      query: ({ userId, courseId, progressData }) => ({
        url: `users/course-progress/${userId}/courses/${courseId}`,
        method: "PUT",
        body: progressData,
      }),
      invalidatesTags: ["UserCourseProgress"],
      // update the frontend even query hasn't finished yet
      // async onQueryStarted(
      //   { userId, courseId, progressData },
      //   { dispatch, queryFulfilled }
      // ) {
      //   const patchResult = dispatch(
      //     api.util.updateQueryData(
      //       "getUserCourseProgress",
      //       { userId, courseId },
      //       (draft) => {
      //         Object.assign(draft, {
      //           ...draft,
      //           sections: progressData.sections,
      //         });
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  // teacher courses apis
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetUploadVideoUrlMutation,

  // user courses apis
  useGetUserEnrolledCoursesQuery,
  useGetUserCourseProgressQuery,
  useUpdateUserCourseProgressMutation,
} = courseApi;
