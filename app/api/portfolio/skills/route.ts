import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET: Fetch user's skills
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session as any).user?.id || (session as any).id
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 })
    }

    const skills = await prisma.skill.findMany({
      where: { userId: userId },
      orderBy: { proficiency: 'desc' }
    })

    return NextResponse.json({ skills })
  } catch (error) {
    console.error('Skills GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

// POST: Add a new skill
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session as any).user?.id || (session as any).id
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 })
    }

    const { name, category, proficiency, yearsOfExperience } = await request.json()

    if (!name || !category || !proficiency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (proficiency < 1 || proficiency > 5) {
      return NextResponse.json({ error: 'Proficiency must be between 1 and 5' }, { status: 400 })
    }

    const skill = await prisma.skill.create({
      data: {
        userId: userId,
        name,
        category,
        proficiency,
        yearsOfExperience
      }
    })

    return NextResponse.json({ skill })
  } catch (error) {
    console.error('Skills POST error:', error)
    return NextResponse.json({ error: 'Failed to add skill' }, { status: 500 })
  }
}
