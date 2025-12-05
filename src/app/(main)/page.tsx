import ContactUs from "@/components/course/contact-us";
import FeaturedCourses from "@/components/course/featured-courses";
import Banner from "@/components/home/banner";
import Image from "next/image";

import roundPattern from 'src/assets/images/round-texure.png'

export default function Home() {
  return (
    <div>
      <div className="group relative z-0 bg-secondary overflow-hidden">
        <Banner title='Discover Courses That Transform Your Career'
          subtitle='Transform your student experience with tailored courses, seamless connections, and actionable insights that drive your success forward.' />
        <div className="absolute w-160 h-160 rounded-full border border-primary -bottom-80 -right-32 lg:right-0 -translate-x-1/3 -z-10 group-hover:-translate-3.5 group-hover:-zoom-out-translate-full duration-1000 ">
        </div>

        <div className="w-80 h-80 rounded-full border border-primary absolute -bottom-20 lg:bottom-20 right-40 -z-10 group-hover:-translate-2.5 group-hover:-zoom-out-translate-full duration-1000 curso"></div>
        <Image src={roundPattern} alt='pattern' width={250} height={300} className='absolute  bottom-4 sm:bottom-32 lg:bottom-20 lg:right-40 rounded-2xl -z-10 group-hover:translate-3.5 group-hover:-zoom-out-translate-full duration-1000' />
      </div>
      <FeaturedCourses/>
      <ContactUs/>
    </div>
  );
}
