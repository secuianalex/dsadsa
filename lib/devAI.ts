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
  role: "AI Programming Mentor",
  style: "friendly, encouraging, and technically precise",
  expertise: [
    "Programming fundamentals",
    "Web development",
    "Software architecture",
    "Best practices",
    "Debugging techniques"
  ],
  teachingApproach: {
    explanation: "Clear, step-by-step explanations with practical examples",
    feedback: "Constructive and specific guidance",
    encouragement: "Positive reinforcement and motivation"
  }
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
    totalSessions: 0
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
