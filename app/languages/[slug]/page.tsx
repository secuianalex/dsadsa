import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import LanguagePageClient from "@/components/LanguagePageClient"

export default async function LanguagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const language = await prisma.language.findUnique({
    where: { slug },
    include: {
      lessons: {
        orderBy: { number: "asc" },
        include: { exam: true }
      }
    }
  })

  if (!language) {
    notFound()
  }

  // Add description field if it doesn't exist in the database
  const languageWithDescription = {
    ...language,
    description: language.description || `Learn ${language.name} programming with our comprehensive course.`
  }

  return <LanguagePageClient language={languageWithDescription} />
}
