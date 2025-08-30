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
