import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: certificateId } = await params

    // Find certificate by ID
    const certificate = await prisma.certification.findFirst({
      where: {
        certificateUrl: {
          contains: certificateId
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!certificate) {
      return NextResponse.json({ 
        error: 'Certificate not found',
        valid: false 
      }, { status: 404 })
    }

    // Check if certificate is verified
    if (!certificate.isVerified) {
      return NextResponse.json({ 
        error: 'Certificate is not verified',
        valid: false 
      }, { status: 400 })
    }

    // Return certificate details
    return NextResponse.json({
      valid: true,
      certificate: {
        id: certificate.id,
        title: certificate.title,
        description: certificate.description,
        language: certificate.language,
        issuedAt: certificate.issuedAt,
        expiresAt: certificate.expiresAt,
        userName: certificate.user.name || certificate.user.email,
        isVerified: certificate.isVerified
      }
    })

  } catch (error) {
    console.error('Certificate verification error:', error)
    return NextResponse.json({ 
      error: 'Failed to verify certificate',
      valid: false 
    }, { status: 500 })
  }
}
