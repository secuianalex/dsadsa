// Enhanced OpenAI Integration for Dev AI Tutor
import OpenAI from 'openai'

// Initialize OpenAI client conditionally
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: false // Only use on server side
    })
  : null

export interface AIResponse {
  content: string
  metadata: {
    concept?: string
    exercise?: boolean
    feedback?: boolean
    confidence: number
    suggestions?: string[]
  }
  context: {
    language: string
    level: string
    concept: string
    userProgress: number
    learningStyle: string
  }
}

export interface TeachingPrompt {
  systemPrompt: string
  userPrompt: string
  context: {
    language: string
    level: string
    concept: string
    userProgress: number
    learningStyle: string
  }
}

export interface CodeExecutionRequest {
  code: string
  language: string
  testCases: Array<{
    input: string
    expectedOutput: string
    description: string
  }>
}

export interface CodeExecutionResult {
  success: boolean
  output: string
  error?: string
  executionTime: number
  testResults: Array<{
    passed: boolean
    input: string
    expectedOutput: string
    actualOutput: string
    error?: string
  }>
}

// Enhanced AI Response Generation
export async function generateAIResponse(
  prompt: TeachingPrompt,
  userMessage: string
): Promise<AIResponse> {
  if (!openai) {
    throw new Error('OpenAI client not initialized. Please check your OPENAI_API_KEY environment variable.')
  }
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt.systemPrompt
        },
        {
          role: "user",
          content: prompt.userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response right now."

    // Analyze the response to extract metadata
    const metadata = analyzeResponseMetadata(response, prompt.context)
    
    return {
      content: response,
      metadata,
      context: prompt.context
    }
  } catch (error) {
    console.error('OpenAI API Error:', error)
    
    // Fallback response
    return {
      content: generateFallbackResponse(prompt.context, userMessage),
      metadata: {
        confidence: 0.3,
        suggestions: ['Try rephrasing your question', 'Check your internet connection']
      },
      context: prompt.context
    }
  }
}

// Analyze response to extract metadata
function analyzeResponseMetadata(
  response: string,
  context: { language: string; level: string; concept: string; userProgress: number; learningStyle: string }
): AIResponse['metadata'] {
  const lowerResponse = response.toLowerCase()
  
  return {
    concept: context.concept,
    exercise: lowerResponse.includes('exercise') || lowerResponse.includes('practice') || lowerResponse.includes('challenge'),
    feedback: lowerResponse.includes('feedback') || lowerResponse.includes('review') || lowerResponse.includes('check'),
    confidence: calculateConfidence(response, context),
    suggestions: extractSuggestions(response)
  }
}

// Calculate confidence score based on response quality
function calculateConfidence(
  response: string,
  context: { language: string; level: string; concept: string; userProgress: number; learningStyle: string }
): number {
  let confidence = 0.5 // Base confidence
  
  // Increase confidence for longer, more detailed responses
  if (response.length > 200) confidence += 0.2
  if (response.length > 500) confidence += 0.1
  
  // Increase confidence for responses with code examples
  if (response.includes('```') || response.includes('code')) confidence += 0.15
  
  // Increase confidence for responses with specific language content
  if (response.toLowerCase().includes(context.language.toLowerCase())) confidence += 0.1
  
  // Increase confidence for responses that match learning style
  if (context.learningStyle === 'hands-on' && response.includes('practice')) confidence += 0.1
  if (context.learningStyle === 'visual' && response.includes('example')) confidence += 0.1
  
  return Math.min(confidence, 1.0)
}

// Extract suggestions from response
function extractSuggestions(response: string): string[] {
  const suggestions: string[] = []
  const lines = response.split('\n')
  
  for (const line of lines) {
    if (line.includes('•') || line.includes('-') || line.includes('*')) {
      const suggestion = line.replace(/^[•\-\*]\s*/, '').trim()
      if (suggestion && suggestion.length > 10) {
        suggestions.push(suggestion)
      }
    }
  }
  
  return suggestions.slice(0, 3) // Limit to 3 suggestions
}

