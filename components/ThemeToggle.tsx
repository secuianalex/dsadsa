"use client"

import * as React from "react"

export default function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      const isDark = storedTheme === "dark"
      setDark(isDark)
      document.documentElement.classList.toggle("dark", isDark)
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDark(prefersDark)
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  function toggle() {
    const root = document.documentElement
    const next = !dark
    setDark(next)
    root.classList.toggle("dark", next)
    try { 
      localStorage.setItem("theme", next ? "dark" : "light") 
    } catch (e) {
      console.warn("Failed to save theme preference:", e)
    }
  }

  return (
    <button
      onClick={toggle}
      className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {mounted ? (dark ? "🌙 Dark" : "☀️ Light") : "…"}
    </button>
  )
}
