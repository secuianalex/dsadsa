// app/page.tsx
import Image from "next/image"
import Link from "next/link"
import StatsBar from "@/components/Stats"
import AIChat from "@/components/AIChat"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const paths = await prisma.path.findMany({ 
    include: { 
      languages: {
        include: {
          language: true
        }
      } 
    } 
  })

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
          Learn programming by building real projects
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Master 80+ languages and technologies, unlock levels, complete projects, and earn
          trophies while you learn. Get personalized learning plans from our AI assistant.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/languages" className="btn btn-primary">
            Browse Languages
          </Link>
          <Link href="/paths" className="btn btn-ghost">
            Explore Learning Paths
          </Link>
        </div>
      </section>

      {/* AI Chat Assistant */}
      <section>
        <AIChat paths={paths} />
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Paths preview */}
      <section>
        <h2 className="section-title mb-6">Popular Learning Paths</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.slice(0, 6).map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.slug}`}
              className="card card-hover p-6"
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {path.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {path.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {path.languages.slice(0, 3).map((pl) => (
                  <span key={pl.language.slug} className="badge text-xs">
                    {pl.language.name}
                  </span>
                ))}
                {path.languages.length > 3 && (
                  <span className="badge text-xs">
                    +{path.languages.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/paths" className="btn btn-primary">
            View All Learning Paths
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="section-title mb-6 text-center">Why Choose LearnMe?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Personalized Learning
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Get custom learning plans from our AI assistant based on your goals and experience level.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Project-Based Learning
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Learn by building real projects, completing challenges, and earning trophies.
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              80+ Technologies
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              From web development to AI, mobile apps to game development - we cover it all.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