// Generate fallback response when API fails
function generateFallbackResponse(
  context: { language: string; level: string; concept: string; userProgress: number; learningStyle: string },
  userMessage: string
): string {
  const { language, level, concept } = context
  
  return `I'm having trouble connecting to my AI services right now, but I can still help you with ${language} programming!

**Current Focus:** ${concept} (${level} level)

**What I can help you with:**
• Explaining programming concepts
• Providing code examples
• Suggesting learning resources
• Answering questions about ${language}

**Try asking me about:**
• Variables and data types in ${language}
• Functions and methods
• Control flow (if/else, loops)
• Data structures
• Best practices

I'll do my best to help you learn ${language} programming! 💪`
}

// Enhanced Code Execution (Simulated for now)
export async function executeCode(
  request: CodeExecutionRequest
): Promise<CodeExecutionResult> {
  const startTime = Date.now()
  
  try {
    // Simulate code execution with basic validation
    const result = await simulateCodeExecution(request)
    const executionTime = Date.now() - startTime
    
    return {
      success: result.success,
      output: result.output,
      error: result.error,
      executionTime,
      testResults: result.testResults
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : 'Unknown execution error',
      executionTime: Date.now() - startTime,
      testResults: []
    }
  }
}

// Simulate code execution with validation
async function simulateCodeExecution(
  request: CodeExecutionRequest
): Promise<{
  success: boolean
  output: string
  error?: string
  testResults: Array<{
    passed: boolean
    input: string
    expectedOutput: string
    actualOutput: string
    error?: string
  }>
}> {
  const { code, language, testCases } = request
  
  // Basic syntax validation
  const syntaxValid = validateSyntax(code, language)
  if (!syntaxValid.valid) {
    return {
      success: false,
      output: '',
      error: `Syntax Error: ${syntaxValid.error}`,
      testResults: []
    }
  }
  
  // Run test cases
  const testResults = []
  let allTestsPassed = true
  
  for (const testCase of testCases) {
    const testResult = await runTestCase(code, testCase, language)
    testResults.push(testResult)
    
    if (!testResult.passed) {
      allTestsPassed = false
    }
  }
  
  return {
    success: allTestsPassed,
    output: generateOutput(code, language),
    testResults
  }
}

// Validate code syntax
function validateSyntax(code: string, language: string): { valid: boolean; error?: string } {
  const languageRules = {
    javascript: {
      required: ['function', 'console.log'],
      forbidden: ['import', 'export']
    },
    python: {
      required: ['def', 'print'],
      forbidden: ['import', 'from']
    },
    java: {
      required: ['public', 'class'],
      forbidden: ['import', 'package']
    }
  }
  
  const rules = languageRules[language as keyof typeof languageRules]
  if (!rules) {
    return { valid: true } // Unknown language, assume valid
  }
  
  // Check for required patterns
  for (const required of rules.required) {
    if (!code.includes(required)) {
      return { valid: false, error: `Missing required keyword: ${required}` }
    }
  }
  
  // Check for forbidden patterns (for security)
  for (const forbidden of rules.forbidden) {
    if (code.includes(forbidden)) {
      return { valid: false, error: `Forbidden keyword: ${forbidden}` }
    }
  }
  
  return { valid: true }
}

// Run a single test case
async function runTestCase(
  code: string,
  testCase: { input: string; expectedOutput: string; description: string },
  language: string
): Promise<{
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput: string
  error?: string
}> {
  try {
    // Simple pattern matching for expected output
    const hasExpectedOutput = code.toLowerCase().includes(testCase.expectedOutput.toLowerCase()) ||
                             code.includes(testCase.expectedOutput)
    
    if (hasExpectedOutput) {
      return {
        passed: true,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: testCase.expectedOutput
      }
    }
    
    // Check for common patterns based on description
    const patterns = {
      'variables': /let|const|var|console\.log/,
      'functions': /function|return/,
      'conditionals': /if|else/,
      'loops': /for|while/,
      'arrays': /\[|\]|\.length/
    }
    
    const pattern = patterns[testCase.description.toLowerCase() as keyof typeof patterns]
    if (pattern && pattern.test(code)) {
      return {
        passed: true,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: "Pattern matched"
      }
    }
    
    return {
      passed: false,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: "No output",
      error: "Expected output not found in code"
    }
  } catch (error) {
    return {
      passed: false,
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      actualOutput: "Error",
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}

// Generate output based on code
function generateOutput(code: string, language: string): string {
  // Extract console.log statements or print statements
  const outputLines: string[] = []
  
  if (language === 'javascript') {
    const logMatches = code.match(/console\.log\([^)]+\)/g)
    if (logMatches) {
      logMatches.forEach(match => {
        const content = match.replace(/console\.log\(/, '').replace(/\)$/, '')
        outputLines.push(`Output: ${content}`)
      })
    }
  } else if (language === 'python') {
    const printMatches = code.match(/print\([^)]+\)/g)
    if (printMatches) {
      printMatches.forEach(match => {
        const content = match.replace(/print\(/, '').replace(/\)$/, '')
        outputLines.push(`Output: ${content}`)
      })
    }
  }
  
  return outputLines.length > 0 ? outputLines.join('\n') : "Code executed successfully"
}

