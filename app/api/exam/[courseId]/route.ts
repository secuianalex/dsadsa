import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const EXAM_PROMPTS: string[] = [
  "Build a command-line calculator that supports +, -, *, / and parentheses.",
  "Create a TODO app that saves tasks to a file or database.",
  "Write a number guessing game with difficulty levels and score tracking.",
  "Parse a CSV file and output summary stats (min, max, average).",
  "Implement a tiny REST API with create/read/list endpoints."
]

export async function GET(_: Request, { params }: { params: { courseId: string } }) {
  const course = await prisma.course.findUnique({ where: { id: params.courseId }, include: { level: { include: { language: true } } } })
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 })

  // Ensure an Exam row exists with a placeholder prompt
  const existing = await prisma.exam.findUnique({ where: { courseId: course.id } })
  const promptText = EXAM_PROMPTS[(course.title.length + course.id.length) % EXAM_PROMPTS.length]
  const exam = existing ?? await prisma.exam.create({
    data: { courseId: course.id, prompt: `[${course.level.language.name} - ${course.title}] ${promptText}` }
  })

  return NextResponse.json({ exam })
}
