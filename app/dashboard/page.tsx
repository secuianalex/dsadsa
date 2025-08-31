"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserPreferences } from '@/hooks/useUserPreferences'
import FavoriteLanguages from '@/components/FavoriteLanguages'
import Achievements from '@/components/Achievements'
import { calculateUserLevel } from '@/lib/achievements'

interface DashboardStats {
  lessonsCompleted: number
  streakDays: number
  languagesMastered: string[]
  perfectScores: number
  timeSpent: number
  totalPoints: number
  achievements: string[]
  recentActivity: {
    lessonId: string
    lessonTitle: string
    language: string
    completedAt: Date
    score: number
  }[]
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { preferences } = useUserPreferences()
  const [stats, setStats] = useState<DashboardStats>({
    lessonsCompleted: 0,
    streakDays: 0,
    languagesMastered: [],
    perfectScores: 0,
    timeSpent: 0,
    totalPoints: 0,
    achievements: [],
    recentActivity: []
  })
  const [showFavorites, setShowFavorites] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session?.user?.email) {
      router.push('/auth/signin')
      return
    }

    loadDashboardData()
  }, [session, status, router])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Mock data - in real app this would come from API
      const mockStats: DashboardStats = {
        lessonsCompleted: 15,
        streakDays: 5,
        languagesMastered: ['javascript'],
        perfectScores: 8,
        timeSpent: 180, // 3 hours
        totalPoints: 250,
        achievements: ['first_lesson', 'lesson_master'],
        recentActivity: [
          {
            lessonId: '1',
            lessonTitle: 'Variables and Data Types',
            language: 'javascript',
            completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            score: 100
          },
          {
            lessonId: '2',
            lessonTitle: 'Functions and Scope',
            language: 'javascript',
            completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            score: 95
          }
        ]
      }

      setStats(mockStats)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const userLevelString = calculateUserLevel(stats.totalPoints)
  const totalPoints = stats.totalPoints
  
  // Create a level object for display
  const userLevel = {
    level: userLevelString,
    title: userLevelString.charAt(0).toUpperCase() + userLevelString.slice(1),
    nextLevelPoints: userLevelString === 'bronze' ? 50 : 
                    userLevelString === 'silver' ? 200 : 
                    userLevelString === 'gold' ? 500 : 
                    userLevelString === 'platinum' ? 1000 : 2000,
    progress: userLevelString === 'bronze' ? (totalPoints / 50) * 100 :
              userLevelString === 'silver' ? ((totalPoints - 50) / 150) * 100 :
              userLevelString === 'gold' ? ((totalPoints - 200) / 300) * 100 :
              userLevelString === 'platinum' ? ((totalPoints - 500) / 500) * 100 : 100
  }

  const getLanguageIcon = (slug: string) => {
    const icons: { [key: string]: string } = {
      javascript: '⚡',
      python: '🐍',
      java: '☕',
      csharp: '🔷',
      typescript: '📘',
      react: '⚛️',
      angular: '🅰️',
      vue: '💚',
      nodejs: '🟢',
      html: '🌐',
      css: '🎨',
      ansible: '🔧'
    }
    return icons[slug.toLowerCase()] || '💻'
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {session.user.name || session.user.email}!</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFavorites(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                ⭐ Favorites
              </button>
              <button
                onClick={() => setShowAchievements(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                🏆 Achievements
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level & Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">Level {userLevel.level}</div>
                  <div className="text-sm text-gray-600">{userLevel.title}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress to next level</span>
                  <span>{totalPoints} / {userLevel.nextLevelPoints} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${userLevel.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.lessonsCompleted}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{stats.streakDays}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.perfectScores}</div>
                  <div className="text-sm text-gray-600">Perfect</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              {stats.recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getLanguageIcon(activity.language)}</span>
                        <div>
                          <div className="font-medium text-gray-900">{activity.lessonTitle}</div>
                          <div className="text-sm text-gray-600">
                            {activity.completedAt.toLocaleDateString()} • {activity.language}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          activity.score === 100 ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {activity.score}%
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">📚</div>
                  <p className="text-gray-600">No recent activity</p>
                  <Link
                    href="/languages"
                    className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Start Learning
                  </Link>
                </div>
              )}
            </div>

            {/* Mastered Languages */}
            {stats.languagesMastered.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mastered Languages</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stats.languagesMastered.map((language) => (
                    <div
                      key={language}
                      className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <span className="text-2xl">{getLanguageIcon(language)}</span>
                      <div>
                        <div className="font-medium text-green-900 capitalize">{language}</div>
                        <div className="text-sm text-green-700">Mastered</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Time</span>
                  <span className="font-medium">
                    {Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Achievements</span>
                  <span className="font-medium">{stats.achievements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-medium">{stats.languagesMastered.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Perfect Rate</span>
                  <span className="font-medium">
                    {stats.lessonsCompleted > 0 
                      ? Math.round((stats.perfectScores / stats.lessonsCompleted) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/languages"
                  className="block w-full text-left px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  📚 Continue Learning
                </Link>
                <Link
                  href="/paths"
                  className="block w-full text-left px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  🛤️ Learning Paths
                </Link>
                <button
                  onClick={() => setShowFavorites(true)}
                  className="block w-full text-left px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  ⭐ Favorite Languages
                </button>
                <button
                  onClick={() => setShowAchievements(true)}
                  className="block w-full text-left px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  🏆 View Achievements
                </button>
                <Link
                  href="/portfolio"
                  className="block w-full text-left px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  🎨 Portfolio Builder
                </Link>
                <Link
                  href="/resume"
                  className="block w-full text-left px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  📄 Resume Generator
                </Link>
                <Link
                  href="/certificates"
                  className="block w-full text-left px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  🏆 Certificates
                </Link>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <Link
                  href="/profile"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  👤 Profile Settings
                </Link>
                <Link
                  href="/preferences"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  ⚙️ Preferences
                </Link>
                <Link
                  href="/help"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  ❓ Help & Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FavoriteLanguages
        languages={[
          { slug: 'javascript', name: 'JavaScript', lessonCount: 25 },
          { slug: 'python', name: 'Python', lessonCount: 20 },
          { slug: 'html', name: 'HTML', lessonCount: 15 },
          { slug: 'css', name: 'CSS', lessonCount: 15 }
        ]}
        isVisible={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      <Achievements
        isVisible={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
    </div>
  )
}
