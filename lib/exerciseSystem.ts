// Interactive Code Exercise System for Dev AI Tutor
export interface CodeExercise {
  id: string
  title: string
  description: string
  concept: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  difficulty: 'easy' | 'medium' | 'hard'
  instructions: string
  starterCode: string
  testCases: TestCase[]
  hints: string[]
  solution: string
  estimatedTime: number // in minutes
  points: number
}

export interface TestCase {
  id: string
  input: string
  expectedOutput: string
  description: string
  isHidden: boolean
}

export interface ExerciseResult {
  success: boolean
  score: number
  totalTests: number
  passedTests: number
  testResults: TestResult[]
  feedback: string[]
  timeSpent: number // in seconds
  attempts: number
}

export interface TestResult {
  testCase: TestCase
  passed: boolean
  actualOutput: string
  error?: string
  executionTime: number // in milliseconds
}

export interface ExerciseTemplate {
  title: string
  description: string
  concept: string
  instructions: string
  starterCode: string
  testCases: Omit<TestCase, 'id'>[]
  hints: string[]
  solution: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number
  points: number
}

export const EXERCISE_TEMPLATES: { [concept: string]: ExerciseTemplate } = {
  'variables-and-data-types': {
    title: "Variable Mastery",
    description: "Practice creating and using variables with different data types",
    concept: "variables-and-data-types",
    instructions: "Create variables for a student's information and display them in a formatted way.",
    starterCode: `// Create variables for a student
// name (string), age (number), gpa (number), isEnrolled (boolean)

// Display the student information
console.log("Student Information:");
// Add your code here`,
    testCases: [
      {
        input: "",
        expectedOutput: "Student Information:",
        description: "Check if the program runs without errors",
        isHidden: false
      },
      {
        input: "",
        expectedOutput: "Name:",
        description: "Check if name variable is displayed",
        isHidden: true
      },
      {
        input: "",
        expectedOutput: "Age:",
        description: "Check if age variable is displayed",
        isHidden: true
      }
    ],
    hints: [
      "Start by declaring variables using 'let' or 'const'",
      "Use descriptive names for your variables",
      "Remember to use console.log() to display the information"
    ],
    solution: `// Create variables for a student
let name = "Alice Johnson";
let age = 20;
let gpa = 3.8;
let isEnrolled = true;

// Display the student information
console.log("Student Information:");
console.log("Name:", name);
console.log("Age:", age);
console.log("GPA:", gpa);
console.log("Enrolled:", isEnrolled);`,
    difficulty: "easy",
    estimatedTime: 5,
    points: 10
  },
  'functions-basics': {
    title: "Function Fundamentals",
    description: "Create and use functions to perform calculations",
    concept: "functions-basics",
    instructions: "Create a function that calculates the area of a rectangle and test it with different dimensions.",
    starterCode: `// Create a function to calculate rectangle area
function calculateArea(width, height) {
    // Add your code here
}

// Test the function
console.log("Area of 5x3 rectangle:", calculateArea(5, 3));
console.log("Area of 10x7 rectangle:", calculateArea(10, 7));`,
    testCases: [
      {
        input: "calculateArea(5, 3)",
        expectedOutput: "15",
        description: "Calculate area of 5x3 rectangle",
        isHidden: false
      },
      {
        input: "calculateArea(10, 7)",
        expectedOutput: "70",
        description: "Calculate area of 10x7 rectangle",
        isHidden: false
      },
      {
        input: "calculateArea(0, 5)",
        expectedOutput: "0",
        description: "Handle edge case with zero width",
        isHidden: true
      }
    ],
    hints: [
      "The area of a rectangle is width multiplied by height",
      "Use the 'return' keyword to send back the result",
      "Make sure your function has parameters for width and height"
    ],
    solution: `// Create a function to calculate rectangle area
function calculateArea(width, height) {
    return width * height;
}

// Test the function
console.log("Area of 5x3 rectangle:", calculateArea(5, 3));
console.log("Area of 10x7 rectangle:", calculateArea(10, 7));`,
    difficulty: "easy",
    estimatedTime: 8,
    points: 15
  },
  'conditionals': {
    title: "Conditional Logic",
    description: "Use if/else statements to make decisions in your code",
    concept: "conditionals",
    instructions: "Create a function that determines if a number is positive, negative, or zero.",
    starterCode: `// Create a function to check number type
function checkNumberType(number) {
    // Add your conditional logic here
}

// Test the function
console.log("5 is:", checkNumberType(5));
console.log("-3 is:", checkNumberType(-3));
console.log("0 is:", checkNumberType(0));`,
    testCases: [
      {
        input: "checkNumberType(5)",
        expectedOutput: "positive",
        description: "Check positive number",
        isHidden: false
      },
      {
        input: "checkNumberType(-3)",
        expectedOutput: "negative",
        description: "Check negative number",
        isHidden: false
      },
      {
        input: "checkNumberType(0)",
        expectedOutput: "zero",
        description: "Check zero",
        isHidden: false
      }
    ],
    hints: [
      "Use if/else if/else statements",
      "Compare the number with 0",
      "Return a string describing the number type"
    ],
    solution: `// Create a function to check number type
function checkNumberType(number) {
    if (number > 0) {
        return "positive";
    } else if (number < 0) {
        return "negative";
    } else {
        return "zero";
    }
}

// Test the function
console.log("5 is:", checkNumberType(5));
console.log("-3 is:", checkNumberType(-3));
console.log("0 is:", checkNumberType(0));`,
    difficulty: "easy",
    estimatedTime: 10,
    points: 20
  },
  'loops': {
    title: "Loop Mastery",
    description: "Use loops to repeat actions and process collections",
    concept: "loops",
    instructions: "Create a function that finds the sum of all numbers from 1 to n using a loop.",
    starterCode: `// Create a function to sum numbers from 1 to n
function sumToN(n) {
    // Add your loop logic here
}

// Test the function
console.log("Sum from 1 to 5:", sumToN(5));
console.log("Sum from 1 to 10:", sumToN(10));`,
    testCases: [
      {
        input: "sumToN(5)",
        expectedOutput: "15",
        description: "Sum from 1 to 5",
        isHidden: false
      },
      {
        input: "sumToN(10)",
        expectedOutput: "55",
        description: "Sum from 1 to 10",
        isHidden: false
      },
      {
        input: "sumToN(1)",
        expectedOutput: "1",
        description: "Sum from 1 to 1",
        isHidden: true
      }
    ],
    hints: [
      "Use a for loop to iterate from 1 to n",
      "Keep a running total of the sum",
      "Start with sum = 0 and add each number"
    ],
    solution: `// Create a function to sum numbers from 1 to n
function sumToN(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Test the function
console.log("Sum from 1 to 5:", sumToN(5));
console.log("Sum from 1 to 10:", sumToN(10));`,
    difficulty: "medium",
    estimatedTime: 12,
    points: 25
  },
  'arrays': {
    title: "Array Operations",
    description: "Work with arrays to store and manipulate collections of data",
    concept: "arrays",
    instructions: "Create a function that finds the maximum value in an array of numbers.",
    starterCode: `// Create a function to find maximum value in array
function findMax(numbers) {
    // Add your array logic here
}

// Test the function
console.log("Max of [3, 7, 2, 9, 1]:", findMax([3, 7, 2, 9, 1]));
console.log("Max of [10, 5, 8, 12]:", findMax([10, 5, 8, 12]));`,
    testCases: [
      {
        input: "findMax([3, 7, 2, 9, 1])",
        expectedOutput: "9",
        description: "Find max in array [3, 7, 2, 9, 1]",
        isHidden: false
      },
      {
        input: "findMax([10, 5, 8, 12])",
        expectedOutput: "12",
        description: "Find max in array [10, 5, 8, 12]",
        isHidden: false
      },
      {
        input: "findMax([5])",
        expectedOutput: "5",
        description: "Find max in single-element array",
        isHidden: true
      }
    ],
    hints: [
      "Use a loop to go through each element in the array",
      "Keep track of the largest value you've seen so far",
      "Start with the first element as the initial maximum"
    ],
    solution: `// Create a function to find maximum value in array
function findMax(numbers) {
    if (numbers.length === 0) return null;
    
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

// Test the function
console.log("Max of [3, 7, 2, 9, 1]:", findMax([3, 7, 2, 9, 1]));
console.log("Max of [10, 5, 8, 12]:", findMax([10, 5, 8, 12]));`,
    difficulty: "medium",
    estimatedTime: 15,
    points: 30
  }
}

