import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import MarkCompleteButton from "@/components/MarkCompleteButton"

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      language: true,
      exam: true
    }
  })

  if (!lesson) notFound()

  // Get user progress for this lesson
  const progress = await prisma.progress.findFirst({
    where: { 
      userId: null, // dev user
      lessonId: id
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
              href={`/languages/${lesson.language.slug}`}
              className="text-sm hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              ← Back to {lesson.language.name}
            </Link>
            <h1 className="text-3xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
              Lesson {lesson.number}: {lesson.title}
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
              ⏱️ {lesson.estimatedTime} min
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            {lesson.exercise}
          </p>
          <MarkCompleteButton
            id={lesson.id}
            type="lesson"
            completed={isCompleted}
          />
        </div>
      </header>

      {/* Lesson Content */}
      <div className="card p-8">
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          style={{
            '--tw-prose-body': 'var(--text-primary)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-links': 'var(--color-brand-500)',
            '--tw-prose-bold': 'var(--text-primary)',
            '--tw-prose-counters': 'var(--text-muted)',
            '--tw-prose-bullets': 'var(--text-muted)',
            '--tw-prose-hr': 'var(--card-border)',
            '--tw-prose-quotes': 'var(--text-primary)',
            '--tw-prose-quote-borders': 'var(--card-border)',
            '--tw-prose-captions': 'var(--text-muted)',
            '--tw-prose-code': 'var(--text-primary)',
            '--tw-prose-pre-code': 'var(--text-primary)',
            '--tw-prose-pre-bg': 'var(--card-bg)',
            '--tw-prose-th-borders': 'var(--card-border)',
            '--tw-prose-td-borders': 'var(--card-border)',
          } as React.CSSProperties}
        >
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }} />
        </div>
      </div>

      {/* Exercise Section */}
      <div className="card p-6">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Practice Exercise
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-lg" style={{ color: 'var(--text-primary)' }}>
            {lesson.exercise}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {lesson.exam && (
            <Link
              href={`/lessons/${lesson.id}/exam`}
              className="btn btn-primary"
            >
              Take Exam
            </Link>
          )}
        </div>
        
        <div className="flex gap-2">
          <Link
            href={`/languages/${lesson.language.slug}`}
            className="btn btn-ghost"
          >
            Back to {lesson.language.name}
          </Link>
        </div>
      </div>
    </section>
  )
}

// Simple markdown renderer for the lesson content
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Wrap lists in ul tags (simplified)
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|p|pre])(.*$)/gim, '<p>$1</p>')
    // Clean up empty paragraphs
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[h|u|p|pre])/g, '$1')
    .replace(/(<\/[h|u|p|pre]>)<\/p>/g, '$1')
}
