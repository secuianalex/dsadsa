import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import MarkCompleteButton from "@/components/MarkCompleteButton"

export default async function LanguageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Fetch the language and all its lessons
  const lang = await prisma.language.findUnique({
    where: { slug },
    include: {
      lessons: {
        orderBy: { number: "asc" },
        include: { exam: true }
      }
    }
  })

  if (!lang) notFound()

  // Get user progress for this language
  const progress = await prisma.progress.findMany({
    where: { 
      userId: null, // dev user
      lessonId: { in: lang.lessons.map(l => l.id) }
    }
  })

  const completedLessonIds = new Set(progress.filter(p => p.completed).map(p => p.lessonId!))

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="card p-6">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={`/icons/${lang.slug}.svg`}
            alt={lang.name}
            width={48}
            height={48}
            className="w-12 h-12"
          />
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {lang.name}
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              {lang.lessons.length} lessons • {completedLessonIds.size} completed
            </p>
          </div>
        </div>
        
        {/* Progress Overview */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Overall Progress</span>
            <span style={{ color: 'var(--text-muted)' }}>
              {completedLessonIds.size}/{lang.lessons.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-brand-500 h-3 rounded-full transition-all duration-300"
              style={{ 
                width: `${lang.lessons.length > 0 ? (completedLessonIds.size / lang.lessons.length) * 100 : 0}%` 
              }}
            ></div>
          </div>
        </div>
      </header>

      {/* Lessons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Lessons
        </h2>
        
        <div className="grid gap-4">
          {lang.lessons.map((lesson) => {
            const isCompleted = completedLessonIds.has(lesson.id)
            
            return (
              <div
                key={lesson.id}
                className={`card p-6 ${
                  isCompleted 
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10' 
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 text-white text-sm font-bold">
                        {lesson.number}
                      </span>
                      <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {lesson.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                        lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                      <span>⏱️ {lesson.estimatedTime} minutes</span>
                      {isCompleted && <span className="text-green-600">✓ Completed</span>}
                    </div>
                    
                    <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                      {lesson.exercise}
                    </p>
                    
                    <div className="flex gap-2">
                      <Link
                        href={`/lessons/${lesson.id}`}
                        className="btn btn-primary"
                      >
                        Start Lesson
                      </Link>
                      
                      {lesson.exam && (
                        <Link
                          href={`/lessons/${lesson.id}/exam`}
                          className="btn btn-ghost"
                        >
                          Take Exam
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {isCompleted && (
                      <div className="text-green-500 text-2xl">✓</div>
                    )}
                    <MarkCompleteButton
                      id={lesson.id}
                      type="lesson"
                      completed={isCompleted}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
