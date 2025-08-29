import { prisma } from "@/lib/prisma"
import LanguageSearch from "@/components/LanguageSearch"

// --- helpers ---------------------------------------------------------------

async function getLanguages() {
  return prisma.language.findMany({
    orderBy: { name: "asc" },
    include: {
      lessons: {
        orderBy: { number: "asc" },
      },
    },
  })
}

async function getCompletedLessonIdsForDevUser() {
  // For now we count progress for the "dev" user (userId = null).
  // Later we can switch this to an authenticated user id from session.
  const rows = await prisma.progress.findMany({
    where: { userId: null, completed: true, lessonId: { not: null } },
    select: { lessonId: true },
  })
  return new Set(rows.map((r) => r.lessonId!))
}

// --- page ------------------------------------------------------------------

export default async function LanguagesPage() {
  const [languages, doneIds] = await Promise.all([
    getLanguages(),
    getCompletedLessonIdsForDevUser(),
  ])

  return (
    <section className="space-y-6">
      <header className="card p-6">
        <h1 className="section-title">Browse Languages</h1>
        <p className="subtle">
          Pick a language and start learning. Your progress shows right on each card. Use the search and filters to find exactly what you're looking for.
        </p>
      </header>

      <LanguageSearch languages={languages} doneIds={doneIds} />
    </section>
  )
}
