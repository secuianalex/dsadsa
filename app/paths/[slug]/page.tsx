import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const path = await prisma.path.findUnique({
    where: { slug },
    include: {
      languages: {
        include: {
          language: {
            include: {
              levels: {
                orderBy: { number: "asc" },
                include: { courses: true, freestyle: true },
              },
            },
          },
        },
      },
    },
  })

  if (!path) {
    return (
      <section className="space-y-4">
        <h1 className="section-title">Path not found</h1>
        <p className="subtle">
          This path doesn't exist. Go back to <Link href="/paths" className="underline" style={{ color: 'var(--text-primary)' }}>Learning Paths</Link>.
        </p>
      </section>
    )
  }

  const langs = path.languages.map(pl => pl.language)

  return (
    <section className="space-y-6">
      <header className="card p-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/paths" className="btn btn-ghost text-sm">
            ← Back to Paths
          </Link>
        </div>
        <h1 className="section-title">{path.title}</h1>
        <p className="subtle">{path.description}</p>
      </header>

      {/* Languages in this path */}
      <div className="grid gap-6 sm:grid-cols-2">
        {langs.map((lang) => (
          <div key={lang.id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src={`/icons/${lang.slug}.svg`}
                  alt={lang.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {lang.name}
                </h2>
              </div>
              <Link href={`/languages/${lang.slug}`} className="btn btn-primary text-sm">
                Open language →
              </Link>
            </div>

            <div className="space-y-4">
              {lang.levels.map((lvl) => (
                <div key={lvl.id} className="space-y-2">
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    Level {lvl.number}
                  </div>
                  <div className="space-y-1">
                    {lvl.courses.map((c) => (
                      <div key={c.id} className="flex items-center justify-between p-2 rounded border" style={{
                        borderColor: 'var(--card-border)',
                        backgroundColor: 'var(--card-bg)'
                      }}>
                        <Link 
                          href={`/courses/${c.id}`} 
                          className="text-sm hover:underline"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {c.title}
                        </Link>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          Course
                        </span>
                      </div>
                    ))}
                    {lvl.freestyle && (
                      <div className="flex items-center justify-between p-2 rounded border" style={{
                        borderColor: 'var(--card-border)',
                        backgroundColor: 'var(--card-bg)'
                      }}>
                        <Link 
                          className="text-sm hover:underline"
                          href={`/levels/${lvl.id}/freestyle`}
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Freestyle Project
                        </Link>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          Project
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
