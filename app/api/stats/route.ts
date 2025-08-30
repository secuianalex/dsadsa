import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [languages, uniqueUsers, projectsTotal, projectsToday] = await Promise.all([
      prisma.language.count(),
      prisma.user.count(),
      prisma.progress.count({ where: { completed: true } }),
      prisma.progress.count({ 
        where: { 
          completed: true,
          updatedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        } 
      }),
    ])

    return NextResponse.json({
      languages,
      uniqueUsers,
      projectsTotal,
      projectsToday,
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
