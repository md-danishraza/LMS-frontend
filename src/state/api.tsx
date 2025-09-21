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
  tagTypes:[],
  endpoints: (builder) => ({
    // queries
  }),
});

export const {} = api;
