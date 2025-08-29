"use client"
import * as React from "react"

type Kind = "course" | "exam" | "freestyle"

export default function MarkCompleteButton({ kind, id }: { kind: Kind; id: string }) {
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleClick() {
    try {
      setLoading(true); setError(null)
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id }),
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
      <button onClick={handleClick} disabled={loading || done}
        className={`btn ${done ? "btn-primary" : ""}`}>
        {loading ? "Saving..." : done ? "Completed ✓" : "Mark complete"}
      </button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
