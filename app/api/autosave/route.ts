import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"

const prisma = new PrismaClient()

// GET: Retrieve auto-saved content for a lesson
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lessonId')
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    if (!lessonId) {
      return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 })
    }

    // Get auto-saved content from user preferences
    const userPrefs = await prisma.userPreferences.findUnique({
      where: { userId: session.user.id }
    })

    if (!userPrefs) {
      return NextResponse.json({ savedCode: null })
    }

    // For now, we'll store auto-saved content in localStorage on the client
    // In a production app, you might want to create a separate AutoSave model
    return NextResponse.json({ savedCode: null })
  } catch (error) {
    console.error("Auto-save GET error:", error)
    return NextResponse.json({ error: "Failed to retrieve auto-saved content" }, { status: 500 })
  }
}

// POST: Save auto-saved content for a lesson
export async function POST(request: NextRequest) {
  try {
    const { lessonId, code, language } = await request.json()
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    if (!lessonId || !code) {
      return NextResponse.json({ error: "Lesson ID and code are required" }, { status: 400 })
    }

    // For now, we'll use localStorage on the client side for auto-save
    // In a production app, you might want to create a separate AutoSave model
    // This endpoint can be used to sync with server when needed

    return NextResponse.json({ 
      success: true, 
      message: "Auto-save successful (client-side storage)" 
    })
  } catch (error) {
    console.error("Auto-save POST error:", error)
    return NextResponse.json({ error: "Failed to auto-save content" }, { status: 500 })
  }
}
