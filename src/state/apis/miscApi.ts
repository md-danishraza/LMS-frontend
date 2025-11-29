import { ContactFormValues } from "@/lib/schemas";
import { api } from "../api";

export const miscApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendContactEmail: builder.mutation<{ message: string }, ContactFormValues>({
      query: (body) => ({
        url: "/api/emails/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendContactEmailMutation } = miscApi;
