// components/NavBar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useState } from "react"
import ThemeToggle from "@/components/ThemeToggle"
import UserMenu from "@/components/UserMenu"
import LanguageSelector from "@/components/LanguageSelector"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

export default function NavBar() {
  const { locale } = useLocale()
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const LINKS = [
    { href: "/languages", label: t(locale, "nav.languages") },
    { href: "/paths", label: t(locale, "nav.learningPaths") },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b" style={{
      borderColor: 'var(--card-border)',
      backgroundColor: 'var(--card-bg)'
    }}>
      <div className="mx-auto flex items-center justify-between w-full max-w-[72rem] px-4 md:px-6 lg:px-8 h-14">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
          <Image src="/logo-mark.svg" alt="LearnMe" width={28} height={28} />
          <span className="hidden sm:inline">LearnMe</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-400 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSelector currentLocale={locale} />
          <ThemeToggle />
          <UserMenu />
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            style={{ color: 'var(--text-primary)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
          <div className="px-4 py-2 space-y-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
