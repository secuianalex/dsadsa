"use client"

import Link from "next/link"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"
import DevChat from "./DevChat"

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

interface LevelLearningPageProps {
  language: Language
  level: 'beginner' | 'intermediate' | 'advanced'
}

export default function LevelLearningPage({ language, level }: LevelLearningPageProps) {
  const { locale } = useLocale()

  const getLevelInfo = (level: string) => {
    switch (level) {
      case 'beginner':
        return {
          title: 'Beginner Level',
          description: 'Start your journey with the fundamentals',
          color: 'green',
          icon: '🌱'
        }
      case 'intermediate':
        return {
          title: 'Intermediate Level',
          description: 'Build on your foundation with advanced concepts',
          color: 'yellow',
          icon: '🚀'
        }
      case 'advanced':
        return {
          title: 'Advanced Level',
          description: 'Master complex topics and real-world applications',
          color: 'red',
          icon: '⚡'
        }
      default:
        return {
          title: 'Level',
          description: 'Learn programming concepts',
          color: 'blue',
          icon: '📚'
        }
    }
  }

  const levelInfo = getLevelInfo(level)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href={`/languages/${language.slug}`}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-2"
              >
                <span>←</span>
                Back to {language.name}
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-1">
                <span className="text-2xl">{levelInfo.icon}</span>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{language.name}</h1>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{levelInfo.title}</p>
            </div>

            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Learn with Dev
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet Dev, your AI programming tutor! I'll guide you through {language.name} at the {level} level. 
            Ask me anything about programming concepts, get exercises, and practice coding in real-time.
          </p>
        </div>

        {/* Dev Chat Interface */}
        <div className="h-[700px]">
          <DevChat language={language.slug} level={level} />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            <strong>Available topics for {level} level:</strong> Variables, Functions, Conditionals, Loops, and more!
          </p>
          <p className="mt-2">
            <strong>Try these commands:</strong> "variables", "functions", "show progress", "run code"
          </p>
        </div>
      </div>
    </div>
  )
}
