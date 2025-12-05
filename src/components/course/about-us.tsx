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
import ReviewCard from "./review-card";

export default function AboutUs() {
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

      <div className="h-120 flex flex-col md:flex-row items-start justify-center gap-8">
        <div className="w-full lg:w-1/4 border space-y-1/3">
          <h3>People Say About EduMall</h3>
          <p className="text-wrap">One-stop solution for any eLearning center, online courses. People love EduMall because they can create their sites with ease here.</p>
          <Button>View All</Button>
        </div>
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
            440: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className='relative w-full flex-1 items-start'
        >
          {<Spinner className="size-10 text-primary" />}
        </Swiper>
      </div>
    </div>
  )
}
