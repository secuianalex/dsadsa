import Image from "next/image"
import Link from "next/link"
import StatsBar from "@/components/Stats"
import AIChat from "@/components/AIChat"

export default function HomePage() {
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
          Master 80+ languages and technologies through progressive lessons, unlock achievements, complete projects, and earn trophies while you learn. Get personalized learning plans from our AI assistant.
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
        <AIChat paths={[]} />
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Paths preview */}
      <section>
        <h2 className="section-title mb-6">Popular Learning Paths</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Paths will be loaded dynamically */}
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
              <span className="text-white text-xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Progressive Lessons
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Learn step-by-step with carefully crafted lessons that build your skills from beginner to advanced.
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
              Learn by building real projects, completing challenges, and earning trophies for your achievements.
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
              From web development to AI, mobile apps to game development - we cover it all with comprehensive lessons.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
