"use client"

import * as React from "react"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

type Stats = {
  languages: number
  uniqueUsers: number
  projectsTotal: number
  projectsToday: number
}

export default function StatsBar() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [loading, setLoading] = React.useState(true)
  const { locale } = useLocale()

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
    { label: t(locale, "stats.languages"), value: stats.languages },
    { label: "Unique Users", value: stats.uniqueUsers },
    { label: t(locale, "stats.projectsTotal"), value: stats.projectsTotal },
    { label: t(locale, "stats.projectsToday"), value: stats.projectsToday },
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
