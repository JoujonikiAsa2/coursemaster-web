'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { TCourse } from '@/types/course'
import { Button } from '@/components/ui/button'

export default function CheckoutForm({ courseId }: { courseId: string }) {
    const router = useRouter()
    const [course, setCourse] = useState<TCourse | null>(null)
    const [loading, setLoading] = useState(true)
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [formData, setFormData] = useState({
        userEmail: '',
        phone: '',
    })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${courseId}`)
                const data = await res.json()
                setCourse(data.data.data)
            } catch (error) {
                console.error('Failed to fetch course', error)
            } finally {
                setLoading(false)
            }
        }

        if (courseId) {
            fetchCourse()
        }
    }, [courseId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)

        // Recalculate total for safety
        const currentPrice = course?.price || 0
        const currentTax = currentPrice * 0.15
        const currentTotal = currentPrice + currentTax

        try {
            const response = await fetch(`https://coursemaster-server.vercel.app/api/v1/payment/${courseId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    courseTitle: course?.title,
                    price: currentTotal,
                    paymentMethod,
                }),
            })

            const data = await response.json()
            console.log(data)

            if (response.ok && data.success) {
                if (data.data.url) {
                    window.location.href = data.data.url
                } else {
                    setSubmitted(false)
                }
            } else {
                setSubmitted(false)
            }
        } catch (error) {
            console.error('Payment error:', error)
            setSubmitted(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-60 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!course) {
        return (
            <div className="p-8 text-center bg-muted rounded-lg">
                <h2>Course not found</h2>
                <p className="text-muted-foreground">The course you are looking for does not exist or has been removed.</p>
            </div>
        )
    }

    const price = course.price || 0
    const tax = price * 0.15
    const total = price + tax

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">

            <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">

                    <section className="bg-card p-6 rounded-lg border ">
                        <h3 className="mb-4 text-xl font-semibold">Billing Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="userEmail"
                                    placeholder="john.doe@example.com"
                                    value={formData.userEmail}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2.5 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+880 1XXX XXXXXX"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2.5 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Terms & Conditions */}
                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                            className="mr-3 mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                            I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a> and <a href="#" className="text-primary hover:underline">privacy policy</a>.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={submitted}
                        className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20"
                    >
                        {submitted ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            `Checkout (Tk ${total.toFixed(2)})`
                        )}
                    </Button>
                </form>
            </div>

            {/* Order Summary Sidebar */}
            <aside className="h-fit space-y-6 lg:sticky lg:top-24">
                <div className="bg-card p-6 rounded-lg border ">
                    <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>

                    <div className="mb-6">
                        <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4 bg-muted">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h4 className="font-bold text-lg mb-1 leading-tight">{course.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4">Instructor: {course.instructor}</p>

                        <div className="space-y-3 text-sm py-4 border-t border-b border-border">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Original Price</span>
                                <span>{price.toFixed(2)} Tk</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax (15%)</span>
                                <span>{tax.toFixed(2)} Tk</span>
                            </div>
                        </div>

                        <div className="flex justify-between font-bold text-xl mt-4">
                            <span>Total</span>
                            <span className="text-primary">{total.toFixed(2)} Tk</span>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-5 rounded-lg border ">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        What you'll get
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>Lifetime access to all course materials and future updates</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>Certificate of completion verified by CourseMaster</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>Premium support and community access</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>30-day money-back guarantee</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
