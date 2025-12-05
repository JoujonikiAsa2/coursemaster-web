import { apiSlice } from '../api/apiSlice';

export const quizzesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Quiz'],
        }),
        getQuizzes: builder.query({
            query: (courseId) => ({
                url: `/quizzes/course/${courseId}`,
            }),
            providesTags: ['Quiz'],
        }),
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz'],
        }),
    }),
});

export const {
    useCreateQuizMutation,
    useGetQuizzesQuery,
    useDeleteQuizMutation,
} = quizzesApiSlice;
