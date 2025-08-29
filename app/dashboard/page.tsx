import { prisma } from "@/lib/prisma"
import TrophyBadge from "@/components/TrophyBadge"

export default async function DashboardPage() {
  // In dev, we show trophies for the first user (or null); progress with userId null is also shown.
  const user = await prisma.user.findFirst()
  const userId = user?.id

  const [trophies, progress] = await Promise.all([
    prisma.trophy.findMany({ where: userId ? { userId } : undefined, orderBy: { earnedAt: "desc" } }),
    prisma.progress.findMany({
      where: userId ? { userId } : { userId: null },
      orderBy: { updatedAt: "desc" },
      take: 20,
      include: { course: { include: { level: { include: { language: true } } } }, exam: { include: { course: true } }, freestyle: { include: { level: { include: { language: true } } } } },
    }),
  ])

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="card p-6">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Track your learning, celebrate achievements, and pick up where you left off.
        </p>
      </div>

      {/* Trophies */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Trophies</h2>
        {trophies.length === 0 ? (
          <div className="text-sm text-gray-600">No trophies yet. Complete an exam or freestyle to earn one!</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trophies.map((t) => (
              <TrophyBadge key={t.id} title={t.title} description={t.description} />
            ))}
          </div>
        )}
      </div>

      {/* Recent progress */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Recent Progress</h2>
        {progress.length === 0 ? (
          <div className="text-sm text-gray-600">No progress yet. Start a course to see updates here.</div>
        ) : (
          <ul className="space-y-2">
            {progress.map((p) => {
              const when = new Date(p.updatedAt).toLocaleString()
              const status = p.completed ? "Completed" : "Started"
              let label = "Activity"
              if (p.course) {
                label = `Course: ${p.course.title} — ${p.course.level.language.name} (Level ${p.course.level.number})`
              } else if (p.exam) {
                label = `Exam for: ${p.exam.course.title}`
              } else if (p.freestyle) {
                label = `Freestyle: ${p.freestyle.level.language.name} (Level ${p.freestyle.level.number})`
              }
              return (
                <li key={p.id} className="card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium">{label}</div>
                      <div className="text-xs text-gray-600">{status} • {when}</div>
                    </div>
                    <span className={`badge ${p.completed ? "border-brand-700 text-brand-700" : "text-gray-700"}`}>
                      {p.completed ? "✓ Completed" : "In progress"}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
