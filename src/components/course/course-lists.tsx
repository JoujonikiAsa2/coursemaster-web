"use client"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import SectionTitle from "./section-title"
import Link from "next/link"
import CourseCard from "./course-card"
import { TCourse } from "@/types/course"

export default function CourseLists() {
    const [search, setSearch] = useState("")
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        async function fetchCourses() {
            const params = new URLSearchParams({ searchTerm: search })
            const res = await fetch(
                `https://coursemaster-server.vercel.app/api/v1/courses?searchTerm=${search}`,
                { cache: "no-store" }
            )
            if (!res.ok) return setCourses([])
            const data = await res.json()
            setCourses(data?.data || [])
        }
        fetchCourses()
    }, [search])
    return (
        <div className="container-style mt-12">
            <div className='flex justify-between items-center'>
                <SectionTitle title="All Courses" />
                <InputGroup className='w-80'>
                    <InputGroupInput placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            <div className="py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.length === 0 && <p>No courses found.</p>}
                {courses.map((course: any) => (
                    <Link key={course._id} href={`/courses/${course._id}`}>
                        <CourseCard course={course} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
