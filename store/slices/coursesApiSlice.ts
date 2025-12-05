import { apiSlice } from '../api/apiSlice';

export const coursesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: ({ keyword = '', pageNumber = 1 }) => ({
                url: '/courses',
                params: { keyword, pageNumber },
            }),
            keepUnusedDataFor: 5,
        }),
        getCourseDetails: builder.query({
            query: (courseId) => ({
                url: `/courses/${courseId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createCourse: builder.mutation({
            query: () => ({
                url: '/courses',
                method: 'POST',
            }),
            invalidatesTags: ['Course'],
        }),
        updateCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.courseId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Course'],
        }),
        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/courses/${courseId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),
        uploadFile: builder.mutation({
            query: (data) => ({
                url: '/upload',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetCourseDetailsQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useUploadFileMutation,
} = coursesApiSlice;
