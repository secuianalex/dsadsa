"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    location?: string
    website?: string
    github?: string
    linkedin?: string
    bio?: string
  }
  education: any[]
  experience: any[]
  skills: any[]
  projects: any[]
  certifications: any[]
  achievements: any[]
}

export default function ResumeGenerator() {
  const { data: session, status } = useSession()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [options, setOptions] = useState({
    template: 'modern',
    includeProjects: true,
    includeCertifications: true,
    includeAchievements: true
  })

  const generateResume = async () => {
    try {
      setIsGenerating(true)
      const response = await fetch('/api/resume/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      })

      if (response.ok) {
        const { resumeData, html } = await response.json()
        setResumeData(resumeData)
        setPreviewHtml(html)
        setShowPreview(true)
      } else {
        console.error('Failed to generate resume')
      }
    } catch (error) {
      console.error('Error generating resume:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadResume = () => {
    if (!previewHtml) return

    const blob = new Blob([previewHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData?.personalInfo.name || 'resume'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const printResume = () => {
    if (!previewHtml) return

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(previewHtml)
      printWindow.document.close()
      printWindow.print()
    }
  }

  if (status === 'loading') {
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session?.user?.email) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-4 text-6xl">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Generator</h2>
          <p className="text-gray-600 mb-6">Sign in to generate your professional resume</p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In to Continue
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Resume Generator</h1>
        <p className="text-green-100">Create professional resumes from your learning data</p>
      </div>

      <div className="p-6">
        {!showPreview ? (
          /* Configuration Panel */
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Resume Configuration</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Style
                  </label>
                  <select
                    value={options.template}
                    onChange={(e) => setOptions({ ...options, template: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Include Sections
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={options.includeProjects}
                        onChange={(e) => setOptions({ ...options, includeProjects: e.target.checked })}
                        className="mr-2"
                      />
                      Projects
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={options.includeCertifications}
                        onChange={(e) => setOptions({ ...options, includeCertifications: e.target.checked })}
                        className="mr-2"
                      />
                      Certifications
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={options.includeAchievements}
                        onChange={(e) => setOptions({ ...options, includeAchievements: e.target.checked })}
                        className="mr-2"
                      />
                      Achievements
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={generateResume}
                  disabled={isGenerating}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isGenerating ? 'Generating Resume...' : 'Generate Resume'}
                </button>
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Your Data Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Skills</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600 mb-2">Add more data to your portfolio for a richer resume</p>
                <Link
                  href="/portfolio"
                  className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Go to Portfolio
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Panel */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Resume Preview</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Back to Configuration
                </button>
                <button
                  onClick={printResume}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  🖨️ Print
                </button>
                <button
                  onClick={downloadResume}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  📥 Download HTML
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Resume Preview</span>
                  <span className="text-xs text-gray-500">Generated from your learning data</span>
                </div>
              </div>
              <div className="bg-white">
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[800px] border-0"
                  title="Resume Preview"
                />
              </div>
            </div>

            {/* Resume Data Summary */}
            {resumeData && (
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Resume Content Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{resumeData.skills.length}</div>
                    <div className="text-sm text-gray-600">Skill Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{resumeData.projects.length}</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{resumeData.certifications.length}</div>
                    <div className="text-sm text-gray-600">Certifications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{resumeData.achievements.length}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
