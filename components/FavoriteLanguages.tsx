"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import Link from 'next/link'

interface Language {
  slug: string
  name: string
  icon?: string
  lessonCount: number
}

interface FavoriteLanguagesProps {
  languages: Language[]
  isVisible: boolean
  onClose?: () => void
}

export default function FavoriteLanguages({ languages, isVisible, onClose }: FavoriteLanguagesProps) {
  const { data: session, status } = useSession()
  const { preferences, addFavoriteLanguage, removeFavoriteLanguage } = useUserPreferences()
  const [favoriteLanguages, setFavoriteLanguages] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (preferences?.favoriteLanguages) {
      setFavoriteLanguages(preferences.favoriteLanguages)
    }
  }, [preferences?.favoriteLanguages])

  const handleToggleFavorite = async (languageSlug: string) => {
    if (status === 'loading') return
    
    if (!session?.user?.email) {
      alert('Please sign in to manage favorite languages')
      return
    }

    try {
      if (favoriteLanguages.includes(languageSlug)) {
        await removeFavoriteLanguage(languageSlug)
        setFavoriteLanguages(prev => prev.filter(lang => lang !== languageSlug))
      } else {
        await addFavoriteLanguage(languageSlug)
        setFavoriteLanguages(prev => [...prev, languageSlug])
      }
    } catch (error) {
      console.error('Error updating favorite languages:', error)
      alert('Failed to update favorite languages')
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

  const getFavoriteLanguages = () => {
    return languages.filter(lang => favoriteLanguages.includes(lang.slug))
  }

  const getNonFavoriteLanguages = () => {
    return languages.filter(lang => !favoriteLanguages.includes(lang.slug))
  }

  if (!isVisible) return null

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">⭐</span>
          <span className="font-medium text-gray-700">Favorite Languages</span>
          {favoriteLanguages.length > 0 && (
            <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
              {favoriteLanguages.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {status === 'loading' ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : !session?.user ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">🔒</div>
            <p className="text-gray-600 mb-4">Sign in to manage your favorite languages</p>
            <Link
              href="/auth/signin"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <>
            {/* Favorite Languages */}
            {favoriteLanguages.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Your Favorites</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getFavoriteLanguages().map((language) => (
                    <div
                      key={language.slug}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getLanguageIcon(language.slug)}</span>
                        <div>
                          <div className="font-medium text-gray-900">{language.name}</div>
                          <div className="text-sm text-gray-600">{language.lessonCount} lessons</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`/languages/${language.slug}`}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          Learn
                        </a>
                        {isEditing && (
                          <button
                            onClick={() => handleToggleFavorite(language.slug)}
                            className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            title="Remove from favorites"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Languages */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                {favoriteLanguages.length > 0 ? 'Add More Languages' : 'Choose Your Favorites'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {getNonFavoriteLanguages().map((language) => (
                  <div
                    key={language.slug}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getLanguageIcon(language.slug)}</span>
                      <div>
                        <div className="font-medium text-gray-900">{language.name}</div>
                        <div className="text-sm text-gray-600">{language.lessonCount} lessons</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/languages/${language.slug}`}
                        className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleToggleFavorite(language.slug)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        title="Add to favorites"
                      >
                        ⭐
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access Bar */}
            {favoriteLanguages.length > 0 && (
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Quick Access</h4>
                <div className="flex flex-wrap gap-2">
                  {getFavoriteLanguages().map((language) => (
                    <a
                      key={language.slug}
                      href={`/languages/${language.slug}`}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
                    >
                      <span>{getLanguageIcon(language.slug)}</span>
                      <span>{language.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
