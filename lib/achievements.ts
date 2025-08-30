interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'learning' | 'streak' | 'mastery' | 'social' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  requirements: {
    type: 'lessons_completed' | 'streak_days' | 'languages_mastered' | 'perfect_scores' | 'time_spent' | 'custom'
    value: number
    language?: string
  }
  points: number
  unlockedAt?: Date
}

interface UserProgress {
  lessonsCompleted: number
  streakDays: number
  languagesMastered: string[]
  perfectScores: number
  timeSpent: number // in minutes
  totalPoints: number
  achievements: string[]
}

// Achievement database
export const achievements: Achievement[] = [
  // Learning Achievements
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'learning',
    rarity: 'common',
    requirements: { type: 'lessons_completed', value: 1 },
    points: 10
  },
  {
    id: 'lesson_master',
    title: 'Lesson Master',
    description: 'Complete 10 lessons',
    icon: '📚',
    category: 'learning',
    rarity: 'common',
    requirements: { type: 'lessons_completed', value: 10 },
    points: 50
  },
  {
    id: 'dedicated_learner',
    title: 'Dedicated Learner',
    description: 'Complete 50 lessons',
    icon: '🎓',
    category: 'learning',
    rarity: 'rare',
    requirements: { type: 'lessons_completed', value: 50 },
    points: 200
  },
  {
    id: 'learning_champion',
    title: 'Learning Champion',
    description: 'Complete 100 lessons',
    icon: '🏆',
    category: 'learning',
    rarity: 'epic',
    requirements: { type: 'lessons_completed', value: 100 },
    points: 500
  },

  // Streak Achievements
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
    requirements: { type: 'streak_days', value: 7 },
    points: 100
  },
  {
    id: 'month_master',
    title: 'Month Master',
    description: 'Maintain a 30-day learning streak',
    icon: '⚡',
    category: 'streak',
    rarity: 'rare',
    requirements: { type: 'streak_days', value: 30 },
    points: 300
  },
  {
    id: 'streak_legend',
    title: 'Streak Legend',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    category: 'streak',
    rarity: 'legendary',
    requirements: { type: 'streak_days', value: 100 },
    points: 1000
  },

  // Mastery Achievements
  {
    id: 'javascript_master',
    title: 'JavaScript Master',
    description: 'Complete all JavaScript lessons',
    icon: '⚡',
    category: 'mastery',
    rarity: 'rare',
    requirements: { type: 'languages_mastered', value: 1, language: 'javascript' },
    points: 300
  },
  {
    id: 'python_master',
    title: 'Python Master',
    description: 'Complete all Python lessons',
    icon: '🐍',
    category: 'mastery',
    rarity: 'rare',
    requirements: { type: 'languages_mastered', value: 1, language: 'python' },
    points: 300
  },
  {
    id: 'polyglot',
    title: 'Polyglot',
    description: 'Master 3 different programming languages',
    icon: '🌍',
    category: 'mastery',
    rarity: 'epic',
    requirements: { type: 'languages_mastered', value: 3 },
    points: 800
  },
  {
    id: 'language_grandmaster',
    title: 'Language Grandmaster',
    description: 'Master 5 different programming languages',
    icon: '🏛️',
    category: 'mastery',
    rarity: 'legendary',
    requirements: { type: 'languages_mastered', value: 5 },
    points: 1500
  },

  // Perfect Score Achievements
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Get perfect scores on 10 lessons',
    icon: '💎',
    category: 'learning',
    rarity: 'rare',
    requirements: { type: 'perfect_scores', value: 10 },
    points: 200
  },
  {
    id: 'flawless_execution',
    title: 'Flawless Execution',
    description: 'Get perfect scores on 50 lessons',
    icon: '✨',
    category: 'learning',
    rarity: 'epic',
    requirements: { type: 'perfect_scores', value: 50 },
    points: 600
  },

  // Time Spent Achievements
  {
    id: 'hour_learner',
    title: 'Hour Learner',
    description: 'Spend 1 hour learning',
    icon: '⏰',
    category: 'learning',
    rarity: 'common',
    requirements: { type: 'time_spent', value: 60 },
    points: 50
  },
  {
    id: 'dedicated_hours',
    title: 'Dedicated Hours',
    description: 'Spend 10 hours learning',
    icon: '📅',
    category: 'learning',
    rarity: 'rare',
    requirements: { type: 'time_spent', value: 600 },
    points: 250
  },
  {
    id: 'time_master',
    title: 'Time Master',
    description: 'Spend 100 hours learning',
    icon: '⏳',
    category: 'learning',
    rarity: 'epic',
    requirements: { type: 'time_spent', value: 6000 },
    points: 1000
  },

  // Special Achievements
  {
    id: 'early_adopter',
    title: 'Early Adopter',
    description: 'Join during the beta phase',
    icon: '🚀',
    category: 'special',
    rarity: 'legendary',
    requirements: { type: 'custom', value: 1 },
    points: 500
  },
  {
    id: 'bug_hunter',
    title: 'Bug Hunter',
    description: 'Report a helpful bug or suggestion',
    icon: '🐛',
    category: 'special',
    rarity: 'rare',
    requirements: { type: 'custom', value: 1 },
    points: 150
  }
]

