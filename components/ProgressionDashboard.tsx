"use client"

import { useState, useEffect } from "react"
import {
  ProgressionStatus,
  LearningPath,
  calculateProgressionStatus,
  getLearningPath,
  getNextAvailableConcept
} from "@/lib/progressionSystem"

interface ProgressionDashboardProps {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  completedConcepts: string[]
  exercisesCompleted: number
  projectCompleted: boolean
  totalTimeSpent: number
  onConceptSelect: (conceptId: string) => void
  onGraduation: () => void
}

export default function ProgressionDashboard({
  language,
  level,
  completedConcepts,
  exercisesCompleted,
  projectCompleted,
  totalTimeSpent,
  onConceptSelect,
  onGraduation
}: ProgressionDashboardProps) {
  const [progressionStatus, setProgressionStatus] = useState<ProgressionStatus | null>(null)
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)

  useEffect(() => {
    const status = calculateProgressionStatus(
      language,
      level,
      completedConcepts,
      exercisesCompleted,
      projectCompleted,
      totalTimeSpent
    )
    setProgressionStatus(status)

    const path = getLearningPath(language, level)
    setLearningPath(path)

    // Set current concept as selected
    if (status.currentConcept && status.currentConcept !== 'completed') {
      setSelectedConcept(status.currentConcept)
    }
  }, [language, level, completedConcepts, exercisesCompleted, projectCompleted, totalTimeSpent])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getConceptStatus = (conceptId: string) => {
    if (completedConcepts.includes(conceptId)) {
      return 'completed'
    }
    if (selectedConcept === conceptId) {
      return 'current'
    }
    return 'locked'
  }

  const getConceptIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'current':
        return '🎯'
      case 'locked':
        return '🔒'
      default:
        return '⭕'
    }
  }

  const getConceptClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'current':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'locked':
        return 'bg-gray-50 border-gray-200 text-gray-500'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }

  if (!progressionStatus || !learningPath) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading progression...</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Learning Progression</h2>
            <p className="text-sm opacity-90">
              {language.charAt(0).toUpperCase() + language.slice(1)} - {level.charAt(0).toUpperCase() + level.slice(1)} Level
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progressionStatus.masteryLevel}%</div>
            <div className="text-sm opacity-90">Mastery Level</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Learning Path */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Learning Path</h3>
            <div className="space-y-3">
              {learningPath.concepts.map((concept, index) => {
                const status = getConceptStatus(concept.id)
                const isClickable = status === 'current' || status === 'completed'
                
                return (
                  <div
                    key={concept.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isClickable ? 'hover:shadow-md' : ''
                    } ${getConceptClass(status)}`}
                    onClick={() => {
                      if (isClickable) {
                        setSelectedConcept(concept.id)
                        onConceptSelect(concept.id)
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getConceptIcon(status)}</span>
                        <div>
                          <div className="font-semibold">{concept.title}</div>
                          <div className="text-sm opacity-75">{concept.description}</div>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span>⏱️ {formatTime(concept.estimatedTime)}</span>
                            <span>📝 {concept.exercisesRequired} exercises</span>
                            <span>🎯 {concept.masteryThreshold}% mastery</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {status === 'completed' ? 'Completed' : 
                           status === 'current' ? 'Current' : 
                           `Prerequisites: ${concept.prerequisites.length}`}
                        </div>
                        {status === 'locked' && concept.prerequisites.length > 0 && (
                          <div className="text-xs opacity-75 mt-1">
                            Needs: {concept.prerequisites.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Progress & Requirements */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3">Progress Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Concepts Completed:</span>
                <span className="font-semibold">
                  {completedConcepts.length}/{learningPath.graduationRequirements.conceptsCompleted}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(completedConcepts.length / learningPath.graduationRequirements.conceptsCompleted) * 100}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Exercises Completed:</span>
                <span className="font-semibold">
                  {exercisesCompleted}/{learningPath.graduationRequirements.exercisesCompleted}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(exercisesCompleted / learningPath.graduationRequirements.exercisesCompleted) * 100}%` 
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm">Time Spent:</span>
                <span className="font-semibold">
                  {formatTime(totalTimeSpent)}/{formatTime(learningPath.graduationRequirements.totalTimeSpent)}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((totalTimeSpent / learningPath.graduationRequirements.totalTimeSpent) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Graduation Requirements */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-3">Graduation Requirements</h3>
            <div className="space-y-2">
              <div className={`flex items-center gap-2 ${completedConcepts.length >= learningPath.graduationRequirements.conceptsCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                {completedConcepts.length >= learningPath.graduationRequirements.conceptsCompleted ? '✅' : '⭕'}
                <span className="text-sm">Complete {learningPath.graduationRequirements.conceptsCompleted} concepts</span>
              </div>
              <div className={`flex items-center gap-2 ${exercisesCompleted >= learningPath.graduationRequirements.exercisesCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                {exercisesCompleted >= learningPath.graduationRequirements.exercisesCompleted ? '✅' : '⭕'}
                <span className="text-sm">Complete {learningPath.graduationRequirements.exercisesCompleted} exercises</span>
              </div>
              <div className={`flex items-center gap-2 ${projectCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                {projectCompleted ? '✅' : '⭕'}
                <span className="text-sm">Complete final project</span>
              </div>
              <div className={`flex items-center gap-2 ${progressionStatus.masteryLevel >= learningPath.graduationRequirements.masteryLevel ? 'text-green-600' : 'text-gray-600'}`}>
                {progressionStatus.masteryLevel >= learningPath.graduationRequirements.masteryLevel ? '✅' : '⭕'}
                <span className="text-sm">Achieve {learningPath.graduationRequirements.masteryLevel}% mastery</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-3">Next Steps</h3>
            <div className="space-y-2">
              {progressionStatus.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">•</span>
                  <span className="text-sm text-yellow-700">{step}</span>
                </div>
              ))}
            </div>
            {progressionStatus.estimatedTimeToGraduation > 0 && (
              <div className="mt-3 pt-3 border-t border-yellow-200">
                <div className="text-sm text-yellow-700">
                  <span className="font-medium">Estimated time to graduation:</span>
                  <br />
                  <span className="text-lg font-semibold">
                    {formatTime(progressionStatus.estimatedTimeToGraduation)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Graduation Button */}
          {progressionStatus.isReadyForGraduation && (
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 text-white text-center">
              <h3 className="font-semibold mb-2">🎉 Ready for Graduation!</h3>
              <p className="text-sm opacity-90 mb-3">
                You've completed all requirements with a score of {progressionStatus.graduationScore}%
              </p>
              <button
                onClick={onGraduation}
                className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🎓 Graduate Now
              </button>
            </div>
          )}

          {/* Current Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Current Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current Concept:</span>
                <span className="font-medium">
                  {progressionStatus.currentConcept === 'completed' 
                    ? 'All concepts completed' 
                    : progressionStatus.currentConcept.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Graduation Score:</span>
                <span className="font-medium">{progressionStatus.graduationScore}%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Time:</span>
                <span className="font-medium">{formatTime(totalTimeSpent)}</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-medium capitalize">{learningPath.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
