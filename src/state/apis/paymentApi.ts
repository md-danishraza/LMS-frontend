import { api } from "../api"; // main API slice

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      // This is the type *after* transformation
      { order: any },
      { courseId: string; userId: string }
    >({
      query: (body) => ({
        url: "/api/payments/create-order",
        method: "POST",
        body,
      }),
      // // Add this to extract the nested data
      // transformResponse: (response: { message: string; data: any }) =>
      //   response.data,
    }),

    getOrderStatus: builder.query<
      // This is the type *after* transformation
      { status: string },
      { userId: string; orderId: string }
    >({
      query: ({ userId, orderId }) =>
        `/api/payments/order-status/${userId}/${orderId}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderStatusQuery } = paymentApi;
