"use client"

import { useState, useEffect } from 'react'
import { generateSmartHints, getContextualHints, getLearningPathSuggestions, getPersonalizedRecommendations } from '@/lib/smartHints'

interface SmartHintsProps {
  language: string
  code: string
  lessonId: string
  userLevel: 'beginner' | 'intermediate' | 'advanced'
  learningProgress: number
  isVisible: boolean
  onHintDismiss?: (hintId: string) => void
}

interface SmartHint {
  id: string
  type: 'syntax' | 'logic' | 'best_practice' | 'concept' | 'debugging'
  priority: 'low' | 'medium' | 'high'
  message: string
  codeSuggestion?: string
  explanation?: string
  relatedConcepts: string[]
}

export default function SmartHints({ 
  language, 
  code, 
  lessonId, 
  userLevel, 
  learningProgress, 
  isVisible, 
  onHintDismiss 
}: SmartHintsProps) {
  const [hints, setHints] = useState<SmartHint[]>([])
  const [learningPath, setLearningPath] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const [dismissedHints, setDismissedHints] = useState<string[]>([])

  useEffect(() => {
    if (!isVisible || !code.trim()) return

    // Generate smart hints based on current code
    const context = {
      language,
      code,
      lessonId,
      userLevel,
      previousHints: dismissedHints,
      commonMistakes: [],
      learningProgress
    }

    const smartHints = generateSmartHints(context)
    setHints(smartHints)

    // Get learning path suggestions
    const pathSuggestions = getLearningPathSuggestions(language, [], userLevel)
    setLearningPath(pathSuggestions)

    // Get personalized recommendations
    const personalizedRecs = getPersonalizedRecommendations(
      language, 
      userLevel, 
      learningProgress, 
      []
    )
    setRecommendations(personalizedRecs)
  }, [code, language, lessonId, userLevel, learningProgress, isVisible, dismissedHints])

  const handleDismissHint = (hintId: string) => {
    setDismissedHints(prev => [...prev, hintId])
    setHints(prev => prev.filter(hint => hint.id !== hintId))
    onHintDismiss?.(hintId)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'syntax': return '🔤'
      case 'logic': return '🧠'
      case 'best_practice': return '⭐'
      case 'concept': return '💡'
      case 'debugging': return '🐛'
      default: return '💡'
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <span className="font-medium text-gray-700">Smart Hints</span>
          {hints.length > 0 && (
            <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
              {hints.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Smart Hints */}
      {hints.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Contextual Suggestions:</h4>
          <div className="space-y-3">
            {hints.map((hint) => (
              <div
                key={hint.id}
                className={`p-3 rounded-lg border ${getPriorityColor(hint.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-lg">{getTypeIcon(hint.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{hint.message}</p>
                      {showDetails && hint.explanation && (
                        <p className="text-xs opacity-80 mb-2">{hint.explanation}</p>
                      )}
                      {showDetails && hint.codeSuggestion && (
                        <div className="bg-black/10 rounded p-2 mb-2">
                          <pre className="text-xs font-mono">{hint.codeSuggestion}</pre>
                        </div>
                      )}
                      {showDetails && hint.relatedConcepts.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {hint.relatedConcepts.map((concept, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-white/50 rounded-full"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismissHint(hint.id)}
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity ml-2"
                    title="Dismiss hint"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Path */}
      {showDetails && learningPath.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Suggested Learning Path:</h4>
          <div className="space-y-2">
            {learningPath.map((concept, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700">{concept}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personalized Recommendations */}
      {showDetails && recommendations.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Personalized Recommendations:</h4>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Learning Progress</span>
          <span className="text-sm text-gray-600">{learningProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${learningProgress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          Level: {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}
        </div>
      </div>

      {/* No Hints State */}
      {hints.length === 0 && (
        <div className="p-4 text-center">
          <div className="text-gray-400 mb-2">🎉</div>
          <p className="text-sm text-gray-600">
            Great job! No suggestions at the moment.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Keep coding to see smart hints and suggestions.
          </p>
        </div>
      )}
    </div>
  )
}
