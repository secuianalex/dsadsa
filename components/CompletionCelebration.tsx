"use client"
import { useState, useEffect } from 'react'

interface CompletionCelebrationProps {
  isVisible: boolean
  onClose: () => void
  lessonTitle: string
}

export default function CompletionCelebration({ isVisible, onClose, lessonTitle }: CompletionCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="relative z-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lesson Completed!</h2>
          <p className="text-gray-600 mb-6">{lessonTitle}</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Great job!</span>
            </div>
            
            <p className="text-sm text-gray-500">
              Your progress has been saved. Keep up the excellent work!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
