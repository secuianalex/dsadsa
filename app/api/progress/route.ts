import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET: Get user progress for a specific lesson or all lessons
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lessonId')
    const userId = searchParams.get('userId') || 'anonymous' // For now, use anonymous

    if (lessonId) {
      // Get progress for specific lesson
      const progress = await prisma.progress.findFirst({
        where: {
          lessonId,
          userId
        }
      })

      return NextResponse.json({
        completed: progress?.completed || false,
        completedAt: progress?.completedAt || null
      })
    } else {
      // Get all progress for user
      const progress = await prisma.progress.findMany({
        where: { userId },
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              number: true,
              language: {
                select: {
                  slug: true,
                  name: true
                }
              }
            }
          }
        }
      })

      return NextResponse.json({ progress })
    }
  } catch (error) {
    console.error('Progress GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

// POST: Mark lesson as completed
export async function POST(request: NextRequest) {
  try {
    const { lessonId, userId = 'anonymous' } = await request.json()

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    // Check if progress already exists
    let progress = await prisma.progress.findFirst({
      where: {
        lessonId,
        userId
      }
    })

    if (progress) {
      // Update existing progress
      progress = await prisma.progress.update({
        where: { id: progress.id },
        data: {
          completed: true,
          completedAt: new Date()
        }
      })
    } else {
      // Create new progress
      progress = await prisma.progress.create({
        data: {
          lessonId,
          userId,
          completed: true,
          completedAt: new Date()
        }
      })
    }

    // Update lesson completion status
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { isCompleted: true }
    })

    return NextResponse.json({
      success: true,
      progress: {
        completed: progress.completed,
        completedAt: progress.completedAt
      }
    })
  } catch (error) {
    console.error('Progress POST error:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
