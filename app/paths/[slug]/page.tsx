import { notFound } from "next/navigation"
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
              lessons: {
                orderBy: { number: "asc" },
                take: 3 // Show first 3 lessons
              }
            }
          }
        }
      }
    }
  })

  if (!path) notFound()

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="card p-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {path.title}
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
          {path.description}
        </p>
      </header>

      {/* Languages in this path */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Languages in this Path
        </h2>
        
        <div className="grid gap-6">
          {path.languages.map((pl) => (
            <div key={pl.language.id} className="card p-6">
              <div className="flex items-start gap-4">
                <Image
                  src={`/icons/${pl.language.slug}.svg`}
                  alt={pl.language.name}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {pl.language.name}
                    </h3>
                    <Link 
                      href={`/languages/${pl.language.slug}`}
                      className="btn btn-primary"
                    >
                      Start Learning
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {pl.language.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 rounded border" style={{
                        borderColor: 'var(--card-border)',
                        backgroundColor: 'var(--card-bg)'
                      }}>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold">
                            {lesson.number}
                          </span>
                          <div>
                            <Link 
                              href={`/lessons/${lesson.id}`} 
                              className="text-sm font-medium hover:underline"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {lesson.title}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                              }`}>
                                {lesson.difficulty}
                              </span>
                              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                ⏱️ {lesson.estimatedTime} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          Lesson
                        </span>
                      </div>
                    ))}
                    
                    {pl.language.lessons.length > 3 && (
                      <div className="text-center py-2">
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          +{pl.language.lessons.length - 3} more lessons
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/languages" className="btn btn-primary">
          Browse All Languages
        </Link>
      </div>
    </section>
  )
}
