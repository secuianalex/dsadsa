"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'

interface AutoSaveOptions {
  lessonId: string
  language: string
  delay?: number // Auto-save delay in milliseconds
  enabled?: boolean
}

interface AutoSaveState {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
}

export function useAutoSave({ lessonId, language, delay = 2000, enabled = true }: AutoSaveOptions) {
  const { data: session } = useSession()
  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false
  })
  
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastCodeRef = useRef<string>('')

  // Generate localStorage key
  const getStorageKey = useCallback(() => {
    if (!session?.user?.id) return null
    return `autosave_${session.user.id}_${lessonId}`
  }, [session?.user?.id, lessonId])

  // Save to localStorage
  const saveToLocalStorage = useCallback((code: string) => {
    const key = getStorageKey()
    if (!key) return

    try {
      const data = {
        code,
        language,
        timestamp: new Date().toISOString(),
        lessonId
      }
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }, [getStorageKey, language, lessonId])

  // Load from localStorage
  const loadFromLocalStorage = useCallback(() => {
    const key = getStorageKey()
    if (!key) return null

    try {
      const saved = localStorage.getItem(key)
      if (saved) {
        const data = JSON.parse(saved)
        // Only return if it's for the same lesson and language
        if (data.lessonId === lessonId && data.language === language) {
          return data.code
        }
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
    return null
  }, [getStorageKey, lessonId, language])

  // Clear localStorage
  const clearLocalStorage = useCallback(() => {
    const key = getStorageKey()
    if (key) {
      localStorage.removeItem(key)
    }
  }, [getStorageKey])

  // Auto-save function
  const autoSave = useCallback(async (code: string) => {
    if (!enabled || !session?.user?.id || code === lastCodeRef.current) {
      return
    }

    setState(prev => ({ ...prev, isSaving: true }))

    try {
      // Save to localStorage immediately
      saveToLocalStorage(code)
      lastCodeRef.current = code

      // Try to sync with server (optional)
      try {
        await fetch('/api/autosave', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lessonId, code, language })
        })
      } catch (error) {
        console.warn('Server sync failed, but local save succeeded:', error)
      }

      setState(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: new Date(),
        hasUnsavedChanges: false
      }))
    } catch (error) {
      console.error('Auto-save failed:', error)
      setState(prev => ({ ...prev, isSaving: false }))
    }
  }, [enabled, session?.user?.id, lessonId, language, saveToLocalStorage])

  // Debounced auto-save
  const debouncedAutoSave = useCallback((code: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setState(prev => ({ ...prev, hasUnsavedChanges: true }))

    timeoutRef.current = setTimeout(() => {
      autoSave(code)
    }, delay)
  }, [autoSave, delay])

  // Load saved content on mount
  useEffect(() => {
    if (session?.user?.id) {
      const savedCode = loadFromLocalStorage()
      if (savedCode) {
        lastCodeRef.current = savedCode
        setState(prev => ({
          ...prev,
          lastSaved: new Date(),
          hasUnsavedChanges: false
        }))
      }
    }
  }, [session?.user?.id, loadFromLocalStorage])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    ...state,
    autoSave: debouncedAutoSave,
    loadSavedContent: loadFromLocalStorage,
    clearSavedContent: clearLocalStorage,
    forceSave: autoSave
  }
}
