import LanguageSearch from "@/components/LanguageSearch"
import { prisma } from "@/lib/prisma"

export default async function LanguagesPage() {
  // Fetch languages data
  const languages = await prisma.language.findMany({
    orderBy: { name: "asc" },
    include: {
      lessons: {
        orderBy: { number: "asc" },
        select: {
          id: true,
          number: true,
          title: true,
          difficulty: true,
          estimatedTime: true,
        },
      },
    },
  })

  // For now, we'll use an empty set for doneIds (completed lessons)
  // In a real app, this would come from user progress data
  const doneIds = new Set<string>()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Programming Languages
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore programming languages and technologies with comprehensive lessons from beginner to advanced.
        </p>
      </div>
      
      <LanguageSearch languages={languages} doneIds={doneIds} />
    </div>
  )
}
