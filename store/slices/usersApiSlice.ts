import { apiSlice } from '../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/auth/profile',
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = usersApiSlice;
