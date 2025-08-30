"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

interface Language {
  id: string
  slug: string
  name: string
  lessons: Array<{
    id: string
    number: number
    title: string
    difficulty: string
    estimatedTime: number
  }>
}

interface LanguageSearchProps {
  languages: Language[]
  doneIds: Set<string>
}

export default function LanguageSearch({ languages, doneIds }: LanguageSearchProps) {
  const { locale } = useLocale()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lang.slug.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [languages, searchTerm])

  const getProgressForLanguage = (language: Language) => {
    const totalLessons = language.lessons.length
    const completedLessons = language.lessons.filter(lesson => doneIds.has(lesson.id)).length
    return { completed: completedLessons, total: totalLessons }
  }

  const getLevelProgress = (language: Language, level: string) => {
    const levelLessons = language.lessons.filter(lesson => lesson.difficulty === level)
    const completedLevelLessons = levelLessons.filter(lesson => doneIds.has(lesson.id)).length
    return { completed: completedLevelLessons, total: levelLessons.length }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t(locale, "languages.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full"
          />
        </div>
      </div>

      {/* Language Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLanguages.map((language) => {
          const progress = getProgressForLanguage(language)
          const progressPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0
          
          // Get progress for each level
          const beginnerProgress = getLevelProgress(language, 'beginner')
          const intermediateProgress = getLevelProgress(language, 'intermediate')
          const advancedProgress = getLevelProgress(language, 'advanced')
          
          return (
            <Link
              key={language.id}
              href={`/languages/${language.slug}`}
              className="card card-hover p-6"
            >
              {/* Language Header */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={`/icons/${language.slug}.svg`}
                  alt={language.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {language.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    3 {t(locale, "languages.levels")}
                  </p>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: 'var(--text-muted)' }}>{t(locale, "languages.progress")}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {progress.completed}/{progress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Levels Preview */}
              <div className="space-y-2">
                {/* Beginner Level */}
                <div className={`flex items-center justify-between p-2 rounded text-sm ${
                  beginnerProgress.completed === beginnerProgress.total && beginnerProgress.total > 0
                    ? 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                } border`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      1
                    </span>
                    <span 
                      className="truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Beginner
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs px-1.5 py-0.5 rounded">
                      {beginnerProgress.completed}/{beginnerProgress.total}
                    </span>
                    {beginnerProgress.completed === beginnerProgress.total && beginnerProgress.total > 0 && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                </div>

                {/* Intermediate Level */}
                <div className={`flex items-center justify-between p-2 rounded text-sm ${
                  intermediateProgress.completed === intermediateProgress.total && intermediateProgress.total > 0
                    ? 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                } border`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      2
                    </span>
                    <span 
                      className="truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Intermediate
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 text-xs px-1.5 py-0.5 rounded">
                      {intermediateProgress.completed}/{intermediateProgress.total}
                    </span>
                    {intermediateProgress.completed === intermediateProgress.total && intermediateProgress.total > 0 && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                </div>

                {/* Advanced Level */}
                <div className={`flex items-center justify-between p-2 rounded text-sm ${
                  advancedProgress.completed === advancedProgress.total && advancedProgress.total > 0
                    ? 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                } border`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      3
                    </span>
                    <span 
                      className="truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Advanced
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs px-1.5 py-0.5 rounded">
                      {advancedProgress.completed}/{advancedProgress.total}
                    </span>
                    {advancedProgress.completed === advancedProgress.total && advancedProgress.total > 0 && (
                      <span className="text-green-500">✓</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredLanguages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            {t(locale, "languages.noResults")}
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            {t(locale, "languages.noResultsSubtitle")}
          </p>
        </div>
      )}
    </div>
  )
}

