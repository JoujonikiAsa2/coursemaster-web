'use client'

import { useRouter } from 'next/navigation'

export default function FailedPage() {
    const router = useRouter()
    
    return (
        <div>
            <h2>Payment Failed</h2>
            <p>Payment was failed. You will be redirected to the course page in a moment.</p>
            <button onClick={() => router.push('/courses')}>Go to Courses</button>
        </div>
    )
}
