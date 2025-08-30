"use client"

import { useState } from 'react'
import { analyzeError, getCommonMistakes, getLearningResources } from '@/lib/errorAnalysis'

interface ErrorExplanationProps {
  language: string
  code: string
  error: string
  onClose?: () => void
}

export default function ErrorExplanation({ language, code, error, onClose }: ErrorExplanationProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [showResources, setShowResources] = useState(false)

  const analysis = analyzeError({ language, code, error })
  const commonMistakes = getCommonMistakes(language)
  const learningResources = analysis ? getLearningResources(analysis.type, language) : []

  if (!analysis) return null

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🔵'
      default: return '⚪'
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getSeverityIcon(analysis.severity)}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{analysis.type}</h3>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(analysis.severity)}`}>
              {analysis.severity} severity
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Error Message */}
      <div className="p-4 border-b border-gray-200">
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <div className="text-sm font-medium text-red-800 mb-1">Error Message:</div>
          <div className="text-sm text-red-700 font-mono">{error}</div>
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">What's happening?</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{analysis.explanation}</p>
      </div>

      {/* Suggestions */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">How to fix it:</h4>
        <ul className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="text-sm text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Examples */}
      {analysis.examples.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span>{showExamples ? '▼' : '▶'}</span>
            Show Examples ({analysis.examples.length})
          </button>
          
          {showExamples && (
            <div className="mt-3 space-y-3">
              {analysis.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono">{example}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Concepts */}
      {analysis.relatedConcepts.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Related Concepts:</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.relatedConcepts.map((concept, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Learning Resources */}
      {learningResources.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowResources(!showResources)}
            className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span>{showResources ? '▼' : '▶'}</span>
            Learning Resources ({learningResources.length})
          </button>
          
          {showResources && (
            <div className="mt-3 space-y-2">
              {learningResources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                  <span>📚</span>
                  <span>{resource}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Common Mistakes */}
      {commonMistakes.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span>{showDetails ? '▼' : '▶'}</span>
            Common {language} Mistakes ({commonMistakes.length})
          </button>
          
          {showDetails && (
            <div className="mt-3 space-y-4">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <h5 className="font-medium text-yellow-800 mb-2">{mistake.type}</h5>
                  <p className="text-sm text-yellow-700 mb-2">{mistake.explanation}</p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    {mistake.suggestions.map((suggestion, sIndex) => (
                      <li key={sIndex} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 bg-gray-50">
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Copy error message to clipboard
              navigator.clipboard.writeText(error)
            }}
            className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Copy Error
          </button>
          <button
            onClick={() => {
              // Copy code to clipboard
              navigator.clipboard.writeText(code)
            }}
            className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Copy Code
          </button>
          <div className="flex-1"></div>
          <button
            onClick={() => {
              // Mark as understood
              console.log('Error marked as understood')
            }}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
