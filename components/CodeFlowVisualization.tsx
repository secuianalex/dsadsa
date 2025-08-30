"use client"

import { useState, useEffect } from 'react'

interface CodeStep {
  line: number
  code: string
  description: string
  variables: { [key: string]: any }
  output?: string
  error?: string
}

interface CodeFlowVisualizationProps {
  language: string
  code: string
  isVisible: boolean
  onStepComplete?: (step: CodeStep) => void
}

export default function CodeFlowVisualization({ language, code, isVisible, onStepComplete }: CodeFlowVisualizationProps) {
  const [steps, setSteps] = useState<CodeStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000) // milliseconds per step

  useEffect(() => {
    if (!isVisible || !code.trim()) return

    // Parse code into steps
    const parsedSteps = parseCodeIntoSteps(code, language)
    setSteps(parsedSteps)
    setCurrentStep(0)
  }, [code, language, isVisible])

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) {
      setIsPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
      if (onStepComplete && steps[currentStep]) {
        onStepComplete(steps[currentStep])
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, steps, speed, onStepComplete])

  const parseCodeIntoSteps = (code: string, language: string): CodeStep[] => {
    const lines = code.split('\n').filter(line => line.trim())
    const steps: CodeStep[] = []
    let variables: { [key: string]: any } = {}

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      let description = ''
      let output = ''
      let error = ''

      // Analyze line based on language
      if (language.toLowerCase() === 'javascript' || language.toLowerCase() === 'js') {
        if (trimmedLine.includes('console.log')) {
          const match = trimmedLine.match(/console\.log\((.+)\)/)
          if (match) {
            const expression = match[1]
            try {
              // Simple evaluation for demonstration
              const result = eval(expression)
              output = `Output: ${result}`
              description = `Logging: ${expression}`
            } catch (e) {
              error = `Error evaluating: ${expression}`
              description = `Failed to log: ${expression}`
            }
          }
        } else if (trimmedLine.includes('let ') || trimmedLine.includes('const ') || trimmedLine.includes('var ')) {
          const match = trimmedLine.match(/(let|const|var)\s+(\w+)\s*=\s*(.+)/)
          if (match) {
            const [, declaration, varName, value] = match
            try {
              const evaluatedValue = eval(value)
              variables[varName] = evaluatedValue
              description = `Declaring ${declaration} variable: ${varName} = ${evaluatedValue}`
            } catch (e) {
              error = `Error assigning value to ${varName}`
              description = `Failed to declare: ${varName}`
            }
          }
        } else if (trimmedLine.includes('function')) {
          description = 'Function definition'
        } else if (trimmedLine.includes('if') || trimmedLine.includes('for') || trimmedLine.includes('while')) {
          description = 'Control flow statement'
        } else if (trimmedLine.trim()) {
          description = 'Code execution'
        }
      } else if (language.toLowerCase() === 'python') {
        if (trimmedLine.includes('print(')) {
          const match = trimmedLine.match(/print\((.+)\)/)
          if (match) {
            const expression = match[1]
            try {
              // Simple Python-like evaluation
              const result = expression.replace(/['"]/g, '')
              output = `Output: ${result}`
              description = `Printing: ${expression}`
            } catch (e) {
              error = `Error printing: ${expression}`
              description = `Failed to print: ${expression}`
            }
          }
        } else if (trimmedLine.includes('=') && !trimmedLine.includes('==')) {
          const match = trimmedLine.match(/(\w+)\s*=\s*(.+)/)
          if (match) {
            const [, varName, value] = match
            try {
              const evaluatedValue = value.replace(/['"]/g, '')
              variables[varName] = evaluatedValue
              description = `Assigning variable: ${varName} = ${evaluatedValue}`
            } catch (e) {
              error = `Error assigning value to ${varName}`
              description = `Failed to assign: ${varName}`
            }
          }
        } else if (trimmedLine.includes('def ')) {
          description = 'Function definition'
        } else if (trimmedLine.includes('if ') || trimmedLine.includes('for ') || trimmedLine.includes('while ')) {
          description = 'Control flow statement'
        } else if (trimmedLine.trim()) {
          description = 'Code execution'
        }
      }

      steps.push({
        line: index + 1,
        code: line,
        description,
        variables: { ...variables },
        output,
        error
      })
    })

    return steps
  }

  const play = () => {
    setIsPlaying(true)
    setCurrentStep(0)
  }

  const pause = () => {
    setIsPlaying(false)
  }

  const reset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <span className="font-medium text-gray-700">Code Flow Visualization</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <button
            onClick={isPlaying ? pause : play}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button
            onClick={reset}
            className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            🔄 Reset
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            ⏮️ Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep >= steps.length - 1}
            className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            ⏭️ Next
          </button>
          
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-gray-600">Speed:</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value={500}>Fast</option>
              <option value={1000}>Normal</option>
              <option value={2000}>Slow</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step Display */}
      {steps[currentStep] && (
        <div className="p-4">
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Line {steps[currentStep].line}: {steps[currentStep].description}
            </h4>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              {steps[currentStep].code}
            </div>
          </div>

          {/* Variables State */}
          {Object.keys(steps[currentStep].variables).length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Variables:</h5>
              <div className="bg-blue-50 p-3 rounded">
                {Object.entries(steps[currentStep].variables).map(([name, value]) => (
                  <div key={name} className="text-sm">
                    <span className="font-mono text-blue-800">{name}</span>
                    <span className="text-gray-600"> = </span>
                    <span className="font-mono text-blue-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output */}
          {steps[currentStep].output && (
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Output:</h5>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm text-green-800 font-mono">{steps[currentStep].output}</div>
              </div>
            </div>
          )}

          {/* Error */}
          {steps[currentStep].error && (
            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Error:</h5>
              <div className="bg-red-50 p-3 rounded">
                <div className="text-sm text-red-800 font-mono">{steps[currentStep].error}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step List */}
      <div className="max-h-48 overflow-y-auto border-t border-gray-300">
        <div className="p-2">
          <h5 className="font-medium text-gray-900 mb-2">All Steps:</h5>
          <div className="space-y-1">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                  index === currentStep
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className="font-medium">
                  Line {step.line}: {step.description}
                </div>
                <div className="text-gray-600 font-mono truncate">
                  {step.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
