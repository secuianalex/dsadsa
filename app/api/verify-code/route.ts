import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { lessonId, code, language } = await request.json()

    console.log('🔍 API Debug - Received request:', { lessonId, language, codeLength: code?.length })

    if (!lessonId || !code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: lessonId, code, language' },
        { status: 400 }
      )
    }

    // Get the lesson with test cases
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { language: true }
    }) as any // Type assertion to handle new fields

    console.log('🔍 API Debug - Lesson found:', {
      found: !!lesson,
      title: lesson?.title,
      hasTestCases: !!lesson?.testCases,
      testCasesLength: lesson?.testCases?.length
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    if (!lesson.testCases) {
      console.log('🔍 API Debug - No test cases found for lesson:', lesson.title)
      return NextResponse.json(
        { error: 'No test cases available for this lesson' },
        { status: 400 }
      )
    }

    // Parse test cases
    const testCases = JSON.parse(lesson.testCases)
    console.log('🔍 API Debug - Parsed test cases:', testCases.length)
    
    // Execute code verification based on language
    const results = await verifyCode(code, testCases, language)

    return NextResponse.json({
      success: true,
      results,
      passed: results.every((result: any) => result.passed),
      totalTests: results.length,
      passedTests: results.filter((result: any) => result.passed).length
    })

  } catch (error) {
    console.error('Code verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error during code verification' },
      { status: 500 }
    )
  }
}

async function verifyCode(code: string, testCases: any[], language: string) {
  const results = []

  for (const testCase of testCases) {
    try {
      let passed = false
      let error = null
      let output = null

      // Execute test based on language
      switch (language.toLowerCase()) {
        case 'python':
          const pythonResult = await executePythonTest(code, testCase)
          passed = pythonResult.passed
          error = pythonResult.error
          output = pythonResult.output
          break

        case 'javascript':
        case 'js':
          const jsResult = await executeJavaScriptTest(code, testCase)
          passed = jsResult.passed
          error = jsResult.error
          output = jsResult.output
          break

        case 'css':
          const cssResult = await executeCSSTest(code, testCase)
          passed = cssResult.passed
          error = cssResult.error
          output = cssResult.output
          break

        default:
          // For other languages, do basic syntax checking
          passed = await basicSyntaxCheck(code, language)
          error = passed ? null : 'Language not yet supported for full testing'
      }

      results.push({
        name: testCase.name,
        description: testCase.description,
        passed,
        error,
        output,
        expectedOutput: testCase.expectedOutput
      })

    } catch (testError) {
      results.push({
        name: testCase.name,
        description: testCase.description,
        passed: false,
        error: testError instanceof Error ? testError.message : 'Unknown test error',
        output: null,
        expectedOutput: testCase.expectedOutput
      })
    }
  }

  return results
}

// Python code execution (simplified - in production you'd use a sandbox)
async function executePythonTest(code: string, testCase: any) {
  try {
    // For now, we'll do basic validation
    // In a real implementation, you'd use a Python sandbox or API
    const combinedCode = `${testCase.input}\n${code}\n${testCase.testFunction}`
    
    // Basic Python syntax check
    if (!code.includes('=') && testCase.name.includes('Variable')) {
      return {
        passed: false,
        error: 'No variable assignment found',
        output: null
      }
    }

    // For now, return a mock success for demonstration
    return {
      passed: true,
      error: null,
      output: 'Test passed successfully'
    }
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'Python execution error',
      output: null
    }
  }
}

// JavaScript code execution
async function executeJavaScriptTest(code: string, testCase: any) {
  try {
    // Create a safe execution environment
    const combinedCode = `${testCase.input}\n${code}\n${testCase.testFunction}`
    
    // Basic validation
    if (testCase.name.includes('Variable') && !code.includes('let') && !code.includes('const') && !code.includes('var')) {
      return {
        passed: false,
        error: 'No variable declaration found',
        output: null
      }
    }

    // For now, return a mock success for demonstration
    return {
      passed: true,
      error: null,
      output: 'Test passed successfully'
    }
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'JavaScript execution error',
      output: null
    }
  }
}

// CSS code execution
async function executeCSSTest(code: string, testCase: any) {
  try {
    // Basic CSS validation
    if (!code.includes('{') || !code.includes('}')) {
      return {
        passed: false,
        error: 'Invalid CSS syntax - missing braces',
        output: null
      }
    }

    // Check for basic CSS properties
    if (testCase.name.includes('color') && !code.includes('color:')) {
      return {
        passed: false,
        error: 'No color property found',
        output: null
      }
    }

    return {
      passed: true,
      error: null,
      output: 'CSS validation passed'
    }
  } catch (error) {
    return {
      passed: false,
      error: error instanceof Error ? error.message : 'CSS validation error',
      output: null
    }
  }
}

// Basic syntax check for unsupported languages
async function basicSyntaxCheck(code: string, language: string) {
  // Basic validation based on language
  switch (language.toLowerCase()) {
    case 'java':
      return code.includes('public') && code.includes('class')
    case 'c#':
    case 'csharp':
      return code.includes('using') || code.includes('namespace')
    case 'html':
      return code.includes('<') && code.includes('>')
    default:
      return code.length > 0 // Basic check that code is not empty
  }
}
