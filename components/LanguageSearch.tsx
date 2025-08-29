"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"

interface Language {
  id: string
  slug: string
  name: string
  levels: Array<{
    id: string
    number: number
    courses: Array<{
      id: string
      title: string
    }>
    freestyle: {
      id: string
    } | null
  }>
}

interface LanguageSearchProps {
  languages: Language[]
  doneIds: Set<string>
}

// Language categories for filtering
const categories = [
  { id: "all", name: "All Languages", color: "bg-gray-500" },
  { id: "web", name: "Web Technologies", color: "bg-blue-500" },
  { id: "programming", name: "Programming", color: "bg-green-500" },
  { id: "data", name: "Data & Analytics", color: "bg-purple-500" },
  { id: "mobile", name: "Mobile", color: "bg-orange-500" },
  { id: "devops", name: "DevOps & Cloud", color: "bg-red-500" },
  { id: "ai", name: "AI & ML", color: "bg-indigo-500" },
  { id: "game", name: "Game Development", color: "bg-pink-500" },
]

// Categorize languages
const getLanguageCategory = (lang: Language): string => {
  const name = lang.name.toLowerCase()
  
  if (["html", "css", "javascript", "typescript", "react", "vue.js", "angular", "svelte", "next.js", "nuxt.js", "gatsby"].includes(name)) {
    return "web"
  }
  if (["python", "java", "c#", "c", "c++", "go", "rust", "php", "ruby", "swift", "kotlin", "dart", "scala", "haskell", "elixir", "clojure", "f#", "ocaml", "erlang"].includes(name)) {
    return "programming"
  }
  if (["r", "matlab", "julia", "sas", "stata", "sql", "pl/sql", "t-sql", "mongodb", "graphql"].includes(name)) {
    return "data"
  }
  if (["react native", "flutter", "xamarin", "ionic"].includes(name)) {
    return "mobile"
  }
  if (["docker", "kubernetes", "terraform", "ansible", "jenkins", "git", "bash", "powershell", "perl", "lua", "groovy", "vbscript"].includes(name)) {
    return "devops"
  }
  if (["tensorflow", "pytorch", "scikit-learn", "pandas", "numpy"].includes(name)) {
    return "ai"
  }
  if (["unity", "unreal engine", "godot", "gamemaker"].includes(name)) {
    return "game"
  }
  
  return "programming" // default
}

function computeCourseProgress(lang: Language, doneIds: Set<string>) {
  const allCourses = lang.levels.flatMap((l) => l.courses)
  const total = allCourses.length
  const completed = allCourses.filter((c) => doneIds.has(c.id)).length
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, pct }
}

export default function LanguageSearch({ languages, doneIds }: LanguageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      const matchesSearch = lang.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || getLanguageCategory(lang) === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [languages, searchQuery, selectedCategory])

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' /%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '12px center',
              backgroundSize: '20px',
            }}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Showing {filteredLanguages.length} of {languages.length} languages
        </div>
      </div>

      {/* Languages Grid */}
      {filteredLanguages.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLanguages.map((lang) => {
            const prog = computeCourseProgress(lang, doneIds)

            return (
              <div key={lang.id} className="card p-4 flex flex-col">
                {/* Header with logo + title + course count */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`/icons/${lang.slug}.svg`}
                      alt={`${lang.name} logo`}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {lang.name}
                    </h2>
                  </div>
                  <span className="badge">
                    {prog.completed}/{prog.total} courses
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                  <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-2 bg-brand-500"
                      style={{ width: `${prog.pct}%` }}
                      aria-label="progress"
                    />
                  </div>
                  <div className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                    {prog.pct}% complete
                  </div>
                </div>

                {/* Levels & course links */}
                <div className="space-y-2 text-sm flex-1 mt-3">
                  {lang.levels.map((level) => (
                    <div key={level.id}>
                      <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        Level {level.number}
                      </div>
                      <ul className="list-disc ml-5">
                        {level.courses.map((c) => (
                          <li key={c.id}>
                            <Link 
                              href={`/courses/${c.id}`} 
                              className="underline"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {c.title}
                            </Link>
                            {doneIds.has(c.id) && (
                              <span className="ml-2 badge border-brand-700 text-brand-700">✓</span>
                            )}
                          </li>
                        ))}
                      </ul>
                      {level.freestyle && (
                        <div className="mt-1">
                          <Link
                            className="btn btn-ghost text-xs"
                            href={`/levels/${level.id}/freestyle`}
                          >
                            Freestyle →
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA to language detail */}
                <Link
                  href={`/languages/${lang.slug}`}
                  className="btn btn-primary mt-4 text-center"
                >
                  Start {lang.name}
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            No languages found
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}

