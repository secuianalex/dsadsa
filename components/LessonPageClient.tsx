"use client"

import Link from "next/link"
import { useState } from "react"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"
import CodeEditor from "./CodeEditor"

interface TestResult {
  name: string
  description: string
  passed: boolean
  error?: string
  output?: string
  expectedOutput: string
}

interface VerificationResult {
  success: boolean
  results: TestResult[]
  passed: boolean
  totalTests: number
  passedTests: number
}

interface LessonPageClientProps {
  lesson: {
    id: string
    number: number
    title: string
    content: string
    exercise: string
    difficulty: string
    estimatedTime: number
    language: {
      slug: string
      name: string
    }
    testCases?: string
    solution?: string
    hints?: string
  }
}

export default function LessonPageClient({ lesson }: LessonPageClientProps) {
  const { locale } = useLocale()
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '')
    // Clear previous results when code changes
    if (verificationResult) {
      setVerificationResult(null)
    }
  }

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please write some code before submitting!')
      return
    }

    setIsSubmitting(true)
    setVerificationResult(null)

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          code: code,
          language: lesson.language.slug
        })
      })

      const result = await response.json()

      if (response.ok) {
        setVerificationResult(result)
        
        // If all tests passed, mark lesson as completed
        if (result.passed) {
          // TODO: Update lesson completion status in database
          console.log('Lesson completed!')
        }
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Verification error:', error)
      alert('An error occurred while verifying your code. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDefaultCode = () => {
    switch (lesson.language.slug.toLowerCase()) {
      case 'python':
        return '# Write your Python code here\n# Example:\nname = "Your Name"\nprint(f"Hello, {name}!")'
      case 'javascript':
      case 'js':
        return '// Write your JavaScript code here\n// Example:\nlet name = "Your Name";\nconsole.log(`Hello, ${name}!`);'
      case 'css':
        return '/* Write your CSS code here */\n/* Example: */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}'
      case 'html':
        return '<!DOCTYPE html>\n<html>\n<head>\n    <title>Your Page</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>'
      case 'java':
        return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
      case 'c#':
      case 'csharp':
        return 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}'
      default:
        return '// Write your code here'
    }
  }

  // Parse hints from JSON string
  const getHints = () => {
    if (!lesson.hints) return []
    try {
      return JSON.parse(lesson.hints)
    } catch {
      return []
    }
  }

  const hints = getHints()
  const hasHints = hints.length > 0
  const hasSolution = !!lesson.solution

  const nextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
  }

  const previousHint = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex(currentHintIndex - 1)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/languages/${lesson.language.slug}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← {t(locale, "common.backTo")} {lesson.language.name}
            </Link>
            <h1 className="text-2xl font-bold mt-2">
              {t(locale, "common.lesson")} {lesson.number}: {lesson.title}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {t(locale, "common.difficulty")}: {t(locale, `languages.${lesson.difficulty}`)}
            </div>
            <div className="text-sm text-gray-600">
              {t(locale, "common.estimatedTime")}: {lesson.estimatedTime} {t(locale, "common.minutes")}
            </div>
          </div>
        </div>
      </div>

      {/* Split Content */}
      <div className="flex-1 flex">
        {/* Left Side - Lesson Content */}
        <div className="w-1/2 border-r overflow-y-auto">
          <div className="p-6">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>
        </div>

        {/* Right Side - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Exercise Info */}
          <div className="flex-shrink-0 p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">{t(locale, "common.exercise")}</h3>
            <p className="text-sm text-gray-600 mb-3">{lesson.exercise}</p>
            
            {/* Help buttons */}
            <div className="flex gap-2">
              {hasHints && (
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  {showHints ? 'Hide Hints' : `Show Hints (${hints.length})`}
                </button>
              )}
              {hasSolution && (
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
              )}
            </div>

            {/* Hints Panel */}
            {showHints && hasHints && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-yellow-800">💡 Hint {currentHintIndex + 1} of {hints.length}</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={previousHint}
                      disabled={currentHintIndex === 0}
                      className="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded disabled:opacity-50"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextHint}
                      disabled={currentHintIndex === hints.length - 1}
                      className="px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                </div>
                <p className="text-sm text-yellow-700">{hints[currentHintIndex]}</p>
              </div>
            )}

            {/* Solution Panel */}
            {showSolution && hasSolution && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <h4 className="font-medium text-green-800 mb-2">✅ Solution</h4>
                <pre className="text-sm text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
                  <code>{lesson.solution}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Code Editor Area */}
          <div className="flex-1">
            <CodeEditor
              language={lesson.language.slug}
              defaultValue={getDefaultCode()}
              onChange={handleCodeChange}
            />
          </div>

          {/* Verification Results */}
          {verificationResult && (
            <div className="flex-shrink-0 p-4 border-t bg-gray-50">
              <div className="mb-3">
                <h4 className="font-semibold mb-2">Test Results</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded ${verificationResult.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {verificationResult.passedTests}/{verificationResult.totalTests} tests passed
                  </span>
                  {verificationResult.passed && (
                    <span className="text-green-600 font-semibold">✅ Lesson Completed!</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {verificationResult.results.map((result, index) => (
                  <div key={index} className={`p-2 rounded text-sm ${result.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-xs text-gray-600">{result.description}</div>
                    {!result.passed && result.error && (
                      <div className="text-red-600 text-xs mt-1">{result.error}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Info Bar */}
          <div className="flex-shrink-0 p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span>
                  <strong>{t(locale, "common.difficulty")}:</strong> {t(locale, `languages.${lesson.difficulty}`)}
                </span>
                <span className="ml-4">
                  <strong>{t(locale, "common.estimatedTime")}:</strong> {lesson.estimatedTime} {t(locale, "common.minutes")}
                </span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Verifying...' : 'Submit Code'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
