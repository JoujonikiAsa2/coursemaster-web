
export type TSyllabus = {
    title: string;
    description?: string;
    videoUrl?: string;
    duration?: number;
    isFree?: boolean;
}

export type TReview = {
    name: string;
    rating: number;
    comment: string;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TBatch = {
    _id?: string,
    batchName: string;
    startDate: Date;
    endDate?: Date;
    maxStudents?: number;
    enrolledCount?: number;
}
export type TCourse = {
    _id: string,
    instructor: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    price: number;
    rating: number;
    numReviews: number;
    reviews: TReview[];
    batches: TBatch[];
    syllabus: TSyllabus[];
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
