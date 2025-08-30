"use client"
import { useState, useEffect } from 'react'

interface ProgressIndicatorProps {
  lessonId: string
  className?: string
}

interface ProgressData {
  completed: boolean
  completedAt: string | null
}

export default function ProgressIndicator({ lessonId, className = '' }: ProgressIndicatorProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress?lessonId=${lessonId}&userId=anonymous`)
        if (response.ok) {
          const data = await response.json()
          setProgress(data)
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [lessonId])

  if (loading) {
    return (
      <div className={`w-4 h-4 rounded-full border-2 border-gray-300 animate-pulse ${className}`} />
    )
  }

  if (progress?.completed) {
    return (
      <div className={`w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ${className}`}>
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }

  return (
    <div className={`w-4 h-4 rounded-full border-2 border-gray-300 ${className}`} />
  )
}
