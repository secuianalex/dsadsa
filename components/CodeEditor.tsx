"use client"

import { useState } from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  language: string
  defaultValue?: string
  onChange?: (value: string | undefined) => void
}

export default function CodeEditor({ language, defaultValue = '', onChange }: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue)

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '')
    onChange?.(value)
  }

  // Map language slugs to Monaco Editor language IDs
  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'python':
        return 'python'
      case 'javascript':
      case 'js':
        return 'javascript'
      case 'typescript':
      case 'ts':
        return 'typescript'
      case 'html':
        return 'html'
      case 'css':
        return 'css'
      case 'java':
        return 'java'
      case 'c#':
      case 'csharp':
        return 'csharp'
      case 'c++':
      case 'cpp':
        return 'cpp'
      case 'vue':
        return 'vue'
      case 'react':
        return 'javascript'
      case 'angular':
        return 'typescript'
      case 'node.js':
      case 'nodejs':
        return 'javascript'
      case 'ansible':
        return 'yaml'
      default:
        return 'plaintext'
    }
  }

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage={getMonacoLanguage(language)}
        defaultValue={defaultValue}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
        }}
      />
    </div>
  )
}
