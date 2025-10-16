// state/api.tsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include", // optional: for cookies/auth
  prepareHeaders: (headers) => {
    // Add auth token or custom headers here
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes:["Courses"],
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
    })
  }),
});

export const {useGetCoursesQuery,useGetCourseQuery} = api;
