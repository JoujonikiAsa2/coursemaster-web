'use client'

import { useRouter } from 'next/navigation'

export default function SuccessPage() {
    const router = useRouter()
    
    return (
        <div>
            <h2>Payment Successful</h2>
            <p>Thank you for your payment. You will be redirected to the course page in a moment.</p>
            <button onClick={() => router.push('/courses')}>Go to Courses</button>
        </div>
    )
}
