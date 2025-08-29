import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"

// --- helpers ---------------------------------------------------------------

async function getLanguages() {
  return prisma.language.findMany({
    orderBy: { name: "asc" },
    include: {
      levels: {
        orderBy: { number: "asc" },
        include: { courses: true, freestyle: true },
      },
    },
  })
}

async function getCompletedCourseIdsForDevUser() {
  // For now we count progress for the "dev" user (userId = null).
  // Later we can switch this to an authenticated user id from session.
  const rows = await prisma.progress.findMany({
    where: { userId: null, completed: true, courseId: { not: null } },
    select: { courseId: true },
  })
  return new Set(rows.map((r) => r.courseId!))
}

function computeCourseProgress(
  lang: Awaited<ReturnType<typeof getLanguages>>[number],
  doneIds: Set<string>
) {
  const allCourses = lang.levels.flatMap((l) => l.courses)
  const total = allCourses.length
  const completed = allCourses.filter((c) => doneIds.has(c.id)).length
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, pct }
}

// --- page ------------------------------------------------------------------

export default async function LanguagesPage() {
  const [languages, doneIds] = await Promise.all([
    getLanguages(),
    getCompletedCourseIdsForDevUser(),
  ])

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Browse Languages</h1>
      <p className="text-gray-600">
        Pick a language and start learning. Your progress shows right on each card.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((lang) => {
          const prog = computeCourseProgress(lang, doneIds)

          return (
            <div key={lang.id} className="card p-4 flex flex-col">
              {/* Header with logo + title + course count */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Real icon from /public/icons/{slug}.svg */}
                  <Image
                    src={`/icons/${lang.slug}.svg`}
                    alt={`${lang.name} logo`}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <h2 className="text-xl font-semibold">{lang.name}</h2>
                </div>
                <span className="badge">
                  {prog.completed}/{prog.total} courses
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-2 bg-brand-500"
                    style={{ width: `${prog.pct}%` }}
                    aria-label="progress"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-600">{prog.pct}% complete</div>
              </div>

              {/* Levels & course links */}
              <div className="space-y-2 text-sm flex-1 mt-3">
                {lang.levels.map((level) => (
                  <div key={level.id}>
                    <div className="font-medium">Level {level.number}</div>
                    <ul className="list-disc ml-5">
                      {level.courses.map((c) => (
                        <li key={c.id}>
                          <Link href={`/courses/${c.id}`} className="underline">
                            {c.title}
                          </Link>
                          {doneIds.has(c.id) && (
                            <span className="ml-2 badge border-brand-700 text-brand-700">✓</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {level.freestyle && (
                      <div className="mt-1">
                        <Link
                          className="btn btn-ghost text-xs"
                          href={`/levels/${level.id}/freestyle`}
                        >
                          Freestyle →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA to language detail (tabs) */}
              <Link
                href={`/languages/${lang.slug}`}
                className="btn btn-primary mt-4 text-center"
              >
                Start {lang.name}
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
