import { apiSlice } from "./apiSlice";

const userEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    logoutUser: builder.mutation({
      query: (user) => ({
        url: "/users/logout",
        method: "POST",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }),
    }),

    validateUser: builder.mutation({
      query: (user) => ({
        url: "/users/validate",
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }),
    }),

    deleteDBToken: builder.mutation({
      query: (user) => ({
        url: "/users/deletedbtoken",
        method: "POST",
        body: user,
      }),
    }),

    getUser: builder.query({
      query: (name) => `/users/${name}`,
    }),

    getOwnUser: builder.query({
      query: (user) => ({
        url: "/users/me",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }),
    }),

    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useValidateUserMutation,
  useDeleteDBTokenMutation,
  useGetUserQuery,
  useGetOwnUserQuery,
  useGetUsersQuery,
} = userEndpoints;
