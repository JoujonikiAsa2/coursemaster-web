import { apiSlice } from '../api/apiSlice';

export const enrollmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyEnrollments: builder.query({
            query: () => ({
                url: '/enrollments/my',
            }),
            keepUnusedDataFor: 5,
        }),
        getEnrollments: builder.query({
            query: ({ pageNumber = 1, courseId = '' }) => ({
                url: '/enrollments',
                params: { pageNumber, courseId },
            }),
            providesTags: ['Enrollment'],
        }),
        enrollCourse: builder.mutation({
            query: (data) => ({
                url: '/enrollments',
                method: 'POST',
                body: data,
            }),
        }),
        updateProgress: builder.mutation({
            query: ({ enrollmentId, lessonId }) => ({
                url: `/enrollments/${enrollmentId}/progress`,
                method: 'PUT',
                body: { lessonId },
            }),
        }),
    }),
});

export const {
    useGetMyEnrollmentsQuery,
    useGetEnrollmentsQuery,
    useEnrollCourseMutation,
    useUpdateProgressMutation,
} = enrollmentsApiSlice;
