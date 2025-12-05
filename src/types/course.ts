
import { TAssignment } from './assignment';
import { TQuiz } from './quiz';

export type TSyllabus = {
    title: string;
    description?: string;
    videoUrl?: string;
    duration?: number;
    isFree?: boolean;
    type: 'video' | 'quiz' | 'assignment';
    contentId?: string;
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
    assignments?: TAssignment[];
    quizzes?: TQuiz[];
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
