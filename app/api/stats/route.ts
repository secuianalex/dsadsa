import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function startOfToday() {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return now
}

export async function GET() {
  try {
    const [languages, courses, projectsTotal, projectsToday] = await Promise.all([
      prisma.language.count(),
      prisma.course.count(),
      prisma.progress.count({
        where: {
          completed: true,
          OR: [{ examId: { not: null } }, { freestyleId: { not: null } }],
        },
      }),
      prisma.progress.count({
        where: {
          completed: true,
          OR: [{ examId: { not: null } }, { freestyleId: { not: null } }],
          updatedAt: { gte: startOfToday() },
        },
      }),
    ])

    return NextResponse.json({ languages, courses, projectsTotal, projectsToday })
  } catch (e) {
    console.error("Stats API error:", e)
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 })
  }
}
