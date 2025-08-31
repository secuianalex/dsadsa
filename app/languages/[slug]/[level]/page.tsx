import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import LevelLearningPage from "@/components/LevelLearningPage"

export default async function LanguageLevelPage({ 
  params 
}: { 
  params: Promise<{ slug: string; level: string }> 
}) {
  const { slug, level } = await params

  // Validate level
  const validLevels = ['beginner', 'intermediate', 'advanced']
  if (!validLevels.includes(level)) {
    notFound()
  }

  const language = await prisma.language.findUnique({
    where: { slug },
    include: {
      lessons: {
        where: { difficulty: level },
        orderBy: { number: "asc" },
        include: { exam: true }
      }
    }
  })

  if (!language) {
    notFound()
  }

  // Ensure description is a string
  const languageWithDescription = {
    ...language,
    description: language.description || `Learn ${language.name} programming`
  }

  return (
    <LevelLearningPage 
      language={languageWithDescription} 
      level={level as 'beginner' | 'intermediate' | 'advanced'} 
    />
  )
}
