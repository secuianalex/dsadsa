import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const data = await prisma.language.findMany({
    orderBy: { name: "asc" },
    include: {
      levels: {
        orderBy: { number: "asc" },
        include: { courses: true, freestyle: true },
      },
    },
  })
  return NextResponse.json(data)
}
