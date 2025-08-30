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
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lang.slug.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (difficultyFilter === "all") return matchesSearch
      
      // Check if any lesson matches the difficulty filter
      const hasMatchingDifficulty = lang.lessons.some(lesson => lesson.difficulty === difficultyFilter)
      return matchesSearch && hasMatchingDifficulty
    })
  }, [languages, searchTerm, difficultyFilter])

  const getProgressForLanguage = (language: Language) => {
    const totalLessons = language.lessons.length
    const completedLessons = language.lessons.filter(lesson => doneIds.has(lesson.id)).length
    return { completed: completedLessons, total: totalLessons }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
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
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="input w-full sm:w-48"
        >
          <option value="all">{t(locale, "languages.allDifficulties")}</option>
          <option value="beginner">{t(locale, "languages.beginner")}</option>
          <option value="intermediate">{t(locale, "languages.intermediate")}</option>
          <option value="advanced">{t(locale, "languages.advanced")}</option>
        </select>
      </div>

      {/* Language Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLanguages.map((language) => {
          const progress = getProgressForLanguage(language)
          const progressPercentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0
          
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
                    {language.lessons.length} {t(locale, "languages.lessons")}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
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

              {/* Lesson Preview */}
              <div className="space-y-2">
                {language.lessons.slice(0, 3).map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-2 rounded text-sm ${
                      doneIds.has(lesson.id)
                        ? 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                    } border`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        {lesson.number}
                      </span>
                      <span 
                        className="truncate"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                        lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {t(locale, `languages.${lesson.difficulty}`)}
                      </span>
                      {doneIds.has(lesson.id) && (
                        <span className="text-green-500">✓</span>
                      )}
                    </div>
                  </div>
                ))}
                {language.lessons.length > 3 && (
                  <div className="text-center">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      +{language.lessons.length - 3} {t(locale, "languages.moreLessons")}
                    </span>
                  </div>
                )}
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

