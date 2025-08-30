// Achievement and Certification System for Dev AI Tutor

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'learning' | 'project' | 'milestone' | 'special'
  requirements: {
    type: 'concepts_completed' | 'exercises_completed' | 'projects_completed' | 'time_spent' | 'streak_days'
    value: number
  }
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
}

export interface Certification {
  id: string
  title: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  issuedAt: Date
  score: number
  certificateNumber: string
  skills: string[]
  validUntil?: Date
}

export interface UserAchievements {
  userId: string
  achievements: Achievement[]
  totalPoints: number
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  certifications: Certification[]
  streakDays: number
  lastActivity: Date
}

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first-concept',
    title: 'First Steps',
    description: 'Complete your first programming concept',
    icon: '🌱',
    category: 'learning',
    requirements: { type: 'concepts_completed', value: 1 },
    points: 10,
    rarity: 'common'
  },
  {
    id: 'concept-master',
    title: 'Concept Master',
    description: 'Complete 10 programming concepts',
    icon: '📚',
    category: 'learning',
    requirements: { type: 'concepts_completed', value: 10 },
    points: 50,
    rarity: 'rare'
  },
  {
    id: 'exercise-champion',
    title: 'Exercise Champion',
    description: 'Complete 25 coding exercises',
    icon: '💪',
    category: 'learning',
    requirements: { type: 'exercises_completed', value: 25 },
    points: 75,
    rarity: 'epic'
  },
  {
    id: 'polyglot',
    title: 'Programming Polyglot',
    description: 'Learn concepts in 3 different programming languages',
    icon: '🌍',
    category: 'learning',
    requirements: { type: 'concepts_completed', value: 15 },
    points: 100,
    rarity: 'legendary'
  },

  // Project Achievements
  {
    id: 'first-project',
    title: 'Project Pioneer',
    description: 'Complete your first project',
    icon: '🚀',
    category: 'project',
    requirements: { type: 'projects_completed', value: 1 },
    points: 25,
    rarity: 'common'
  },
  {
    id: 'project-master',
    title: 'Project Master',
    description: 'Complete 5 projects',
    icon: '🏆',
    category: 'project',
    requirements: { type: 'projects_completed', value: 5 },
    points: 150,
    rarity: 'epic'
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Get a perfect score on any project',
    icon: '⭐',
    category: 'project',
    requirements: { type: 'projects_completed', value: 1 },
    points: 50,
    rarity: 'rare'
  },

  // Milestone Achievements
  {
    id: 'beginner-graduate',
    title: 'Beginner Graduate',
    description: 'Complete beginner level in any language',
    icon: '🎓',
    category: 'milestone',
    requirements: { type: 'projects_completed', value: 1 },
    points: 100,
    rarity: 'rare'
  },
  {
    id: 'intermediate-graduate',
    title: 'Intermediate Graduate',
    description: 'Complete intermediate level in any language',
    icon: '🎓',
    category: 'milestone',
    requirements: { type: 'projects_completed', value: 1 },
    points: 200,
    rarity: 'epic'
  },
  {
    id: 'advanced-graduate',
    title: 'Advanced Graduate',
    description: 'Complete advanced level in any language',
    icon: '🎓',
    category: 'milestone',
    requirements: { type: 'projects_completed', value: 1 },
    points: 500,
    rarity: 'legendary'
  },

  // Special Achievements
  {
    id: 'streak-master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'special',
    requirements: { type: 'streak_days', value: 7 },
    points: 75,
    rarity: 'rare'
  },
  {
    id: 'dedicated-learner',
    title: 'Dedicated Learner',
    description: 'Spend 10 hours learning',
    icon: '⏰',
    category: 'special',
    requirements: { type: 'time_spent', value: 600 }, // 10 hours in minutes
    points: 100,
    rarity: 'epic'
  }
]

