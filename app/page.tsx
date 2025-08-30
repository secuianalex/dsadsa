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
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <Image
          src="/logo-wordmark.svg"
          alt="LearnMe"
          width={300}
          height={100}
          className="mx-auto"
        />
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          {session?.user ? `Welcome back, ${session.user.name || session.user.email}!` : t(locale, "home.hero.title")}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {session?.user ? "Ready to continue your learning journey? Check out your dashboard or explore new lessons." : t(locale, "home.hero.subtitle")}
        </p>
        <div className="flex justify-center gap-4 mt-6">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary">
                📊 Go to Dashboard
              </Link>
              <Link href="/languages" className="btn btn-ghost">
                {t(locale, "home.hero.browseLanguages")}
              </Link>
            </>
          ) : (
            <>
              <Link href="/languages" className="btn btn-primary">
                {t(locale, "home.hero.browseLanguages")}
              </Link>
              <Link href="/paths" className="btn btn-ghost">
                {t(locale, "home.hero.explorePaths")}
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Quick Access for Logged-in Users */}
      {session?.user && (
        <section>
          <h2 className="section-title mb-6 text-center">Quick Access</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/dashboard" className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-gray-600">View your progress and stats</p>
            </Link>
            
            <Link href="/portfolio" className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
              <p className="text-sm text-gray-600">Manage your projects and skills</p>
            </Link>
            
            <Link href="/resume" className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📄</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <p className="text-sm text-gray-600">Generate your professional resume</p>
            </Link>
            
            <Link href="/certificates" className="card p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Certificates</h3>
              <p className="text-sm text-gray-600">Download your earned certificates</p>
            </Link>
          </div>
        </section>
      )}

      {/* AI Chat Assistant */}
      <section>
        <AIChat paths={[]} />
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Paths preview */}
      <section>
        <h2 className="section-title mb-6">{t(locale, "home.popularPaths.title")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Paths will be loaded dynamically */}
        </div>
        <div className="text-center mt-8">
          <Link href="/paths" className="btn btn-primary">
            {t(locale, "home.popularPaths.viewAll")}
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="section-title mb-6 text-center">{t(locale, "home.features.title")}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t(locale, "home.features.progressiveLessons.title")}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t(locale, "home.features.progressiveLessons.description")}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t(locale, "home.features.projectBased.title")}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t(locale, "home.features.projectBased.description")}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t(locale, "home.features.technologies.title")}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t(locale, "home.features.technologies.description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
