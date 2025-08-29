import { prisma } from "@/lib/prisma"
import PathsSearch from "@/components/PathsSearch"

export default async function PathsPage() {
  const paths = await prisma.path.findMany({
    include: {
      languages: {
        include: {
          language: true,
        },
      },
    },
    orderBy: {
      title: "asc",
    },
  })

  return (
    <section className="space-y-6">
      <header className="card p-6">
        <h1 className="section-title">Learning Paths</h1>
        <p className="subtle">
          Choose a learning path to focus on specific areas of programming. Each path includes carefully selected languages and technologies organized by domain. Use the search to find exactly what you're looking for.
        </p>
      </header>

      <PathsSearch paths={paths} />
    </section>
  )
}
