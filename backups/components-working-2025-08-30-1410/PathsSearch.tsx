"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

interface Path {
  id: string
  slug: string
  title: string
  description: string
  languages: Array<{
    id: string
    language: {
      id: string
      name: string
    }
  }>
}

interface PathsSearchProps {
  paths: Path[]
}

export default function PathsSearch({ paths }: PathsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPaths = useMemo(() => {
    return paths.filter((path) => {
      const query = searchQuery.toLowerCase()
      return (
        path.title.toLowerCase().includes(query) ||
        path.description.toLowerCase().includes(query) ||
        path.languages.some(pl => pl.language.name.toLowerCase().includes(query))
      )
    })
  }, [paths, searchQuery])

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search learning paths..."
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

        {/* Results Count */}
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Showing {filteredPaths.length} of {paths.length} learning paths
        </div>
      </div>

      {/* Paths Grid */}
      {filteredPaths.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPaths.map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.slug}`}
              className="card card-hover p-6 block"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {path.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {path.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    Languages ({path.languages.length}):
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {path.languages.map((pl) => (
                      <span
                        key={pl.language.id}
                        className="badge text-xs"
                      >
                        {pl.language.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--card-border)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {path.languages.length} language{path.languages.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            No learning paths found
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* How to Choose Section */}
      {filteredPaths.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            How to Choose Your Path
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>For Beginners</h3>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li>• Start with <strong>Web Development</strong> or <strong>Frontend Development</strong></li>
                <li>• Learn <strong>Scripting & Automation</strong> for practical skills</li>
                <li>• Explore <strong>Data Science</strong> if you're interested in analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>For Experienced Developers</h3>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li>• Dive into <strong>Systems Programming</strong> for performance</li>
                <li>• Master <strong>Functional Programming</strong> paradigms</li>
                <li>• Build <strong>Enterprise</strong> or <strong>Mobile</strong> applications</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

