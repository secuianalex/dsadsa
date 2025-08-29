"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI learning assistant. Tell me what you want to learn or build, and I'll create a personalized learning plan for you. For example:\n\n• \"I want to build a website\"\n• \"I want to create a mobile app\"\n• \"I want to learn data science\"\n• \"I want to automate tasks\"\n\nWhat's your goal?",
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

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response generation
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const lowerMessage = userMessage.toLowerCase()
    
    // Simple keyword-based responses (in a real app, this would call an AI API)
    if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('frontend')) {
      return `Great! To build a website, here's your learning plan:

**Phase 1: Web Fundamentals**
• Start with **HTML** for structure
• Learn **CSS** for styling and layout
• Master **JavaScript** for interactivity

**Phase 2: Modern Development**
• Learn **React** for dynamic user interfaces
• Explore **Next.js** for full-stack web apps
• Understand **TypeScript** for better code quality

**Recommended Learning Path:** Frontend Development
**Estimated Time:** 3-6 months for basics, 6-12 months for advanced skills

Would you like me to show you specific courses to start with?`
    }
    
    if (lowerMessage.includes('mobile') || lowerMessage.includes('app') || lowerMessage.includes('ios') || lowerMessage.includes('android')) {
      return `Perfect! For mobile app development, here's your roadmap:

**Phase 1: Choose Your Platform**
• **React Native** - Build for both iOS and Android with JavaScript
• **Flutter** - Cross-platform development with Dart
• **Swift** - Native iOS development
• **Kotlin** - Native Android development

**Phase 2: Advanced Features**
• Learn **Dart** (for Flutter) or **JavaScript** (for React Native)
• Understand mobile UI/UX principles
• Master state management and APIs

**Recommended Learning Path:** Mobile Development
**Estimated Time:** 4-8 months for cross-platform, 6-12 months for native

Which platform interests you most?`
    }
    
    if (lowerMessage.includes('data') || lowerMessage.includes('analytics') || lowerMessage.includes('machine learning') || lowerMessage.includes('ai')) {
      return `Excellent choice! Here's your data science learning plan:

**Phase 1: Data Fundamentals**
• Learn **Python** - the primary language for data science
• Master **SQL** for database management
• Understand **R** for statistical analysis

**Phase 2: Data Analysis & ML**
• Learn **Pandas** and **NumPy** for data manipulation
• Master **Scikit-learn** for machine learning
• Explore **TensorFlow** or **PyTorch** for deep learning

**Phase 3: Visualization & Tools**
• Learn **MATLAB** for advanced computations
• Master data visualization techniques
• Understand **MongoDB** for NoSQL databases

**Recommended Learning Path:** Data Science & Analytics
**Estimated Time:** 6-12 months for fundamentals, 12-18 months for advanced ML

Ready to start with Python basics?`
    }
    
    if (lowerMessage.includes('automate') || lowerMessage.includes('script') || lowerMessage.includes('tools')) {
      return `Smart choice! Automation is incredibly valuable. Here's your plan:

**Phase 1: Scripting Basics**
• Learn **Python** for general automation
• Master **Bash** for Unix/Linux automation
• Understand **PowerShell** for Windows automation

**Phase 2: Advanced Automation**
• Learn **Perl** for text processing
• Master **Lua** for embedded scripting
• Explore **Groovy** for build automation

**Phase 3: DevOps & Infrastructure**
• Learn **Docker** for containerization
• Master **Kubernetes** for orchestration
• Understand **Terraform** for infrastructure as code

**Recommended Learning Path:** Scripting & Automation
**Estimated Time:** 2-4 months for basics, 6-12 months for advanced automation

Start with Python - it's the most versatile for automation!`
    }
    
    if (lowerMessage.includes('game') || lowerMessage.includes('unity') || lowerMessage.includes('unreal')) {
      return `Awesome! Game development is exciting. Here's your learning plan:

**Phase 1: Programming Fundamentals**
• Learn **C#** for Unity development
• Master **C++** for Unreal Engine
• Understand **Lua** for game scripting

**Phase 2: Game Engines**
• **Unity** - Great for beginners and 2D/3D games
• **Unreal Engine** - Professional-grade 3D games
• **Godot** - Open-source alternative
• **GameMaker** - Perfect for 2D games

**Phase 3: Advanced Concepts**
• Learn game physics and mathematics
• Master 3D modeling and animation
• Understand game design principles

**Recommended Learning Path:** Game Development
**Estimated Time:** 6-12 months for basics, 12-24 months for advanced games

Start with Unity and C# - it's the most beginner-friendly!`
    }
    
    if (lowerMessage.includes('backend') || lowerMessage.includes('server') || lowerMessage.includes('api')) {
      return `Great choice! Backend development is the foundation of modern apps. Here's your plan:

**Phase 1: Core Languages**
• Learn **Python** with **Django** or **Flask**
• Master **Node.js** with **Express.js**
• Understand **Java** with **Spring**
• Explore **Go** for high-performance services

**Phase 2: Database & APIs**
• Master **SQL** for relational databases
• Learn **MongoDB** for NoSQL databases
• Understand **GraphQL** for modern APIs
• Master **REST** API design

**Phase 3: Advanced Backend**
• Learn **Rust** for performance-critical systems
• Master **PHP** with **Laravel**
• Understand **Ruby** with **Rails**

**Recommended Learning Path:** Backend Development
**Estimated Time:** 4-8 months for basics, 8-16 months for advanced systems

Start with Python and Django - it's perfect for beginners!`
    }

    // Default response
    return `I understand you want to learn programming! Here are some popular starting points:

**For Beginners:**
• **Web Development** - Build websites and web apps
• **Scripting & Automation** - Automate tasks and build tools
• **Data Science** - Analyze data and build models

**For Experienced Developers:**
• **Systems Programming** - Low-level, high-performance code
• **Mobile Development** - Create iOS and Android apps
• **AI & Machine Learning** - Build intelligent systems

**For Specific Goals:**
• **Game Development** - Create interactive games
• **Backend Development** - Build server-side applications
• **DevOps & Cloud** - Deploy and manage applications

Tell me more specifically what you want to build or learn, and I'll create a detailed plan for you!`
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
        content: aiResponse,
        timestamp: new Date()
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
          <span className="text-white font-bold text-lg">AI</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            AI Learning Assistant
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
          placeholder="Tell me what you want to learn or build..."
          className="input flex-1"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="btn btn-primary px-6"
        >
          {isLoading ? 'Thinking...' : 'Send'}
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
            "Automate tasks"
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

