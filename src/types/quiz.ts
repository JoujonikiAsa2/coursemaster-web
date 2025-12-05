
export type TQuestion = {
    questionText: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctOption: number; // 1-4
}

export type TQuiz = {
    _id: string;
    quizTitle: string;
    description?: string;
    dueDate: string;
    totalMarks: number;
    totalQuestions: number;
    courseId: string;
    questions: TQuestion[];
    createdAt?: string;
    updatedAt?: string;
}
