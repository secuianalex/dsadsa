import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { type, id } = await request.json()

    // For now, we use userId = null for dev
    const userId = null

    if (type === "lesson") {
      // Upsert progress for lesson
      await prisma.progress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId: id,
          },
        },
        update: {
          completed: true,
          updatedAt: new Date(),
        },
        create: {
          userId,
          lessonId: id,
          completed: true,
        },
      })

      return NextResponse.json({ success: true })
    }

    if (type === "exam") {
      // Upsert progress for exam
      await prisma.progress.upsert({
        where: {
          userId_examId: {
            userId,
            examId: id,
          },
        },
        update: {
          completed: true,
          updatedAt: new Date(),
        },
        create: {
          userId,
          examId: id,
          completed: true,
        },
      })

      // Award trophy for completing exam
      const exam = await prisma.exam.findUnique({
        where: { id },
        include: { lesson: { include: { language: true } } }
      })

      if (exam) {
        await prisma.trophy.create({
          data: {
            userId,
            title: `${exam.lesson.language.name} Expert`,
            description: `Completed exam for ${exam.lesson.language.name} Lesson ${exam.lesson.number}`,
          },
        })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 })
  } catch (error) {
    console.error("Progress API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
