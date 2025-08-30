"use client"
import { useState, useEffect } from 'react'

interface ProgressSummaryProps {
  languageId: string
  totalLessons: number
}

interface ProgressData {
  progress: Array<{
    lesson: {
      id: string
      title: string
      number: number
    }
    completed: boolean
  }>
}

export default function ProgressSummary({ languageId, totalLessons }: ProgressSummaryProps) {
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress?userId=anonymous`)
        if (response.ok) {
          const data = await response.json()
          // Filter progress for this language
          const languageProgress = data.progress?.filter((p: any) => 
            p.lesson?.language?.slug === languageId
          ) || []
          setProgress({ progress: languageProgress })
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [languageId])

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  const completedLessons = progress?.progress?.filter(p => p.completed).length || 0
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
        <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Completed Lessons</span>
          <span className="font-medium">{completedLessons} / {totalLessons}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        {completedLessons > 0 && (
          <div className="text-sm text-gray-600">
            {completedLessons === totalLessons ? (
              <span className="text-green-600 font-medium">🎉 Congratulations! You've completed all lessons!</span>
            ) : (
              <span>Keep going! {totalLessons - completedLessons} lessons remaining</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
