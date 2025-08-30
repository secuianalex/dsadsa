import { notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import LessonPageClient from "@/components/LessonPageClient"

// Create a new Prisma client instance to ensure it has the latest schema
const prisma = new PrismaClient()

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      language: true,
      exam: true
    }
  }) as any

  if (!lesson) {
    notFound()
  }

  // Debug logging
  console.log('🔍 Lesson Page Debug:', {
    title: lesson.title,
    hasTestCases: !!lesson.testCases,
    hasSolution: !!lesson.solution,
    hasHints: !!lesson.hints,
    testCasesLength: lesson.testCases?.length,
    solutionLength: lesson.solution?.length,
    hintsLength: lesson.hints?.length
  })

  return <LessonPageClient lesson={lesson} />
}
