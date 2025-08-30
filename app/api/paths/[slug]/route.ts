import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const path = await prisma.path.findUnique({
      where: { slug },
      include: {
        languages: {
          include: {
            language: {
              include: {
                lessons: {
                  select: {
                    id: true
                  }
                }
              }
            }
          },
          // Note: orderBy removed temporarily due to Prisma client issues
        }
      }
    })

    if (!path) {
      return NextResponse.json(
        { error: 'Path not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(path)
  } catch (error) {
    console.error('Error fetching path:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