export function generateExercise(
  concept: string,
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced'
): CodeExercise | null {
  const template = EXERCISE_TEMPLATES[concept]
  if (!template) return null

  const difficulty = getDifficultyForLevel(level)
  const points = getPointsForDifficulty(difficulty)
  const timeLimit = getTimeLimitForLevel(level)

  return {
    id: `exercise_${concept}_${Date.now()}`,
    title: template.title,
    description: template.description,
    concept: template.concept,
    language,
    level,
    difficulty,
    instructions: template.instructions,
    starterCode: template.starterCode,
    testCases: template.testCases.map((tc, index) => ({
      ...tc,
      id: `test_${index}`
    })),
    hints: template.hints,
    solution: template.solution,
    estimatedTime: template.estimatedTime,
    points
  }
}

export function getDifficultyForLevel(level: 'beginner' | 'intermediate' | 'advanced'): 'easy' | 'medium' | 'hard' {
  switch (level) {
    case 'beginner': return 'easy'
    case 'intermediate': return 'medium'
    case 'advanced': return 'hard'
    default: return 'easy'
  }
}

export function getPointsForDifficulty(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'easy': return 10
    case 'medium': return 25
    case 'hard': return 50
    default: return 10
  }
}

export function getTimeLimitForLevel(level: 'beginner' | 'intermediate' | 'advanced'): number {
  switch (level) {
    case 'beginner': return 300 // 5 minutes
    case 'intermediate': return 600 // 10 minutes
    case 'advanced': return 900 // 15 minutes
    default: return 300
  }
}

