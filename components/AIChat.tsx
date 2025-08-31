"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  recommendation?: {
    pathSlug: string
    pathTitle: string
    pathDescription: string
    languages: string[]
  }
}

interface AIChatProps {
  paths: Array<{
    id: string
    slug: string
    title: string
    description: string
    languages: Array<{
      language: {
        name: string
        slug: string
      }
    }>
  }>
}

export default function AIChat({ paths }: AIChatProps) {
  const { locale } = useLocale()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hey there! I'm Dev, your AI programming tutor! 🚀\n\nTell me what you want to learn or build, and I'll create a personalized learning plan and recommend the perfect learning path for you. For example:\n\n• \"I want to build a website\"\n• \"I want to create a mobile app\"\n• \"I want to learn data science\"\n• \"I want to automate tasks\"\n• \"I want to make games\"\n• \"I want to work with AI\"\n\nWhat's your goal?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const analyzeUserGoal = (userMessage: string): {
    recommendedPath: string
    pathTitle: string
    pathDescription: string
    languages: string[]
    response: string
  } => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Web Development
    if (lowerMessage.includes('website') || lowerMessage.includes('web') || 
        lowerMessage.includes('frontend') || lowerMessage.includes('html') || 
        lowerMessage.includes('css') || lowerMessage.includes('javascript')) {
      return {
        recommendedPath: 'frontend-development',
        pathTitle: 'Frontend Development',
        pathDescription: 'Master the art of creating beautiful, interactive user interfaces',
        languages: ['html', 'css', 'javascript', 'react', 'vuejs', 'angular', 'typescript'],
        response: `Perfect! Based on your goal, I recommend the **Frontend Development** learning path! 🎨\n\nThis path will teach you everything you need to build modern, responsive websites:\n\n**What you'll learn:**\n• HTML for structure and content\n• CSS for styling and layout\n• JavaScript for interactivity\n• React for dynamic user interfaces\n• Modern development tools and best practices\n\n**Perfect for:** Building websites, web applications, user interfaces, and interactive experiences.\n\n**Estimated time:** 6-10 months to become proficient\n\nReady to start your frontend development journey?`
      }
    }
    
    // Full-stack Web Development
    if (lowerMessage.includes('full stack') || lowerMessage.includes('fullstack') || 
        lowerMessage.includes('web app') || lowerMessage.includes('webapp') ||
        (lowerMessage.includes('website') && (lowerMessage.includes('backend') || lowerMessage.includes('server')))) {
      return {
        recommendedPath: 'web-development',
        pathTitle: 'Web Development',
        pathDescription: 'Master modern web development from frontend to backend',
        languages: ['html', 'css', 'javascript', 'react', 'nodejs', 'typescript', 'python', 'sql'],
        response: `Excellent choice! I recommend the **Web Development** learning path for you! 🌐\n\nThis comprehensive path covers both frontend and backend development:\n\n**Frontend Skills:**\n• HTML, CSS, JavaScript\n• React for dynamic interfaces\n• TypeScript for better code quality\n\n**Backend Skills:**\n• Node.js for server-side JavaScript\n• Database design and SQL\n• API development and deployment\n\n**Perfect for:** Building complete web applications, e-commerce sites, social platforms, and business tools.\n\n**Estimated time:** 6-12 months to become a full-stack developer\n\nReady to become a complete web developer?`
      }
    }
    
    // Mobile Development
    if (lowerMessage.includes('mobile') || lowerMessage.includes('app') || 
        lowerMessage.includes('ios') || lowerMessage.includes('android') ||
        lowerMessage.includes('phone') || lowerMessage.includes('tablet')) {
      return {
        recommendedPath: 'mobile-development',
        pathTitle: 'Mobile Development',
        pathDescription: 'Build native and cross-platform mobile applications',
        languages: ['react-native', 'flutter', 'swift', 'kotlin', 'dart', 'ionic'],
        response: `Great choice! I recommend the **Mobile Development** learning path! 📱\n\nThis path will teach you to build apps for iOS, Android, and cross-platform:\n\n**Cross-Platform Options:**\n• React Native (JavaScript/TypeScript)\n• Flutter (Dart)\n• Ionic (Web technologies)\n\n**Native Development:**\n• Swift for iOS apps\n• Kotlin for Android apps\n\n**What you'll learn:**\n• Mobile UI/UX design principles\n• App store deployment\n• Performance optimization\n• Native device features\n\n**Perfect for:** Creating mobile apps, games, productivity tools, and social platforms.\n\n**Estimated time:** 4-8 months for cross-platform, 6-12 months for native\n\nReady to build your first mobile app?`
      }
    }
    
    // Data Science & Analytics
    if (lowerMessage.includes('data') || lowerMessage.includes('analytics') || 
        lowerMessage.includes('statistics') || lowerMessage.includes('excel') ||
        lowerMessage.includes('spreadsheet') || lowerMessage.includes('chart')) {
      return {
        recommendedPath: 'data-science-analytics',
        pathTitle: 'Data Science & Analytics',
        pathDescription: 'Machine learning, data analysis, and artificial intelligence',
        languages: ['python', 'r', 'sql', 'tensorflow', 'pytorch', 'pandas', 'numpy'],
        response: `Excellent! I recommend the **Data Science & Analytics** learning path! 📊\n\nThis path will teach you to extract insights from data and build intelligent systems:\n\n**Core Skills:**\n• Python for data manipulation\n• SQL for database queries\n• Statistical analysis and visualization\n• Machine learning algorithms\n\n**Advanced Topics:**\n• Deep learning with TensorFlow/PyTorch\n• Big data processing\n• Predictive modeling\n• Data visualization tools\n\n**Perfect for:** Business intelligence, research, financial analysis, marketing analytics, and scientific computing.\n\n**Estimated time:** 8-12 months for fundamentals, 12-18 months for advanced ML\n\nReady to unlock the power of data?`
      }
    }
    
    // AI & Machine Learning
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || 
        lowerMessage.includes('machine learning') || lowerMessage.includes('neural network') ||
        lowerMessage.includes('chatbot') || lowerMessage.includes('predictive')) {
      return {
        recommendedPath: 'ai-machine-learning',
        pathTitle: 'AI & Machine Learning',
        pathDescription: 'Create intelligent systems and predictive models',
        languages: ['python', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy'],
        response: `Fantastic! I recommend the **AI & Machine Learning** learning path! 🤖\n\nThis path will teach you to build intelligent systems and predictive models:\n\n**Core AI Skills:**\n• Python programming for AI\n• Machine learning algorithms\n• Neural networks and deep learning\n• Natural language processing\n\n**Practical Applications:**\n• Image and speech recognition\n• Recommendation systems\n• Chatbots and virtual assistants\n• Predictive analytics\n\n**Perfect for:** Building AI applications, automation systems, intelligent tools, and cutting-edge technology.\n\n**Estimated time:** 8-12 months for fundamentals, 12-18 months for advanced AI\n\nReady to create the future with AI?`
      }
    }
    
    // Game Development
    if (lowerMessage.includes('game') || lowerMessage.includes('unity') || 
        lowerMessage.includes('unreal') || lowerMessage.includes('3d') ||
        lowerMessage.includes('animation') || lowerMessage.includes('graphics')) {
      return {
        recommendedPath: 'game-development',
        pathTitle: 'Game Development',
        pathDescription: 'Create 2D and 3D games for multiple platforms',
        languages: ['csharp', 'cpp', 'javascript', 'python', 'unity', 'unreal-engine'],
        response: `Awesome! I recommend the **Game Development** learning path! 🎮\n\nThis path will teach you to create interactive games and experiences:\n\n**Game Engines:**\n• Unity (C#) - Perfect for beginners\n• Unreal Engine (C++) - Professional 3D games\n• Godot - Open-source alternative\n\n**Core Skills:**\n• Game programming fundamentals\n• 3D modeling and animation\n• Game physics and mathematics\n• User interface design\n\n**Perfect for:** Creating games, interactive experiences, simulations, and educational content.\n\n**Estimated time:** 6-12 months for basics, 12-24 months for advanced games\n\nReady to bring your game ideas to life?`
      }
    }
    
    // Backend Development
    if (lowerMessage.includes('backend') || lowerMessage.includes('server') || 
        lowerMessage.includes('api') || lowerMessage.includes('database') ||
        lowerMessage.includes('serverless') || lowerMessage.includes('microservices')) {
      return {
        recommendedPath: 'backend-development',
        pathTitle: 'Backend Development',
        pathDescription: 'Server-side programming and database management',
        languages: ['python', 'java', 'csharp', 'nodejs', 'sql', 'mongodb'],
        response: `Great choice! I recommend the **Backend Development** learning path! ⚙️\n\nThis path will teach you to build robust server-side applications:\n\n**Core Backend Skills:**\n• Server-side programming languages\n• Database design and management\n• API development and REST principles\n• Authentication and security\n\n**Advanced Topics:**\n• Microservices architecture\n• Cloud deployment (AWS, Azure)\n• Performance optimization\n• Scalable system design\n\n**Perfect for:** Building web services, APIs, enterprise applications, and scalable systems.\n\n**Estimated time:** 6-10 months for fundamentals, 8-16 months for advanced systems\n\nReady to build the backbone of modern applications?`
      }
    }
    
    // DevOps & Cloud
    if (lowerMessage.includes('devops') || lowerMessage.includes('cloud') || 
        lowerMessage.includes('deploy') || lowerMessage.includes('docker') ||
        lowerMessage.includes('kubernetes') || lowerMessage.includes('aws') ||
        lowerMessage.includes('azure')) {
      return {
        recommendedPath: 'devops-cloud',
        pathTitle: 'DevOps & Cloud',
        pathDescription: 'Infrastructure, deployment, and cloud computing',
        languages: ['bash', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins'],
        response: `Excellent! I recommend the **DevOps & Cloud** learning path! ☁️\n\nThis path will teach you to deploy and manage applications at scale:\n\n**Core DevOps Skills:**\n• Containerization with Docker\n• Orchestration with Kubernetes\n• Infrastructure as Code (Terraform)\n• CI/CD pipelines\n\n**Cloud Platforms:**\n• AWS, Azure, Google Cloud\n• Serverless computing\n• Cloud security and monitoring\n• Cost optimization\n\n**Perfect for:** Deploying applications, managing infrastructure, automation, and cloud architecture.\n\n**Estimated time:** 4-8 months for fundamentals, 6-12 months for advanced DevOps\n\nReady to master the cloud and deployment?`
      }
    }
    
    // Scripting & Automation
    if (lowerMessage.includes('automate') || lowerMessage.includes('script') || 
        lowerMessage.includes('tools') || lowerMessage.includes('batch') ||
        lowerMessage.includes('task') || lowerMessage.includes('workflow')) {
      return {
        recommendedPath: 'scripting-automation',
        pathTitle: 'Scripting & Automation',
        pathDescription: 'Automate tasks and build powerful tools',
        languages: ['python', 'bash', 'powershell', 'perl', 'lua', 'groovy'],
        response: `Smart choice! I recommend the **Scripting & Automation** learning path! 🔧\n\nThis path will teach you to automate repetitive tasks and build powerful tools:\n\n**Core Automation Skills:**\n• Python for general automation\n• Bash for Unix/Linux scripting\n• PowerShell for Windows automation\n• Task scheduling and workflows\n\n**Advanced Automation:**\n• Web scraping and data extraction\n• File processing and manipulation\n• System administration tasks\n• Build and deployment automation\n\n**Perfect for:** Automating daily tasks, data processing, system administration, and workflow optimization.\n\n**Estimated time:** 2-4 months for basics, 6-12 months for advanced automation\n\nReady to make your computer work for you?`
      }
    }
    
    // Systems Programming
    if (lowerMessage.includes('system') || lowerMessage.includes('low level') || 
        lowerMessage.includes('performance') || lowerMessage.includes('memory') ||
        lowerMessage.includes('operating system') || lowerMessage.includes('embedded')) {
      return {
        recommendedPath: 'systems-programming',
        pathTitle: 'Systems Programming',
        pathDescription: 'Low-level programming and operating system development',
        languages: ['c', 'cpp', 'rust', 'go', 'assembly'],
        response: `Advanced choice! I recommend the **Systems Programming** learning path! 💻\n\nThis path will teach you low-level programming and system architecture:\n\n**Core Systems Skills:**\n• C and C++ for performance-critical code\n• Rust for memory safety and concurrency\n• Assembly language for direct hardware control\n• Operating system concepts\n\n**Advanced Topics:**\n• Memory management and optimization\n• Concurrent programming\n• Device drivers and embedded systems\n• Compiler design\n\n**Perfect for:** High-performance applications, embedded systems, operating systems, and hardware interfaces.\n\n**Estimated time:** 8-12 months for fundamentals, 12-18 months for advanced systems\n\nReady to work at the system level?`
      }
    }
    
    // Testing
    if (lowerMessage.includes('test') || lowerMessage.includes('quality') || 
        lowerMessage.includes('bug') || lowerMessage.includes('qa') ||
        lowerMessage.includes('selenium') || lowerMessage.includes('postman')) {
      return {
        recommendedPath: 'testing',
        pathTitle: 'Testing',
        pathDescription: 'Master software testing from fundamentals to automation',
        languages: ['testing-fundamentals', 'manual-testing', 'automation-testing'],
        response: `Excellent choice! I recommend the **Testing** learning path! 🧪\n\nThis path will teach you to ensure software quality and reliability:\n\n**Core Testing Skills:**\n• Manual testing techniques and processes\n• Test case design and execution\n• Bug reporting and documentation\n• Quality assurance principles\n\n**Advanced Testing:**\n• Automated testing with Selenium\n• API testing with Postman\n• Performance and security testing\n• Test-driven development\n\n**Perfect for:** Ensuring software quality, preventing bugs, improving user experience, and building reliable applications.\n\n**Estimated time:** 4-8 months for comprehensive testing skills\n\nReady to become a quality assurance expert?`
      }
    }

    // Default recommendation for general programming
    return {
      recommendedPath: 'frontend-development',
      pathTitle: 'Frontend Development',
      pathDescription: 'Master the art of creating beautiful, interactive user interfaces',
      languages: ['html', 'css', 'javascript'],
      response: `I understand you want to learn programming! Based on your goal, I recommend starting with **Frontend Development** as it's perfect for beginners and gives you immediate visual results! 🎨\n\n**Why Frontend Development?**\n• See your code come to life immediately\n• Build real websites and applications\n• Great foundation for other programming areas\n• High demand in the job market\n\n**What you'll learn:**\n• HTML for structure and content\n• CSS for styling and layout\n• JavaScript for interactivity\n• Modern development tools\n\n**Perfect for:** Beginners who want to see quick results and build real projects.\n\n**Estimated time:** 3-6 months to build your first complete website\n\nReady to start your programming journey?`
    }
  }

  const generateAIResponse = async (userMessage: string): Promise<{
    response: string
    recommendation?: {
      pathSlug: string
      pathTitle: string
      pathDescription: string
      languages: string[]
    }
  }> => {
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: {
            language: 'general',
            level: 'beginner',
            concept: 'learning-path-selection'
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      if (data.error) {
        // Return fallback response if API fails
        return {
          response: data.fallback || "I'm having trouble connecting to my AI services right now, but I can still help you! What would you like to learn? I can recommend learning paths for web development, mobile apps, data science, AI, game development, and more. Just tell me your goal! 🚀",
          recommendation: {
            pathSlug: 'frontend-development',
            pathTitle: 'Frontend Development',
            pathDescription: 'Master the art of creating beautiful, interactive user interfaces',
            languages: ['html', 'css', 'javascript']
          }
        }
      }

      return {
        response: data.response,
        recommendation: data.recommendation
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      
      // Fallback to static analysis if API fails
      const analysis = analyzeUserGoal(userMessage)
      
      return {
        response: analysis.response,
        recommendation: {
          pathSlug: analysis.recommendedPath,
          pathTitle: analysis.pathTitle,
          pathDescription: analysis.pathDescription,
          languages: analysis.languages
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(userMessage.content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.response,
        timestamp: new Date(),
        recommendation: aiResponse.recommendation
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Sorry, I'm having trouble generating a response right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Dev</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Dev - AI Programming Tutor
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Get personalized learning plans and recommendations
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              style={{
                color: message.type === 'user' ? 'white' : 'var(--text-primary)'
              }}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              
              {/* Recommendation Card */}
              {message.recommendation && (
                <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      🎯 Recommended Learning Path
                    </h4>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      Perfect Match
                    </span>
                  </div>
                  <h5 className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                    {message.recommendation.pathTitle}
                  </h5>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                    {message.recommendation.pathDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      <strong>Key Skills:</strong> {message.recommendation.languages.slice(0, 3).join(', ')}
                      {message.recommendation.languages.length > 3 && '...'}
                    </div>
                    <Link 
                      href={`/paths/${message.recommendation.pathSlug}`}
                      className="text-xs px-3 py-1 bg-brand-500 text-white rounded hover:bg-brand-600 transition-colors"
                    >
                      Start Learning →
                    </Link>
                  </div>
                </div>
              )}
              
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t(locale, "aiChat.placeholder")}
          className="input flex-1"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="btn btn-primary px-6"
        >
          {isLoading ? 'Thinking...' : t(locale, "aiChat.send")}
        </button>
      </form>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
        <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
          Quick examples:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "I want to build a website",
            "Create a mobile app",
            "Learn data science",
            "Automate tasks",
            "Make games",
            "Work with AI"
          ].map((example) => (
            <button
              key={example}
              onClick={() => setInputValue(example)}
              className="text-xs px-2 py-1 rounded border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              style={{ 
                borderColor: 'var(--card-border)',
                color: 'var(--text-primary)'
              }}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

