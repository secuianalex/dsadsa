"use client"

import { useState, useEffect, useRef } from 'react'

interface LivePreviewProps {
  language: string
  code: string
  isVisible: boolean
}

export default function LivePreview({ language, code, isVisible }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewContent, setPreviewContent] = useState<string>('')

  useEffect(() => {
    if (!isVisible || !code.trim()) return

    const updatePreview = () => {
      if (!iframeRef.current) return

      let content = ''

      if (language.toLowerCase() === 'html') {
        // For HTML, use the code directly
        content = code
      } else if (language.toLowerCase() === 'css') {
        // For CSS, wrap in HTML structure
        content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview</title>
    <style>
        ${code}
    </style>
</head>
<body>
    <div class="preview-content">
        <h1>CSS Preview</h1>
        <p>This is a sample paragraph to demonstrate your CSS styles.</p>
        <button class="btn">Sample Button</button>
        <div class="card">
            <h2>Sample Card</h2>
            <p>This is a sample card element.</p>
        </div>
    </div>
</body>
</html>`
      }

      setPreviewContent(content)

      // Update iframe content
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      
      if (doc) {
        doc.open()
        doc.write(content)
        doc.close()
      }
    }

    // Debounce preview updates
    const timeoutId = setTimeout(updatePreview, 500)
    return () => clearTimeout(timeoutId)
  }, [code, language, isVisible])

  if (!isVisible) return null

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {language.toLowerCase() === 'html' ? '🌐' : '🎨'}
          </span>
          <span className="font-medium text-gray-700">
            {language.toLowerCase() === 'html' ? 'HTML Preview' : 'CSS Preview'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Live Preview
          </span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative">
        {!code.trim() ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <div className="text-2xl mb-2">
                {language.toLowerCase() === 'html' ? '🌐' : '🎨'}
              </div>
              <p>Start typing {language.toLowerCase()} to see live preview</p>
            </div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-64 border-0"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>

      {/* Code Info */}
      {code.trim() && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-300 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>
              {language.toUpperCase()} Preview • {code.length} characters
            </span>
            <span className="text-green-600">● Live</span>
          </div>
        </div>
      )}
    </div>
  )
}
