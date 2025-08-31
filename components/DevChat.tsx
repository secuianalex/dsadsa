"use client"

import { useState, useRef, useEffect } from "react"
import {
  DevMessage, LearningSession, DEV_PERSONALITY, UserProgress,
  initializeProgress, markConceptCompleted, markExerciseCompleted, getProgressPercentage,
  TESTING_KNOWLEDGE, TESTING_EXERCISES, generateTestingResponse
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
  'svelte', 'nextjs', 'nuxtjs', 'gatsby', 'webpack', 'babel', 'eslint', 'prettier',
  
  // Testing Technologies
  'testing-fundamentals', 'manual-testing', 'automation-testing'
]

export default function DevChat({ language = 'javascript', level = 'beginner' }: DevChatProps) {
     const getWelcomeMessage = (lang: string, level: string) => {
     const isTestingLanguage = ['testing-fundamentals', 'manual-testing', 'automation-testing'].includes(lang)
     
     if (isTestingLanguage) {
       return `Welcome! I'm Dev, your AI testing tutor! [TEST]\n\nI'll guide you through your testing journey step by step. Before we begin, I'd like to understand your background so I can teach you most effectively.\n\nLet's start with a few questions:\n\n1. Have you ever done any software testing before?\n2. What's your experience with programming or software development?\n3. What do you hope to achieve by learning testing?\n\nDon't worry if you're completely new to this - I'll start from the very beginning and build up your knowledge systematically!\n\n**Just answer each question naturally, and I'll create a personalized learning plan just for you!**`
     } else {
       return `Welcome! I'm Dev, your AI programming tutor! [ROCKET]\n\nI'll guide you through your programming journey step by step. Before we begin, I'd like to understand your background so I can teach you most effectively.\n\nLet's start with a few questions:\n\n1. Have you ever written code before?\n2. What programming languages (if any) are you familiar with?\n3. What do you want to build or accomplish with programming?\n\nDon't worry if you're completely new to this - I'll start from the very beginning and build up your knowledge systematically!\n\n**Just answer each question naturally, and I'll create a personalized learning plan just for you!**`
     }
   }

  const [messages, setMessages] = useState<DevMessage[]>(() => [
    {
      id: '1',
      type: 'dev',
      content: getWelcomeMessage(language, level),
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [codeValue, setCodeValue] = useState("")
  const [codeOutput, setCodeOutput] = useState("")
  const [isRunningCode, setIsRunningCode] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }
  
  const [userProgress, setUserProgress] = useState<UserProgress>(() =>
    initializeProgress(language, level)
  )
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [selectedLevel, setSelectedLevel] = useState(level)
  const [currentView, setCurrentView] = useState<'chat' | 'projects' | 'project-workspace' | 'achievements' | 'study-groups' | 'code-analysis' | 'exercise' | 'progression' | 'graduation' | 'code-executor'>('chat')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  // Proactive teaching state
  const [teachingPhase, setTeachingPhase] = useState<'assessment' | 'learning' | 'practice' | 'review'>('assessment')
  const [assessmentAnswers, setAssessmentAnswers] = useState<{
    experience: string
    languages: string
    goals: string
    learningStyle: 'hands-on' | 'visual' | 'theoretical'
    pace: 'slow' | 'normal' | 'fast'
  }>({
    experience: '',
    languages: '',
    goals: '',
    learningStyle: 'hands-on',
    pace: 'normal'
  })
  const [currentAssessmentQuestion, setCurrentAssessmentQuestion] = useState(0)
  
  // Lesson system state
  const [currentLesson, setCurrentLesson] = useState(0)
  const [lessonProgress, setLessonProgress] = useState<'concept' | 'exercise' | 'review' | 'next'>('concept')
  const [currentExercise, setCurrentExercise] = useState<any>(null)
  const [exerciseAttempts, setExerciseAttempts] = useState(0)
  const [lessonCompleted, setLessonCompleted] = useState(false)

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
      showExamples: true,
      showExercises: true
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
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseResult[]>([])

  // Progression system state
    const [progressionStatus, setProgressionStatus] = useState(() =>
    calculateProgressionStatus(
      selectedLanguage, 
      selectedLevel, 
      userProgress.conceptsCompleted || [],
      userProgress.exercisesCompleted.length || 0,
      userProgress.completedProjects.length > 0 || false,
      userProgress.totalTimeSpent || 0
    )
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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [isLoading])

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

         // Handle assessment phase
     if (teachingPhase === 'assessment') {
       await handleAssessmentResponse(userMessage)
       setIsLoading(false)
       return
     }
     
     // Handle learning phase
     if (teachingPhase === 'learning') {
       if (lessonProgress === 'review') {
         await handleLessonProgression(userMessage)
       } else {
         await handleLessonResponse(userMessage)
       }
       setIsLoading(false)
       return
     }
     
     // Handle practice phase (break time)
     if (teachingPhase === 'practice') {
       if (userMessage.toLowerCase().includes('continue') || userMessage.toLowerCase().includes('next')) {
         setTeachingPhase('learning')
         await moveToNextLesson()
       } else {
         addDevMessage(`I'm here when you're ready to continue! Just say "continue" or "next lesson" to pick up where we left off.`)
       }
       setIsLoading(false)
       return
     }

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
       // All languages now use the proactive teaching system
       let devResponse: string
       
               // Use the proactive teaching system for all languages
        if (['assessment', 'learning', 'practice'].includes(teachingPhase)) {
         // The proactive teaching system handles all responses
         return
       } else {
         // Fallback for other interactions
         const session: LearningSession = {
           selectedLanguage,
           selectedLevel,
           totalTimeSpent: teachingContext.totalTimeSpent,
           sessionStartTime: new Date()
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
         devResponse = data.response

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
                       const progressForAchievements = {
              completedConcepts: data.userProgress.conceptsCompleted || [],
              exercisesCompleted: data.userProgress.exercisesCompleted.length || 0,
              totalTimeSpent: data.userProgress.totalTimeSpent || 0,
              streakDays: data.userProgress.streakDays || 0
            }
            const newAchievements = checkAchievements(progressForAchievements, 0, [])
           if (newAchievements.length > 0) {
             setNewAchievement(newAchievements[0])
             setShowAchievement(true)
             setAchievements(prev => [...prev, ...newAchievements])
           }
                       setUserLevel(1) // Default level, you might want to calculate this based on progress
         }
       }

      // Add Dev's response
      const devMessage: DevMessage = {
        id: (Date.now() + 1).toString(),
        type: 'dev',
        content: devResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, devMessage])

    } catch (error) {
      console.error('Error communicating with Dev:', error)
      
      const errorMessage: DevMessage = {
        id: (Date.now() + 1).toString(),
        type: 'dev',
        content: "I'm having trouble connecting right now. Let me try to help you with what I know about testing and programming!",
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
    const progressForAchievements = {
      completedConcepts: updatedProgress.conceptsCompleted || [],
      exercisesCompleted: updatedProgress.exercisesCompleted.length || 0,
      totalTimeSpent: updatedProgress.totalTimeSpent || 0,
      streakDays: updatedProgress.streakDays || 0
    }
    const newAchievements = checkAchievements(progressForAchievements, 0, [])
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
      exercisesCompleted: [...userProgress.exercisesCompleted, 'exercise-' + Date.now()],
      totalProjectsCompleted: userProgress.totalProjectsCompleted + 1
    }
    setUserProgress(updatedProgress)

    // Check for achievements
    const progressForAchievements = {
      completedConcepts: updatedProgress.conceptsCompleted || [],
      exercisesCompleted: updatedProgress.exercisesCompleted.length || 0,
      totalTimeSpent: updatedProgress.totalTimeSpent || 0,
      streakDays: updatedProgress.streakDays || 0
    }
    const newAchievements = checkAchievements(progressForAchievements, 0, [])
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

  // Assessment handling functions
  const handleAssessmentResponse = async (userMessage: string) => {
    const isTestingLanguage = ['testing-fundamentals', 'manual-testing', 'automation-testing'].includes(selectedLanguage)
    
    // Store the user's answer
    const updatedAnswers = { ...assessmentAnswers }
    
    switch (currentAssessmentQuestion) {
      case 0: // Experience question
        updatedAnswers.experience = userMessage
        setAssessmentAnswers(updatedAnswers)
        setCurrentAssessmentQuestion(1)
        
        // Ask next question
        const nextQuestion = isTestingLanguage 
          ? "Great! Now, what's your experience with programming or software development? (e.g., none, some web development, mobile apps, etc.)"
          : "Great! Now, what programming languages (if any) are you familiar with? (e.g., none, Python, JavaScript, etc.)"
        
        addDevMessage(nextQuestion)
        break
        
      case 1: // Languages/Programming experience
        updatedAnswers.languages = userMessage
        setAssessmentAnswers(updatedAnswers)
        setCurrentAssessmentQuestion(2)
        
        // Ask next question
        const goalsQuestion = isTestingLanguage
          ? "Excellent! Finally, what do you hope to achieve by learning testing? (e.g., career change, improve software quality, automation skills, etc.)"
          : "Excellent! Finally, what do you want to build or accomplish with programming? (e.g., web apps, mobile apps, data analysis, automation, etc.)"
        
        addDevMessage(goalsQuestion)
        break
        
      case 2: // Goals
        updatedAnswers.goals = userMessage
        setAssessmentAnswers(updatedAnswers)
        
        // Assessment complete - create learning plan
        await createLearningPlan(updatedAnswers)
        break
    }
  }

  const createLearningPlan = async (answers: typeof assessmentAnswers) => {
    const isTestingLanguage = ['testing-fundamentals', 'manual-testing', 'automation-testing'].includes(selectedLanguage)
    
    // Determine learning style and pace based on answers
    const learningStyle = determineLearningStyle(answers)
    const pace = determinePace(answers)
    
    // Update assessment answers
    setAssessmentAnswers(prev => ({
      ...prev,
      learningStyle,
      pace
    }))
    
    // Create personalized learning plan
    const learningPlan = generateLearningPlan(answers, isTestingLanguage)
    
    // Transition to learning phase
    setTeachingPhase('learning')
    
         // Add learning plan message
     addDevMessage(learningPlan)
     
     // Start the first lesson after a short delay
     setTimeout(() => {
       startFirstLesson()
     }, 2000)
  }

  const determineLearningStyle = (answers: typeof assessmentAnswers): 'hands-on' | 'visual' | 'theoretical' => {
    const text = (answers.experience + answers.languages + answers.goals).toLowerCase()
    
    if (text.includes('hands-on') || text.includes('practice') || text.includes('doing')) {
      return 'hands-on'
    } else if (text.includes('visual') || text.includes('see') || text.includes('watch')) {
      return 'visual'
    } else {
      return 'theoretical'
    }
  }

  const determinePace = (answers: typeof assessmentAnswers): 'slow' | 'normal' | 'fast' => {
    const text = (answers.experience + answers.languages + answers.goals).toLowerCase()
    
    if (text.includes('beginner') || text.includes('none') || text.includes('slow')) {
      return 'slow'
    } else if (text.includes('advanced') || text.includes('expert') || text.includes('fast')) {
      return 'fast'
    } else {
      return 'normal'
    }
  }

  const generateLearningPlan = (answers: typeof assessmentAnswers, isTestingLanguage: boolean): string => {
    const languageName = selectedLanguage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    let plan = `Perfect! Based on your background, I've created a personalized learning plan for you. 🎯\n\n`
    
    if (isTestingLanguage) {
      plan += `**Your Learning Plan for ${languageName}:**\n\n`
      plan += `📚 **Starting Level**: ${answers.experience.includes('none') ? 'Complete Beginner' : 'Some Experience'}\n`
      plan += `🎯 **Goal**: ${answers.goals}\n`
      plan += `📖 **Learning Style**: ${answers.learningStyle === 'hands-on' ? 'Hands-on Practice' : answers.learningStyle === 'visual' ? 'Visual Learning' : 'Theoretical Approach'}\n`
      plan += `⏱️ **Pace**: ${answers.pace === 'slow' ? 'Gentle & Thorough' : answers.pace === 'fast' ? 'Accelerated' : 'Balanced'}\n\n`
      
      plan += `**What we'll cover:**\n`
      if (selectedLanguage === 'testing-fundamentals') {
        plan += `• What is software testing and why it matters\n`
        plan += `• Testing principles and methodologies\n`
        plan += `• Types of testing (functional, non-functional)\n`
        plan += `• Testing levels and strategies\n`
      } else if (selectedLanguage === 'manual-testing') {
        plan += `• Manual testing process and techniques\n`
        plan += `• Test case design and execution\n`
        plan += `• Bug reporting and documentation\n`
        plan += `• Real-world testing scenarios\n`
      } else {
        plan += `• Automation frameworks and tools\n`
        plan += `• Selenium WebDriver basics\n`
        plan += `• API testing with Postman\n`
        plan += `• When and how to automate\n`
      }
    } else {
      plan += `**Your Learning Plan for ${languageName}:**\n\n`
      plan += `📚 **Starting Level**: ${answers.experience.includes('none') ? 'Complete Beginner' : 'Some Experience'}\n`
      plan += `🎯 **Goal**: ${answers.goals}\n`
      plan += `📖 **Learning Style**: ${answers.learningStyle === 'hands-on' ? 'Hands-on Practice' : answers.learningStyle === 'visual' ? 'Visual Learning' : 'Theoretical Approach'}\n`
      plan += `⏱️ **Pace**: ${answers.pace === 'slow' ? 'Gentle & Thorough' : answers.pace === 'fast' ? 'Accelerated' : 'Balanced'}\n\n`
      
      plan += `**What we'll cover:**\n`
      plan += `• Variables and data types\n`
      plan += `• Functions and control flow\n`
      plan += `• Data structures and algorithms\n`
      plan += `• Best practices and real-world projects\n`
    }
    
         plan += `\nReady to start your first lesson? I'll guide you through everything step by step! [ROCKET]`
     
     return plan
   }
   
   // Lesson handling functions
   const startFirstLesson = () => {
     const lesson = getLessonContent(selectedLanguage, selectedLevel, 0)
     addDevMessage(lesson.concept)
     setCurrentLesson(0)
     setLessonProgress('concept')
   }
   
   const getLessonContent = (language: string, level: string, lessonIndex: number) => {
     const isTestingLanguage = ['testing-fundamentals', 'manual-testing', 'automation-testing'].includes(language)
     
     if (isTestingLanguage) {
       return getTestingLesson(language, lessonIndex)
     } else {
       return getProgrammingLesson(language, lessonIndex)
     }
   }
   
       const getTestingLesson = (language: string, lessonIndex: number) => {
      const lessons = {
        'testing-fundamentals': [
          {
            concept: `[TEST] **Lesson 1: What is Software Testing?**\n\nSoftware testing is the process of evaluating a software application to ensure it meets specified requirements and works correctly.\n\n**Why Testing Matters:**\n• Prevents bugs from reaching users\n• Saves time and money\n• Improves software quality\n• Builds user confidence\n\n**Key Terms:**\n• **Bug/Defect**: A flaw in the software\n• **Test Case**: A set of conditions to verify functionality\n• **Test Plan**: Document describing testing approach\n\nThink of testing like proofreading a book - you're checking for errors before it goes to readers!`,
            exercise: {
              question: "What would you test first if you were checking a login form?",
              answer: "username and password fields",
              hints: ["Think about what users do first", "What's the most basic functionality?"]
            }
          },
          {
            concept: `[LIST] **Lesson 2: Testing Principles**\n\nThe 7 fundamental testing principles guide all testing activities:\n\n**1. Testing Shows Presence of Defects**\nTesting can show that defects are present, but cannot prove that there are no defects.\n\n**2. Exhaustive Testing is Impossible**\nTesting everything is not feasible due to time and resource constraints.\n\n**3. Early Testing Saves Time and Money**\nThe earlier defects are found, the cheaper they are to fix.\n\n**4. Defects Cluster Together**\nA small number of modules usually contain most of the defects.\n\n**5. Beware of the Pesticide Paradox**\nRunning the same tests repeatedly will eventually stop finding new defects.\n\n**6. Testing is Context Dependent**\nDifferent contexts require different testing approaches.\n\n**7. Absence-of-Errors is a Fallacy**\nFinding and fixing defects doesn't help if the system is unusable.`,
            exercise: {
              question: "Which testing principle states that finding and fixing defects doesn't help if the system is unusable?",
              answer: "absence of errors fallacy",
              hints: ["It's about the system being unusable", "It's principle number 7"]
            }
          }
        ],
        'manual-testing': [
          {
            concept: `[DEV] **Lesson 1: Manual Testing Process**\n\nManual testing involves human testers executing test cases without automation tools.\n\n**The Testing Process:**\n1. **Test Planning** - Define scope and approach\n2. **Test Design** - Create test cases\n3. **Test Execution** - Run the tests\n4. **Bug Reporting** - Document issues found\n5. **Test Closure** - Summarize results\n\n**Manual Testing Advantages:**\n• Human intuition and creativity\n• Cost-effective for small projects\n• No tool setup required\n• Can test user experience\n\n**When to Use Manual Testing:**\n• Exploratory testing\n• Usability testing\n• Ad-hoc testing\n• Small projects`,
            exercise: {
              question: "List the 5 steps of the manual testing process in order.",
              answer: "test planning, test design, test execution, bug reporting, test closure",
              hints: ["Start with planning", "End with closure", "Design comes before execution"]
            }
          },
          {
            concept: `[NOTE] **Lesson 2: Test Case Design**\n\nTest case design is the process of creating effective test scenarios.\n\n**Test Case Components:**\n• **Test Case ID**: Unique identifier\n• **Test Description**: What is being tested\n• **Preconditions**: What must be true before testing\n• **Test Steps**: Detailed steps to execute\n• **Expected Results**: What should happen\n• **Actual Results**: What actually happened\n• **Status**: Pass/Fail/Blocked\n\n**Test Case Design Techniques:**\n• **Equivalence Partitioning**: Group similar inputs\n• **Boundary Value Analysis**: Test edge cases\n• **Decision Table Testing**: Test combinations of conditions\n• **State Transition Testing**: Test system states\n\n**Example Test Case:**\n**ID**: TC001\n**Description**: Verify login with valid credentials\n**Steps**: 1. Enter valid username 2. Enter valid password 3. Click login\n**Expected**: User is logged in successfully`,
            exercise: {
              question: "What are the main components of a test case?",
              answer: "test case id, description, preconditions, steps, expected results, actual results, status",
              hints: ["Think about what information you need to track", "There are 7 main components"]
            }
          }
        ],
        'automation-testing': [
          {
            concept: `[AUTO] **Lesson 1: Introduction to Test Automation**\n\nTest automation uses tools and scripts to execute tests automatically, reducing manual effort.\n\n**Benefits of Automation:**\n• Faster execution\n• Consistent results\n• Reusable test scripts\n• 24/7 testing capability\n• Cost-effective for regression testing\n\n**When to Automate:**\n• Repetitive tests\n• Regression testing\n• Data-driven tests\n• Cross-browser testing\n• Performance testing\n\n**Popular Automation Tools:**\n• Selenium WebDriver (Web testing)\n• Postman (API testing)\n• Appium (Mobile testing)\n• JUnit/TestNG (Unit testing)\n\n**Automation Pyramid:**\n• Unit Tests (70%)\n• Integration Tests (20%)\n• UI Tests (10%)`,
            exercise: {
              question: "What percentage of tests should be unit tests according to the automation pyramid?",
              answer: "70",
              hints: ["It's the largest percentage", "Most tests should be at the bottom"]
            }
          },
          {
            concept: `[TOOL] **Lesson 2: Selenium WebDriver Basics**\n\nSelenium WebDriver is the most popular web automation tool.\n\n**Key Concepts:**\n• **WebDriver**: Interface to control browsers\n• **Locators**: Ways to find elements on web pages\n• **Actions**: Interactions with web elements\n• **Waits**: Handling dynamic content\n\n**Common Locators:**\n• **ID**: \`driver.findElement(By.id("username"))\`\n• **Name**: \`driver.findElement(By.name("password"))\`\n• **XPath**: \`driver.findElement(By.xpath("//button[@type='submit']"))\`\n• **CSS Selector**: \`driver.findElement(By.cssSelector(".login-btn"))\`\n\n**Basic Actions:**\n• \`click()\`: Click on element\n• \`sendKeys()\`: Type text\n• \`getText()\`: Get element text\n• \`clear()\`: Clear input field\n\n**Example Code:**\n\`\`\`java\nWebElement username = driver.findElement(By.id("username"));\nusername.sendKeys("testuser");\nWebElement password = driver.findElement(By.id("password"));\npassword.sendKeys("testpass");\nWebElement loginBtn = driver.findElement(By.id("login"));\nloginBtn.click();\n\`\`\`\n`,
            exercise: {
              question: "What is the most common way to locate elements in Selenium WebDriver?",
              answer: "id",
              hints: ["It's the most reliable", "It's the first locator mentioned"]
            }
          }
        ]
      }
      
      return lessons[language as keyof typeof lessons]?.[lessonIndex] || lessons['testing-fundamentals'][0]
    }
   
       const getProgrammingLesson = (language: string, lessonIndex: number) => {
      const lessons = {
        'javascript': [
          {
            concept: `**Lesson 1: Introduction to JavaScript**\n\nJavaScript is a versatile programming language that runs in web browsers and on servers.\n\n**What is JavaScript?**\n• A dynamic, interpreted programming language\n• Runs in web browsers (client-side)\n• Can run on servers (Node.js)\n• Used for web development, mobile apps, and more\n\n**Key Features:**\n• Dynamic typing\n• Object-oriented and functional programming\n• Event-driven programming\n• Rich ecosystem of libraries and frameworks\n\n**Your First JavaScript Program:**\n\`\`\`javascript\nconsole.log("Hello, World!");\n\`\`\`\n\nThis simple line outputs text to the console. It's the traditional first program in any language!`,
            exercise: {
              question: "What does console.log() do in JavaScript?",
              answer: "outputs text to the console",
              hints: ["It's for displaying information", "Think about what 'log' means"]
            }
          },
          {
            concept: `**Lesson 2: Variables and Data Types**\n\nVariables are containers for storing data values.\n\n**Declaring Variables:**\n\`\`\`javascript\nlet name = "John";           // String\nconst age = 25;             // Number\nlet isStudent = true;       // Boolean\nlet hobbies = ["coding", "reading"]; // Array\n\`\`\`\n\n**Data Types in JavaScript:**\n• **String**: Text enclosed in quotes\n• **Number**: Integers and decimals\n• **Boolean**: true or false\n• **Array**: Ordered list of values\n• **Object**: Collection of key-value pairs\n• **Undefined**: Variable declared but not assigned\n• **Null**: Intentional absence of value\n\n**Variable Declaration Keywords:**\n• \`let\`: Block-scoped, can be reassigned\n• \`const\`: Block-scoped, cannot be reassigned\n• \`var\`: Function-scoped (older syntax)`,
            exercise: {
              question: "What keyword would you use to declare a variable that cannot be changed?",
              answer: "const",
              hints: ["It's short for 'constant'", "Think about what 'const' means"]
            }
          }
        ],
        'python': [
          {
            concept: "[PYTHON] **Lesson 1: Introduction to Python**\n\nPython is a high-level, interpreted programming language known for its simplicity and readability.\n\n**What is Python?**\n• A general-purpose programming language\n• Known for clean, readable syntax\n• Extensive standard library\n• Used in web development, data science, AI, and more\n\n**Key Features:**\n• Simple and readable syntax\n• Automatic memory management\n• Large standard library\n• Cross-platform compatibility\n\n**Your First Python Program:**\n```python\nprint(\"Hello, World!\")\n```\n\nPython uses indentation to define code blocks, making it very readable!",
            exercise: {
              question: "What function is used to output text in Python?",
              answer: "print",
              hints: ["It's a simple 5-letter word", "Think about what you want to do with text"]
            }
          },
          {
            concept: "[CHART] **Lesson 2: Variables and Data Types**\n\nPython has several built-in data types for different kinds of data.\n\n**Basic Data Types:**\n```python\nname = \"Alice\"              # String\nage = 30                   # Integer\nheight = 5.7               # Float\nis_student = True          # Boolean\nhobbies = [\"coding\", \"music\"] # List\n```\n\n**Python Data Types:**\n• **str**: Text strings\n• **int**: Whole numbers\n• **float**: Decimal numbers\n• **bool**: True or False\n• **list**: Ordered, changeable collection\n• **tuple**: Ordered, unchangeable collection\n• **dict**: Key-value pairs\n• **set**: Unordered, unique elements\n\n**Variable Naming Rules:**\n• Use letters, numbers, and underscores\n• Cannot start with a number\n• Case-sensitive\n• Use descriptive names",
            exercise: {
              question: "What data type would you use to store someone's name in Python?",
              answer: "string",
              hints: ["It's for text", "Think about what 'str' stands for"]
            }
          }
        ],
        'html': [
          {
            concept: "[WEB] **Lesson 1: Introduction to HTML**\n\nHTML (HyperText Markup Language) is the standard markup language for creating web pages.\n\n**What is HTML?**\n• A markup language, not a programming language\n• Defines the structure and content of web pages\n• Uses tags to mark up content\n• Works with CSS and JavaScript\n\n**Basic HTML Structure:**\n```html\n<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>This is my first HTML page.</p>\n</body>\n</html>\n```\n\n**Key Concepts:**\n• HTML documents have a tree-like structure\n• Tags come in pairs: opening and closing\n• Some tags are self-closing\n• HTML is semantic - tags have meaning",
            exercise: {
              question: "What tag is used to create the main heading in HTML?",
              answer: "h1",
              hints: ["It's the largest heading", "Think about hierarchy - 1 is first"]
            }
          },
          {
            concept: "[NOTE] **Lesson 2: Common HTML Elements**\n\nHTML provides many elements for structuring content.\n\n**Text Elements:**\n```html\n<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<p>This is a paragraph.</p>\n<strong>Bold text</strong>\n<em>Italic text</em>\n```\n\n**List Elements:**\n```html\n<ul>\n    <li>Unordered list item</li>\n    <li>Another item</li>\n</ul>\n\n<ol>\n    <li>Ordered list item</li>\n    <li>Another item</li>\n</ol>\n```\n\n**Link and Image:**\n```html\n<a href=\"https://example.com\">Click here</a>\n<img src=\"image.jpg\" alt=\"Description\">\n```\n\n**Container Elements:**\n• `<div>`: Block-level container\n• `<span>`: Inline container\n• `<section>`: Thematic grouping\n• `<article>`: Self-contained content",
            exercise: {
              question: "What tag is used to create a hyperlink in HTML?",
              answer: "a",
              hints: ["It's the shortest tag name", "Think about 'anchor'"]
            }
          }
        ],
        'css': [
          {
            concept: "[ART] **Lesson 1: Introduction to CSS**\n\nCSS (Cascading Style Sheets) is used to style and layout web pages.\n\n**What is CSS?**\n• A style sheet language\n• Controls the appearance of HTML elements\n• Separates content from presentation\n• Works with HTML and JavaScript\n\n**Basic CSS Syntax:**\n```css\nselector {\n    property: value;\n}\n\nh1 {\n    color: blue;\n    font-size: 24px;\n}\n```\n\n**CSS Selectors:**\n• **Element selector**: `h1`, `p`, `div`\n• **Class selector**: `.classname`\n• **ID selector**: `#idname`\n• **Descendant selector**: `div p`\n\n**Common Properties:**\n• `color`: Text color\n• `background-color`: Background color\n• `font-size`: Text size\n• `margin`: Outer spacing\n• `padding`: Inner spacing",
            exercise: {
              question: "What CSS property controls the text color?",
              answer: "color",
              hints: ["It's a simple word", "Think about what you want to change"]
            }
          },
          {
            concept: "[RULER] **Lesson 2: CSS Box Model**\n\nThe CSS box model describes how elements are laid out.\n\n**Box Model Components:**\n```css\ndiv {\n    width: 200px;\n    height: 100px;\n    padding: 20px;\n    border: 2px solid black;\n    margin: 10px;\n}\n```\n\n**Box Model Parts:**\n• **Content**: The actual content (text, images)\n• **Padding**: Space between content and border\n• **Border**: Line around the element\n• **Margin**: Space outside the border\n\n**Box Sizing:**\n• `box-sizing: content-box` (default)\n• `box-sizing: border-box` (includes padding and border)\n\n**Display Properties:**\n• `display: block` - Takes full width\n• `display: inline` - Takes only needed width\n• `display: inline-block` - Combination of both\n• `display: flex` - Flexible box layout",
            exercise: {
              question: "What CSS property controls the space between content and border?",
              answer: "padding",
              hints: ["It's inside the element", "Think about 'padding' a box"]
            }
          }
        ]
      }
      
      // Return specific language lessons or a default lesson
      const languageLessons = lessons[language as keyof typeof lessons]
      if (languageLessons && languageLessons[lessonIndex]) {
        return languageLessons[lessonIndex]
      }
      
      // Default lesson for other languages
      return {
        concept: `[ROCKET] **Lesson 1: Getting Started with ${language}**\n\nWelcome to your first programming lesson! Let's start with the basics.\n\n**What is ${language}?**\n${language} is a programming language used for various applications.\n\n**Key Concepts We'll Cover:**\n• Variables and data types\n• Functions and control flow\n• Best practices\n• Real-world applications\n\n**Your First Program:**\nLet's start with a simple "Hello World" program to understand the basics.\n\nReady to write your first line of code?`,
        exercise: {
          question: "What is the purpose of a 'Hello World' program?",
          answer: "to verify the programming environment is set up correctly",
          hints: ["It's the first program", "It's very simple", "It confirms everything works"]
        }
      }
    }
   
   const handleLessonResponse = async (userMessage: string) => {
     if (lessonProgress === 'concept') {
       // User has read the concept, now give them the exercise
       const lesson = getLessonContent(selectedLanguage, selectedLevel, currentLesson)
       setCurrentExercise(lesson.exercise)
       setLessonProgress('exercise')
       
       addDevMessage(`Great! Now let's practice what you just learned.\n\n**Exercise:** ${lesson.exercise.question}\n\nTake your time and think about it. If you need a hint, just ask!`)
     } else if (lessonProgress === 'exercise') {
       // Check their answer
       await checkExerciseAnswer(userMessage)
     }
   }
   
       const checkExerciseAnswer = async (userAnswer: string) => {
      if (!currentExercise) return
      
      const isCorrect = userAnswer.toLowerCase().includes(currentExercise.answer.toLowerCase())
      
      if (isCorrect) {
        // Mark concept as completed
        const updatedProgress = markConceptCompleted(userProgress, `lesson-${currentLesson}`)
        setUserProgress(updatedProgress)
        
        addDevMessage(`🎉 Excellent! That's correct!\n\nYou've successfully completed this lesson. Let's move on to the next concept.\n\nWould you like to:\n1. Continue to the next lesson\n2. Review this lesson again\n3. Take a break`)
        
        setLessonProgress('review')
        setLessonCompleted(true)
      } else {
        setExerciseAttempts(prev => prev + 1)
        
        if (exerciseAttempts >= 2) {
          addDevMessage(`Let me help you with this one!\n\n**Hint:** ${currentExercise.hints[0]}\n\n**Correct Answer:** ${currentExercise.answer}\n\nDon't worry - learning is about trying and improving! Would you like to continue to the next lesson?`)
          setLessonProgress('review')
        } else {
          addDevMessage(`Not quite right, but that's okay! Let's try again.\n\n**Hint:** ${currentExercise.hints[exerciseAttempts] || currentExercise.hints[0]}\n\nThink about it and try again!`)
        }
      }
    }
    
    // Lesson progression functions
    const handleLessonProgression = async (userMessage: string) => {
      const message = userMessage.toLowerCase()
      
      if (message.includes('1') || message.includes('continue') || message.includes('next')) {
        await moveToNextLesson()
      } else if (message.includes('2') || message.includes('review')) {
        await reviewCurrentLesson()
      } else if (message.includes('3') || message.includes('break')) {
        await takeBreak()
      } else {
        addDevMessage(`I didn't quite understand. Please choose:\n1. Continue to the next lesson\n2. Review this lesson again\n3. Take a break`)
      }
    }
    
    const moveToNextLesson = async () => {
      const nextLessonIndex = currentLesson + 1
      const maxLessons = getMaxLessons(selectedLanguage)
      
      if (nextLessonIndex >= maxLessons) {
        // Course completed!
        await completeCourse()
        return
      }
      
      setCurrentLesson(nextLessonIndex)
      setLessonProgress('concept')
      setExerciseAttempts(0)
      setLessonCompleted(false)
      
      const nextLesson = getLessonContent(selectedLanguage, selectedLevel, nextLessonIndex)
      addDevMessage(`[ROCKET] **Lesson ${nextLessonIndex + 1}**\n\n${nextLesson.concept}`)
    }
    
    const reviewCurrentLesson = async () => {
      const lesson = getLessonContent(selectedLanguage, selectedLevel, currentLesson)
      
      addDevMessage(`📚 **Review: Lesson ${currentLesson + 1}**\n\n${lesson.concept}\n\n**Key Points to Remember:**\n• ${getKeyPoints(selectedLanguage, currentLesson)}\n\nWould you like to:\n1. Practice the exercise again\n2. Move to the next lesson\n3. Ask questions about this topic`)
      
      setLessonProgress('review')
    }
    
    const takeBreak = async () => {
      addDevMessage(`☕ **Break Time!**\n\nGreat work so far! You've completed ${currentLesson + 1} lessons.\n\n**Your Progress:**\n• Lessons completed: ${currentLesson + 1}\n• Concepts mastered: ${userProgress.conceptsCompleted.length}\n• Current streak: ${userProgress.currentStreak} days\n\nWhen you're ready to continue, just say "continue" or "next lesson"!`)
      
      setTeachingPhase('practice')
    }
    
         const completeCourse = async () => {
       const courseName = selectedLanguage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
       
       addDevMessage(`🎓 **Congratulations! Course Complete!**\n\nYou've successfully completed the ${courseName} course! This is a fantastic achievement.\n\n**What you've accomplished:**\n• Completed all ${getMaxLessons(selectedLanguage)} lessons\n• Mastered key concepts and techniques\n• Built a solid foundation in ${courseName}\n• Developed practical testing skills\n\n**Next Steps:**\n1. Practice with real-world projects\n2. Explore advanced topics\n3. Apply your knowledge in practical scenarios\n4. Join testing communities and forums\n\n**Your Learning Journey:**\nYou've taken the first step towards becoming a skilled tester! Remember, testing is a continuous learning process. Keep practicing, stay curious, and never stop improving your skills.\n\nWould you like to:\n1. Start a new course\n2. Review your progress\n3. Get a certificate\n4. Practice with real projects`)
       
       setTeachingPhase('review')
     }
    
         const getMaxLessons = (language: string): number => {
       const lessonCounts = {
         // Testing languages
         'testing-fundamentals': 5,
         'manual-testing': 6,
         'automation-testing': 7,
         
         // Programming languages
         'javascript': 8,
         'python': 8,
         'html': 6,
         'css': 6,
         'typescript': 8,
         'java': 8,
         'csharp': 8,
         'c': 7,
         'cpp': 8,
         'go': 7,
         'rust': 8,
         'php': 7,
         'ruby': 7,
         'swift': 8,
         'kotlin': 8,
         'dart': 7,
         
         // Web frameworks
         'react': 8,
         'vuejs': 7,
         'angular': 8,
         'nodejs': 8,
         'expressjs': 7,
         'django': 8,
         'flask': 7,
         'laravel': 8,
         'spring': 8,
         
         // Other popular languages
         'sql': 6,
         'bash': 6,
         'git': 5,
         'docker': 6,
         'kubernetes': 7
       }
       
       return lessonCounts[language as keyof typeof lessonCounts] || 6
     }
    
         const getKeyPoints = (language: string, lessonIndex: number): string => {
       const keyPoints = {
         // Testing languages
         'testing-fundamentals': [
           'Software testing ensures quality and prevents bugs',
           'Testing saves time and money in the long run',
           'Test cases verify functionality systematically'
         ],
         'manual-testing': [
           'Manual testing follows a 5-step process',
           'Human intuition is valuable for exploratory testing',
           'Manual testing is cost-effective for small projects'
         ],
         'automation-testing': [
           'Automation speeds up repetitive testing tasks',
           'The automation pyramid guides test distribution',
           'Choose automation tools based on testing needs'
         ],
         
         // Programming languages
         'javascript': [
           'JavaScript is dynamic and runs in browsers and servers',
           'Variables store data, functions perform actions',
           'Understanding scope and hoisting is crucial'
         ],
         'python': [
           'Python emphasizes readability and simplicity',
           'Indentation defines code blocks',
           'Python has a rich standard library'
         ],
         'html': [
           'HTML provides structure and semantics',
           'Tags come in pairs and define content meaning',
           'HTML works with CSS and JavaScript'
         ],
         'css': [
           'CSS controls appearance and layout',
           'The box model affects element spacing',
           'Selectors target specific elements'
         ],
         'java': [
           'Java is object-oriented and platform-independent',
           'Classes and objects are fundamental concepts',
           'Java has strong typing and garbage collection'
         ],
         'csharp': [
           'C# is Microsoft\'s modern programming language',
           'It combines object-oriented and functional programming',
           'C# is widely used for Windows applications'
         ],
         'react': [
           'React uses components to build user interfaces',
           'State and props manage component data',
           'JSX combines JavaScript and HTML-like syntax'
         ],
         'nodejs': [
           'Node.js runs JavaScript on the server',
           'Event-driven, non-blocking I/O is key',
           'npm provides access to thousands of packages'
         ]
       }
       
       const points = keyPoints[language as keyof typeof keyPoints] || [
         'Focus on understanding the core concepts',
         'Practice regularly to reinforce learning',
         'Build real projects to apply your knowledge'
       ]
       return points[lessonIndex] || points[0]
     }

  const addDevMessage = (content: string) => {
    const devMessage: DevMessage = {
      id: (Date.now() + 1).toString(),
      type: 'dev',
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, devMessage])
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
                  {lang === 'testing-fundamentals' ? 'Testing Fundamentals' :
                   lang === 'manual-testing' ? 'Manual Testing' :
                   lang === 'automation-testing' ? 'Automation Testing' :
                   lang.charAt(0).toUpperCase() + lang.slice(1).replace('-', ' ')}
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
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
                  [ROCKET] Code Editor
                </button>
                <button
                  onClick={() => setCurrentView('progression')}
                  className="px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800"
                >
                  [CHART] Progress
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
          />
        )}

        {currentView === 'project-workspace' && selectedProject && (
          <ProjectWorkspace
            project={selectedProject}
          />
        )}

        {currentView === 'achievements' && (
          <AchievementDisplay
            userProgress={{
              completedConcepts: userProgress.conceptsCompleted || [],
              exercisesCompleted: userProgress.exercisesCompleted.length || 0,
              totalTimeSpent: userProgress.totalTimeSpent || 0,
              streakDays: userProgress.streakDays || 0
            }}
            completedProjects={userProgress.completedProjects.length || 0}
            unlockedAchievements={achievements}
            certifications={[]}
            totalPoints={userProgress.conceptsCompleted.length * 10 + userProgress.exercisesCompleted.length * 5 + userProgress.completedProjects.length * 20}
            userLevel="bronze"
          />
        )}

        {currentView === 'study-groups' && (
          <StudyGroupBrowser
            userLanguage={selectedLanguage}
            userLevel={selectedLevel}
            userInterests={[]}
          />
        )}

        {currentView === 'code-analysis' && (
          <CodeAnalyzer
            code={codeValue}
            language={selectedLanguage}
            onAnalysisComplete={(analysis) => setCodeAnalysis(analysis)}
          />
        )}

        {currentView === 'exercise' && (
          <InteractiveExercise
            concept="variables-and-data-types"
            language={selectedLanguage}
            level={selectedLevel}
            onComplete={handleExerciseComplete}
            onClose={handleBackToChat}
          />
        )}

        {currentView === 'progression' && (
          <ProgressionDashboard
            language={selectedLanguage}
            level={selectedLevel}
            completedConcepts={userProgress.conceptsCompleted || []}
            exercisesCompleted={userProgress.exercisesCompleted.length || 0}
            projectCompleted={userProgress.completedProjects.length > 0}
            totalTimeSpent={userProgress.totalTimeSpent || 0}
            onConceptSelect={(conceptId) => console.log('Concept selected:', conceptId)}
            onGraduation={() => setCurrentView('graduation')}
          />
        )}

        {currentView === 'graduation' && (
          <GraduationCeremony
            language={selectedLanguage}
            level={selectedLevel}
            finalScore={userProgress.conceptsCompleted.length * 10 + userProgress.exercisesCompleted.length * 5}
            timeSpent={userProgress.totalTimeSpent || 0}
            achievements={userProgress.achievements || []}
            onComplete={() => console.log('Graduation completed')}
            onContinue={() => setCurrentView('chat')}
          />
        )}

        {currentView === 'code-executor' && (
          <CodeExecutor
            language={selectedLanguage}
            level={selectedLevel}
            initialCode={codeValue}
            onExecutionComplete={handleExecutionComplete}
            onCodeChange={handleCodeChange}
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
