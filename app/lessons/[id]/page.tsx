import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function LessonPage({ params }: { params: { id: string } }) {
  const { id } = params

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      language: true,
      exam: true
    }
  })

  if (!lesson) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link 
            href={`/languages/${lesson.language.slug}`}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to {lesson.language.name}
          </Link>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">
              {lesson.language.name} • Lesson {lesson.number}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {lesson.difficulty}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {lesson.title}
          </h1>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Exercise</h3>
            <p className="text-sm text-gray-600">{lesson.exercise}</p>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Difficulty</h3>
            <span className={`px-3 py-1 text-sm rounded-full ${
              lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {lesson.difficulty}
            </span>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Estimated Time</h3>
            <p className="text-sm text-gray-600">{lesson.estimatedTime} minutes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
