"use client"

import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { useAutoSave } from '@/hooks/useAutoSave'
import { useUserPreferences } from '@/hooks/useUserPreferences'

interface CodeEditorProps {
  language: string
  lessonId: string
  defaultValue?: string
  onChange?: (value: string | undefined) => void
}

export default function CodeEditor({ language, lessonId, defaultValue = '', onChange }: CodeEditorProps) {
  const [code, setCode] = useState(defaultValue)
  const { preferences } = useUserPreferences()
  
  // Auto-save functionality
  const autoSave = useAutoSave({
    lessonId,
    language,
    delay: 2000,
    enabled: preferences?.autoSave ?? true
  })

  // Load saved content on mount
  useEffect(() => {
    const savedContent = autoSave.loadSavedContent()
    if (savedContent && savedContent !== defaultValue) {
      setCode(savedContent)
      onChange?.(savedContent)
    }
  }, [autoSave, defaultValue, onChange])

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || ''
    setCode(newCode)
    onChange?.(newCode)
    
    // Trigger auto-save
    autoSave.autoSave(newCode)
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

  const getEditorTheme = () => {
    return preferences?.preferences?.editorTheme || 'vs-dark'
  }

  const getEditorOptions = () => {
    const userPrefs = preferences?.preferences
    return {
      minimap: { enabled: userPrefs?.showMinimap ?? true },
      fontSize: userPrefs?.fontSize ?? 14,
      wordWrap: (userPrefs?.wordWrap ? 'on' : 'off') as 'on' | 'off',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line' as 'line',
      contextmenu: true,
      mouseWheelZoom: true,
      quickSuggestions: userPrefs?.enableAutoComplete ?? true,
      suggestOnTriggerCharacters: userPrefs?.enableAutoComplete ?? true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on' as 'on',
      snippetSuggestions: 'top' as 'top',
      wordBasedSuggestions: 'allDocuments' as 'allDocuments',
      parameterHints: {
        enabled: true
      },
      lineNumbers: userPrefs?.showLineNumbers ? 'on' : 'off' as 'on' | 'off',
      tabSize: userPrefs?.tabSize ?? 2,
      insertSpaces: true,
      detectIndentation: false,
    }
  }

  return (
    <div className="h-full relative">
      {/* Auto-save indicator */}
      {autoSave.hasUnsavedChanges && (
        <div className="absolute top-2 right-2 z-10 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
          Unsaved changes
        </div>
      )}
      
      {autoSave.isSaving && (
        <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white px-2 py-1 rounded text-xs">
          Saving...
        </div>
      )}

      <Editor
        height="100%"
        defaultLanguage={getMonacoLanguage(language)}
        defaultValue={code}
        onChange={handleEditorChange}
        theme={getEditorTheme()}
        options={getEditorOptions()}
      />
    </div>
  )
}
