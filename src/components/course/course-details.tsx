'use client'
import { TCourse, TSyllabus, TReview, TBatch } from '@/types/course'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
	Clock,
	Users,
	Star,
	PlayCircle,
	Lock,
	CheckCircle2,
	Calendar,
	Award,
	BookOpen,
	Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CourseDetails({ courseId }: { courseId: string }) {
	const [course, setCourse] = useState<TCourse | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			if (!courseId) return
			try {
				const res = await fetch(`/api/courses/${courseId}`)
				const data = await res.json()
				setCourse(data.data.data)
			} catch (error) {
				console.error("Failed to fetch course", error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [courseId])

	if (loading) {
		return (
			<div className="flex h-[80vh] w-full items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		)
	}

	if (!course) {
		return <div className="p-8 text-center text-muted-foreground">Course not found.</div>
	}

	return (
		<div className="min-h-screen bg-transparent pb-12">

			<div className="relative bg-muted/30">
				<div className="container-style py-12 lg:py-16">
					<div className="grid gap-8 lg:grid-cols-3">
						<div className="space-y-6 lg:col-span-2">
							<div className="space-y-2">
								<span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
									{course.category}
								</span>
								<h1>
									{course.title}
								</h1>
								<p className="text-lg text-muted-foreground line-clamp-2">
									{course.description ? course.description.substring(0, 150) : ''}...
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
								<div className="flex items-center gap-1">
									<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
									<span className="font-semibold">{course.rating.toFixed(1)}</span>
									<span>({course.numReviews} reviews)</span>
								</div>
								<div className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									<span>{course.batches?.reduce((acc, b) => acc + (b.enrolledCount || 0), 0)} Enrolled</span>
								</div>
								<div className="flex items-center gap-1">
									<Clock className="h-4 w-4" />
									<span>{course.syllabus?.reduce((acc, s) => acc + (s.duration || 0), 0)} mins</span>
								</div>
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>Last updated {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'N/A'}</span>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
									<span className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-white">
										{course.instructor.charAt(0)}
									</span>
								</div>
								<div>
									<p className="text-sm text-muted-foreground">Created by</p>
									<p className="font-medium text-foreground">{course.instructor}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container-style mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div className="space-y-10 lg:col-span-2">
					{/* Overview */}
					<section>
						<h3 className="mb-4 text-2xl font-bold">About This Course</h3>
						<div className="prose prose-neutral max-w-none dark:prose-invert">
							<p>{course.description}</p>
						</div>
					</section>

					{/* Syllabus */}
					<section>
						<h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
							<BookOpen className="h-6 w-6 text-primary" />
							Syllabus
						</h3>
						<div className="rounded-lg border bg-card">
							{course.syllabus && course.syllabus.length > 0 ? (
								<div className="divide-y">
									{course.syllabus.map((item, idx) => (
										<div key={idx} className="group flex items-start justify-between p-4 hover:bg-muted/50 transition-colors">
											<div className="flex gap-4">
												<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
													{item.isFree ? <PlayCircle className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
												</div>
												<div>
													<h4 className="font-medium">{item.title}</h4>
													{item.description && (
														<p className="text-sm text-muted-foreground">{item.description}</p>
													)}
													<div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
														{item.duration && <span>{item.duration} mins</span>}
													</div>
												</div>
											</div>
											{item.isFree && (
												<span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
													Preview
												</span>
											)}
										</div>
									))}
								</div>
							) : (
								<p className="p-4 text-muted-foreground">Curriculum coming soon.</p>
							)}
						</div>
					</section>

					{/* Reviews */}
					<section>
						<h3 className="mb-4 text-2xl font-bold">Student Reviews</h3>
						<div className="grid gap-4">
							{course.reviews && course.reviews.length > 0 ? (
								course.reviews.map((review, idx) => (
									<div key={idx} className="rounded-lg border bg-card p-4 shadow-sm">
										<div className="mb-2 flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800" />
												<span className="font-semibold">{review.name}</span>
											</div>
											<div className="flex">
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`h-4 w-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700'
															}`}
													/>
												))}
											</div>
										</div>
										<p className="text-neutral-600 dark:text-neutral-300">{review.comment}</p>
										<p className="mt-2 text-xs text-muted-foreground">
											{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
										</p>
									</div>
								))
							) : (
								<p className="text-muted-foreground">No reviews yet.</p>
							)}
						</div>
					</section>
				</div>

				{/* Sidebar */}
				<aside className="relative">
					<div className="sticky top-24 space-y-6">
						{/* Course Card */}
						<div className="overflow-hidden rounded-xl border bg-card shadow-lg transition-all hover:shadow-xl">
							<div className="relative aspect-video w-full">
								<Image
									src={course.thumbnail}
									alt={course.title}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 from-black/60 to-transparent" />
								{course.syllabus?.some(s => s.isFree) && (
									<div className="absolute top-4 right-4 z-10">
										<Link href="#" className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-black backdrop-blur-sm transition hover:bg-white">
											<PlayCircle className="h-4 w-4 fill-black" />
											Watch Preview
										</Link>
									</div>
								)}
							</div>

							<div className="p-6">
								<div className="mb-4 flex items-baseline gap-2">
									<span className="text-3xl font-bold">Tk {course.price}</span>
									{/* Placeholder for discount logic if needed */}
									{/* <span className="line-through text-muted-foreground">Tk {course.price + 2000}</span> */}
								</div>

								<Link href={`/courses/checkout/${course._id}`} className="block w-full">
									<Button className="w-full text-lg font-semibold py-6 shadow-primary/25 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
										Enroll Now
									</Button>
								</Link>

								<div className="mt-6 space-y-4">
									<h4 className="font-semibold">This course includes:</h4>
									<ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
										<li className="flex items-center gap-3">
											<PlayCircle className="h-5 w-5 text-primary" />
											<span>{course.syllabus?.length || 0} Lessons</span>
										</li>
										<li className="flex items-center gap-3">
											<Clock className="h-5 w-5 text-primary" />
											<span>Lifetime Access</span>
										</li>
										<li className="flex items-center gap-3">
											<Award className="h-5 w-5 text-primary" />
											<span>Certificate of Completion</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Batches Card */}
						<div className="rounded-xl border bg-card p-6 shadow-sm">
							<h4 className="mb-4 font-bold flex items-center gap-2">
								<Calendar className="h-5 w-5 text-primary" />
								Upcoming Batches
							</h4>
							{course.batches && course.batches.length > 0 ? (
								<ul className="space-y-4">
									{course.batches.map((batch, idx) => (
										<li key={idx} className="rounded-md bg-muted/50 p-3 text-sm">
											<div className="flex justify-between font-semibold">
												<span>{batch.batchName}</span>
												{batch.maxStudents && batch.enrolledCount !== undefined && (
													<span className={batch.enrolledCount >= batch.maxStudents ? 'text-red-500' : 'text-green-600'}>
														{batch.maxStudents - batch.enrolledCount} seats left
													</span>
												)}
											</div>
											<div className="mt-1 text-xs text-muted-foreground">
												Starts: {new Date(batch.startDate).toLocaleDateString()}
											</div>
										</li>
									))}
								</ul>
							) : (
								<p className="text-sm text-muted-foreground">No upcoming batches scheduled.</p>
							)}
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}
