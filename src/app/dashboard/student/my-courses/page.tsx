'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PlayCircle, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthUser } from '@/types'
import getUser from '@/helpers/get-user'
import Link from 'next/link'
import CourseCard from '@/components/course/course-card'

export default function MyCoursesPage() {
    const [courses, setCourses] = useState<any[]>([])

    const [user, setUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const result = await getUser();
            setUser(result);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchCourses() {
            if (!user?.email) return

            // Get token only on client side
            const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null

            const res = await fetch(
                `https://coursemaster-server.vercel.app/api/v1/enrollment?email=${user?.email}`,
                {
                    cache: "no-store", headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }

            )
            if (!res.ok) return setCourses([])
            const data = await res.json()
            setCourses(data?.data || [])
        }
        fetchCourses()
    }, [user?.email])

    console.log(courses)
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2>My Courses</h2>
                    <p className="text-muted-foreground mt-1">Manage and continue your active courses.</p>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <Link href={`/dashboard/student/course-access/${course.courseId._id}`} key={course._id}>
                        <CourseCard course={course.courseId} />
                    </Link>
                ))}
            </div>
        </div>
    )
}