"use client"

import Link from "next/link"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

interface Lesson {
  id: string
  number: number
  title: string
  difficulty: string
  estimatedTime: number
  exercise: string
  exam: any
}

interface Language {
  id: string
  slug: string
  name: string
  description: string
  lessons: Lesson[]
}

interface LanguagePageClientProps {
  language: Language
}

export default function LanguagePageClient({ language }: LanguagePageClientProps) {
  const { locale } = useLocale()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/languages"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t(locale, "common.backToLanguages")}
          </Link>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {language.name}
          </h1>
          <p className="text-gray-400 max-w-2xl">
            {language.description}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {language.lessons.map((lesson) => (
          <div key={lesson.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">
                    {t(locale, "common.lesson")} {lesson.number}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {t(locale, `languages.${lesson.difficulty}`)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                <p className="text-sm text-gray-600">{lesson.exercise}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{t(locale, "common.estimatedTime")}: {lesson.estimatedTime} {t(locale, "common.minutes")}</span>
                </div>
              </div>
              <Link
                href={`/lessons/${lesson.id}`}
                className="btn btn-primary"
              >
                {t(locale, "common.startLesson")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
