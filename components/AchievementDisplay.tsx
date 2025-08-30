"use client"

import { useState } from "react"
import { 
  Achievement, 
  Certification, 
  getAchievementProgress, 
  getRarityColor, 
  getRarityBackground,
  ACHIEVEMENTS 
} from "@/lib/achievements"

interface AchievementDisplayProps {
  userProgress: {
    completedConcepts: string[]
    exercisesCompleted: number
    totalTimeSpent: number
    streakDays: number
  }
  completedProjects: number
  unlockedAchievements: Achievement[]
  certifications: Certification[]
  totalPoints: number
  userLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
}

export default function AchievementDisplay({
  userProgress,
  completedProjects,
  unlockedAchievements,
  certifications,
  totalPoints,
  userLevel
}: AchievementDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'learning' | 'project' | 'milestone' | 'special'>('all')
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'bronze': return '🥉'
      case 'silver': return '🥈'
      case 'gold': return '🥇'
      case 'platinum': return '💎'
      case 'diamond': return '💠'
      default: return '🥉'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'text-amber-600'
      case 'silver': return 'text-gray-600'
      case 'gold': return 'text-yellow-600'
      case 'platinum': return 'text-blue-600'
      case 'diamond': return 'text-purple-600'
      default: return 'text-amber-600'
    }
  }

  const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false
    if (showUnlockedOnly) {
      return unlockedAchievements.some(unlocked => unlocked.id === achievement.id)
    }
    return true
  })

  const unlockedIds = unlockedAchievements.map(a => a.id)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
            <div className="text-sm opacity-90">Achievements</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{certifications.length}</div>
            <div className="text-sm opacity-90">Certifications</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{getLevelIcon(userLevel)}</div>
            <div className={`text-sm font-medium ${getLevelColor(userLevel)}`}>
              {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'learning', 'project', 'milestone', 'special'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : 
               category === 'learning' ? '📚 Learning' :
               category === 'project' ? '🚀 Projects' :
               category === 'milestone' ? '🎓 Milestones' : '⭐ Special'}
            </button>
          ))}
        </div>
        
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showUnlockedOnly}
            onChange={(e) => setShowUnlockedOnly(e.target.checked)}
            className="rounded"
          />
          Show unlocked only
        </label>
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => {
          const isUnlocked = unlockedIds.includes(achievement.id)
          const progress = getAchievementProgress(achievement, userProgress, completedProjects)
          
          return (
            <div
              key={achievement.id}
              className={`bg-white rounded-lg border-2 p-4 transition-all duration-200 ${
                isUnlocked 
                  ? 'border-green-200 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Achievement Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${isUnlocked ? '' : 'opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs ${getRarityColor(achievement.rarity)} font-medium`}>
                      {achievement.rarity.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${isUnlocked ? 'text-green-600' : 'text-gray-400'}`}>
                    {achievement.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm mb-3 ${isUnlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                {achievement.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{progress.current}/{progress.required}</span>
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

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${
                  isUnlocked ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {isUnlocked ? '✅ Unlocked' : `${progress.percentage}% Complete`}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityBackground(achievement.rarity)} ${getRarityColor(achievement.rarity)}`}>
                  {achievement.category}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Certifications</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                      <p className="text-sm text-gray-500">{cert.language} • {cert.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{cert.score}/100</div>
                    <div className="text-xs text-gray-500">score</div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <p className="text-xs text-gray-500">
                    <strong>Issued:</strong> {cert.issuedAt.toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Certificate #:</strong> {cert.certificateNumber}
                  </p>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{cert.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button className="w-full px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                  View Certificate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Achievements Found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or keep learning to unlock more achievements!
          </p>
        </div>
      )}
    </div>
  )
}
