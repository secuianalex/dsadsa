import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { generateSmartHints, getLearningPathSuggestions, getPersonalizedRecommendations } from "@/lib/smartHints"

// GET: Retrieve smart hints for a lesson
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get('lessonId')
    const language = searchParams.get('language')
    const code = searchParams.get('code')
    const userLevel = searchParams.get('userLevel') || 'beginner'
    const learningProgress = parseInt(searchParams.get('learningProgress') || '50')

    if (!lessonId || !language || !code) {
      return NextResponse.json(
        { error: "Lesson ID, language, and code are required" },
        { status: 400 }
      )
    }

    // Generate smart hints based on the provided context
    const context = {
      language,
      code,
      lessonId,
      userLevel: userLevel as 'beginner' | 'intermediate' | 'advanced',
      previousHints: [], // This would come from user's learning history
      commonMistakes: [], // This would come from user's mistake tracking
      learningProgress
    }

    const hints = generateSmartHints(context)
    const learningPath = getLearningPathSuggestions(language, [], userLevel)
    const recommendations = getPersonalizedRecommendations(
      language, 
      userLevel, 
      learningProgress, 
      []
    )

    return NextResponse.json({
      success: true,
      hints,
      learningPath,
      recommendations
    })
  } catch (error) {
    console.error("Smart hints error:", error)
    return NextResponse.json(
      { error: "Failed to generate smart hints" },
      { status: 500 }
    )
  }
}

// POST: Track hint interactions (dismiss, apply, etc.)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    const { lessonId, hintId, action, code } = await request.json()

    if (!lessonId || !hintId || !action) {
      return NextResponse.json(
        { error: "Lesson ID, hint ID, and action are required" },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Store the hint interaction in the database
    // 2. Update user's learning analytics
    // 3. Adjust hint priority based on user behavior

    const actions = {
      dismiss: "Hint dismissed",
      apply: "Hint applied to code",
      ignore: "Hint ignored",
      helpful: "Hint marked as helpful",
      not_helpful: "Hint marked as not helpful"
    }

    console.log(`User ${session?.user?.id || 'anonymous'} ${actions[action as keyof typeof actions]} for hint ${hintId} in lesson ${lessonId}`)

    return NextResponse.json({
      success: true,
      message: `Hint interaction tracked: ${action}`
    })
  } catch (error) {
    console.error("Hint interaction error:", error)
    return NextResponse.json(
      { error: "Failed to track hint interaction" },
      { status: 500 }
    )
  }
}
