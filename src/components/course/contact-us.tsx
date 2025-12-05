import React from 'react'
import { Button } from '../ui/button'
import { Contact, EqualApproximatelyIcon, PhoneCall } from 'lucide-react'

export default function ContactUs() {
    return (
        <div className='container-style flex justify-center my-10'>
            <div className='relative  bg-primary/10 w-156 p-6 flex justify-between items-center rounded-xl'>
                <div>
                    <p className='text-primary font-medium'>Let Us Help</p>
                    <h4>Finding Your Right Courses</h4>
                </div>
                <Button className='h-12'>View All Courses</Button>

                <div className='bg-primary size-16 rounded-full absolute left-0 lg:-left-10 -top-10 lg:-top-6 flex items-center justify-center'>
                    <PhoneCall color='white' />
                </div>
            </div>
        </div>
    )
}
