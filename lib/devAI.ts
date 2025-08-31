// Dev AI Tutor - Core Data Structures and Teaching Content
export interface DevMessage {
  id: string
  type: 'user' | 'dev'
  content: string
  timestamp: Date
}

export interface LearningSession {
  selectedLanguage: string
  selectedLevel: 'beginner' | 'intermediate' | 'advanced'
  currentConcept?: string
  sessionStartTime: Date
  totalTimeSpent: number // in minutes
}

export const DEV_PERSONALITY = {
  name: "Dev Tutor",
  role: "AI Programming & Testing Mentor",
  style: "friendly, encouraging, and technically precise",
  expertise: [
    "Programming fundamentals",
    "Web development",
    "Software architecture",
    "Best practices",
    "Debugging techniques",
    "Software testing fundamentals",
    "Manual testing methodologies",
    "Test automation frameworks",
    "Test case design",
    "Quality assurance processes"
  ],
  teachingApproach: {
    explanation: "Clear, step-by-step explanations with practical examples",
    feedback: "Constructive and specific guidance",
    encouragement: "Positive reinforcement and motivation"
  }
}

// Testing Knowledge Base
export const TESTING_KNOWLEDGE = {
  fundamentals: {
    concepts: [
      {
        id: "what-is-testing",
        title: "What is Software Testing?",
        content: `Software testing is the process of evaluating a software application to ensure it meets specified requirements and works correctly.

Key Points:
• Testing helps find bugs before users do
• It ensures software quality and reliability
• Testing saves time and money in the long run
• It builds confidence in the software

Types of Testing:
1. Functional Testing - Does the software do what it's supposed to do?
2. Non-Functional Testing - How well does it perform, scale, etc.?
3. Manual Testing - Human testers using the application
4. Automated Testing - Scripts that test automatically`,
        exercises: [
          {
            id: "identify-testing-types",
            title: "Identify Testing Types",
            description: "Look at a simple calculator app and identify what types of testing would be needed",
            solution: "Functional: Does 2+2=4? Non-Functional: How fast does it calculate? Manual: User interface testing. Automated: Unit tests for calculations."
          }
        ]
      },
      {
        id: "testing-principles",
        title: "Testing Principles",
        content: `The 7 Testing Principles:

1. Testing shows the presence of defects
2. Exhaustive testing is impossible
3. Early testing saves time and money
4. Defects cluster together
5. Beware of the pesticide paradox
6. Testing is context dependent
7. Absence of errors is a fallacy

These principles guide all testing activities and help us make smart testing decisions.`,
        exercises: [
          {
            id: "apply-principles",
            title: "Apply Testing Principles",
            description: "Given a login form, how would you apply these principles?",
            solution: "Focus on high-risk areas (defect clustering), test early in development, consider the context (web vs mobile), and don't assume no bugs means good software."
          }
        ]
      },
      {
        id: "testing-levels",
        title: "Testing Levels",
        content: `There are 4 main testing levels:

1. Unit Testing - Testing individual components
2. Integration Testing - Testing how components work together
3. System Testing - Testing the entire system
4. Acceptance Testing - Testing with end users

Each level has different goals and techniques.`,
        exercises: [
          {
            id: "identify-testing-levels",
            title: "Identify Testing Levels",
            description: "For an e-commerce website, identify what each testing level would cover",
            solution: "Unit: Individual functions. Integration: Payment system with database. System: Complete purchase flow. Acceptance: Real users buying products."
          }
        ]
      }
    ]
  },
  manual: {
    concepts: [
      {
        id: "manual-testing-basics",
        title: "Manual Testing Fundamentals",
        content: `Manual testing involves human testers executing test cases without automation tools.

Key Skills:
• Attention to detail
• Critical thinking
• User perspective
• Documentation skills
• Communication skills

Manual Testing Process:
1. Test Planning
2. Test Case Design
3. Test Execution
4. Bug Reporting
5. Test Closure`,
        exercises: [
          {
            id: "manual-testing-practice",
            title: "Manual Testing Practice",
            description: "Test a simple contact form manually. What would you check?",
            solution: "Valid inputs, invalid inputs, boundary values, error messages, form submission, data storage, user feedback, accessibility, mobile responsiveness."
          }
        ]
      },
      {
        id: "test-case-design",
        title: "Test Case Design Techniques",
        content: `Effective test case design techniques:

1. Equivalence Partitioning - Group similar inputs
2. Boundary Value Analysis - Test edge cases
3. Decision Table Testing - Test different combinations
4. State Transition Testing - Test state changes
5. Use Case Testing - Test user scenarios

Example: Testing a login form
• Valid credentials (equivalence partition)
• Invalid credentials (equivalence partition)
• Empty fields (boundary value)
• Maximum length inputs (boundary value)
• Special characters (decision table)`,
        exercises: [
          {
            id: "design-test-cases",
            title: "Design Test Cases",
            description: "Design test cases for a password reset feature",
            solution: "Valid email, invalid email, empty email, email with special characters, multiple requests, expired links, successful reset, failed reset, email format validation."
          }
        ]
      },
      {
        id: "bug-reporting",
        title: "Bug Reporting",
        content: `A good bug report should include:

1. Bug Title - Clear, concise description
2. Steps to Reproduce - Exact steps to find the bug
3. Expected Result - What should happen
4. Actual Result - What actually happens
5. Environment - Browser, OS, version
6. Severity - How critical is the bug
7. Priority - How urgent is the fix
8. Screenshots/Videos - Visual evidence

Example Bug Report:
Title: Login button not responding after invalid credentials
Steps: 1. Enter wrong password 2. Click login 3. Try to click login again
Expected: Button should be clickable
Actual: Button remains disabled
Environment: Chrome 120, Windows 10
Severity: Medium
Priority: High`,
        exercises: [
          {
            id: "write-bug-report",
            title: "Write a Bug Report",
            description: "Find a bug in a website and write a proper bug report",
            solution: "Follow the template above. Be specific, include all details, and make it reproducible."
          }
        ]
      }
    ]
  },
  automation: {
    concepts: [
      {
        id: "automation-basics",
        title: "Test Automation Fundamentals",
        content: `Test automation uses scripts to execute tests automatically.

Benefits:
• Faster execution
• Consistent results
• 24/7 availability
• Cost-effective for regression testing
• Better coverage

When to Automate:
• Repetitive tests
• Regression testing
• Data-driven tests
• Cross-browser testing
• Performance testing

When NOT to Automate:
• One-time tests
• Exploratory testing
• UI changes frequently
• Complex business logic`,
        exercises: [
          {
            id: "automation-decisions",
            title: "Automation Decisions",
            description: "For a login feature, what would you automate vs test manually?",
            solution: "Automate: Valid login, invalid login, field validation. Manual: UI appearance, user experience, accessibility, edge cases."
          }
        ]
      },
      {
        id: "automation-frameworks",
        title: "Popular Automation Frameworks",
        content: `Web Testing:
• Selenium WebDriver - Cross-browser automation
• Cypress - Modern web testing
• Playwright - Microsoft's automation tool
• TestCafe - No WebDriver needed

Mobile Testing:
• Appium - Cross-platform mobile testing
• XCUITest - iOS testing
• Espresso - Android testing

API Testing:
• Postman - Manual and automated API testing
• RestAssured - Java API testing
• Newman - Command-line Postman
• SoapUI - SOAP and REST testing

Performance Testing:
• JMeter - Load testing
• K6 - Modern performance testing
• Gatling - Scala-based performance testing`,
        exercises: [
          {
            id: "choose-framework",
            title: "Choose the Right Framework",
            description: "For a React web app with REST APIs, what frameworks would you choose?",
            solution: "Cypress or Playwright for web UI, Postman or RestAssured for APIs, JMeter for performance testing."
          }
        ]
      },
      {
        id: "selenium-basics",
        title: "Selenium WebDriver Basics",
        content: `Selenium WebDriver is the most popular web automation tool.

Basic Concepts:
• WebDriver - Interface to control browsers
• WebElement - Represents HTML elements
• Locators - Ways to find elements (ID, CSS, XPath)
• Actions - Click, type, select, etc.

Example Python Code:
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")
element = driver.find_element(By.ID, "username")
element.send_keys("testuser")
driver.quit()`,
        exercises: [
          {
            id: "selenium-practice",
            title: "Selenium Practice",
            description: "Write a Selenium script to automate login to a website",
            solution: "Use find_element to locate username/password fields, send_keys to enter data, click to submit, and assertions to verify success."
          }
        ]
      }
    ]
  }
}

