
import { notFound } from 'next/navigation'
import CoursePlayer from '@/components/course/course-player'
import { TCourse } from '@/types/course'

async function getCourse(id: string): Promise<TCourse | null> {
    try {
        const res = await fetch(`https://coursemaster-server.vercel.app/api/v1/courses/${id}`, {
            cache: 'no-store'
        })

        if (!res.ok) return null

        const data = await res.json()
        return data?.data || null
    } catch (error) {
        console.error("Failed to fetch course:", error)
        return null
    }
}

type Props = {
    params: Promise<{ id: string }>
}

export default async function CourseAccessPage({ params }: Props) {
    const { id } = await params
    const course = await getCourse(id)

    if (!course) {
        notFound()
    }

    return (
        <div className="h-full">
            <CoursePlayer course={course} />
        </div>
    )
}
