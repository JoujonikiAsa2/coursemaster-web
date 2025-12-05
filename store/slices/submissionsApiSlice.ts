import { apiSlice } from '../api/apiSlice';

export const submissionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        submitAssignment: builder.mutation({
            query: (data) => ({
                url: '/submissions',
                method: 'POST',
                body: data,
            }),
        }),
        getSubmissions: builder.query({
            query: (courseId) => ({
                url: `/submissions/${courseId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        gradeSubmission: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/submissions/${id}/grade`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const {
    useSubmitAssignmentMutation,
    useGetSubmissionsQuery,
    useGradeSubmissionMutation,
} = submissionsApiSlice;
