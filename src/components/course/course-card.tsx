import { Heart, Star } from "lucide-react"
import Image from 'next/image'

export default function CourseCard({ course }: { course: any }) {
    return (
        <div className='bg-secondary text-sm relative group hover:cursor-pointer rounded-lg'>
            <Image src={course?.thumbnail || "/fallback.jpg"}  alt='Sample Product' width={300} height={400} className='bg-primary/40 w-full h-68 rounded-t-lg' />
            <div className=''>
                <div className='space-y-2 p-4'>
                    <p className='title-sm'>{course.title}</p>
                    <p className='text-primary font-medium'>{course.instructor}</p>
                    <p><span className='font-medium'>Price:</span><span className='text-xl text-primary font-bold'> 299 </span>Tk</p>


                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="fill-[#F7C04D] text-[#F7C04D]" />
                        ))}
                    </div>
                </div>
                <div>
                    <button className='absolute top-2 right-2 hover:cursor-pointer size-8 rounded-full bg-primary flex justify-center items-center'>
                        <Heart size={20} className='text-white' />
                    </button>
                </div>
            </div>
        </div>
    )
}
