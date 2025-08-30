import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET: Fetch user's certificates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user ID from session or token
    const userId = (session as any).user?.id || (session as any).id

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 })
    }

    const certificates = await prisma.certification.findMany({
      where: { userId: userId },
      orderBy: { issuedAt: 'desc' }
    })

    return NextResponse.json({ certificates })
  } catch (error) {
    console.error('Certificates GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 })
  }
}

// POST: Check eligibility for new certificate
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user ID from session or token
    const userId = (session as any).user?.id || (session as any).id

    if (!userId) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 })
    }

    const { languageSlug } = await request.json()

    // Check if user already has a certificate for this language
    const existingCertificate = await prisma.certification.findFirst({
      where: {
        userId: userId,
        language: languageSlug
      }
    })

    if (existingCertificate) {
      return NextResponse.json({ 
        error: 'Certificate already exists for this language',
        existing: true,
        certificate: existingCertificate
      }, { status: 400 })
    }

    // Check completion rate
    const totalLessons = await prisma.lesson.count({
      where: {
        language: {
          slug: languageSlug
        }
      }
    })

    const completedLessons = await prisma.progress.count({
      where: {
        userId: userId,
        lesson: {
          language: {
            slug: languageSlug
          }
        }
      }
    })

    const completionPercentage = (completedLessons / totalLessons) * 100

    return NextResponse.json({
      eligible: completionPercentage >= 80,
      completionPercentage: Math.round(completionPercentage),
      required: 80,
      completedLessons,
      totalLessons
    })

  } catch (error) {
    console.error('Certificate eligibility check error:', error)
    return NextResponse.json({ error: 'Failed to check eligibility' }, { status: 500 })
  }
}
