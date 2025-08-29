import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Tabs } from "@/components/Tabs"

export default async function LanguageDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  // Fetch the language and all its levels + courses + freestyle projects
  const lang = await prisma.language.findUnique({
    where: { slug: params.slug },
    include: {
      levels: {
        orderBy: { number: "asc" },
        include: { courses: true, freestyle: true },
      },
    },
  })

  if (!lang) {
    return <div className="p-6">Language not found.</div>
  }

  const base = `/languages/${lang.slug}`

  return (
    <section className="space-y-6">
      {/* Header card */}
      <header className="card p-6">
        <h1 className="text-3xl font-bold">{lang.name}</h1>
        <p className="text-gray-600">Choose a level to start learning.</p>
      </header>

      {/* Tabs row */}
      <Tabs
        baseHref={base}
        items={[
          { href: "", label: "Levels" },
          { href: "/progress", label: "Progress" },
          { href: "/freestyle", label: "Freestyle" },
        ]}
      />

      {/* Levels list */}
      <div className="space-y-4">
        {lang.levels.map((level) => (
          <div key={level.id} className="card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Level {level.number}</h2>
              {level.freestyle && (
                <Link
                  className="btn btn-ghost text-sm"
                  href={`/levels/${level.id}/freestyle`}
                >
                  Freestyle →
                </Link>
              )}
            </div>

            {level.courses.length === 0 ? (
              <div className="text-sm text-gray-600 mt-2">No courses yet.</div>
            ) : (
              <ul className="list-disc ml-6 mt-2 space-y-1">
                {level.courses.map((c) => (
                  <li key={c.id}>
                    <Link href={`/courses/${c.id}`} className="underline">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
