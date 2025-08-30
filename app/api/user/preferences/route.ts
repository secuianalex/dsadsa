import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"

const prisma = new PrismaClient()

// GET: Retrieve user preferences
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { userPreferences: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        favoriteLanguages: user.favoriteLanguages ? JSON.parse(user.favoriteLanguages) : [],
        theme: user.theme,
        autoSave: user.autoSave,
        showHints: user.showHints,
        learningLevel: user.learningLevel,
        preferredPace: user.preferredPace,
        preferences: user.userPreferences
      }
    })
  } catch (error) {
    console.error("User preferences GET error:", error)
    return NextResponse.json({ error: "Failed to retrieve user preferences" }, { status: 500 })
  }
}

// PUT: Update user preferences
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const {
      favoriteLanguages,
      theme,
      autoSave,
      showHints,
      learningLevel,
      preferredPace,
      preferences
    } = body

    // Update user preferences
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(favoriteLanguages && { favoriteLanguages: JSON.stringify(favoriteLanguages) }),
        ...(theme && { theme }),
        ...(autoSave !== undefined && { autoSave }),
        ...(showHints !== undefined && { showHints }),
        ...(learningLevel && { learningLevel }),
        ...(preferredPace && { preferredPace }),
        updatedAt: new Date()
      }
    })

    // Update detailed preferences if provided
    if (preferences) {
      await prisma.userPreferences.upsert({
        where: { userId: session.user.id },
        update: preferences,
        create: {
          userId: session.user.id,
          ...preferences
        }
      })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        favoriteLanguages: updatedUser.favoriteLanguages ? JSON.parse(updatedUser.favoriteLanguages) : [],
        theme: updatedUser.theme,
        autoSave: updatedUser.autoSave,
        showHints: updatedUser.showHints,
        learningLevel: updatedUser.learningLevel,
        preferredPace: updatedUser.preferredPace
      }
    })
  } catch (error) {
    console.error("User preferences PUT error:", error)
    return NextResponse.json({ error: "Failed to update user preferences" }, { status: 500 })
  }
}
