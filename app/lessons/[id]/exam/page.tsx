import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import MarkCompleteButton from "@/components/MarkCompleteButton"

export default async function LessonExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      language: true,
      exam: true
    }
  })

  if (!lesson || !lesson.exam) notFound()

  // Get user progress for this exam
  const progress = await prisma.progress.findFirst({
    where: { 
      userId: null, // dev user
      examId: lesson.exam.id
    }
  })

  const isCompleted = progress?.completed || false

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link 
              href={`/lessons/${lesson.id}`}
              className="text-sm hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              ← Back to Lesson {lesson.number}
            </Link>
            <h1 className="text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
              Exam: {lesson.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
              lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {lesson.difficulty}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {lesson.language.name}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            Complete this exam to earn a trophy and demonstrate your mastery!
          </p>
          <MarkCompleteButton
            id={lesson.exam.id}
            type="exam"
            completed={isCompleted}
          />
        </div>
      </header>

      {/* Exam Content */}
      <div className="card p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Exam Challenge
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                Your Task:
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {lesson.exam.prompt}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Instructions:
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <li>• Read the challenge carefully and understand what you need to build</li>
              <li>• Use the concepts you learned in this lesson</li>
              <li>• Create a working program that meets the requirements</li>
              <li>• Test your solution to make sure it works correctly</li>
              <li>• When you're satisfied with your work, mark this exam as complete</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              What You'll Earn:
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {lesson.language.name} Expert Trophy
                </p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Complete this exam to earn recognition for your skills!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={`/lessons/${lesson.id}`}
          className="btn btn-ghost"
        >
          ← Back to Lesson
        </Link>
        
        <div className="flex gap-2">
          <Link
            href={`/languages/${lesson.language.slug}`}
            className="btn btn-ghost"
          >
            Back to {lesson.language.name}
          </Link>
          <Link
            href="/dashboard"
            className="btn btn-primary"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </section>
  )
}
