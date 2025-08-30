"use client"

import * as React from "react"

type Stats = {
  languages: number
  lessons: number
  projectsTotal: number
  projectsToday: number
}

export default function StatsBar() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let alive = true
    async function load() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" })
        const data = await res.json()
        if (alive) setStats(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    const t = setInterval(load, 30000) // refresh every 30s
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [])

  if (loading || !stats) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-4">
            <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    )
  }

  const items = [
    { label: "Languages", value: stats.languages },
    { label: "Lessons", value: stats.lessons },
    { label: "Projects total", value: stats.projectsTotal },
    { label: "Projects today", value: stats.projectsToday },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="card p-4">
          <div className="text-sm text-gray-600">{it.label}</div>
          <div className="text-2xl font-bold">{it.value}</div>
        </div>
      ))}
    </div>
  )
}
