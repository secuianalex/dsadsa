"use client"

import LanguageSearch from "@/components/LanguageSearch"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"
import { useEffect, useState } from "react"

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

export default function LanguagesPage() {
  const { locale } = useLocale()
  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await fetch('/api/languages')
        const data = await response.json()
        setLanguages(data)
      } catch (error) {
        console.error('Error fetching languages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  // For now, we'll use an empty set for doneIds (completed lessons)
  // In a real app, this would come from user progress data
  const doneIds = new Set<string>()

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {t(locale, "languages.title")}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t(locale, "languages.subtitle")}
        </p>
      </div>
      
      <LanguageSearch languages={languages} doneIds={doneIds} />
    </div>
  )
}
