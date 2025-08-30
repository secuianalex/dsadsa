import { NextRequest, NextResponse } from 'next/server'
import {
  TeachingContext,
  generateTeachingPrompt,
  analyzeUserResponse,
  shouldGenerateExercise,
  updateTeachingContext,
  getNextConcept,
  calculateProgress
} from '@/lib/teachingSystem'
import { generateAIResponse, executeCode, analyzeCodeErrors, generateDebuggingSuggestions } from '@/lib/openai'
import { initializeProgress, markConceptCompleted, markExerciseCompleted } from '@/lib/devAI'

export async function POST(request: NextRequest) {
  try {
    const { message, session, progress } = await request.json()
    
    // Initialize or update teaching context
    const teachingContext: TeachingContext = {
      language: session.selectedLanguage,
      level: session.selectedLevel,
      currentConcept: session.currentConcept || 'variables-and-data-types',
      sessionStartTime: new Date(session.sessionStartTime),
      totalTimeSpent: progress.totalTimeSpent || 0,
      completedConcepts: progress.completedConcepts || [],
      exercisesCompleted: progress.exercisesCompleted || 0,
      lastActivity: new Date(),
      userPreferences: {
        learningStyle: 'hands-on',
        pace: 'normal',
        showExamples: true,
        showExercises: true
      }
    }

    // Analyze user intent
    const analysis = analyzeUserResponse(message, teachingContext)
    
    // Determine if we should generate an exercise
    const shouldExercise = shouldGenerateExercise(teachingContext)
    
    // Determine expected response type
    let expectedResponse: 'explanation' | 'exercise' | 'feedback' | 'guidance' = 'guidance'
    
    if (analysis.intent === 'learn') {
      expectedResponse = 'explanation'
    } else if (analysis.intent === 'practice' || shouldExercise) {
      expectedResponse = 'exercise'
    } else if (analysis.intent === 'help') {
      expectedResponse = 'feedback'
    }

    // Generate teaching prompt
    const teachingPrompt = generateTeachingPrompt(teachingContext, message, expectedResponse)
    
    // Call OpenAI API
    const aiResponse = await generateAIResponse(teachingPrompt, message)
    
    // Update teaching context
    const updatedContext = updateTeachingContext(teachingContext, message, aiResponse.content)
    
    // Prepare metadata for progress tracking
    const metadata: any = {
      confidence: aiResponse.metadata.confidence,
      suggestions: aiResponse.metadata.suggestions
    }
    
    if (expectedResponse === 'explanation') {
      metadata.concept = teachingContext.currentConcept
    } else if (expectedResponse === 'exercise') {
      metadata.exercise = true
    }
    
    if (analysis.intent === 'progress' && analysis.confidence > 0.8) {
      metadata.showProgress = true
    }

    // Check if user wants to complete a concept
    if (message.toLowerCase().includes('complete') || message.toLowerCase().includes('done') || message.toLowerCase().includes('finished')) {
      const updatedProgress = markConceptCompleted(progress, teachingContext.currentConcept)
      const nextConcept = getNextConcept(updatedContext)
      
      if (nextConcept) {
        metadata.nextConcept = nextConcept
        metadata.conceptCompleted = true
      }
    }

    // Check if user wants to complete an exercise
    if (message.toLowerCase().includes('exercise complete') || message.toLowerCase().includes('practice done')) {
      const updatedProgress = markExerciseCompleted(progress)
      metadata.exerciseCompleted = true
    }

    // Add debugging suggestions if there are code-related issues
    if (message.toLowerCase().includes('error') || message.toLowerCase().includes('bug') || message.toLowerCase().includes('not working')) {
      const errorAnalysis = analyzeCodeErrors(message, teachingContext.language, message)
      metadata.debugSuggestions = errorAnalysis.suggestions
      metadata.errorType = errorAnalysis.type
    }

    return NextResponse.json({
      response: aiResponse.content,
      metadata,
      context: updatedContext,
      analysis: {
        intent: analysis.intent,
        confidence: analysis.confidence,
        suggestedAction: analysis.suggestedAction
      }
    })

  } catch (error) {
    console.error('Dev API Error:', error)
    
    // Return a helpful error response
    return NextResponse.json({
      response: "I'm having trouble processing your request right now. Please try again in a moment, or rephrase your question. I'm here to help you learn programming! 💪",
      metadata: {
        confidence: 0.1,
        suggestions: [
          'Try rephrasing your question',
          'Check your internet connection',
          'Ask me about a specific programming concept'
        ]
      },
      context: null,
      analysis: {
        intent: 'general',
        confidence: 0.1,
        suggestedAction: 'Provide general guidance'
      }
    }, { status: 500 })
  }
}

// Code execution endpoint
export async function PUT(request: NextRequest) {
  try {
    const { code, language, testCases } = await request.json()
    
    // Execute the code
    const executionResult = await executeCode({
      code,
      language,
      testCases
    })
    
    // Generate debugging suggestions if there are failures
    let debuggingSuggestions: string[] = []
    if (!executionResult.success) {
      debuggingSuggestions = generateDebuggingSuggestions(
        code,
        language,
        executionResult.testResults
      )
    }
    
    return NextResponse.json({
      success: executionResult.success,
      output: executionResult.output,
      error: executionResult.error,
      executionTime: executionResult.executionTime,
      testResults: executionResult.testResults,
      debuggingSuggestions
    })
    
  } catch (error) {
    console.error('Code Execution Error:', error)
    
    return NextResponse.json({
      success: false,
      output: '',
      error: 'Code execution failed. Please check your syntax and try again.',
      executionTime: 0,
      testResults: [],
      debuggingSuggestions: [
        'Check your code syntax',
        'Make sure all brackets and parentheses are properly closed',
        'Verify that all variables are declared before use'
      ]
    }, { status: 500 })
  }
}
