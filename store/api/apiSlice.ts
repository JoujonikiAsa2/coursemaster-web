import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://coursemaster-server.vercel.app/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.userInfo?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Course', 'User', 'Enrollment', 'Submission', 'Assignment', 'Quiz'],
    endpoints: (builder) => ({}),
});
