"use client"

import Link from "next/link"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

interface Language {
  id: string
  slug: string
  name: string
}

interface Lesson {
  id: string
  number: number
  title: string
  content: string
  exercise: string
  difficulty: string
  estimatedTime: number
  language: Language
  exam: any
}

interface LessonPageClientProps {
  lesson: Lesson
}

export default function LessonPageClient({ lesson }: LessonPageClientProps) {
  const { locale } = useLocale()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link 
            href={`/languages/${lesson.language.slug}`}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t(locale, "common.backToLanguage").replace("{language}", lesson.language.name)}
          </Link>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">
              {lesson.language.name} • {t(locale, "common.lesson")} {lesson.number}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {t(locale, `languages.${lesson.difficulty}`)}
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
            <h3 className="text-lg font-semibold mb-4">{t(locale, "common.exercise")}</h3>
            <p className="text-sm text-gray-600">{lesson.exercise}</p>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">{t(locale, "common.difficulty")}</h3>
            <span className={`px-3 py-1 text-sm rounded-full ${
              lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {t(locale, `languages.${lesson.difficulty}`)}
            </span>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">{t(locale, "common.estimatedTime")}</h3>
            <p className="text-sm text-gray-600">{lesson.estimatedTime} {t(locale, "common.minutes")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
