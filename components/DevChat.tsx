"use client"

import { useState, useRef, useEffect } from "react"
import {
  DevMessage, LearningSession, DEV_PERSONALITY, UserProgress,
  initializeProgress, markConceptCompleted, markExerciseCompleted, getProgressPercentage
} from "@/lib/devAI"
import { Project, getProjectsForLanguage } from "@/lib/projects"
import {
  Achievement, checkAchievements, calculateUserLevel, generateCertificate, ACHIEVEMENTS
} from "@/lib/achievements"
import { StudyGroup, SAMPLE_STUDY_GROUPS, getGroupRecommendations } from "@/lib/collaboration"
import { CodeAnalysis } from "@/lib/codeAnalysis"
import { TeachingContext } from "@/lib/teachingSystem"
import { ExerciseResult } from "@/lib/exerciseSystem"
import { calculateProgressionStatus } from "@/lib/progressionSystem"
import { CodeExecutionResult } from "@/lib/openai"
import ProjectSelector from "./ProjectSelector"
import ProjectWorkspace from "./ProjectWorkspace"
import AchievementDisplay from "./AchievementDisplay"
import StudyGroupBrowser from "./StudyGroupBrowser"
import CodeAnalyzer from "./CodeAnalyzer"
import InteractiveExercise from "./InteractiveExercise"
import ProgressionDashboard from "./ProgressionDashboard"
import GraduationCeremony from "./GraduationCeremony"
import CodeExecutor from "./CodeExecutor"

interface DevChatProps {
  language?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
}

const SUPPORTED_LANGUAGES = [
  // Core Web Technologies
  'html', 'css', 'javascript', 'typescript',
  
  // Popular Programming Languages
  'python', 'java', 'csharp', 'c', 'cpp', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'dart',
  
  // Functional & Modern Languages
  'scala', 'haskell', 'elixir', 'clojure', 'fsharp', 'ocaml', 'erlang',
  
  // Data & Analytics
  'r', 'matlab', 'julia', 'sas', 'stata',
  
  // Database & Query Languages
  'sql', 'plsql', 'tsql', 'mongodb', 'graphql',
  
  // Scripting & Automation
  'bash', 'powershell', 'perl', 'lua', 'groovy', 'vbscript',
  
  // Mobile & Cross-platform
  'react-native', 'flutter', 'xamarin', 'ionic',
  
  // Web Frameworks & Libraries
  'react', 'vuejs', 'angular', 'nodejs', 'expressjs', 'django', 'flask', 'laravel', 'spring',
  
  // Cloud & DevOps
  'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'git',
  
  // Game Development
  'unity', 'unreal-engine', 'godot', 'gamemaker',
  
  // AI & Machine Learning
  'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
  
  // Low-level & Embedded
  'assembly', 'vhdl', 'verilog', 'arduino', 'raspberry-pi',
  
  // Other Popular Technologies
  'svelte', 'nextjs', 'nuxtjs', 'gatsby', 'webpack', 'babel', 'eslint', 'prettier'
]

