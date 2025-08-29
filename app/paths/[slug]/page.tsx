import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"

export default async function PathPage({ params }: { params: { slug: string } }) {
  const path = await prisma.path.findUnique({
    where: { slug: params.slug },
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
        <h1 className="text-2xl font-bold">Path not found</h1>
        <p className="text-gray-600">This path doesn’t exist. Go back to <Link href="/" className="underline">Home</Link>.</p>
      </section>
    )
  }

  const langs = path.languages.map(pl => pl.language)

  return (
    <section className="space-y-6">
      <header className="card p-6">
        <h1 className="text-3xl font-bold">{path.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{path.description}</p>
      </header>

      {/* Languages in this path */}
      <div className="grid gap-6 sm:grid-cols-2">
        {langs.map((lang) => (
          <div key={lang.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={`/icons/${lang.slug}.svg`}
                  alt={lang.name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <h2 className="text-lg font-semibold">{lang.name}</h2>
              </div>
              <Link href={`/languages/${lang.slug}`} className="btn btn-ghost text-sm">
                Open language →
              </Link>
            </div>

            {lang.levels.map((lvl) => (
              <div key={lvl.id} className="mt-3">
                <div className="font-medium">Level {lvl.number}</div>
                <ul className="list-disc ml-5">
                  {lvl.courses.map((c) => (
                    <li key={c.id}>
                      <Link href={`/courses/${c.id}`} className="underline">
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {lvl.freestyle && (
                  <div className="mt-1">
                    <Link className="btn btn-ghost text-xs" href={`/levels/${lvl.id}/freestyle`}>
                      Freestyle →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
