import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// GET: Fetch user's projects
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const isPublic = searchParams.get('public') === 'true'
    
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
        ...(isPublic ? { isPublic: true } : {})
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Projects GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST: Create a new project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, technologies, githubUrl, liveUrl, imageUrl, isPublic } = await request.json()

    if (!title || !description || !technologies) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        title,
        description,
        technologies: JSON.stringify(technologies),
        githubUrl,
        liveUrl,
        imageUrl,
        isPublic: isPublic ?? true
      }
    })

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Projects POST error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
