import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const FREESTYLE_PROMPTS: string[] = [
  "Build a text-based adventure game combining variables, loops, and functions.",
  "Create a mini dashboard that aggregates two different features you learned.",
  "Make a converter (e.g., units or currencies) with validation and history.",
  "Implement a small library and publish docs for it (README + examples).",
  "Scrape or fetch data, transform it, and visualize a simple summary."
]

export async function GET(_: Request, { params }: { params: { levelId: string } }) {
  const level = await prisma.level.findUnique({ where: { id: params.levelId }, include: { language: true } })
  if (!level) return NextResponse.json({ error: "Level not found" }, { status: 404 })

  const existing = await prisma.freestyle.findUnique({ where: { levelId: level.id } })
  const promptText = FREESTYLE_PROMPTS[(level.number + level.id.length) % FREESTYLE_PROMPTS.length]
  const freestyle = existing ?? await prisma.freestyle.create({
    data: { levelId: level.id, prompt: `[${level.language.name} - Level ${level.number}] ${promptText}` }
  })

  return NextResponse.json({ freestyle })
}