// Testing Exercises Database
export const TESTING_EXERCISES = {
  fundamentals: [
    {
      id: "f1",
      title: "Testing Types Identification",
      description: "Given a banking application, identify which testing types would be most important and why.",
      difficulty: "beginner",
      solution: "Security testing (critical for banking), functional testing (transactions), performance testing (high load), usability testing (user experience), compliance testing (regulations)."
    },
    {
      id: "f2", 
      title: "Test Strategy Creation",
      description: "Create a test strategy for a social media app with 1 million users.",
      difficulty: "intermediate",
      solution: "Focus on performance testing, security testing, scalability testing, user acceptance testing, and automated regression testing for core features."
    }
  ],
  manual: [
    {
      id: "m1",
      title: "E-commerce Test Cases",
      description: "Design comprehensive test cases for an e-commerce checkout process.",
      difficulty: "beginner",
      solution: "Valid payment, invalid payment, expired cards, insufficient funds, address validation, tax calculation, shipping options, order confirmation, email notifications."
    },
    {
      id: "m2",
      title: "Mobile App Testing",
      description: "Create a test plan for a mobile banking app.",
      difficulty: "intermediate", 
      solution: "Security testing, biometric authentication, offline functionality, push notifications, different screen sizes, network conditions, app store compliance."
    }
  ],
  automation: [
    {
      id: "a1",
      title: "Selenium Test Suite",
      description: "Write a complete Selenium test suite for a login page with multiple scenarios.",
      difficulty: "beginner",
      solution: "Valid login, invalid credentials, empty fields, special characters, password reset, remember me functionality, logout."
    },
    {
      id: "a2",
      title: "API Automation",
      description: "Create automated tests for a REST API using Postman or RestAssured.",
      difficulty: "intermediate",
      solution: "GET, POST, PUT, DELETE operations, status codes, response validation, authentication, error handling, data validation."
    }
  ]
}

