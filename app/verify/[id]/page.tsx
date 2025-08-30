"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface CertificateData {
  id: string
  title: string
  description: string
  language: string
  issuedAt: string
  expiresAt?: string
  userName: string
  isVerified: boolean
}

export default function CertificateVerificationPage() {
  const params = useParams()
  const certificateId = params.id as string
  const [certificate, setCertificate] = useState<CertificateData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (certificateId) {
      verifyCertificate()
    }
  }, [certificateId])

  const verifyCertificate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/certifications/verify/${certificateId}`)
      const data = await response.json()

      if (response.ok && data.valid) {
        setCertificate(data.certificate)
      } else {
        setError(data.error || 'Certificate not found')
      }
    } catch (error) {
      setError('Failed to verify certificate')
    } finally {
      setIsLoading(false)
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Certificate Verification Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Certificate ID: {certificateId}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold mb-2">Certificate Verified</h1>
            <p className="text-green-100">This certificate is authentic and verified by LearnMe Platform</p>
          </div>

          {/* Certificate Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certificate Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Certificate Details</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Certificate Title</label>
                    <p className="text-lg font-semibold text-gray-900">{certificate.title}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Recipient</label>
                    <p className="text-lg font-semibold text-gray-900">{certificate.userName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Programming Language</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getLanguageIcon(certificate.language)}</span>
                      <p className="text-lg font-semibold text-gray-900 capitalize">{certificate.language}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Issue Date</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(certificate.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {certificate.expiresAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Expiry Date</label>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(certificate.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Status */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Verification Status</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-green-600 text-2xl">✅</span>
                    <div>
                      <h3 className="font-semibold text-green-900">Certificate Verified</h3>
                      <p className="text-green-700">This certificate is authentic and has been verified by our system.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Certificate ID</h3>
                  <p className="font-mono text-blue-800 bg-blue-100 p-2 rounded">{certificateId}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{certificate.description}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  This certificate was issued by LearnMe Platform
                </p>
                <p className="text-sm text-gray-500">
                  For any questions about this certificate, please contact our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
