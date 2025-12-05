
export type TAssignment = {
    _id: string;
    assignmentTitle: string;
    description: string;
    dueDate: string; // Date represented as ISO string in frontend
    totalMarks: number;
    courseId: string;
    createdAt?: string;
    updatedAt?: string;
}
