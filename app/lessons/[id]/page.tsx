import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import LessonPageClient from "@/components/LessonPageClient"

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      language: true,
      exam: true
    }
  })

  if (!lesson) {
    notFound()
  }

  return <LessonPageClient lesson={lesson} />
}
