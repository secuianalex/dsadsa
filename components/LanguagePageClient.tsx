"use client"

import Link from "next/link"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"
import ProgressIndicator from "./ProgressIndicator"
import ProgressSummary from "./ProgressSummary"

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

  const getLevelProgress = (level: string) => {
    const levelLessons = language.lessons.filter(lesson => lesson.difficulty === level)
    return {
      total: levelLessons.length,
      completed: 0, // This would come from user progress in a real app
      percentage: levelLessons.length > 0 ? 0 : 0 // This would be calculated from user progress
    }
  }

  const beginnerProgress = getLevelProgress('beginner')
  const intermediateProgress = getLevelProgress('intermediate')
  const advancedProgress = getLevelProgress('advanced')

  const levels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Start your journey with the basics',
      color: 'green',
      progress: beginnerProgress,
      lessons: language.lessons.filter(lesson => lesson.difficulty === 'beginner')
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Build on your foundation with advanced concepts',
      color: 'yellow',
      progress: intermediateProgress,
      lessons: language.lessons.filter(lesson => lesson.difficulty === 'intermediate')
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Master complex topics and real-world applications',
      color: 'red',
      progress: advancedProgress,
      lessons: language.lessons.filter(lesson => lesson.difficulty === 'advanced')
    }
  ]

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
        
        <ProgressSummary languageId={language.slug} totalLessons={language.lessons.length} />
      </div>

      {/* Level Selection */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Choose Your Level</h2>
          <p className="text-gray-600">Select the level that matches your experience</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {levels.map((level) => (
            <Link
              key={level.id}
              href={`/languages/${language.slug}/${level.id}`}
              className="card card-hover p-6 border-2 border-transparent hover:border-gray-200 transition-all duration-200"
            >
              {/* Level Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  level.color === 'green' ? 'bg-green-500' :
                  level.color === 'yellow' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  {level.id === 'beginner' ? '1' : level.id === 'intermediate' ? '2' : '3'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{level.name}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-600">
                    {level.progress.completed}/{level.progress.total} lessons
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      level.color === 'green' ? 'bg-green-500' :
                      level.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${level.progress.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Lesson Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {level.lessons.length} lessons available
                </span>
                <span className={`text-sm px-2 py-1 rounded ${
                  level.color === 'green' ? 'bg-green-100 text-green-700' :
                  level.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {level.name}
                </span>
              </div>

              {/* Start Button */}
              <div className="mt-4">
                <div className={`w-full py-2 px-4 rounded-lg text-center font-medium text-white ${
                  level.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                  level.color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' :
                  'bg-red-500 hover:bg-red-600'
                } transition-colors`}>
                  Start {level.name} Level
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