// Enhanced error analysis
export function analyzeCodeErrors(
  code: string,
  language: string,
  error: string
): {
  type: 'syntax' | 'runtime' | 'logic' | 'unknown'
  suggestions: string[]
  commonFixes: string[]
} {
  const lowerError = error.toLowerCase()
  const lowerCode = code.toLowerCase()
  
  let type: 'syntax' | 'runtime' | 'logic' | 'unknown' = 'unknown'
  const suggestions: string[] = []
  const commonFixes: string[] = []
  
  // Syntax error detection
  if (lowerError.includes('syntax') || lowerError.includes('unexpected') || lowerError.includes('missing')) {
    type = 'syntax'
    
    if (language === 'javascript') {
      if (lowerCode.includes('function') && !lowerCode.includes('{')) {
        suggestions.push('Missing opening brace after function declaration')
        commonFixes.push('Add { after function parameters')
      }
      if (lowerCode.includes('if') && !lowerCode.includes('(')) {
        suggestions.push('Missing parentheses around if condition')
        commonFixes.push('Add parentheses: if (condition)')
      }
    } else if (language === 'python') {
      if (lowerCode.includes('def') && !lowerCode.includes(':')) {
        suggestions.push('Missing colon after function definition')
        commonFixes.push('Add : after function parameters')
      }
      if (lowerCode.includes('if') && !lowerCode.includes(':')) {
        suggestions.push('Missing colon after if statement')
        commonFixes.push('Add : after if condition')
      }
    }
  }
  
  // Runtime error detection
  else if (lowerError.includes('undefined') || lowerError.includes('null') || lowerError.includes('reference')) {
    type = 'runtime'
    suggestions.push('Variable might be undefined or not declared')
    commonFixes.push('Check variable declaration and scope')
  }
  
  // Logic error detection
  else if (lowerError.includes('unexpected') || lowerError.includes('wrong')) {
    type = 'logic'
    suggestions.push('Check your logic and variable values')
    commonFixes.push('Add console.log() to debug variable values')
  }
  
  // Default suggestions
  if (suggestions.length === 0) {
    suggestions.push('Review the error message carefully')
    suggestions.push('Check for typos and missing characters')
    suggestions.push('Ensure all brackets and parentheses are properly closed')
  }
  
  return { type, suggestions, commonFixes }
}

// Generate debugging suggestions
export function generateDebuggingSuggestions(
  code: string,
  language: string,
  testResults: Array<{ passed: boolean; expectedOutput: string; actualOutput: string }>
): string[] {
  const suggestions: string[] = []
  const failedTests = testResults.filter(t => !t.passed)
  
  if (failedTests.length === 0) {
    return ['Great job! All tests are passing! 🎉']
  }
  
  suggestions.push(`You have ${failedTests.length} failing test(s). Let's debug:`)
  
  for (const test of failedTests) {
    if (test.actualOutput === 'No output') {
      suggestions.push(`• Test expecting "${test.expectedOutput}": Make sure your code produces output`)
    } else if (test.actualOutput !== test.expectedOutput) {
      suggestions.push(`• Expected "${test.expectedOutput}" but got "${test.actualOutput}": Check your logic`)
    }
  }
  
  // Language-specific suggestions
  if (language === 'javascript') {
    suggestions.push('• Add console.log() statements to see what your code is doing')
    suggestions.push('• Check that your function returns the correct value')
  } else if (language === 'python') {
    suggestions.push('• Add print() statements to debug your code')
    suggestions.push('• Make sure your function returns the expected value')
  }
  
  return suggestions
}
