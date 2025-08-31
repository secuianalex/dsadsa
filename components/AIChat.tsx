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
  const [messages, setMessages] = useState<Message[]>([])

  // Send initial greeting when component mounts
  useEffect(() => {
    const sendInitialMessage = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: "Hello! I'm ready to learn programming. Can you introduce yourself and tell me how you can help me?",
            context: {
              language: 'general',
              level: 'beginner',
              concept: 'initial-greeting'
            }
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const initialMessage: Message = {
            id: '1',
            type: 'ai',
            content: data.response || "Hello! I'm Dev, your AI programming tutor. How can I help you learn today?",
            timestamp: new Date(),
            recommendation: data.recommendation
          }
          setMessages([initialMessage])
        } else {
          // Fallback if API fails
          const fallbackMessage: Message = {
            id: '1',
            type: 'ai',
            content: "Hello! I'm Dev, your AI programming tutor. I'm here to help you learn programming! What would you like to learn today?",
            timestamp: new Date()
          }
          setMessages([fallbackMessage])
        }
      } catch (error) {
        console.error('Error sending initial message:', error)
        const fallbackMessage: Message = {
          id: '1',
          type: 'ai',
          content: "Hello! I'm Dev, your AI programming tutor. I'm here to help you learn programming! What would you like to learn today?",
          timestamp: new Date()
        }
        setMessages([fallbackMessage])
      } finally {
        setIsLoading(false)
      }
    }

    sendInitialMessage()
  }, [])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [isLoading])

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
      console.log('Calling AI API with message:', userMessage)
      
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
      
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          context: {
            language: 'general',
            level: 'beginner',
            concept: 'programming-tutoring'
          }
        }),
      })

      console.log('API Response status:', response.status)
      console.log('API Response ok:', response.ok)

      if (!response.ok) {
        console.error('API Response not ok:', response.status, response.statusText)
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      console.log('API Response data:', data)
      
              if (data.error) {
          console.error('API returned error:', data.error)
          throw new Error(data.error || 'API returned an error')
        }

      console.log('Returning AI response:', data.response)
      return {
        response: data.response,
        recommendation: data.recommendation
      }
          } catch (error) {
        console.error('AI Chat Error:', error)
        throw error // Re-throw to let handleSubmit handle it
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
      console.error('Error in handleSubmit:', error)
      
      // Show specific error messages based on the error type
      let errorContent = "Sorry, I'm having trouble generating a response right now. Please try again in a moment."
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to get AI response')) {
          errorContent = "I'm having trouble connecting to my AI services. Please check your internet connection and try again."
        } else if (error.message.includes('API returned an error')) {
          errorContent = "There was an issue with the AI service. Please try again in a few moments."
        } else if (error.message.includes('OpenAI API key')) {
          errorContent = "AI service configuration issue. Please contact support."
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: errorContent,
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
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto" ref={messagesContainerRef}>
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
            "Explain variables in JavaScript",
            "How do I create a function?",
            "What is object-oriented programming?",
            "Help me debug this code",
            "Teach me about arrays",
            "What's the difference between let and const?"
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

