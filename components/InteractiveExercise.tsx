"use client"

import { useState, useEffect } from "react"
import { 
  CodeExercise, 
  ExerciseResult, 
  executeCode,
  generateExercise 
} from "@/lib/exerciseSystem"

interface InteractiveExerciseProps {
  concept: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  onComplete: (result: ExerciseResult) => void
  onClose: () => void
}

export default function InteractiveExercise({
  concept,
  language,
  level,
  onComplete,
  onClose
}: InteractiveExerciseProps) {
  const [exercise, setExercise] = useState<CodeExercise | null>(null)
  const [userCode, setUserCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<ExerciseResult | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    // Generate exercise when component mounts
    const newExercise = generateExercise(concept, language, level)
    if (newExercise) {
      setExercise(newExercise)
      setUserCode(newExercise.starterCode || "")
    }

    // Start timer
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [concept, language, level])

  const handleRunCode = async () => {
    if (!exercise || !userCode.trim()) return

    setIsRunning(true)
    try {
      const exerciseResult = await executeCode(userCode, language, exercise.testCases)
      setResult(exerciseResult)
      
      if (exerciseResult.success) {
        onComplete(exerciseResult)
      }
    } catch (error) {
      console.error('Error running code:', error)
      setResult({
        success: false,
        score: 0,
        totalTests: 0,
        passedTests: 0,
        testResults: [],
        feedback: [`Error: ${error}`],
        timeSpent: timeSpent,
        attempts: 1
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleShowHint = () => {
    if (!exercise) return
    const nextHint = (currentHint + 1) % exercise.hints.length
    setCurrentHint(nextHint)
  }

  const handleShowSolution = () => {
    setShowSolution(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!exercise) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading exercise...</span>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{exercise.title}</h2>
            <p className="text-sm opacity-90">{exercise.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="opacity-75">Time:</span> {formatTime(timeSpent)}
            </div>
            <div className="text-sm">
              <span className="opacity-75">Points:</span> {exercise.points}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Left Column - Code Editor */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Your Code</h3>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your code here..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning || !userCode.trim()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                  Running...
                </>
              ) : (
                '▶ Run Code'
              )}
            </button>

            <button
              onClick={handleShowHint}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              💡 Hint ({currentHint + 1}/{exercise.hints.length})
            </button>

            <button
              onClick={handleShowSolution}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              🔍 Show Solution
            </button>
          </div>

          {/* Hints */}
          {exercise.hints.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-600 rounded-lg p-3">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Hint {currentHint + 1}:</h4>
              <p className="text-yellow-700 dark:text-yellow-300">{exercise.hints[currentHint]}</p>
            </div>
          )}

          {/* Solution */}
          {showSolution && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-600 rounded-lg p-3">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Solution:</h4>
              <pre className="bg-white dark:bg-gray-700 p-3 rounded border dark:border-gray-600 text-sm overflow-x-auto">
                <code className="text-gray-900 dark:text-white">{exercise.solution}</code>
              </pre>
              <p className="text-purple-700 dark:text-purple-300 mt-2 text-sm">Great job! Here's the solution.</p>
            </div>
          )}
        </div>

        {/* Right Column - Results and Tests */}
        <div className="space-y-4">
          {/* Expected Output */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Expected Output</h3>
            <div className="bg-gray-100 p-3 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">Check the test cases for expected output</pre>
            </div>
          </div>

          {/* Test Results */}
          {result && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Test Results</h3>
              <div className="space-y-2">
                {result.testResults.map((testResult) => (
                  <div
                    key={testResult.testCase.id}
                    className={`p-3 rounded-lg border ${
                      testResult.passed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {testResult.passed ? '✅' : '❌'} Test {testResult.testCase.id}
                      </span>
                      <span className={`text-sm ${testResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                        {testResult.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                    {!testResult.passed && (
                      <div className="mt-2 text-sm text-gray-600">
                        <div>Expected: <code className="bg-white px-1 rounded">{testResult.testCase.expectedOutput}</code></div>
                        <div>Got: <code className="bg-white px-1 rounded">{testResult.actualOutput}</code></div>
                        {testResult.error && (
                          <div className="text-red-600 mt-1">Error: {testResult.error}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {result && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Feedback</h3>
              <div className={`p-3 rounded-lg border ${
                result.success
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center mb-2">
                  <span className="font-semibold">
                    {result.success ? '🎉 Success!' : '❌ Needs Improvement'}
                  </span>
                  <span className="ml-auto text-sm">
                    Score: {result.score}/100
                  </span>
                </div>
                <div className="space-y-1">
                  {result.feedback.map((feedback, index) => (
                    <p key={index} className="text-sm">{feedback}</p>
                  ))}
                </div>
                {result.timeSpent > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Time spent: {result.timeSpent}s
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Exercise Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-semibold text-blue-800 mb-2">Exercise Info</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div><span className="font-medium">Concept:</span> {exercise.concept.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
              <div><span className="font-medium">Language:</span> {exercise.language.charAt(0).toUpperCase() + exercise.language.slice(1)}</div>
              <div><span className="font-medium">Level:</span> {exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1)}</div>
              <div><span className="font-medium">Difficulty:</span> {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}</div>
              <div><span className="font-medium">Estimated Time:</span> {exercise.estimatedTime} minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
