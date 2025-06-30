import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login user
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Users"],
    }),

    // Refresh token
    refreshToken: builder.mutation<
      { success: boolean; data: { accessToken: string } },
      void
    >({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;

export default authApi;
