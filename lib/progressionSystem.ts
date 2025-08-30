// Learning Progression & Project Graduation System for Dev AI Tutor

export interface LearningPath {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  concepts: Concept[]
  graduationRequirements: GraduationRequirements
  estimatedDuration: number // in hours
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Concept {
  id: string
  title: string
  description: string
  order: number
  prerequisites: string[]
  estimatedTime: number // in minutes
  exercisesRequired: number
  masteryThreshold: number // percentage required to complete
  tags: string[]
}

export interface GraduationRequirements {
  conceptsCompleted: number
  exercisesCompleted: number
  projectCompleted: boolean
  minimumScore: number
  totalTimeSpent: number // in minutes
  masteryLevel: number // percentage
}

export interface ProgressionStatus {
  currentConcept: string
  completedConcepts: string[]
  exercisesCompleted: number
  projectCompleted: boolean
  totalTimeSpent: number
  masteryLevel: number
  isReadyForGraduation: boolean
  graduationScore: number
  nextSteps: string[]
  estimatedTimeToGraduation: number
}

export interface GraduationCeremony {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  completionDate: Date
  finalScore: number
  timeSpent: number
  achievements: string[]
  certificate: Certificate
  nextLevelRecommendation: string
}

export interface Certificate {
  id: string
  title: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  issueDate: Date
  score: number
  validUntil: Date
  certificateUrl: string
}

// Learning Paths for Different Languages and Levels
export const LEARNING_PATHS: { [language: string]: { [level: string]: LearningPath } } = {
  javascript: {
    beginner: {
      language: 'javascript',
      level: 'beginner',
      concepts: [
        {
          id: 'getting-started',
          title: 'Getting Started with JavaScript',
          description: 'Introduction to JavaScript and basic setup',
          order: 1,
          prerequisites: [],
          estimatedTime: 30,
          exercisesRequired: 2,
          masteryThreshold: 80,
          tags: ['basics', 'setup']
        },
        {
          id: 'variables-and-data-types',
          title: 'Variables and Data Types',
          description: 'Learn about variables, strings, numbers, booleans, and arrays',
          order: 2,
          prerequisites: ['getting-started'],
          estimatedTime: 45,
          exercisesRequired: 3,
          masteryThreshold: 85,
          tags: ['variables', 'data-types', 'arrays']
        },
        {
          id: 'functions-basics',
          title: 'Functions Basics',
          description: 'Create and use functions with parameters and return values',
          order: 3,
          prerequisites: ['variables-and-data-types'],
          estimatedTime: 60,
          exercisesRequired: 4,
          masteryThreshold: 85,
          tags: ['functions', 'parameters', 'return']
        },
        {
          id: 'conditionals',
          title: 'Conditionals and Control Flow',
          description: 'Use if/else statements and switch cases for decision making',
          order: 4,
          prerequisites: ['functions-basics'],
          estimatedTime: 45,
          exercisesRequired: 3,
          masteryThreshold: 80,
          tags: ['conditionals', 'if-else', 'switch']
        },
        {
          id: 'loops',
          title: 'Loops and Iteration',
          description: 'Master for loops, while loops, and array methods',
          order: 5,
          prerequisites: ['conditionals'],
          estimatedTime: 60,
          exercisesRequired: 4,
          masteryThreshold: 85,
          tags: ['loops', 'iteration', 'arrays']
        },
        {
          id: 'objects-basics',
          title: 'Objects and Properties',
          description: 'Work with objects, properties, and methods',
          order: 6,
          prerequisites: ['loops'],
          estimatedTime: 45,
          exercisesRequired: 3,
          masteryThreshold: 80,
          tags: ['objects', 'properties', 'methods']
        }
      ],
      graduationRequirements: {
        conceptsCompleted: 6,
        exercisesCompleted: 19,
        projectCompleted: true,
        minimumScore: 75,
        totalTimeSpent: 285, // 4.75 hours
        masteryLevel: 80
      },
      estimatedDuration: 6, // hours
      difficulty: 'easy'
    },
    intermediate: {
      language: 'javascript',
      level: 'intermediate',
      concepts: [
        {
          id: 'advanced-functions',
          title: 'Advanced Functions',
          description: 'Arrow functions, closures, and higher-order functions',
          order: 1,
          prerequisites: ['functions-basics'],
          estimatedTime: 90,
          exercisesRequired: 5,
          masteryThreshold: 85,
          tags: ['arrow-functions', 'closures', 'higher-order']
        },
        {
          id: 'async-programming',
          title: 'Asynchronous Programming',
          description: 'Promises, async/await, and handling asynchronous operations',
          order: 2,
          prerequisites: ['advanced-functions'],
          estimatedTime: 120,
          exercisesRequired: 6,
          masteryThreshold: 85,
          tags: ['async', 'promises', 'await']
        },
        {
          id: 'dom-manipulation',
          title: 'DOM Manipulation',
          description: 'Interact with HTML elements and create dynamic web pages',
          order: 3,
          prerequisites: ['async-programming'],
          estimatedTime: 90,
          exercisesRequired: 5,
          masteryThreshold: 80,
          tags: ['dom', 'html', 'web']
        },
        {
          id: 'error-handling',
          title: 'Error Handling',
          description: 'Try-catch blocks and proper error management',
          order: 4,
          prerequisites: ['dom-manipulation'],
          estimatedTime: 60,
          exercisesRequired: 4,
          masteryThreshold: 80,
          tags: ['errors', 'try-catch', 'debugging']
        },
        {
          id: 'modules',
          title: 'Modules and Imports',
          description: 'ES6 modules, imports, exports, and code organization',
          order: 5,
          prerequisites: ['error-handling'],
          estimatedTime: 75,
          exercisesRequired: 4,
          masteryThreshold: 80,
          tags: ['modules', 'imports', 'exports']
        }
      ],
      graduationRequirements: {
        conceptsCompleted: 5,
        exercisesCompleted: 24,
        projectCompleted: true,
        minimumScore: 80,
        totalTimeSpent: 435, // 7.25 hours
        masteryLevel: 85
      },
      estimatedDuration: 8, // hours
      difficulty: 'medium'
    },
    advanced: {
      language: 'javascript',
      level: 'advanced',
      concepts: [
        {
          id: 'design-patterns',
          title: 'Design Patterns',
          description: 'Common design patterns and best practices',
          order: 1,
          prerequisites: ['modules'],
          estimatedTime: 120,
          exercisesRequired: 6,
          masteryThreshold: 85,
          tags: ['patterns', 'architecture', 'best-practices']
        },
        {
          id: 'testing',
          title: 'Testing and Debugging',
          description: 'Unit testing, integration testing, and debugging techniques',
          order: 2,
          prerequisites: ['design-patterns'],
          estimatedTime: 90,
          exercisesRequired: 5,
          masteryThreshold: 80,
          tags: ['testing', 'debugging', 'quality']
        },
        {
          id: 'performance',
          title: 'Performance Optimization',
          description: 'Code optimization, memory management, and performance profiling',
          order: 3,
          prerequisites: ['testing'],
          estimatedTime: 105,
          exercisesRequired: 6,
          masteryThreshold: 85,
          tags: ['performance', 'optimization', 'profiling']
        },
        {
          id: 'security',
          title: 'Security Best Practices',
          description: 'Common vulnerabilities and security measures',
          order: 4,
          prerequisites: ['performance'],
          estimatedTime: 90,
          exercisesRequired: 5,
          masteryThreshold: 85,
          tags: ['security', 'vulnerabilities', 'best-practices']
        }
      ],
      graduationRequirements: {
        conceptsCompleted: 4,
        exercisesCompleted: 22,
        projectCompleted: true,
        minimumScore: 85,
        totalTimeSpent: 405, // 6.75 hours
        masteryLevel: 90
      },
      estimatedDuration: 7, // hours
      difficulty: 'hard'
    }
  },
  python: {
    beginner: {
      language: 'python',
      level: 'beginner',
      concepts: [
        {
          id: 'getting-started',
          title: 'Getting Started with Python',
          description: 'Introduction to Python and basic setup',
          order: 1,
          prerequisites: [],
          estimatedTime: 30,
          exercisesRequired: 2,
          masteryThreshold: 80,
          tags: ['basics', 'setup']
        },
        {
          id: 'variables-and-data-types',
          title: 'Variables and Data Types',
          description: 'Learn about variables, strings, integers, floats, booleans, and lists',
          order: 2,
          prerequisites: ['getting-started'],
          estimatedTime: 45,
          exercisesRequired: 3,
          masteryThreshold: 85,
          tags: ['variables', 'data-types', 'lists']
        },
        {
          id: 'functions-basics',
          title: 'Functions Basics',
          description: 'Create and use functions with parameters and return values',
          order: 3,
          prerequisites: ['variables-and-data-types'],
          estimatedTime: 60,
          exercisesRequired: 4,
          masteryThreshold: 85,
          tags: ['functions', 'parameters', 'return']
        },
        {
          id: 'conditionals',
          title: 'Conditionals and Control Flow',
          description: 'Use if/elif/else statements for decision making',
          order: 4,
          prerequisites: ['functions-basics'],
          estimatedTime: 45,
          exercisesRequired: 3,
          masteryThreshold: 80,
          tags: ['conditionals', 'if-elif-else']
        },
        {
          id: 'loops',
          title: 'Loops and Iteration',
          description: 'Master for loops, while loops, and list comprehensions',
          order: 5,
          prerequisites: ['conditionals'],
          estimatedTime: 60,
          exercisesRequired: 4,
          masteryThreshold: 85,
          tags: ['loops', 'iteration', 'comprehensions']
        },
        {
          id: 'dictionaries',
          title: 'Dictionaries and Sets',
          description: 'Work with dictionaries, sets, and key-value pairs',
          order: 6,
          prerequisites: ['loops'],
          estimatedTime: 45,
          exercisesRequired: 3,
          masteryThreshold: 80,
          tags: ['dictionaries', 'sets', 'key-value']
        }
      ],
      graduationRequirements: {
        conceptsCompleted: 6,
        exercisesRequired: 19,
        projectCompleted: true,
        minimumScore: 75,
        totalTimeSpent: 285, // 4.75 hours
        masteryLevel: 80
      },
      estimatedDuration: 6, // hours
      difficulty: 'easy'
    }
  }
}

// Progression Management Functions
export function getLearningPath(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced'
): LearningPath | null {
  return LEARNING_PATHS[language]?.[level] || null
}

export function calculateProgressionStatus(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  completedConcepts: string[],
  exercisesCompleted: number,
  projectCompleted: boolean,
  totalTimeSpent: number
): ProgressionStatus {
  const learningPath = getLearningPath(language, level)
  if (!learningPath) {
    return {
      currentConcept: 'unknown',
      completedConcepts: [],
      exercisesCompleted: 0,
      projectCompleted: false,
      totalTimeSpent: 0,
      masteryLevel: 0,
      isReadyForGraduation: false,
      graduationScore: 0,
      nextSteps: ['Learning path not found'],
      estimatedTimeToGraduation: 0
    }
  }

  const requirements = learningPath.graduationRequirements
  const totalConcepts = learningPath.concepts.length
  
  // Calculate current concept
  const currentConceptIndex = completedConcepts.length
  const currentConcept = currentConceptIndex < totalConcepts 
    ? learningPath.concepts[currentConceptIndex].id 
    : 'completed'

  // Calculate mastery level
  const conceptProgress = (completedConcepts.length / totalConcepts) * 100
  const exerciseProgress = (exercisesCompleted / requirements.exercisesCompleted) * 100
  const timeProgress = Math.min((totalTimeSpent / requirements.totalTimeSpent) * 100, 100)
  
  const masteryLevel = Math.round((conceptProgress + exerciseProgress + timeProgress) / 3)

  // Check graduation readiness
  const isReadyForGraduation = 
    completedConcepts.length >= requirements.conceptsCompleted &&
    exercisesCompleted >= requirements.exercisesCompleted &&
    projectCompleted &&
    masteryLevel >= requirements.masteryLevel

  // Calculate graduation score
  const graduationScore = Math.round(
    (conceptProgress * 0.4) + 
    (exerciseProgress * 0.3) + 
    (timeProgress * 0.2) + 
    (projectCompleted ? 10 : 0)
  )

  // Determine next steps
  const nextSteps: string[] = []
  
  if (!isReadyForGraduation) {
    if (completedConcepts.length < requirements.conceptsCompleted) {
      const remainingConcepts = requirements.conceptsCompleted - completedConcepts.length
      nextSteps.push(`Complete ${remainingConcepts} more concept${remainingConcepts > 1 ? 's' : ''}`)
    }
    
    if (exercisesCompleted < requirements.exercisesCompleted) {
      const remainingExercises = requirements.exercisesCompleted - exercisesCompleted
      nextSteps.push(`Complete ${remainingExercises} more exercise${remainingExercises > 1 ? 's' : ''}`)
    }
    
    if (!projectCompleted) {
      nextSteps.push('Complete the final project')
    }
    
    if (masteryLevel < requirements.masteryLevel) {
      nextSteps.push(`Improve mastery level to ${requirements.masteryLevel}% (currently ${masteryLevel}%)`)
    }
  } else {
    nextSteps.push('Ready for graduation! Complete the graduation ceremony.')
  }

  // Estimate time to graduation
  let estimatedTimeToGraduation = 0
  if (!isReadyForGraduation) {
    const remainingConcepts = Math.max(0, requirements.conceptsCompleted - completedConcepts.length)
    const remainingExercises = Math.max(0, requirements.exercisesCompleted - exercisesCompleted)
    
    // Average time per concept and exercise
    const avgConceptTime = learningPath.concepts.reduce((sum, c) => sum + c.estimatedTime, 0) / learningPath.concepts.length
    const avgExerciseTime = 15 // minutes per exercise
    
    estimatedTimeToGraduation = (remainingConcepts * avgConceptTime) + (remainingExercises * avgExerciseTime)
  }

  return {
    currentConcept,
    completedConcepts,
    exercisesCompleted,
    projectCompleted,
    totalTimeSpent,
    masteryLevel,
    isReadyForGraduation,
    graduationScore,
    nextSteps,
    estimatedTimeToGraduation
  }
}

export function generateGraduationCeremony(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  finalScore: number,
  timeSpent: number,
  achievements: string[]
): GraduationCeremony {
  const certificate: Certificate = {
    id: `cert-${language}-${level}-${Date.now()}`,
    title: `${level.charAt(0).toUpperCase() + level.slice(1)} Level ${language.charAt(0).toUpperCase() + language.slice(1)} Developer`,
    language,
    level,
    issueDate: new Date(),
    score: finalScore,
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    certificateUrl: `/certificates/${language}-${level}-${Date.now()}.pdf`
  }

  const nextLevelRecommendation = getNextLevelRecommendation(language, level, finalScore)

  return {
    language,
    level,
    completionDate: new Date(),
    finalScore,
    timeSpent,
    achievements,
    certificate,
    nextLevelRecommendation
  }
}

function getNextLevelRecommendation(
  language: string,
  currentLevel: 'beginner' | 'intermediate' | 'advanced',
  score: number
): string {
  if (currentLevel === 'beginner') {
    return score >= 85 ? 'intermediate' : 'continue-practicing'
  } else if (currentLevel === 'intermediate') {
    return score >= 85 ? 'advanced' : 'continue-practicing'
  } else {
    return 'expert-level'
  }
}

export function validateGraduationRequirements(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  completedConcepts: string[],
  exercisesCompleted: number,
  projectCompleted: boolean,
  totalTimeSpent: number
): { isValid: boolean; missingRequirements: string[] } {
  const learningPath = getLearningPath(language, level)
  if (!learningPath) {
    return {
      isValid: false,
      missingRequirements: ['Learning path not found']
    }
  }

  const requirements = learningPath.graduationRequirements
  const missingRequirements: string[] = []

  if (completedConcepts.length < requirements.conceptsCompleted) {
    missingRequirements.push(`Need ${requirements.conceptsCompleted - completedConcepts.length} more concepts`)
  }

  if (exercisesCompleted < requirements.exercisesCompleted) {
    missingRequirements.push(`Need ${requirements.exercisesCompleted - exercisesCompleted} more exercises`)
  }

  if (!projectCompleted) {
    missingRequirements.push('Final project not completed')
  }

  if (totalTimeSpent < requirements.totalTimeSpent) {
    const remainingTime = requirements.totalTimeSpent - totalTimeSpent
    missingRequirements.push(`Need ${Math.ceil(remainingTime / 60)} more hours of practice`)
  }

  return {
    isValid: missingRequirements.length === 0,
    missingRequirements
  }
}

export function getConceptPrerequisites(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  conceptId: string
): string[] {
  const learningPath = getLearningPath(language, level)
  if (!learningPath) return []

  const concept = learningPath.concepts.find(c => c.id === conceptId)
  return concept?.prerequisites || []
}

export function canAccessConcept(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  conceptId: string,
  completedConcepts: string[]
): boolean {
  const prerequisites = getConceptPrerequisites(language, level, conceptId)
  return prerequisites.every(prereq => completedConcepts.includes(prereq))
}

export function getNextAvailableConcept(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  completedConcepts: string[]
): string | null {
  const learningPath = getLearningPath(language, level)
  if (!learningPath) return null

  for (const concept of learningPath.concepts) {
    if (!completedConcepts.includes(concept.id) && 
        canAccessConcept(language, level, concept.id, completedConcepts)) {
      return concept.id
    }
  }

  return null
}
