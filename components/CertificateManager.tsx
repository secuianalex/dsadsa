"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Certificate {
  id: string
  title: string
  description: string
  language: string
  issuedAt: string
  expiresAt?: string
  certificateUrl?: string
  isVerified: boolean
}

interface Language {
  slug: string
  name: string
  lessonCount: number
}

export default function CertificateManager() {
  const { data: session, status } = useSession()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [eligibilityData, setEligibilityData] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (session?.user?.email) {
      loadData()
    } else {
      setIsLoading(false)
    }
  }, [session, status])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [certificatesRes, languagesRes] = await Promise.all([
        fetch('/api/certifications'),
        fetch('/api/languages')
      ])

      if (certificatesRes.ok) {
        const { certificates } = await certificatesRes.json()
        setCertificates(certificates)
      }

      if (languagesRes.ok) {
        const { languages } = await languagesRes.json()
        setLanguages(languages)
      }
    } catch (error) {
      console.error('Error loading certificate data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const checkEligibility = async (languageSlug: string) => {
    try {
      const response = await fetch('/api/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ languageSlug })
      })

      const data = await response.json()
      setEligibilityData(data)
      setSelectedLanguage(languageSlug)
    } catch (error) {
      console.error('Error checking eligibility:', error)
    }
  }

  const generateCertificate = async () => {
    if (!selectedLanguage) return

    try {
      setIsGenerating(true)
      const response = await fetch('/api/certifications/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          languageSlug: selectedLanguage,
          courseName: `${selectedLanguage.toUpperCase()} Programming Course`
        })
      })

      if (response.ok) {
        const { html } = await response.json()
        setPreviewHtml(html)
        setShowPreview(true)
        await loadData() // Refresh certificates list
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to generate certificate')
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      setIsGenerating(false)
    }
  }

            const viewCertificate = (certificate: Certificate) => {
            window.open(`/api/certificates/${certificate.id}`, '_blank')
          }

          const downloadCertificate = (certificate: Certificate) => {
            const link = document.createElement('a')
            link.href = `/api/certificates/${certificate.id}`
            link.download = `${certificate.title}-Certificate.html`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }

  const printCertificate = () => {
    if (!previewHtml) return

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(previewHtml)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const getLanguageIcon = (slug: string) => {
    const icons: { [key: string]: string } = {
      javascript: '⚡',
      python: '🐍',
      java: '☕',
      csharp: '🔷',
      typescript: '📘',
      react: '⚛️',
      angular: '🅰️',
      vue: '💚',
      nodejs: '🟢',
      html: '🌐',
      css: '🎨',
      ansible: '🔧'
    }
    return icons[slug.toLowerCase()] || '💻'
  }

  if (status === 'loading') {
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
        <div className="p-8 text-center">
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
          <div className="text-gray-400 mb-4 text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificate Manager</h2>
          <p className="text-gray-600 mb-6">Sign in to manage your certificates</p>
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Certificate Manager</h1>
        <p className="text-purple-100">Earn and manage your professional certificates</p>
      </div>

      <div className="p-6">
        {!showPreview ? (
          /* Main Content */
          <div className="space-y-6">
            {/* Available Certificates */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Available Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((language) => {
                  const existingCert = certificates.find(c => c.language === language.slug)
                  return (
                    <div key={language.slug} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getLanguageIcon(language.slug)}</span>
                        <div>
                          <h3 className="font-semibold capitalize">{language.name}</h3>
                          <p className="text-sm text-gray-600">{language.lessonCount} lessons</p>
                        </div>
                      </div>
                      
                      {existingCert ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-600">
                            <span>✅</span>
                            <span className="text-sm font-medium">Certificate Earned</span>
                          </div>
                                                        <div className="flex gap-2">
                                <button
                                  onClick={() => viewCertificate(existingCert)}
                                  className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                                >
                                  👁️ View
                                </button>
                                <button
                                  onClick={() => downloadCertificate(existingCert)}
                                  className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                                >
                                  📥 Download
                                </button>
                              </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => checkEligibility(language.slug)}
                          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                        >
                          🎯 Check Eligibility
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Eligibility Check */}
            {eligibilityData && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold mb-4">Certificate Eligibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">{eligibilityData.completionPercentage}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">{eligibilityData.completedLessons}</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                </div>
                
                {eligibilityData.eligible ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <span>✅</span>
                      <span className="font-medium">You're eligible for a certificate!</span>
                    </div>
                    <button
                      onClick={generateCertificate}
                      disabled={isGenerating}
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {isGenerating ? 'Generating Certificate...' : '🎓 Generate Certificate'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-600">
                      <span>⚠️</span>
                      <span className="font-medium">You need {eligibilityData.required}% completion to earn a certificate</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Complete {eligibilityData.totalLessons - eligibilityData.completedLessons} more lessons to qualify.
                    </div>
                    <Link
                      href={`/languages/${selectedLanguage}`}
                      className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Continue Learning
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Earned Certificates */}
            {certificates.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Your Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{getLanguageIcon(certificate.language)}</span>
                        <div>
                          <h3 className="font-semibold">{certificate.title}</h3>
                          <p className="text-sm text-gray-600">
                            Issued: {new Date(certificate.issuedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-green-600">✅</span>
                        <span className="text-sm text-gray-600">Verified Certificate</span>
                      </div>
                                                    <div className="flex gap-2">
                                <button
                                  onClick={() => viewCertificate(certificate)}
                                  className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                                >
                                  👁️ View
                                </button>
                                <button
                                  onClick={() => downloadCertificate(certificate)}
                                  className="flex-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
                                >
                                  📥 Download
                                </button>
                              </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Certificate Preview */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Certificate Preview</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ← Back to Manager
                </button>
                <button
                  onClick={printCertificate}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  🖨️ Print Certificate
                </button>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Certificate Preview</span>
                  <span className="text-xs text-gray-500">Official LearnMe Certificate</span>
                </div>
              </div>
              <div className="bg-white">
                <iframe
                  srcDoc={previewHtml}
                  className="w-full h-[800px] border-0"
                  title="Certificate Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
