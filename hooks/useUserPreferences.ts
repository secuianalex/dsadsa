"use client"

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface UserPreferences {
  id: string
  name: string
  email: string
  favoriteLanguages: string[]
  theme: 'light' | 'dark'
  autoSave: boolean
  showHints: boolean
  learningLevel: 'beginner' | 'intermediate' | 'advanced'
  preferredPace: 'slow' | 'normal' | 'fast'
  preferences?: {
    editorTheme: string
    fontSize: number
    tabSize: number
    wordWrap: boolean
    showLineNumbers: boolean
    showMinimap: boolean
    enableAutoComplete: boolean
    emailNotifications: boolean
    achievementNotifications: boolean
    progressReminders: boolean
  }
}

interface UseUserPreferencesReturn {
  preferences: UserPreferences | null
  loading: boolean
  error: string | null
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>
  addFavoriteLanguage: (languageSlug: string) => Promise<void>
  removeFavoriteLanguage: (languageSlug: string) => Promise<void>
  toggleTheme: () => Promise<void>
  toggleAutoSave: () => Promise<void>
  toggleHints: () => Promise<void>
}

export function useUserPreferences(): UseUserPreferencesReturn {
  const { data: session, status } = useSession()
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load user preferences
  const loadPreferences = useCallback(async () => {
    if (!session?.user?.id) {
      setPreferences(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/user/preferences')
      if (!response.ok) {
        throw new Error('Failed to load preferences')
      }

      const data = await response.json()
      setPreferences(data.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load preferences')
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  // Update preferences
  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    if (!session?.user?.id) return

    try {
      setError(null)

      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        throw new Error('Failed to update preferences')
      }

      const data = await response.json()
      setPreferences(data.user)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences')
      throw err
    }
  }, [session?.user?.id])

  // Add favorite language
  const addFavoriteLanguage = useCallback(async (languageSlug: string) => {
    if (!preferences) return

    const currentFavorites = preferences.favoriteLanguages || []
    if (!currentFavorites.includes(languageSlug)) {
      const newFavorites = [...currentFavorites, languageSlug]
      await updatePreferences({ favoriteLanguages: newFavorites })
    }
  }, [preferences, updatePreferences])

  // Remove favorite language
  const removeFavoriteLanguage = useCallback(async (languageSlug: string) => {
    if (!preferences) return

    const currentFavorites = preferences.favoriteLanguages || []
    const newFavorites = currentFavorites.filter(lang => lang !== languageSlug)
    await updatePreferences({ favoriteLanguages: newFavorites })
  }, [preferences, updatePreferences])

  // Toggle theme
  const toggleTheme = useCallback(async () => {
    if (!preferences) return

    const newTheme = preferences.theme === 'light' ? 'dark' : 'light'
    await updatePreferences({ theme: newTheme })
  }, [preferences, updatePreferences])

  // Toggle auto-save
  const toggleAutoSave = useCallback(async () => {
    if (!preferences) return

    await updatePreferences({ autoSave: !preferences.autoSave })
  }, [preferences, updatePreferences])

  // Toggle hints
  const toggleHints = useCallback(async () => {
    if (!preferences) return

    await updatePreferences({ showHints: !preferences.showHints })
  }, [preferences, updatePreferences])

  // Load preferences when session changes
  useEffect(() => {
    if (status === 'loading') return
    loadPreferences()
  }, [status, loadPreferences])

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    addFavoriteLanguage,
    removeFavoriteLanguage,
    toggleTheme,
    toggleAutoSave,
    toggleHints
  }
}
