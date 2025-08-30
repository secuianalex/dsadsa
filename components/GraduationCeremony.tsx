"use client"

import { useState, useEffect } from "react"
import {
  GraduationCeremony as GraduationCeremonyType,
  generateGraduationCeremony
} from "@/lib/progressionSystem"

interface GraduationCeremonyProps {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  finalScore: number
  timeSpent: number
  achievements: string[]
  onComplete: () => void
  onContinue: () => void
}

export default function GraduationCeremony({
  language,
  level,
  finalScore,
  timeSpent,
  achievements,
  onComplete,
  onContinue
}: GraduationCeremonyProps) {
  const [ceremony, setCeremony] = useState<GraduationCeremonyType | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const graduationCeremony = generateGraduationCeremony(
      language,
      level,
      finalScore,
      timeSpent,
      achievements
    )
    setCeremony(graduationCeremony)
    setShowConfetti(true)

    // Auto-advance through ceremony steps
    const timer = setTimeout(() => {
      setCurrentStep(1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [language, level, finalScore, timeSpent, achievements])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getLevelEmoji = (level: string) => {
    switch (level) {
      case 'beginner': return '🌱'
      case 'intermediate': return '🚀'
      case 'advanced': return '🏆'
      default: return '🎓'
    }
  }

  const getNextLevelText = (recommendation: string) => {
    switch (recommendation) {
      case 'intermediate': return 'Intermediate Level'
      case 'advanced': return 'Advanced Level'
      case 'expert-level': return 'Expert Level'
      case 'continue-practicing': return 'Continue Practicing'
      default: return 'Next Level'
    }
  }

  if (!ceremony) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Preparing graduation ceremony...</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              >
                {['🎉', '🎊', '⭐', '🏆', '🎓', '🌟'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-6xl mb-4">{getLevelEmoji(level)}</div>
            <h1 className="text-4xl font-bold mb-2">Congratulations!</h1>
            <p className="text-xl opacity-90">
              You've successfully graduated from {level.charAt(0).toUpperCase() + level.slice(1)} Level {language.charAt(0).toUpperCase() + language.slice(1)}!
            </p>
          </div>
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {/* Certificate Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6 border-2 border-yellow-200">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🏆</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h2>
              <p className="text-gray-600">Official recognition of your achievement</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-yellow-300">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {ceremony.certificate.title}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  Issued on {ceremony.certificate.issueDate.toLocaleDateString()}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-800">Final Score</div>
                  <div className="text-2xl font-bold text-green-600">{ceremony.finalScore}%</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-800">Time Invested</div>
                  <div className="text-lg font-bold text-blue-600">{formatTime(ceremony.timeSpent)}</div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">
                  Certificate ID: {ceremony.certificate.id}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Valid until {ceremony.certificate.validUntil.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          {achievements.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
                🎖️ Achievements Earned
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded border">
                    <span className="text-2xl">🏅</span>
                    <span className="text-sm font-medium text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-1">{ceremony.finalScore}%</div>
              <div className="text-sm text-green-700">Final Score</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-1">{formatTime(ceremony.timeSpent)}</div>
              <div className="text-sm text-blue-700">Time Invested</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-1">{achievements.length}</div>
              <div className="text-sm text-purple-700">Achievements</div>
            </div>
          </div>

          {/* Next Level Recommendation */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🚀 What's Next?
            </h3>
            <div className="text-center">
              <div className="text-4xl mb-3">
                {ceremony.nextLevelRecommendation === 'intermediate' ? '📈' :
                 ceremony.nextLevelRecommendation === 'advanced' ? '🏆' :
                 ceremony.nextLevelRecommendation === 'expert-level' ? '👑' : '💪'}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {getNextLevelText(ceremony.nextLevelRecommendation)}
              </div>
              <p className="text-gray-600">
                {ceremony.nextLevelRecommendation === 'intermediate' ? 
                  'Ready to tackle more complex concepts and advanced programming techniques.' :
                 ceremony.nextLevelRecommendation === 'advanced' ? 
                  'Time to master advanced patterns, optimization, and professional development practices.' :
                 ceremony.nextLevelRecommendation === 'expert-level' ? 
                  'You\'ve reached expert level! Consider mentoring others or contributing to open source.' :
                  'Keep practicing and reinforcing your skills. You\'re on the right track!'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              🎓 Complete Graduation
            </button>
            <button
              onClick={onContinue}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
            >
              📚 Continue Learning
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>Congratulations on this amazing achievement! 🎉</p>
            <p className="mt-1">Your dedication and hard work have paid off.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
