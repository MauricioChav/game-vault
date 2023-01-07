import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000'
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users'
        }),

        createUser: builder.mutation({
            query: (newUser) => ({
                url: "/users/",
                method: "POST",
                body: newUser
            })
        })

    })
});

export const {useGetUsersQuery, useCreateUserMutation} = apiSlice