// User Progress Interface
export interface UserProgress {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  conceptsCompleted: string[]
  exercisesCompleted: string[]
  totalTimeSpent: number // in minutes
  lastActive: Date
  achievements: string[]
  currentStreak: number
  totalSessions: number
  completedProjects: string[]
  totalProjectsCompleted: number
  streakDays: number
}

// Initialize user progress
export function initializeProgress(language: string, level: 'beginner' | 'intermediate' | 'advanced'): UserProgress {
  return {
    language,
    level,
    conceptsCompleted: [],
    exercisesCompleted: [],
    totalTimeSpent: 0,
    lastActive: new Date(),
    achievements: [],
    currentStreak: 0,
    totalSessions: 0,
    completedProjects: [],
    totalProjectsCompleted: 0,
    streakDays: 0
  }
}

// Mark concept as completed
export function markConceptCompleted(progress: UserProgress, concept: string): UserProgress {
  return {
    ...progress,
    conceptsCompleted: [...progress.conceptsCompleted, concept],
    lastActive: new Date()
  }
}

// Mark exercise as completed
export function markExerciseCompleted(progress: UserProgress, exercise: string): UserProgress {
  return {
    ...progress,
    exercisesCompleted: [...progress.exercisesCompleted, exercise],
    lastActive: new Date()
  }
}

// Calculate progress percentage
export function getProgressPercentage(progress: UserProgress): number {
  const totalConcepts = 10 // Default total concepts per level
  const completedConcepts = progress.conceptsCompleted.length
  return Math.min((completedConcepts / totalConcepts) * 100, 100)
}

// Get testing knowledge based on language and topic
export function getTestingKnowledge(language: string, topic?: string) {
  const testingType = language.includes('fundamentals') ? 'fundamentals' : 
                     language.includes('manual') ? 'manual' : 
                     language.includes('automation') ? 'automation' : null
  
  if (!testingType) return null
  
  if (topic) {
    return TESTING_KNOWLEDGE[testingType].concepts.find(c => 
      c.id === topic || c.title.toLowerCase().includes(topic.toLowerCase())
    )
  }
  
  return TESTING_KNOWLEDGE[testingType]
}

// Get testing exercises based on language and difficulty
export function getTestingExercises(language: string, difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner') {
  const testingType = language.includes('fundamentals') ? 'fundamentals' : 
                     language.includes('manual') ? 'manual' : 
                     language.includes('automation') ? 'automation' : null
  
  if (!testingType) return []
  
  return TESTING_EXERCISES[testingType].filter(ex => ex.difficulty === difficulty)
}

// Generate testing-specific response
export function generateTestingResponse(language: string, userMessage: string, level: string): string {
  const testingType = language.includes('fundamentals') ? 'fundamentals' : 
                     language.includes('manual') ? 'manual' : 
                     language.includes('automation') ? 'automation' : null
  
  if (!testingType) return "I'd be happy to help you with testing! What specific area would you like to learn about?"
  
  const knowledge = TESTING_KNOWLEDGE[testingType]
  const exercises = getTestingExercises(language, level as 'beginner' | 'intermediate' | 'advanced')
  
  // Check if user is asking about specific concepts
  for (const concept of knowledge.concepts) {
    if (userMessage.toLowerCase().includes(concept.id.replace('-', ' ')) || 
        userMessage.toLowerCase().includes(concept.title.toLowerCase())) {
      return `${concept.content}\n\nWould you like to practice this with an exercise?`
    }
  }
  
  // Check if user wants exercises
  if (userMessage.toLowerCase().includes('exercise') || userMessage.toLowerCase().includes('practice')) {
    if (exercises.length > 0) {
      const exercise = exercises[0]
      return `Great! Here's an exercise for you:\n\n**${exercise.title}**\n${exercise.description}\n\nTry to solve this, and I'll help you with the solution!`
    }
  }
  
  // Default response based on testing type
  switch (testingType) {
    case 'fundamentals':
      return `Welcome to Testing Fundamentals! 🧪\n\nI can help you learn about:\n• What is software testing?\n• Testing principles\n• Testing levels\n• Types of testing\n\nWhat would you like to explore first?`
    case 'manual':
      return `Welcome to Manual Testing! 👨‍💻\n\nI can help you learn about:\n• Manual testing process\n• Test case design techniques\n• Bug reporting\n• Testing methodologies\n\nWhat interests you most?`
    case 'automation':
      return `Welcome to Test Automation! 🤖\n\nI can help you learn about:\n• Automation frameworks\n• Selenium WebDriver\n• API testing tools\n• When to automate\n\nWhat would you like to start with?`
    default:
      return "I'm here to help you with testing! What would you like to learn?"
  }
}