export default function DevChat({ language = 'javascript', level = 'beginner' }: DevChatProps) {
  const [messages, setMessages] = useState<DevMessage[]>(() => [
    {
      id: '1',
      type: 'dev',
      content: `Hey there! I'm Dev, your AI programming tutor! 🚀\n\nI see you're learning ${language} at the ${level} level. I'm here to guide you through your coding journey step by step.\n\nWhat would you like to learn first?\n• Variables and Data Types\n• Functions\n• Conditionals\n• Loops\n• Data Structures\n\nJust tell me what interests you, or ask me to explain any concept!`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [codeValue, setCodeValue] = useState("")
  const [codeOutput, setCodeOutput] = useState("")
  const [isRunningCode, setIsRunningCode] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress>(() =>
    initializeProgress(language, level)
  )
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [selectedLevel, setSelectedLevel] = useState(level)
  const [currentView, setCurrentView] = useState<'chat' | 'projects' | 'project-workspace' | 'achievements' | 'study-groups' | 'code-analysis' | 'exercise' | 'progression' | 'graduation' | 'code-executor'>('chat')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Teaching system state
  const [teachingContext, setTeachingContext] = useState<TeachingContext>({
    language: selectedLanguage,
    level: selectedLevel,
    currentConcept: 'variables-and-data-types',
    sessionStartTime: new Date(),
    totalTimeSpent: 0,
    completedConcepts: [],
    exercisesCompleted: 0,
    lastActivity: new Date(),
    userPreferences: {
      learningStyle: 'hands-on',
      pace: 'normal',
      difficulty: 'adaptive'
    }
  })

  // Achievement system state
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [userLevel, setUserLevel] = useState(1)
  const [showAchievement, setShowAchievement] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  // Collaboration system state
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(SAMPLE_STUDY_GROUPS)
  const [userGroups, setUserGroups] = useState<StudyGroup[]>([])

  // Code analysis state
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null)
  const [showCodeAnalysis, setShowCodeAnalysis] = useState(false)

  // Exercise system state
  const [currentExercise, setCurrentExercise] = useState<ExerciseResult | null>(null)
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseResult[]>([])

  // Progression system state
  const [progressionStatus, setProgressionStatus] = useState(() => 
    calculateProgressionStatus(selectedLanguage, selectedLevel, userProgress)
  )

  // Code execution state
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null)

  // Update selected language and level when props change
  useEffect(() => {
    setSelectedLanguage(language)
    setSelectedLevel(level)
  }, [language, level])

  useEffect(() => {
    setUserProgress(initializeProgress(selectedLanguage, selectedLevel))
    setTeachingContext(prev => ({
      ...prev,
      language: selectedLanguage,
      level: selectedLevel,
      currentConcept: 'getting-started',
      completedConcepts: []
    }))
  }, [selectedLanguage, selectedLevel])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue("")
    setIsLoading(true)

    // Add user message to chat
    const newUserMessage: DevMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])

    // Check for special commands
    if (userMessage.toLowerCase().includes('show projects') || userMessage.toLowerCase().includes('projects')) {
      setCurrentView('projects')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('show achievements') || userMessage.toLowerCase().includes('achievements')) {
      setCurrentView('achievements')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('show study groups') || userMessage.toLowerCase().includes('collaboration')) {
      setCurrentView('study-groups')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('analyze code') || userMessage.toLowerCase().includes('code analysis')) {
      setCurrentView('code-analysis')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('exercise') || userMessage.toLowerCase().includes('practice')) {
      setCurrentView('exercise')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('progression') || userMessage.toLowerCase().includes('progress')) {
      setCurrentView('progression')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('graduation') || userMessage.toLowerCase().includes('graduate')) {
      setCurrentView('graduation')
      setIsLoading(false)
      return
    }

    if (userMessage.toLowerCase().includes('code editor') || userMessage.toLowerCase().includes('run code') || userMessage.toLowerCase().includes('execute code')) {
      setCurrentView('code-executor')
      setIsLoading(false)
      return
    }

    try {
      const session: LearningSession = {
        selectedLanguage,
        selectedLevel,
        totalTimeSpent: teachingContext.totalTimeSpent,
        completedConcepts: userProgress.completedConcepts,
        exercisesCompleted: userProgress.exercisesCompleted,
        streakDays: userProgress.streakDays || 0
      }

      const response = await fetch('/api/dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          session,
          teachingContext,
          userProgress
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Dev')
      }

      const data = await response.json()

      // Update teaching context
      if (data.teachingContext) {
        setTeachingContext(data.teachingContext)
      }

      // Update user progress
      if (data.userProgress) {
        setUserProgress(data.userProgress)
      }

      // Check for new achievements
      if (data.userProgress) {
        const newAchievements = checkAchievements(data.userProgress)
        if (newAchievements.length > 0) {
          setNewAchievement(newAchievements[0])
          setShowAchievement(true)
          setAchievements(prev => [...prev, ...newAchievements])
        }
        setUserLevel(calculateUserLevel(data.userProgress))
      }

      // Add Dev's response
      const devMessage: DevMessage = {
        id: (Date.now() + 1).toString(),
        type: 'dev',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, devMessage])

    } catch (error) {
      console.error('Error communicating with Dev:', error)
      
      const errorMessage: DevMessage = {
        id: (Date.now() + 1).toString(),
        type: 'dev',
        content: "I'm having trouble connecting right now. Let me try to help you with what I know about programming!",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    setCurrentView('project-workspace')
  }

  const handleProjectComplete = async (project: Project, code: string) => {
    // Mark project as completed
    const updatedProgress = {
      ...userProgress,
      completedProjects: [...userProgress.completedProjects, project.id],
      totalProjectsCompleted: userProgress.totalProjectsCompleted + 1
    }
    setUserProgress(updatedProgress)

    // Check for achievements
    const newAchievements = checkAchievements(updatedProgress)
    if (newAchievements.length > 0) {
      setNewAchievement(newAchievements[0])
      setShowAchievement(true)
      setAchievements(prev => [...prev, ...newAchievements])
    }

    // Return to chat
    setCurrentView('chat')
    setSelectedProject(null)

    // Add completion message
    const completionMessage: DevMessage = {
      id: Date.now().toString(),
      type: 'dev',
      content: `🎉 Congratulations! You've completed the "${project.title}" project! This is a great step forward in your ${selectedLanguage} journey. Keep up the excellent work!`,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, completionMessage])
  }

  const handleCodeAnalysis = (code: string) => {
    // This would integrate with the code analysis system
    setShowCodeAnalysis(true)
  }

  const handleExerciseComplete = (result: ExerciseResult) => {
    setExerciseHistory(prev => [...prev, result])
    
    // Update progress
    const updatedProgress = {
      ...userProgress,
      exercisesCompleted: userProgress.exercisesCompleted + 1,
      totalExercisesCompleted: userProgress.totalExercisesCompleted + 1
    }
    setUserProgress(updatedProgress)

    // Check for achievements
    const newAchievements = checkAchievements(updatedProgress)
    if (newAchievements.length > 0) {
      setNewAchievement(newAchievements[0])
      setShowAchievement(true)
      setAchievements(prev => [...prev, ...newAchievements])
    }

    setCurrentView('chat')
  }

  const handleExecutionComplete = (result: CodeExecutionResult) => {
    setExecutionResult(result)
  }

  const handleCodeChange = (code: string) => {
    setCodeValue(code)
  }

  const handleBackToChat = () => {
    setCurrentView('chat')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Dev - AI Programming Tutor
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Teaching {selectedLanguage} • {selectedLevel} level
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'chat' && (
          <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Dev anything about programming..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setCurrentView('projects')}
                  className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                >
                  📁 Projects
                </button>
                <button
                  onClick={() => setCurrentView('exercise')}
                  className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800"
                >
                  💪 Exercises
                </button>
                <button
                  onClick={() => setCurrentView('code-executor')}
                  className="px-3 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800"
                >
                  🚀 Code Editor
                </button>
                <button
                  onClick={() => setCurrentView('progression')}
                  className="px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800"
                >
                  📊 Progress
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'projects' && (
          <ProjectSelector
            language={selectedLanguage}
            level={selectedLevel}
            onProjectSelect={handleProjectSelect}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'project-workspace' && selectedProject && (
          <ProjectWorkspace
            project={selectedProject}
            onComplete={handleProjectComplete}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'achievements' && (
          <AchievementDisplay
            achievements={achievements}
            userLevel={userLevel}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'study-groups' && (
          <StudyGroupBrowser
            groups={studyGroups}
            userGroups={userGroups}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'code-analysis' && (
          <CodeAnalyzer
            language={selectedLanguage}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'exercise' && (
          <InteractiveExercise
            language={selectedLanguage}
            level={selectedLevel}
            onComplete={handleExerciseComplete}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'progression' && (
          <ProgressionDashboard
            language={selectedLanguage}
            level={selectedLevel}
            progress={userProgress}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'graduation' && (
          <GraduationCeremony
            language={selectedLanguage}
            level={selectedLevel}
            progress={userProgress}
            onBack={handleBackToChat}
          />
        )}

        {currentView === 'code-executor' && (
          <CodeExecutor
            language={selectedLanguage}
            onExecutionComplete={handleExecutionComplete}
            onCodeChange={handleCodeChange}
            onBack={handleBackToChat}
          />
        )}
      </div>

      {/* Achievement Notification */}
      {showAchievement && newAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Achievement Unlocked!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {newAchievement.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {newAchievement.description}
              </p>
              <button
                onClick={() => setShowAchievement(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