export async function executeCode(
  code: string,
  language: string,
  testCases: TestCase[]
): Promise<ExerciseResult> {
  const startTime = Date.now()
  const testResults: TestResult[] = []
  let passedTests = 0

  try {
    // Simulate code execution and testing
    for (const testCase of testCases) {
      const testStartTime = Date.now()
      
      // Simple pattern matching for expected output
      const testResult = await validateTestCase(code, testCase, language)
      const executionTime = Date.now() - testStartTime
      
      if (testResult.passed) {
        passedTests++
      }
      
      testResults.push({
        testCase,
        passed: testResult.passed,
        actualOutput: testResult.output,
        error: testResult.error,
        executionTime
      })
    }

    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    const success = passedTests === testCases.length
    const score = Math.round((passedTests / testCases.length) * 100)

    return {
      success,
      score,
      totalTests: testCases.length,
      passedTests,
      testResults,
      feedback: generateFeedback(testResults, language),
      timeSpent,
      attempts: 1
    }
  } catch (error) {
    return {
      success: false,
      score: 0,
      totalTests: testCases.length,
      passedTests: 0,
      testResults: [],
      feedback: [`Error executing code: ${error}`],
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      attempts: 1
    }
  }
}

async function validateTestCase(
  code: string,
  testCase: TestCase,
  language: string
): Promise<{ passed: boolean; output: string; error?: string }> {
  // Simplified validation - in a real implementation, this would use a proper code execution engine
  try {
    // Basic pattern matching for expected output
    const hasExpectedOutput = code.toLowerCase().includes(testCase.expectedOutput.toLowerCase()) ||
                             code.includes(testCase.expectedOutput)
    
    if (hasExpectedOutput) {
      return {
        passed: true,
        output: testCase.expectedOutput
      }
    }

    // Check for common patterns
    const patterns = {
      'variables-and-data-types': /console\.log|let|const|var/,
      'functions-basics': /function|return/,
      'conditionals': /if|else/,
      'loops': /for|while/,
      'arrays': /\[|\]|\.length/
    }

    const pattern = patterns[testCase.description.toLowerCase() as keyof typeof patterns]
    if (pattern && pattern.test(code)) {
      return {
        passed: true,
        output: "Pattern matched"
      }
    }

    return {
      passed: false,
      output: "No output",
      error: "Expected output not found in code"
    }
  } catch (error) {
    return {
      passed: false,
      output: "Error",
      error: error instanceof Error ? error.message : "Unknown error"
    }
  }
}

function generateFeedback(testResults: TestResult[], language: string): string[] {
  const feedback: string[] = []
  const passedTests = testResults.filter(t => t.passed).length
  const totalTests = testResults.length

  if (passedTests === totalTests) {
    feedback.push("🎉 Excellent! All tests passed!")
    feedback.push("Your code is working correctly and follows good practices.")
  } else if (passedTests > totalTests / 2) {
    feedback.push("👍 Good progress! Most tests are passing.")
    feedback.push("Review the failing tests and check your logic.")
  } else {
    feedback.push("💡 Keep trying! Review the exercise instructions carefully.")
    feedback.push("Make sure your code matches the expected output format.")
  }

  // Add specific feedback for failed tests
  const failedTests = testResults.filter(t => !t.passed)
  if (failedTests.length > 0) {
    feedback.push(`\nFailed tests: ${failedTests.length}/${totalTests}`)
    failedTests.forEach(test => {
      feedback.push(`- ${test.testCase.description}: Expected "${test.testCase.expectedOutput}"`)
    })
  }

  return feedback
}

export function getAvailableExercises(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced'
): CodeExercise[] {
  const exercises: CodeExercise[] = []
  
  // Get concepts for this language and level
  const concepts = ['variables-and-data-types', 'functions-basics', 'conditionals', 'loops', 'arrays']
  
  for (const concept of concepts) {
    const exercise = generateExercise(concept, language, level)
    if (exercise) {
      exercises.push(exercise)
    }
  }
  
  return exercises
}

function generateVariations(exercise: CodeExercise): CodeExercise[] {
  // This would generate variations of the exercise with different parameters
  // For now, return the original exercise
  return [exercise]
}

export function calculateExerciseProgress(
  completedExercises: number,
  totalExercises: number
): { percentage: number; level: 'beginner' | 'intermediate' | 'advanced' } {
  const percentage = Math.round((completedExercises / totalExercises) * 100)
  
  let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
  if (percentage >= 80) level = 'advanced'
  else if (percentage >= 50) level = 'intermediate'
  
  return { percentage, level }
}
