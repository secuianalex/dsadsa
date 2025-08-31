"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import StatsBar from "@/components/Stats"
import AIChat from "@/components/AIChat"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

export default function HomePage() {
  const { locale } = useLocale()
  const { data: session } = useSession()

  return (
    <div className="space-y-8 md:space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 md:space-y-6 px-4">
        <div className="flex flex-col items-center">
          <Image
            src="/logo-wordmark.svg"
            alt="LearnMe"
            width={300}
            height={100}
            className="mx-auto w-48 md:w-auto"
          />
          <span className="text-sm font-semibold bg-blue-500 text-white px-2 py-1 rounded mt-2">
            DEV
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight px-4">
          {session?.user ? `Welcome back, ${session.user.name || session.user.email}!` : t(locale, "home.hero.title")}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm md:text-base">
          {session?.user ? "Ready to continue your learning journey? Check out your dashboard or explore new lessons." : t(locale, "home.hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 px-4">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary w-full sm:w-auto">
                📊 Go to Dashboard
              </Link>
              <Link href="/languages" className="btn btn-ghost w-full sm:w-auto">
                {t(locale, "home.hero.browseLanguages")}
              </Link>
            </>
          ) : (
            <>
              <Link href="/languages" className="btn btn-primary w-full sm:w-auto">
                {t(locale, "home.hero.browseLanguages")}
              </Link>
              <Link href="/paths" className="btn btn-ghost w-full sm:w-auto">
                {t(locale, "home.hero.explorePaths")}
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Quick Access for Logged-in Users */}
      {session?.user && (
        <section className="px-4">
          <h2 className="section-title mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Link href="/dashboard" className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-white text-lg md:text-xl">📊</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Dashboard</h3>
              <p className="text-xs md:text-sm text-gray-600">View your progress and stats</p>
            </Link>
            
            <Link href="/portfolio" className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-white text-lg md:text-xl">🎨</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Portfolio</h3>
              <p className="text-xs md:text-sm text-gray-600">Manage your projects and skills</p>
            </Link>
            
            <Link href="/resume" className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-white text-lg md:text-xl">📄</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Resume</h3>
              <p className="text-xs md:text-sm text-gray-600">Generate your professional resume</p>
            </Link>
            
            <Link href="/certificates" className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-white text-lg md:text-xl">🏆</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Certificates</h3>
              <p className="text-xs md:text-sm text-gray-600">Download your earned certificates</p>
            </Link>
          </div>
        </section>
      )}

      {/* AI Chat Assistant */}
      <section className="px-4">
        <AIChat paths={[]} />
      </section>

      {/* Stats */}
      <section className="px-4">
        <StatsBar />
      </section>

      {/* Paths preview */}
      <section className="px-4">
        <h2 className="section-title mb-6">{t(locale, "home.popularPaths.title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Paths will be loaded dynamically */}
        </div>
        <div className="text-center mt-6 md:mt-8">
          <Link href="/paths" className="btn btn-primary">
            {t(locale, "home.popularPaths.viewAll")}
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-4">
        <h2 className="section-title mb-6 text-center">{t(locale, "home.features.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="card p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-white text-lg md:text-xl">📚</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t(locale, "home.features.progressiveLessons.title")}
            </h3>
            <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
              {t(locale, "home.features.progressiveLessons.description")}
            </p>
          </div>
          
          <div className="card p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-white text-lg md:text-xl">🏆</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t(locale, "home.features.projectBased.title")}
            </h3>
            <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
              {t(locale, "home.features.projectBased.description")}
            </p>
          </div>
          
          <div className="card p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-white text-lg md:text-xl">🚀</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t(locale, "home.features.technologies.title")}
            </h3>
            <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
              {t(locale, "home.features.technologies.description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
