import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { kind, id } = await request.json() as { kind: "course"|"exam"|"freestyle"; id: string }
    if (!kind || !id) return NextResponse.json({ error: "kind and id are required" }, { status: 400 })

    let progress
    if (kind === "course") {
      const existing = await prisma.progress.findFirst({ where: { courseId: id, userId: null } })
      progress = existing
        ? await prisma.progress.update({ where: { id: existing.id }, data: { completed: true } })
        : await prisma.progress.create({ data: { courseId: id, userId: null, completed: true } })
    } else if (kind === "exam") {
      const existing = await prisma.progress.findFirst({ where: { examId: id, userId: null } })
      progress = existing
        ? await prisma.progress.update({ where: { id: existing.id }, data: { completed: true } })
        : await prisma.progress.create({ data: { examId: id, userId: null, completed: true } })
      // award a trophy
      await prisma.trophy.create({ data: { userId: (await getOrCreateDevUserId()), title: "Exam Conqueror", description: "Completed an exam project" } })
    } else {
      const existing = await prisma.progress.findFirst({ where: { freestyleId: id, userId: null } })
      progress = existing
        ? await prisma.progress.update({ where: { id: existing.id }, data: { completed: true } })
        : await prisma.progress.create({ data: { freestyleId: id, userId: null, completed: true } })
      await prisma.trophy.create({ data: { userId: (await getOrCreateDevUserId()), title: "Freestyler", description: "Completed a freestyle project" } })
    }

    return NextResponse.json({ ok: true, progress })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}

async function getOrCreateDevUserId(): Promise<string> {
  // associate trophies with a dev user (first user or a placeholder)
  const one = await prisma.user.findFirst()
  if (one) return one.id
  const u = await prisma.user.create({ data: { email: "dev@example.com", name: "dev" } })
  return u.id
}
