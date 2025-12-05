'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
    Play,
    CheckCircle,
    Circle,
    ChevronLeft,
    ChevronRight,
    Menu,
    Clock,
    FileText,
    FileQuestion
} from 'lucide-react'
import { TCourse, TSyllabus } from '@/types/course'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CoursePlayerProps {
    course: TCourse
}

export default function CoursePlayer({ course: initialCourse }: CoursePlayerProps) {
    // Default to the first lesson
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
    const [completedLessons, setCompletedLessons] = useState<number[]>([]) // Store indices of completed lessons
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const course = React.useMemo(() => {
        const c = { ...initialCourse, syllabus: [...initialCourse.syllabus] };

        // Mock Assignments
        if (!c.assignments || c.assignments.length === 0) {
            c.assignments = [
                {
                    _id: "mock-assign-1",
                    assignmentTitle: "Project: Build a ToDo App",
                    description: "Create a functional ToDo application using React state and props.\n\nRequirements:\n1. Add new tasks\n2. Mark tasks as complete\n3. Delete tasks\n4. Persist to local storage",
                    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
                    totalMarks: 100,
                    courseId: c._id
                }
            ];
        }

        // Mock Quizzes
        if (!c.quizzes || c.quizzes.length === 0) {
            c.quizzes = [
                {
                    _id: "mock-quiz-1",
                    quizTitle: "React Fundamentals Quiz",
                    description: "Test your knowledge of Components, Props, and State.",
                    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
                    totalMarks: 50,
                    totalQuestions: 10,
                    courseId: c._id,
                    questions: []
                }
            ];
        }

        // Inject into syllabus if not already present
        const hasAssignment = c.syllabus.some(s => s.type === 'assignment');
        const hasQuiz = c.syllabus.some(s => s.type === 'quiz');

        if (!hasAssignment) {
            c.syllabus.push({
                title: "Project: Build a ToDo App",
                type: 'assignment',
                contentId: "mock-assign-1",
                duration: 60
            });
        }
        if (!hasQuiz) {
            c.syllabus.push({
                title: "React Fundamentals Quiz",
                type: 'quiz',
                contentId: "mock-quiz-1",
                duration: 15
            });
        }

        return c;
    }, [initialCourse]);

    const currentLesson = course.syllabus[currentLessonIndex]

    const handleNext = () => {
        if (currentLessonIndex < course.syllabus.length - 1) {
            setCurrentLessonIndex(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(prev => prev - 1)
        }
    }

    const toggleComplete = (index: number) => {
        setCompletedLessons(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index)
            } else {
                return [...prev, index]
            }
        })
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row bg-background">
            {/* Main Content Area - Video Player */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Video Container */}
                <div className={cn(
                    "relative w-full flex items-center justify-center  h-[400px]",
                    (currentLesson?.type === 'video' || !currentLesson?.type) ? "bg-black aspect-video" : "bg-muted h-full"
                )}>
                    {(currentLesson?.type === 'video' || !currentLesson?.type) ? (
                        currentLesson?.videoUrl ? (
                            <iframe
                                src={currentLesson?.videoUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className='rounded w-full h-full'></iframe>
                        ) : (
                            <div className="text-white flex flex-col items-center gap-4 p-8 text-center opacity-80">
                                <Play className="h-16 w-16" />
                                <p>Select a lesson to start learning {currentLesson?.title}</p>
                            </div>
                        )
                    ) : currentLesson.type === 'assignment' ? (
                        <div className="w-full h-full p-8 flex items-center justify-center">
                            <div className="max-w-2xl w-full bg-card p-6 rounded-xl border shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FileText className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                                        <p className="text-muted-foreground">Assignment</p>
                                    </div>
                                </div>

                                {course.assignments?.find(a => a._id === currentLesson.contentId) ? (
                                    (() => {
                                        const assignment = course.assignments!.find(a => a._id === currentLesson.contentId)!;
                                        return (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="font-semibold mb-2">Instructions</h3>
                                                    <p className="text-muted-foreground whitespace-pre-wrap">{assignment.description}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-muted/50 rounded-lg border">
                                                        <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                                        <p className="font-semibold mt-1">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="p-4 bg-muted/50 rounded-lg border">
                                                        <p className="text-sm font-medium text-muted-foreground">Total Marks</p>
                                                        <p className="font-semibold mt-1">{assignment.totalMarks} Points</p>
                                                    </div>
                                                </div>
                                                <Button size="lg" className="w-full sm:w-auto">
                                                    Submit Assignment
                                                </Button>
                                            </div>
                                        );
                                    })()
                                ) : (
                                    <div className="text-center p-8 text-muted-foreground">
                                        <p>Assignment details not found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : currentLesson.type === 'quiz' ? (
                        <div className="w-full h-full p-8 flex items-center justify-center">
                            <div className="max-w-2xl w-full bg-card p-6 rounded-xl border shadow-sm">
                                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FileQuestion className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                                        <p className="text-muted-foreground">Quiz</p>
                                    </div>
                                </div>

                                {course.quizzes?.find(q => q._id === currentLesson.contentId) ? (
                                    (() => {
                                        const quiz = course.quizzes!.find(q => q._id === currentLesson.contentId)!;
                                        return (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="font-semibold mb-2">Overwiew</h3>
                                                    <p className="text-muted-foreground">{quiz.description || "No description provided."}</p>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="p-4 bg-muted/50 rounded-lg border text-center">
                                                        <p className="text-2xl font-bold">{quiz.totalQuestions}</p>
                                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Questions</p>
                                                    </div>
                                                    <div className="p-4 bg-muted/50 rounded-lg border text-center">
                                                        <p className="text-2xl font-bold">{quiz.totalMarks}</p>
                                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Marks</p>
                                                    </div>
                                                    <div className="p-4 bg-muted/50 rounded-lg border text-center">
                                                        <p className="text-lg font-bold truncate">{new Date(quiz.dueDate).toLocaleDateString()}</p>
                                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Due Date</p>
                                                    </div>
                                                </div>
                                                <Button size="lg" className="w-full">
                                                    Start Quiz
                                                </Button>
                                            </div>
                                        );
                                    })()
                                ) : (
                                    <div className="text-center p-8 text-muted-foreground">
                                        <p>Quiz details not found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Sidebar - Playlist */}
            <div className={cn(
                "border-l bg-card transition-all duration-300 flex flex-col",
                sidebarOpen ? "w-full lg:w-96" : "w-0 hidden lg:flex lg:w-0 overflow-hidden"
            )}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Course Content</h3>
                    <p className="text-xs text-muted-foreground">{completedLessons.length}/{course.syllabus.length} Completed</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-2">
                        {course.syllabus.map((lesson, index) => {
                            const isActive = currentLessonIndex === index
                            const isCompleted = completedLessons.includes(index)

                            return (
                                <div
                                    key={index}
                                    onClick={() => setCurrentLessonIndex(index)}
                                    className={cn(
                                        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border",
                                        isActive
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "hover:bg-accent border-transparent",
                                        isCompleted && !isActive && "opacity-75"
                                    )}
                                >
                                    <div className="mt-1">
                                        {isCompleted ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            lesson.type === 'assignment' ? (
                                                <FileText className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                            ) : lesson.type === 'quiz' ? (
                                                <FileQuestion className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                            ) : (
                                                isActive ? <Play className="h-4 w-4 fill-current" /> : <Circle className="h-4 w-4 text-muted-foreground" />
                                            )
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className={cn("text-sm font-medium leading-tight", isActive && "font-bold")}>
                                            {index + 1}. {lesson.title}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            {lesson.type === 'video' || !lesson.type ? (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {lesson.duration || "10"}m
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 capitalize">
                                                    {lesson.type}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Floating Toggle Button for Mobile/Desktop */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed bottom-4 right-4 z-50 lg:hidden rounded-full shadow-lg bg-primary text-primary-foreground"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <Menu className="h-6 w-6" />
            </Button>
        </div>
    )
}
