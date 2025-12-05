import CourseDetails from '@/components/course/course-details'


type Props = { params: Promise<{ id: string }> }

export default async function CoursePage({ params }: Props) {
    const { id } = await params
    return (
        <div>
            <CourseDetails courseId={id} />
        </div>
    )
}
