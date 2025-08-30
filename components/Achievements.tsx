"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  achievements, 
  checkAchievements, 
  getAchievementProgress, 
  getAchievementsByCategory, 
  calculateTotalPoints, 
  getUserLevel 
} from '@/lib/achievements'

interface AchievementsProps {
  isVisible: boolean
  onClose?: () => void
}

interface UserProgress {
  lessonsCompleted: number
  streakDays: number
  languagesMastered: string[]
  perfectScores: number
  timeSpent: number
  totalPoints: number
  achievements: string[]
}

export default function Achievements({ isVisible, onClose }: AchievementsProps) {
  const { data: session, status } = useSession()
  const [userProgress, setUserProgress] = useState<UserProgress>({
    lessonsCompleted: 0,
    streakDays: 0,
    languagesMastered: [],
    perfectScores: 0,
    timeSpent: 0,
    totalPoints: 0,
    achievements: []
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)
  const [newAchievements, setNewAchievements] = useState<any[]>([])

  useEffect(() => {
    if (!isVisible || status === 'loading' || !session?.user?.email) return

    // Load user progress (this would come from API in real app)
    loadUserProgress()
  }, [isVisible, status, session?.user?.email])

  const loadUserProgress = async () => {
    try {
      // Mock data - in real app this would come from API
      const mockProgress: UserProgress = {
        lessonsCompleted: 15,
        streakDays: 5,
        languagesMastered: ['javascript'],
        perfectScores: 8,
        timeSpent: 180, // 3 hours
        totalPoints: 250,
        achievements: ['first_lesson', 'lesson_master']
      }

      setUserProgress(mockProgress)

      // Check for new achievements
      const unlocked = checkAchievements(mockProgress)
      if (unlocked.length > 0) {
        setNewAchievements(unlocked)
      }
    } catch (error) {
      console.error('Error loading user progress:', error)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪'
      case 'rare': return '🔵'
      case 'epic': return '🟣'
      case 'legendary': return '🟡'
      default: return '⚪'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return '📚'
      case 'streak': return '🔥'
      case 'mastery': return '🏆'
      case 'social': return '👥'
      case 'special': return '⭐'
      default: return '📋'
    }
  }

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) {
      return false
    }
    if (showUnlockedOnly && !userProgress.achievements.includes(achievement.id)) {
      return false
    }
    return true
  })

  const userLevel = getUserLevel(userProgress.totalPoints)
  const totalPoints = calculateTotalPoints(userProgress.achievements)

  if (!isVisible) return null

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏆</span>
          <span className="font-medium text-gray-700">Achievements</span>
          {newAchievements.length > 0 && (
            <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full animate-pulse">
              {newAchievements.length} New!
            </span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* User Level & Stats */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Level */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">Level {userLevel.level}</div>
            <div className="text-sm text-gray-600">{userLevel.title}</div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${userLevel.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {totalPoints} / {userLevel.nextLevelPoints} points
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userProgress.lessonsCompleted}</div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
            <div className="text-xs text-gray-500 mt-1">
              {userProgress.perfectScores} perfect scores
            </div>
          </div>

          {/* Streak */}
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{userProgress.streakDays}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.floor(userProgress.timeSpent / 60)}h {userProgress.timeSpent % 60}m total
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="learning">Learning</option>
            <option value="streak">Streak</option>
            <option value="mastery">Mastery</option>
            <option value="social">Social</option>
            <option value="special">Special</option>
          </select>

          {/* Show Unlocked Only */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showUnlockedOnly}
              onChange={(e) => setShowUnlockedOnly(e.target.checked)}
              className="rounded"
            />
            Show unlocked only
          </label>

          {/* Stats */}
          <div className="ml-auto text-sm text-gray-600">
            {userProgress.achievements.length} / {achievements.length} unlocked
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => {
            const progress = getAchievementProgress(achievement, userProgress)
            const isUnlocked = userProgress.achievements.includes(achievement.id)
            const isNew = newAchievements.some(a => a.id === achievement.id)

            return (
              <div
                key={achievement.id}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  isUnlocked 
                    ? 'bg-green-50 border-green-200 shadow-sm' 
                    : 'bg-gray-50 border-gray-200 opacity-75'
                } ${isNew ? 'ring-2 ring-yellow-400 animate-pulse' : ''}`}
              >
                {/* Achievement Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{achievement.title}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{getRarityIcon(achievement.rarity)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isUnlocked && (
                    <span className="text-green-500 text-lg">✓</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{progress.current} / {progress.required}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isUnlocked ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Points */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {getCategoryIcon(achievement.category)} {achievement.category}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    +{achievement.points} pts
                  </span>
                </div>

                {/* New Achievement Badge */}
                {isNew && (
                  <div className="mt-2 text-center">
                    <span className="inline-block px-2 py-1 text-xs bg-yellow-500 text-white rounded-full animate-bounce">
                      🎉 New Achievement!
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">🏆</div>
            <p className="text-gray-600">No achievements found with current filters</p>
          </div>
        )}
      </div>

      {/* New Achievements Celebration */}
      {newAchievements.length > 0 && (
        <div className="p-4 bg-yellow-50 border-t border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">🎉 New Achievements Unlocked!</h4>
          <div className="flex flex-wrap gap-2">
            {newAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-2 px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-full text-sm"
              >
                <span>{achievement.icon}</span>
                <span className="font-medium">{achievement.title}</span>
                <span className="text-yellow-600">+{achievement.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