// Certification templates
export const CERTIFICATION_TEMPLATES = {
  javascript: {
    beginner: {
      title: 'JavaScript Beginner Certification',
      skills: ['Variables and Data Types', 'Functions', 'Conditionals', 'Loops', 'Arrays']
    },
    intermediate: {
      title: 'JavaScript Intermediate Certification',
      skills: ['Objects and Methods', 'Async Programming', 'Error Handling', 'Modules', 'DOM Manipulation']
    },
    advanced: {
      title: 'JavaScript Advanced Certification',
      skills: ['Closures and Scope', 'Prototypes', 'Functional Programming', 'Design Patterns', 'Testing']
    }
  },
  python: {
    beginner: {
      title: 'Python Beginner Certification',
      skills: ['Variables and Types', 'Functions', 'Conditionals', 'Loops', 'Lists and Tuples']
    },
    intermediate: {
      title: 'Python Intermediate Certification',
      skills: ['Classes and Objects', 'File Handling', 'Exceptions', 'Modules', 'List Comprehensions']
    },
    advanced: {
      title: 'Python Advanced Certification',
      skills: ['Decorators', 'Generators', 'Context Managers', 'Metaclasses', 'Async/Await']
    }
  },
  java: {
    beginner: {
      title: 'Java Beginner Certification',
      skills: ['Variables and Types', 'Methods', 'Conditionals', 'Loops', 'Arrays']
    },
    intermediate: {
      title: 'Java Intermediate Certification',
      skills: ['Classes and Objects', 'Inheritance', 'Interfaces', 'Collections', 'Exceptions']
    },
    advanced: {
      title: 'Java Advanced Certification',
      skills: ['Generics', 'Multithreading', 'Reflection', 'Design Patterns', 'JUnit Testing']
    }
  },
  cpp: {
    beginner: {
      title: 'C++ Beginner Certification',
      skills: ['Variables and Types', 'Functions', 'Conditionals', 'Loops', 'Arrays']
    },
    intermediate: {
      title: 'C++ Intermediate Certification',
      skills: ['Classes and Objects', 'Pointers', 'References', 'Templates', 'File I/O']
    },
    advanced: {
      title: 'C++ Advanced Certification',
      skills: ['Smart Pointers', 'STL Containers', 'Move Semantics', 'Lambda Expressions', 'Concurrency']
    }
  },
  typescript: {
    beginner: {
      title: 'TypeScript Beginner Certification',
      skills: ['Types and Interfaces', 'Functions', 'Classes', 'Generics Basics', 'Modules']
    },
    intermediate: {
      title: 'TypeScript Intermediate Certification',
      skills: ['Advanced Types', 'Decorators', 'Async/Await', 'Error Handling', 'Testing']
    },
    advanced: {
      title: 'TypeScript Advanced Certification',
      skills: ['Conditional Types', 'Mapped Types', 'Utility Types', 'Design Patterns', 'Performance']
    }
  },
  rust: {
    beginner: {
      title: 'Rust Beginner Certification',
      skills: ['Variables and Types', 'Functions', 'Ownership', 'Structs', 'Enums']
    },
    intermediate: {
      title: 'Rust Intermediate Certification',
      skills: ['Borrowing', 'Lifetimes', 'Traits', 'Error Handling', 'Collections']
    },
    advanced: {
      title: 'Rust Advanced Certification',
      skills: ['Smart Pointers', 'Concurrency', 'Macros', 'Unsafe Rust', 'WebAssembly']
    }
  }
}

// Helper functions
export function checkAchievements(
  userProgress: {
    completedConcepts: string[]
    exercisesCompleted: number
    totalTimeSpent: number
    streakDays: number
  },
  completedProjects: number,
  currentAchievements: Achievement[]
): Achievement[] {
  const newAchievements: Achievement[] = []
  const unlockedIds = currentAchievements.map(a => a.id)

  ACHIEVEMENTS.forEach(achievement => {
    if (unlockedIds.includes(achievement.id)) return

    let shouldUnlock = false
    const req = achievement.requirements

    switch (req.type) {
      case 'concepts_completed':
        shouldUnlock = userProgress.completedConcepts.length >= req.value
        break
      case 'exercises_completed':
        shouldUnlock = userProgress.exercisesCompleted >= req.value
        break
      case 'projects_completed':
        shouldUnlock = completedProjects >= req.value
        break
      case 'time_spent':
        shouldUnlock = userProgress.totalTimeSpent >= req.value
        break
      case 'streak_days':
        shouldUnlock = userProgress.streakDays >= req.value
        break
    }

    if (shouldUnlock) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      })
    }
  })

  return newAchievements
}

export function calculateUserLevel(totalPoints: number): 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' {
  if (totalPoints >= 1000) return 'diamond'
  if (totalPoints >= 500) return 'platinum'
  if (totalPoints >= 200) return 'gold'
  if (totalPoints >= 50) return 'silver'
  return 'bronze'
}

export function generateCertificate(
  language: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  score: number,
  userId: string
): Certification {
  const template = CERTIFICATION_TEMPLATES[language as keyof typeof CERTIFICATION_TEMPLATES]?.[level]
  
  if (!template) {
    throw new Error(`No certification template found for ${language} ${level}`)
  }

  const certificateNumber = `CERT-${language.toUpperCase()}-${level.toUpperCase()}-${Date.now()}-${userId.slice(0, 8)}`

  return {
    id: Date.now().toString(),
    title: template.title,
    language,
    level,
    issuedAt: new Date(),
    score,
    certificateNumber,
    skills: template.skills,
    validUntil: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000) // 2 years
  }
}

export function getAchievementProgress(
  achievement: Achievement,
  userProgress: {
    completedConcepts: string[]
    exercisesCompleted: number
    totalTimeSpent: number
    streakDays: number
  },
  completedProjects: number
): { current: number; required: number; percentage: number } {
  const req = achievement.requirements
  let current = 0

  switch (req.type) {
    case 'concepts_completed':
      current = userProgress.completedConcepts.length
      break
    case 'exercises_completed':
      current = userProgress.exercisesCompleted
      break
    case 'projects_completed':
      current = completedProjects
      break
    case 'time_spent':
      current = userProgress.totalTimeSpent
      break
    case 'streak_days':
      current = userProgress.streakDays
      break
  }

  const percentage = Math.min((current / req.value) * 100, 100)

  return {
    current,
    required: req.value,
    percentage: Math.round(percentage)
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return 'text-gray-600'
    case 'rare': return 'text-blue-600'
    case 'epic': return 'text-purple-600'
    case 'legendary': return 'text-yellow-600'
    default: return 'text-gray-600'
  }
}

export function getRarityBackground(rarity: string): string {
  switch (rarity) {
    case 'common': return 'bg-gray-100'
    case 'rare': return 'bg-blue-100'
    case 'epic': return 'bg-purple-100'
    case 'legendary': return 'bg-yellow-100'
    default: return 'bg-gray-100'
  }
}
