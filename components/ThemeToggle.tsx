"use client"

import * as React from "react"

export default function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains("dark")
    setDark(isDark)
  }, [])

  function toggle() {
    const root = document.documentElement
    const next = !dark
    setDark(next)
    root.classList.toggle("dark", next)
    try { localStorage.setItem("theme", next ? "dark" : "light") } catch {}
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {mounted ? (dark ? "🌙 Dark" : "☀️ Light") : "…"}
    </button>
  )
}
