"use client"
import * as React from "react"

type Kind = "lesson" | "exam"

interface MarkCompleteButtonProps {
  type: Kind
  id: string
  completed?: boolean
}

export default function MarkCompleteButton({ type, id, completed = false }: MarkCompleteButtonProps) {
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(completed)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setDone(completed)
  }, [completed])

  async function handleClick() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to save")
      setDone(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button 
        onClick={handleClick} 
        disabled={loading || done}
        className={`btn ${done ? "btn-primary" : "btn-ghost"}`}
      >
        {loading ? "Saving..." : done ? "Completed ✓" : "Mark complete"}
      </button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
