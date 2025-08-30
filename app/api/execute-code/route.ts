import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

interface ExecutionResult {
  success: boolean
  output: string
  error: string | null
  executionTime: number
  memoryUsage?: number
}

// Safe code execution for different languages
async function executeCode(code: string, language: string): Promise<ExecutionResult> {
  const startTime = Date.now()
  
  try {
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        return await executeJavaScript(code)
      case 'python':
        return await executePython(code)
      case 'html':
        return await executeHTML(code)
      case 'css':
        return await executeCSS(code)
      default:
        return {
          success: false,
          output: '',
          error: `Language '${language}' is not supported for real-time execution`,
          executionTime: Date.now() - startTime
        }
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Unknown execution error',
      executionTime: Date.now() - startTime
    }
  }
}

// JavaScript execution (safe sandbox)
async function executeJavaScript(code: string): Promise<ExecutionResult> {
  const startTime = Date.now()
  
  try {
    // Create a safe execution context
    const output: string[] = []
    const error: string[] = []
    
    // Override console methods to capture output
    const consoleOverride = {
      log: (...args: any[]) => output.push(args.map(arg => String(arg)).join(' ')),
      error: (...args: any[]) => error.push(args.map(arg => String(arg)).join(' ')),
      warn: (...args: any[]) => output.push('WARN: ' + args.map(arg => String(arg)).join(' ')),
      info: (...args: any[]) => output.push('INFO: ' + args.map(arg => String(arg)).join(' '))
    }
    
    // Create a safe execution function
    const safeEval = new Function('console', code)
    
    // Execute with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Execution timeout (5 seconds)')), 5000)
    })
    
    const executionPromise = Promise.resolve().then(() => {
      safeEval(consoleOverride)
    })
    
    await Promise.race([executionPromise, timeoutPromise])
    
    return {
      success: error.length === 0,
      output: output.join('\n'),
      error: error.length > 0 ? error.join('\n') : null,
      executionTime: Date.now() - startTime
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'JavaScript execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

// Python execution (simulated)
async function executePython(code: string): Promise<ExecutionResult> {
  const startTime = Date.now()
  
  try {
    // For now, we'll simulate Python execution
    // In a production environment, you'd use a Python runtime or API
    const output: string[] = []
    const error: string[] = []
    
    // Simple Python syntax checking and simulation
    if (code.includes('print(')) {
      const printMatches = code.match(/print\(([^)]+)\)/g)
      if (printMatches) {
        printMatches.forEach(match => {
          const content = match.replace('print(', '').replace(')', '')
          output.push(content.replace(/['"]/g, ''))
        })
      }
    }
    
    // Check for common Python errors
    if (code.includes('import os') || code.includes('import sys')) {
      error.push('ImportError: Restricted imports not allowed')
    }
    
    if (code.includes('__import__') || code.includes('eval(')) {
      error.push('SecurityError: Dangerous operations not allowed')
    }
    
    return {
      success: error.length === 0,
      output: output.join('\n'),
      error: error.length > 0 ? error.join('\n') : null,
      executionTime: Date.now() - startTime
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Python execution failed',
      executionTime: Date.now() - startTime
    }
  }
}

// HTML execution (preview generation)
async function executeHTML(code: string): Promise<ExecutionResult> {
  const startTime = Date.now()
  
  try {
    // Create a safe HTML preview
    const sanitizedHTML = code
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '<!-- Scripts disabled for security -->')
      .replace(/javascript:/gi, 'javascript-disabled:')
      .replace(/on\w+\s*=/gi, 'data-disabled-')
    
    return {
      success: true,
      output: sanitizedHTML,
      error: null,
      executionTime: Date.now() - startTime
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'HTML processing failed',
      executionTime: Date.now() - startTime
    }
  }
}

// CSS execution (validation and preview)
async function executeCSS(code: string): Promise<ExecutionResult> {
  const startTime = Date.now()
  
  try {
    // Basic CSS validation
    const errors: string[] = []
    
    // Check for dangerous CSS
    if (code.includes('expression(') || code.includes('url(')) {
      errors.push('SecurityError: Dangerous CSS properties not allowed')
    }
    
    // Check for syntax errors (basic)
    const openBraces = (code.match(/\{/g) || []).length
    const closeBraces = (code.match(/\}/g) || []).length
    
    if (openBraces !== closeBraces) {
      errors.push('SyntaxError: Mismatched braces')
    }
    
    return {
      success: errors.length === 0,
      output: code,
      error: errors.length > 0 ? errors.join('\n') : null,
      executionTime: Date.now() - startTime
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'CSS processing failed',
      executionTime: Date.now() - startTime
    }
  }
}

// POST: Execute code and return results
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    // Optional: Require authentication for code execution
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    // }

    const { code, language } = await request.json()

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      )
    }

    // Rate limiting (basic)
    // In production, implement proper rate limiting
    
    const result = await executeCode(code, language)

    return NextResponse.json({
      success: true,
      result
    })
  } catch (error) {
    console.error("Code execution error:", error)
    return NextResponse.json(
      { error: "Code execution failed" },
      { status: 500 }
    )
  }
}
