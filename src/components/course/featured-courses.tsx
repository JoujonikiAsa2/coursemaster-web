"use client"
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import CourseCard from "./course-card";
import { TCourse } from "@/types/course";
import Link from "next/link";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import SectionTitle from "./section-title";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/courses')
      const data = await res.json()
      setCourses(data.data.data)
    }
    fetchData()
  }, [])

  return (
    <div className='container-style mt-12'>
      <div className="flex justify-between items-center">
        <SectionTitle title="Featured Courses"/>
        <Link href="/courses"><Button>View All Courses</Button></Link>
      </div>
      <div className="h-120 flex items-center justify-center">
        <Swiper
          style={{
            '--swiper-navigation-color': '#5459AC',
            '--swiper-pagination-color': '#5459AC',
            '--swiper-navigation-size': '24px',
          } as React.CSSProperties}
          modules={[Navigation, Mousewheel, Keyboard]}
          spaceBetween={16}
          cssMode={true}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            440: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className='relative'
        >
          {courses.length > 0 ? courses.map((course: TCourse) => (
            <SwiperSlide key={course?._id} className='mb-6'>
              <Link href={`/courses/${course._id}`}>
                <CourseCard course={course} />
              </Link>
            </SwiperSlide>
          )) : <Spinner className="size-10 text-primary" />}
        </Swiper>
      </div>
    </div>
  )
}
