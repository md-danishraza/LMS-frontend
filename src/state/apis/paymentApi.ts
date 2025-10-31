import { api } from "../api"; // main API slice

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      // This type now matches your backend controller's response
      { message: string; data: any },
      { courseId: string; userId: string }
    >({
      query: (body) => ({
        url: "/api/payments/create-order",
        method: "POST",
        body,
      }),
    }),

    getOrderStatus: builder.query<
      { status: string },
      { userId: string; orderId: string }
    >({
      query: ({ userId, orderId }) =>
        `/api/payments/order-status/${userId}/${orderId}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderStatusQuery } = paymentApi;
