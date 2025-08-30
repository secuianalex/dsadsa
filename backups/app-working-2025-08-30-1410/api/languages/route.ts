import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const data = await prisma.language.findMany({
    orderBy: { name: "asc" },
    include: {
      lessons: {
        orderBy: { number: "asc" },
        include: { exam: true },
      },
    },
  })
  return NextResponse.json(data)
}
