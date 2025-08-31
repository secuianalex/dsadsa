"use client"

import { useState, useEffect } from "react"
import { Project, validateProjectSubmission, calculateProjectScore } from "@/lib/projects"

interface ProjectWorkspaceProps {
  project: Project
  onComplete?: (score: number, feedback: string[]) => void
}

export default function ProjectWorkspace({ project, onComplete }: ProjectWorkspaceProps) {
  const [code, setCode] = useState(project.starterCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [validation, setValidation] = useState<{ isValid: boolean; feedback: string[] } | null>(null)

  const runCode = async () => {
    if (!code.trim()) return
    
    setIsRunning(true)
    setOutput("")
    
    try {
      // Simple code execution (enhanced for different languages)
      const result = await executeCode(code, project.language)
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const executeCode = async (code: string, language: string): Promise<string> => {
    // Enhanced code execution for different languages
    try {
      const logs: string[] = []
      const originalLog = console.log
      
      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '))
      }
      
      if (language === 'python') {
        // For Python, we'll simulate basic execution
        if (code.includes('print(')) {
          const printMatches = code.match(/print\(([^)]+)\)/g)
          if (printMatches) {
            printMatches.forEach(match => {
              const content = match.replace('print(', '').replace(')', '')
              logs.push(content)
            })
          }
        }
      } else {
        // For JavaScript/TypeScript
        const result = new Function(code)()
        if (result !== undefined) {
          logs.push(String(result))
        }
      }
      
      // Restore console.log
      console.log = originalLog
      
      return logs.join('\n') || 'Code executed successfully!'
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const validateSubmission = () => {
    const result = validateProjectSubmission(project, code)
    setValidation(result)
    return result.isValid
  }

  const handleSubmit = () => {
    if (validateSubmission()) {
      setSubmitted(true)
      const score = calculateProjectScore(project, {
        id: Date.now().toString(),
        projectId: project.id,
        userId: 'anonymous',
        code,
        submittedAt: new Date(),
        status: 'pending'
      })
      
      onComplete?.(score, validation?.feedback || [])
    }
  }

  const getNextHint = () => {
    if (currentHint < project.hints.length - 1) {
      setCurrentHint(currentHint + 1)
    }
  }

  const getPreviousHint = () => {
    if (currentHint > 0) {
      setCurrentHint(currentHint - 1)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-sm opacity-90">{project.language} • {project.level} • {project.difficulty}</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Estimated Time</div>
            <div className="text-lg font-bold">{project.estimatedTime} min</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Project Info and Requirements */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-600 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Project Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Requirements</h3>
            <ul className="space-y-2">
              {project.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-500 font-bold">{index + 1}.</span>
                  <span className="text-gray-700 dark:text-gray-300">{req}</span>
                </li>
              ))}
            </ul>

            {/* Hints Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">Hints</h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                >
                  {showHints ? 'Hide' : 'Show'} Hints
                </button>
              </div>
              
              {showHints && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-600 rounded-lg p-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Hint {currentHint + 1} of {project.hints.length}
                  </div>
                  <p className="text-sm text-gray-800 dark:text-white mb-3">
                    {project.hints[currentHint]}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={getPreviousHint}
                      disabled={currentHint === 0}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={getNextHint}
                      disabled={currentHint === project.hints.length - 1}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor and Output */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 dark:text-white">Code Editor</h3>
                <div className="flex gap-2">
                  <button
                    onClick={runCode}
                    disabled={!code.trim() || isRunning}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
                  >
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitted}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                  >
                    {submitted ? 'Submitted' : 'Submit Project'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder={`Write your ${project.language} code here...`}
                disabled={submitted}
              />
            </div>
          </div>

          {/* Output and Validation */}
          <div className="border-t border-gray-200">
            {output && (
              <div className="p-4 border-b bg-gray-50">
                <h4 className="font-semibold text-gray-800 mb-2">Output:</h4>
                <pre className="bg-white p-3 rounded border text-sm font-mono whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            )}

            {validation && (
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Validation:</h4>
                <div className={`p-3 rounded border ${validation.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="text-sm font-medium mb-2">
                    {validation.isValid ? '✅ Project is ready to submit!' : '❌ Please fix the following issues:'}
                  </div>
                  {validation.feedback.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {validation.feedback.map((feedback, index) => (
                        <li key={index} className="text-gray-700">• {feedback}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {submitted && (
              <div className="p-4 bg-green-50 border-t border-green-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎉</div>
                  <h4 className="font-semibold text-green-800 mb-2">Project Submitted Successfully!</h4>
                  <p className="text-sm text-green-700">
                    Great job! Your project has been submitted for review. Keep up the excellent work!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