// Check if user has unlocked new achievements
export function checkAchievements(userProgress: UserProgress): Achievement[] {
  const unlockedAchievements: Achievement[] = []
  const userAchievements = new Set(userProgress.achievements)

  for (const achievement of achievements) {
    if (userAchievements.has(achievement.id)) continue

    let isUnlocked = false

    switch (achievement.requirements.type) {
      case 'lessons_completed':
        isUnlocked = userProgress.lessonsCompleted >= achievement.requirements.value
        break

      case 'streak_days':
        isUnlocked = userProgress.streakDays >= achievement.requirements.value
        break

      case 'languages_mastered':
        if (achievement.requirements.language) {
          isUnlocked = userProgress.languagesMastered.includes(achievement.requirements.language)
        } else {
          isUnlocked = userProgress.languagesMastered.length >= achievement.requirements.value
        }
        break

      case 'perfect_scores':
        isUnlocked = userProgress.perfectScores >= achievement.requirements.value
        break

      case 'time_spent':
        isUnlocked = userProgress.timeSpent >= achievement.requirements.value
        break

      case 'custom':
        // Custom achievements are manually awarded
        isUnlocked = false
        break
    }

    if (isUnlocked) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      })
    }
  }

  return unlockedAchievements
}

// Get achievement progress for a specific achievement
export function getAchievementProgress(achievement: Achievement, userProgress: UserProgress): {
  current: number
  required: number
  percentage: number
  isCompleted: boolean
} {
  let current = 0

  switch (achievement.requirements.type) {
    case 'lessons_completed':
      current = userProgress.lessonsCompleted
      break
    case 'streak_days':
      current = userProgress.streakDays
      break
    case 'languages_mastered':
      if (achievement.requirements.language) {
        current = userProgress.languagesMastered.includes(achievement.requirements.language) ? 1 : 0
      } else {
        current = userProgress.languagesMastered.length
      }
      break
    case 'perfect_scores':
      current = userProgress.perfectScores
      break
    case 'time_spent':
      current = userProgress.timeSpent
      break
    case 'custom':
      current = 0
      break
  }

  const required = achievement.requirements.value
  const percentage = Math.min((current / required) * 100, 100)
  const isCompleted = current >= required

  return { current, required, percentage, isCompleted }
}

// Get achievements by category
export function getAchievementsByCategory(category: string): Achievement[] {
  return achievements.filter(achievement => achievement.category === category)
}

// Get achievements by rarity
export function getAchievementsByRarity(rarity: string): Achievement[] {
  return achievements.filter(achievement => achievement.rarity === rarity)
}

// Calculate total points from achievements
export function calculateTotalPoints(unlockedAchievements: string[]): number {
  return achievements
    .filter(achievement => unlockedAchievements.includes(achievement.id))
    .reduce((total, achievement) => total + achievement.points, 0)
}

// Get user level based on total points
export function getUserLevel(totalPoints: number): {
  level: number
  title: string
  nextLevelPoints: number
  progress: number
} {
  const levels = [
    { level: 1, title: 'Novice', points: 0 },
    { level: 2, title: 'Apprentice', points: 100 },
    { level: 3, title: 'Student', points: 300 },
    { level: 4, title: 'Scholar', points: 600 },
    { level: 5, title: 'Expert', points: 1000 },
    { level: 6, title: 'Master', points: 1500 },
    { level: 7, title: 'Grandmaster', points: 2500 },
    { level: 8, title: 'Legend', points: 4000 },
    { level: 9, title: 'Mythic', points: 6000 },
    { level: 10, title: 'Divine', points: 10000 }
  ]

  let currentLevel = levels[0]
  let nextLevel = levels[1]

  for (let i = 0; i < levels.length - 1; i++) {
    if (totalPoints >= levels[i].points && totalPoints < levels[i + 1].points) {
      currentLevel = levels[i]
      nextLevel = levels[i + 1]
      break
    }
  }

  if (totalPoints >= levels[levels.length - 1].points) {
    currentLevel = levels[levels.length - 1]
    nextLevel = { ...currentLevel, points: currentLevel.points }
  }

  const progress = nextLevel.points > currentLevel.points 
    ? ((totalPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100
    : 100

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    nextLevelPoints: nextLevel.points,
    progress: Math.min(progress, 100)
  }
}
