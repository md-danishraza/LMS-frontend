// state/api.tsx

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi,FetchArgs } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import {toast} from "sonner";
import { User } from "@clerk/nextjs/server";


const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    // sending clerk auth token in each request
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    // error toast
    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    }

    // mutation toast / update requst
    // check if not get request than only 
    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";
    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    // returning data.data
    if (result.data) {
      result.data = result.data.data;
    } else if (
      // no content return
      result.error?.status === 204 ||
      result.meta?.response?.status === 24
    ) {
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery:customBaseQuery,
  tagTypes:["Courses","Users"],
  endpoints: (builder) => ({
    // query<returnType,inputType>
    getCourses:builder.query<Course[],{category?:string}>(
      {
        query:({category}) => ({
          url:"courses",  
          params:{category}
        }),
        providesTags:["Courses"]
      }
    ),
    getCourse:builder.query<Course,string>({
      query:(id)=> `courses/${id}`,
      // invalidate courses if theres change in specific course
      providesTags:(result,error,id)=>[{type:"Courses",id}]
    }),

    // users setting
    // no response , partial of user publicemtadata{}
    updateUser: builder.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `user/clerk/${userId}`, 
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['Users'],
    }),    
  }),
});

export const {useGetCoursesQuery,useGetCourseQuery,useUpdateUserMutation} = api;
