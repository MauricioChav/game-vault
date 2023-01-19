import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000'
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (user) => ({
                url: "/users/",
                method: "POST",
                body: user.data
            })
        }),

        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user
            })
        }),

        logoutUser: builder.mutation({
            query: (user) => ({
                url: "/users/logout",
                method: "POST",
                headers: {
                    'Authorization' : 'Bearer ' + user.token,
                }
            })
        }),

        getOwnUser: builder.mutation({
            query: (user) => ({
                url: "/users/me",
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + user.token,
                },
            })
        }),

        deleteDBToken: builder.mutation({
            query: (user) => ({
                url: "/users/deletedbtoken",
                method: 'POST',
                body: user
            })
        }),

        getUsers: builder.query({
            query: () => '/users'
        }),

    })
});

// Note:
// GetOwnUser configured as mutation to allow being called inside useEffect

export const {useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation, useDeleteDBTokenMutation, useGetOwnUserMutation, useGetUsersQuery} = apiSlice;