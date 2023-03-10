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

    logoutAll: builder.mutation({
      query: (user) => ({
        url: "/users/logoutAll",
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

    getAllUsers: builder.query({
      query: () => "/users",
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: "/users/me",
        method: "PATCH",
        body: user.data,
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }),
    }),

    deleteUser: builder.mutation({
      query: (user) => ({
        url: "/users/" + user.userType + "/me",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLogoutAllMutation,
  useValidateUserMutation,
  useDeleteDBTokenMutation,
  useGetUserQuery,
  useGetOwnUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userEndpoints;
