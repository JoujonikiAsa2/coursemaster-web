import { apiSlice } from '../api/apiSlice';

export const assignmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignments',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Assignment'],
        }),
        getAssignments: builder.query({
            query: (courseId) => ({
                url: `/assignments/course/${courseId}`,
            }),
            providesTags: ['Assignment'],
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Assignment'],
        }),
    }),
});

export const {
    useCreateAssignmentMutation,
    useGetAssignmentsQuery,
    useDeleteAssignmentMutation,
} = assignmentsApiSlice;
