"use client"

import { useState, useRef, useEffect } from "react"
import { CodeExecutionResult } from "@/lib/openai"

interface CodeExecutorProps {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  initialCode?: string
  testCases?: Array<{
    input: string
    expectedOutput: string
    description: string
  }>
  onExecutionComplete?: (result: CodeExecutionResult) => void
  onCodeChange?: (code: string) => void
}

export default function CodeExecutor({
  language,
  level,
  initialCode = "",
  testCases = [],
  onExecutionComplete,
  onCodeChange
}: CodeExecutorProps) {
  const [code, setCode] = useState(initialCode)
  const [isExecuting, setIsExecuting] = useState(false)
  const [result, setResult] = useState<CodeExecutionResult | null>(null)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [fontSize, setFontSize] = useState(14)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [code])

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  // Execute code
  const executeCode = async () => {
    if (!code.trim()) {
      setResult({
        success: false,
        output: '',
        error: 'Please enter some code to execute',
        executionTime: 0,
        testResults: []
      })
      return
    }

    setIsExecuting(true)
    setResult(null)

    try {
      const response = await fetch('/api/dev', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          testCases
        })
      })

      const executionResult: CodeExecutionResult = await response.json()
      setResult(executionResult)
      onExecutionComplete?.(executionResult)
    } catch (error) {
      setResult({
        success: false,
        output: '',
        error: 'Failed to execute code. Please try again.',
        executionTime: 0,
        testResults: []
      })
    } finally {
      setIsExecuting(false)
    }
  }

  // Format code
  const formatCode = () => {
    // Basic code formatting (in a real implementation, you'd use a proper formatter)
    let formatted = code
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\s*{\s*/g, ' {\n  ') // Format opening braces
      .replace(/\s*}\s*/g, '\n}') // Format closing braces
      .replace(/\s*;\s*/g, ';\n  ') // Format semicolons
      .trim()

    setCode(formatted)
  }

  // Clear code
  const clearCode = () => {
    setCode('')
    setResult(null)
  }

  // Get syntax highlighting class
  const getLanguageClass = () => {
    const languageMap: { [key: string]: string } = {
      // Web Development
      javascript: 'js',
      typescript: 'typescript',
      angular: 'typescript',
      html: 'html',
      css: 'css',
      php: 'php',
      ruby: 'ruby',
      go: 'go',
      swift: 'swift',
      kotlin: 'kotlin',
      
      // General Purpose
      python: 'python',
      java: 'java',
      cpp: 'cpp',
      csharp: 'csharp',
      rust: 'rust',
      dart: 'dart',
      scala: 'scala',
      elixir: 'elixir',
      clojure: 'clojure',
      
      // Data Science & ML
      r: 'r',
      matlab: 'matlab',
      julia: 'julia',
      sql: 'sql',
      sas: 'sas',
      stata: 'stata',
      
      // Mobile Development
      'react-native': 'jsx',
      flutter: 'dart',
      
      // Game Development
      lua: 'lua',
      golang: 'go',
      
      // System Programming
      c: 'c',
      assembly: 'asm',
      
      // Functional Programming
      haskell: 'haskell',
      ocaml: 'ocaml',
      fsharp: 'fsharp',
      erlang: 'erlang',
      
      // Scripting
      bash: 'bash',
      powershell: 'powershell',
      perl: 'perl',
      groovy: 'groovy',
      
      // Enterprise
      cobol: 'cobol',
      fortran: 'fortran',
      pascal: 'pascal',
      ada: 'ada',
      
      // Modern & Emerging
      zig: 'zig',
      nim: 'nim',
      v: 'v',
      crystal: 'crystal',
      pony: 'pony'
    }
    return languageMap[language] || 'javascript'
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Code Editor
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
            {language.toUpperCase()}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
            {level}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Editor Settings */}
          <button
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Toggle line numbers"
          >
            {showLineNumbers ? '📊' : '📋'}
          </button>
          
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
          </select>
          
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="relative">
        {showLineNumbers && (
          <div 
            className="absolute left-0 top-0 bottom-0 w-12 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 font-mono p-2 select-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            {code.split('\n').map((_, index) => (
              <div key={index} className="text-right">
                {index + 1}
              </div>
            ))}
          </div>
        )}
        
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className={`w-full p-4 font-mono resize-none focus:outline-none ${
            showLineNumbers ? 'pl-16' : 'pl-4'
          } ${
            theme === 'dark' 
              ? 'bg-gray-900 text-gray-100' 
              : 'bg-white text-gray-900'
          }`}
          style={{ fontSize: `${fontSize}px` }}
          placeholder={`// Write your ${language} code here...
// Example:
function hello() {
    console.log("Hello, World!");
}`}
          rows={10}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={executeCode}
            disabled={isExecuting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Running...
              </>
            ) : (
              <>
                ▶️ Run Code
              </>
            )}
          </button>
          
          <button
            onClick={formatCode}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            🎨 Format
          </button>
          
          <button
            onClick={clearCode}
            className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800"
          >
            🗑️ Clear
          </button>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {code.length} characters
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Execution Results
            </h4>
            
            {/* Success/Error Status */}
            <div className={`p-3 rounded-lg mb-4 ${
              result.success 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {result.success ? '✅' : '❌'}
                <span className="font-medium">
                  {result.success ? 'Code executed successfully!' : 'Execution failed'}
                </span>
              </div>
              {result.error && (
                <p className="mt-2 text-sm">{result.error}</p>
              )}
            </div>

            {/* Output */}
            {result.output && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output:
                </h5>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto">
                  {result.output}
                </pre>
              </div>
            )}

            {/* Test Results */}
            {result.testResults && result.testResults.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Test Results:
                </h5>
                <div className="space-y-2">
                  {result.testResults.map((test, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        test.passed
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {test.passed ? '✅' : '❌'}
                        <span className="font-medium text-sm">
                          Test {index + 1}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <div>Expected: {test.expectedOutput}</div>
                        <div>Actual: {test.actualOutput}</div>
                        {test.error && <div className="text-red-600 dark:text-red-400">Error: {test.error}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Info */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Execution time: {result.executionTime}ms
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
