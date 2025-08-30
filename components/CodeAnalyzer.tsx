"use client"

import { useState, useEffect } from "react"
import { 
  CodeAnalysis, 
  analyzeCode, 
  createDebugSession, 
  addBreakpoint, 
  removeBreakpoint, 
  stepThrough,
  DebugSession 
} from "@/lib/codeAnalysis"

interface CodeAnalyzerProps {
  code: string
  language: string
  onAnalysisComplete?: (analysis: CodeAnalysis) => void
}

export default function CodeAnalyzer({ 
  code, 
  language, 
  onAnalysisComplete 
}: CodeAnalyzerProps) {
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null)
  const [debugSession, setDebugSession] = useState<DebugSession | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'syntax' | 'quality' | 'performance' | 'security' | 'debug'>('overview')
  const [showDebugger, setShowDebugger] = useState(false)

  useEffect(() => {
    if (code.trim()) {
      setIsAnalyzing(true)
      // Simulate analysis delay
      setTimeout(() => {
        const result = analyzeCode(code, language)
        setAnalysis(result)
        setIsAnalyzing(false)
        onAnalysisComplete?.(result)
      }, 1000)
    }
  }, [code, language, onAnalysisComplete])

  const handleStartDebug = () => {
    const session = createDebugSession(code, language)
    setDebugSession(session)
    setShowDebugger(true)
    setActiveTab('debug')
  }

  const handleAddBreakpoint = (line: number) => {
    if (debugSession) {
      const updatedSession = addBreakpoint(debugSession, line)
      setDebugSession(updatedSession)
    }
  }

  const handleRemoveBreakpoint = (breakpointId: string) => {
    if (debugSession) {
      const updatedSession = removeBreakpoint(debugSession, breakpointId)
      setDebugSession(updatedSession)
    }
  }

  const handleStepThrough = () => {
    if (debugSession) {
      const updatedSession = stepThrough(debugSession)
      setDebugSession(updatedSession)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
          <span className="text-gray-600">Analyzing code...</span>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>Enter code to analyze</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Code Analysis</h3>
          <p className="text-sm text-gray-500">
            {analysis.language} • {analysis.analysis.syntax.lineCount} lines • {analysis.analysis.syntax.characterCount} characters
          </p>
        </div>
        <button
          onClick={handleStartDebug}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          🐛 Start Debugger
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'syntax', label: 'Syntax', icon: '🔤' },
          { id: 'quality', label: 'Quality', icon: '⭐' },
          { id: 'performance', label: 'Performance', icon: '⚡' },
          { id: 'security', label: 'Security', icon: '🔒' },
          { id: 'debug', label: 'Debugger', icon: '🐛' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {analysis.analysis.syntax.isValid ? '✅' : '❌'}
                </div>
                <div className="text-sm font-medium text-green-800">Syntax</div>
                <div className="text-xs text-green-600">
                  {analysis.analysis.syntax.errors.length} errors, {analysis.analysis.syntax.warnings.length} warnings
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.quality.score)}`}>
                  {analysis.analysis.quality.score}
                </div>
                <div className="text-sm font-medium text-blue-800">Quality Score</div>
                <div className="text-xs text-blue-600">
                  {analysis.analysis.quality.issues.length} issues found
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.performance.score)}`}>
                  {analysis.analysis.performance.score}
                </div>
                <div className="text-sm font-medium text-yellow-800">Performance</div>
                <div className="text-xs text-yellow-600">
                  {analysis.analysis.performance.bottlenecks.length} bottlenecks
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className={`text-2xl font-bold ${getScoreColor(analysis.analysis.security.score)}`}>
                  {analysis.analysis.security.score}
                </div>
                <div className="text-sm font-medium text-red-800">Security</div>
                <div className="text-xs text-red-600">
                  {analysis.analysis.security.vulnerabilities.length} vulnerabilities
                </div>
              </div>
            </div>

            {/* Complexity Metrics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Complexity Metrics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {analysis.analysis.syntax.complexity.cyclomatic}
                  </div>
                  <div className="text-xs text-gray-600">Cyclomatic</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {analysis.analysis.syntax.complexity.cognitive}
                  </div>
                  <div className="text-xs text-gray-600">Cognitive</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {analysis.analysis.syntax.complexity.halstead}
                  </div>
                  <div className="text-xs text-gray-600">Halstead</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('syntax')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Syntax Details
              </button>
              <button
                onClick={() => setActiveTab('quality')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                View Quality Issues
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                View Security Issues
              </button>
            </div>
          </div>
        )}

        {activeTab === 'syntax' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Syntax Analysis</h4>
            
            {/* Errors */}
            {analysis.analysis.syntax.errors.length > 0 && (
              <div>
                <h5 className="font-medium text-red-600 mb-2">Errors ({analysis.analysis.syntax.errors.length})</h5>
                <div className="space-y-2">
                  {analysis.analysis.syntax.errors.map((error, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-red-800">
                            Line {error.line}:{error.column} - {error.message}
                          </div>
                          {error.suggestion && (
                            <div className="text-sm text-red-600 mt-1">
                              💡 {error.suggestion}
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(error.severity)}`}>
                          {error.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warnings */}
            {analysis.analysis.syntax.warnings.length > 0 && (
              <div>
                <h5 className="font-medium text-yellow-600 mb-2">Warnings ({analysis.analysis.syntax.warnings.length})</h5>
                <div className="space-y-2">
                  {analysis.analysis.syntax.warnings.map((warning, index) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-yellow-800">
                            Line {warning.line}:{warning.column} - {warning.message}
                          </div>
                          {warning.suggestion && (
                            <div className="text-sm text-yellow-600 mt-1">
                              💡 {warning.suggestion}
                            </div>
                          )}
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          {warning.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.analysis.syntax.errors.length === 0 && analysis.analysis.syntax.warnings.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-gray-600">No syntax issues found!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Code Quality Analysis</h4>
            
            {/* Quality Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">Overall Quality Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(analysis.analysis.quality.score)}`}>
                  {analysis.analysis.quality.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    analysis.analysis.quality.score >= 90 ? 'bg-green-500' :
                    analysis.analysis.quality.score >= 70 ? 'bg-yellow-500' :
                    analysis.analysis.quality.score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.analysis.quality.score}%` }}
                ></div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analysis.analysis.quality.metrics).map(([metric, score]) => (
                <div key={metric} className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-600 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                </div>
              ))}
            </div>

            {/* Issues */}
            {analysis.analysis.quality.issues.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Quality Issues</h5>
                <div className="space-y-2">
                  {analysis.analysis.quality.issues.map((issue, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-red-800">
                            {issue.type} - {issue.description}
                          </div>
                          <div className="text-sm text-red-600 mt-1">
                            💡 {issue.suggestion}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            {analysis.analysis.quality.strengths.length > 0 && (
              <div>
                <h5 className="font-medium text-green-600 mb-2">Strengths</h5>
                <div className="space-y-1">
                  {analysis.analysis.quality.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 text-green-700">
                      <span>✅</span>
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Performance Analysis</h4>
            
            {/* Performance Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">Performance Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(analysis.analysis.performance.score)}`}>
                  {analysis.analysis.performance.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    analysis.analysis.performance.score >= 90 ? 'bg-green-500' :
                    analysis.analysis.performance.score >= 70 ? 'bg-yellow-500' :
                    analysis.analysis.performance.score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.analysis.performance.score}%` }}
                ></div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-600">Time Complexity</div>
                <div className="text-lg font-bold text-gray-800">
                  {analysis.analysis.performance.metrics.timeComplexity}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-600">Space Complexity</div>
                <div className="text-lg font-bold text-gray-800">
                  {analysis.analysis.performance.metrics.spaceComplexity}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-600">Efficiency</div>
                <div className={`text-lg font-bold ${getScoreColor(analysis.analysis.performance.metrics.efficiency)}`}>
                  {analysis.analysis.performance.metrics.efficiency}%
                </div>
              </div>
            </div>

            {/* Bottlenecks */}
            {analysis.analysis.performance.bottlenecks.length > 0 && (
              <div>
                <h5 className="font-medium text-orange-600 mb-2">Performance Bottlenecks</h5>
                <div className="space-y-2">
                  {analysis.analysis.performance.bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-orange-800">
                            Line {bottleneck.line} - {bottleneck.description}
                          </div>
                          <div className="text-sm text-orange-600 mt-1">
                            💡 {bottleneck.suggestion}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(bottleneck.impact)}`}>
                          {bottleneck.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimizations */}
            {analysis.analysis.performance.optimizations.length > 0 && (
              <div>
                <h5 className="font-medium text-blue-600 mb-2">Optimization Suggestions</h5>
                <div className="space-y-2">
                  {analysis.analysis.performance.optimizations.map((optimization, index) => (
                    <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="font-medium text-blue-800 mb-1">
                        {optimization.type} - {optimization.description}
                      </div>
                      <div className="text-sm text-blue-600 mb-1">
                        Expected improvement: {optimization.expectedImprovement}
                      </div>
                      <div className="text-sm text-blue-700">
                        {optimization.implementation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Security Analysis</h4>
            
            {/* Security Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">Security Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(analysis.analysis.security.score)}`}>
                  {analysis.analysis.security.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    analysis.analysis.security.score >= 90 ? 'bg-green-500' :
                    analysis.analysis.security.score >= 70 ? 'bg-yellow-500' :
                    analysis.analysis.security.score >= 50 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.analysis.security.score}%` }}
                ></div>
              </div>
            </div>

            {/* Vulnerabilities */}
            {analysis.analysis.security.vulnerabilities.length > 0 && (
              <div>
                <h5 className="font-medium text-red-600 mb-2">Security Vulnerabilities</h5>
                <div className="space-y-2">
                  {analysis.analysis.security.vulnerabilities.map((vulnerability, index) => (
                    <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-red-800">
                            Line {vulnerability.line} - {vulnerability.type.toUpperCase()}
                          </div>
                          <div className="text-sm text-red-700 mt-1">
                            {vulnerability.description}
                          </div>
                          <div className="text-sm text-red-600 mt-1">
                            🔧 {vulnerability.fix}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vulnerability.severity)}`}>
                          {vulnerability.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            {analysis.analysis.security.bestPractices.length > 0 && (
              <div>
                <h5 className="font-medium text-green-600 mb-2">Security Best Practices</h5>
                <div className="space-y-2">
                  {analysis.analysis.security.bestPractices.map((practice, index) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="font-medium text-green-800 mb-1">
                        {practice.category} - {practice.description}
                      </div>
                      <div className="text-sm text-green-700">
                        {practice.implementation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysis.analysis.security.recommendations.length > 0 && (
              <div>
                <h5 className="font-medium text-blue-600 mb-2">General Recommendations</h5>
                <div className="space-y-1">
                  {analysis.analysis.security.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-center gap-2 text-blue-700">
                      <span>💡</span>
                      <span>{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'debug' && showDebugger && debugSession && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Debugger</h4>
            
            {/* Debug Controls */}
            <div className="flex gap-2">
              <button
                onClick={() => setDebugSession({ ...debugSession, isRunning: !debugSession.isRunning })}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {debugSession.isRunning ? '⏸️ Pause' : '▶️ Run'}
              </button>
              <button
                onClick={handleStepThrough}
                disabled={!debugSession.isRunning}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                ⏭️ Step
              </button>
              <button
                onClick={() => setDebugSession(createDebugSession(code, language))}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                🔄 Reset
              </button>
            </div>

            {/* Code with Line Numbers */}
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              {code.split('\n').map((line, index) => {
                const lineNumber = index + 1
                const isCurrentLine = debugSession.currentLine === lineNumber
                const hasBreakpoint = debugSession.breakpoints.some(bp => bp.line === lineNumber)
                
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      isCurrentLine ? 'bg-blue-900' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1 min-w-[60px]">
                      {hasBreakpoint && <span className="text-red-400">🔴</span>}
                      <span className="text-gray-500">{lineNumber.toString().padStart(2, ' ')}</span>
                    </div>
                    <div className="flex-1">
                      {line || ' '}
                    </div>
                    {!hasBreakpoint && (
                      <button
                        onClick={() => handleAddBreakpoint(lineNumber)}
                        className="text-gray-600 hover:text-red-400 ml-2"
                      >
                        ⚪
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Debug Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Variables */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">Variables</h5>
                {debugSession.variables.length > 0 ? (
                  <div className="space-y-1">
                    {debugSession.variables.map((variable, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{variable.name}</span>
                        <span className="text-gray-600"> = {JSON.stringify(variable.value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No variables in scope</p>
                )}
              </div>

              {/* Breakpoints */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">Breakpoints</h5>
                {debugSession.breakpoints.length > 0 ? (
                  <div className="space-y-1">
                    {debugSession.breakpoints.map((breakpoint) => (
                      <div key={breakpoint.id} className="flex items-center justify-between text-sm">
                        <span>Line {breakpoint.line}</span>
                        <button
                          onClick={() => handleRemoveBreakpoint(breakpoint.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No breakpoints set</p>
                )}
              </div>

              {/* Call Stack */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-800 mb-2">Call Stack</h5>
                {debugSession.callStack.length > 0 ? (
                  <div className="space-y-1">
                    {debugSession.callStack.map((frame, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{frame.function}</div>
                        <div className="text-gray-600">Line {frame.line}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Empty call stack</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
