// app/page.tsx
import Image from "next/image"
import Link from "next/link"
import StatsBar from "@/components/Stats"
import { prisma } from "@/lib/prisma"

export default async function HomePage() {
  const paths = await prisma.path.findMany({ include: { languages: true } })

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
          Master 25 languages, unlock levels, complete projects, and earn
          trophies while you learn.
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

      {/* Stats */}
      <StatsBar />

      {/* Paths preview */}
      <section>
        <h2 className="section-title mb-6">Learning Paths</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path) => (
            <Link
              key={path.id}
              href={`/paths/${path.slug}`}
              className="card card-hover p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{path.name}</h3>
              <p className="text-sm text-gray-400">{path.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
