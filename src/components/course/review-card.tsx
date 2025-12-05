import { Star } from "lucide-react"
import Image from 'next/image'

export default function ReviewCard({ review }: { review: any }) {
    return (
        <div className="h-64 bg-background p-4 shadow-sm flex flex-col justify-between mb-12">
            <div className="flex-1">
                <div className="flex gap-1 mb-6">
                    {[...Array(review?.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-primary text-primary" />
                    ))}
                </div>
                <blockquote
                    className="text-sm mb-8"                                            >
                    &ldquo;{review.quote} &rdquo;
                </blockquote>
            </div>
            <div className="flex items-center gap-4">
                <Image
                    src={review?.image || "/placeholder.svg"}
                    alt={review?.name}
                    width={1000}
                    height={1000}
                    className="w-14 h-14 rounded-full object-cover bg-card"
                />
                <div>
                    <p className="title-sm font-semibold text-foreground">{review?.name}</p>
                    <p className="text-xs text-foreground/60">{review?.role}</p>
                </div>
            </div>
        </div>
    )
}
