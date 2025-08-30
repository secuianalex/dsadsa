"use client"

import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

interface Language {
  id: string
  slug: string
  name: string
  description?: string
  lessons: any[]
}

interface PathLanguage {
  id: string
  language: Language
  order: number
}

interface Path {
  id: string
  slug: string
  title: string
  description: string
  languages: PathLanguage[]
}

export default function PathDetailPage() {
  const { locale } = useLocale()
  const params = useParams()
  const [path, setPath] = useState<Path | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const response = await fetch(`/api/paths/${params.slug}`)
        if (!response.ok) {
          throw new Error('Path not found')
        }
        const data = await response.json()
        setPath(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load path')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchPath()
    }
  }, [params.slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !path) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-500">Path Not Found</h1>
        <p className="text-gray-400">The learning path you're looking for doesn't exist.</p>
        <Link href="/paths" className="btn btn-primary">
          Back to Learning Paths
        </Link>
      </div>
    )
  }

  // Sort languages by their order in the path (fallback to name if order not available)
  const sortedLanguages = path.languages.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order
    }
    return a.language.name.localeCompare(b.language.name)
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {path.title}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {path.description}
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
          <span>{sortedLanguages.length} languages</span>
          <span>•</span>
          <span>Follow the order below for best results</span>
        </div>
      </div>

      {/* Learning Path Visualization */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Learning Journey
        </h2>
        
        <div className="space-y-4">
          {sortedLanguages.map((pathLang, index) => (
            <div key={pathLang.id} className="relative">
              {/* Connection Line */}
              {index < sortedLanguages.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300 dark:bg-gray-600"></div>
              )}
              
              <div className="flex items-start gap-4">
                {/* Step Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                
                {/* Language Card */}
                <div className="flex-1 card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {pathLang.language.name}
                    </h3>
                    <Link 
                      href={`/languages/${pathLang.language.slug}`}
                      className="btn btn-sm btn-primary"
                    >
                      Start Learning
                    </Link>
                  </div>
                  
                  {pathLang.language.description && (
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                      {pathLang.language.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>{pathLang.language.lessons.length} lessons</span>
                    <span>•</span>
                    <span>Step {index + 1} of {sortedLanguages.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/paths" className="btn btn-outline">
            ← Back to All Paths
          </Link>
          <Link href="/languages" className="btn btn-outline">
            Browse All Languages
          </Link>
          <Link href="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
