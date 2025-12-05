'use client'


import { useRouter } from 'next/navigation'

export default function CancelPage() {
    const router = useRouter()
    
    return (
        <div>
            <h2>Payment Cancelled</h2>
            <p>Payment was cancelled. You will be redirected to the course page in a moment.</p>
            <button onClick={() => router.push('/courses')}>Go to Courses</button>
        </div>
    )
}
