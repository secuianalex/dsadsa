"use client"

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Locale, locales, localeNames } from '@/lib/translations'

interface LanguageSelectorProps {
  currentLocale: Locale
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false)
    
    // Store the selected locale in localStorage
    localStorage.setItem('preferred-locale', locale)
    
    // For now, we'll just reload the page to apply the new locale
    // In a more sophisticated implementation, you'd update the URL or use a context
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
        style={{ color: 'var(--text-primary)' }}
      >
        <span className="text-sm font-medium">
          {localeNames[currentLocale]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  locale === currentLocale ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                style={{ color: 'var(--text-primary)' }}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
