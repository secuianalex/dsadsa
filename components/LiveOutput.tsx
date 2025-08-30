"use client"

import { useState, useEffect } from 'react'
import ErrorExplanation from './ErrorExplanation'

interface ExecutionResult {
  success: boolean
  output: string
  error: string | null
  executionTime: number
  memoryUsage?: number
}

interface LiveOutputProps {
  language: string
  code: string
  isExecuting: boolean
  onExecutionComplete: (result: ExecutionResult) => void
}

export default function LiveOutput({ language, code, isExecuting, onExecutionComplete }: LiveOutputProps) {
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [executionTime, setExecutionTime] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showErrorExplanation, setShowErrorExplanation] = useState(false)

  // Execute code when it changes (with debounce)
  useEffect(() => {
    if (!code.trim() || !isExecuting) return

    const timeoutId = setTimeout(async () => {
      await executeCode()
    }, 1000) // 1 second debounce

    return () => clearTimeout(timeoutId)
  }, [code, isExecuting])

  const executeCode = async () => {
    if (!code.trim()) return

    setIsLoading(true)
    setError(null)
    setOutput('')

    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code.trim(),
          language: language
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const result = data.result
        setOutput(result.output)
        setError(result.error)
        setExecutionTime(result.executionTime)
        onExecutionComplete(result)
      } else {
        setError(data.error || 'Execution failed')
        onExecutionComplete({
          success: false,
          output: '',
          error: data.error || 'Execution failed',
          executionTime: 0
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error'
      setError(errorMessage)
      onExecutionComplete({
        success: false,
        output: '',
        error: errorMessage,
        executionTime: 0
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearOutput = () => {
    setOutput('')
    setError(null)
    setExecutionTime(0)
  }

  const getLanguageIcon = () => {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        return '⚡'
      case 'python':
        return '🐍'
      case 'html':
        return '🌐'
      case 'css':
        return '🎨'
      default:
        return '💻'
    }
  }

  return (
    <div className="bg-gray-900 text-green-400 font-mono text-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span>{getLanguageIcon()}</span>
          <span className="font-medium">Live Output</span>
          {isLoading && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Executing...</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {executionTime > 0 && (
            <span className="text-xs text-gray-400">
              {executionTime}ms
            </span>
          )}
          <button
            onClick={clearOutput}
            className="text-gray-400 hover:text-white transition-colors"
            title="Clear output"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Output Area */}
      <div className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
        {isLoading && !output && !error && (
          <div className="text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Executing code...</span>
            </div>
          </div>
        )}

        {!isLoading && !output && !error && (
          <div className="text-gray-500">
            <div className="flex items-center gap-2">
              <span>💡</span>
              <span>Start typing to see live output</span>
            </div>
          </div>
        )}

        {output && (
          <div className="space-y-1">
            {output.split('\n').map((line, index) => (
              <div key={index} className="text-green-400">
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-2 p-2 bg-red-900/20 border border-red-700 rounded">
            <div className="flex items-center justify-between mb-1">
              <div className="text-red-400 font-medium">❌ Error:</div>
              <button
                onClick={() => setShowErrorExplanation(!showErrorExplanation)}
                className="text-red-300 hover:text-red-100 text-xs underline"
              >
                {showErrorExplanation ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            <div className="text-red-300 text-xs whitespace-pre-wrap">
              {error}
            </div>
            
            {/* Error Explanation */}
            {showErrorExplanation && (
              <div className="mt-3">
                <ErrorExplanation
                  language={language}
                  code={code}
                  error={error}
                  onClose={() => setShowErrorExplanation(false)}
                />
              </div>
            )}
          </div>
        )}

        {executionTime > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            Execution completed in {executionTime}ms
          </div>
        )}
      </div>
    </div>
  )
}
