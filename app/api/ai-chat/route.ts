import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function GET() {
  return NextResponse.json({ 
    message: 'AI Chat API is working! Use POST method to send messages.',
    status: 'ready',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, context } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not found')
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          fallback: "I'm having trouble connecting to my AI services right now, but I can still help you! What would you like to learn? I can recommend learning paths for web development, mobile apps, data science, AI, game development, and more. Just tell me your goal! 🚀"
        },
        { status: 500 }
      )
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Create the system prompt
    const systemPrompt = `You are Dev, an AI programming tutor and mentor. You help students learn programming by providing:

1. **Personalized Learning Plans**: Based on their goals and current level
2. **Clear Explanations**: Break down complex concepts into simple terms
3. **Practical Examples**: Provide real code examples and projects
4. **Motivation**: Encourage and support their learning journey
5. **Path Recommendations**: Suggest the best learning paths for their goals

**Your Personality:**
- Friendly, encouraging, and patient
- Use emojis and casual language to keep it engaging
- Provide specific, actionable advice
- Ask follow-up questions to better understand their needs
- Always suggest next steps in their learning journey
- Remember previous conversations and build on them

**Available Learning Paths:**
- Frontend Development (HTML, CSS, JavaScript, React)
- Web Development (Full-stack with Node.js, databases)
- Mobile Development (React Native, Flutter, native apps)
- Data Science & Analytics (Python, SQL, machine learning)
- AI & Machine Learning (Python, TensorFlow, neural networks)
- Game Development (Unity, Unreal Engine, game programming)
- Backend Development (Server-side programming, APIs)
- DevOps & Cloud (Docker, Kubernetes, cloud platforms)
- Scripting & Automation (Python, bash, task automation)
- Systems Programming (C, C++, Rust, low-level programming)
- Testing (Manual testing, automation, quality assurance)

**Response Format:**
- If this is the first message, introduce yourself warmly
- If continuing a conversation, acknowledge their previous messages
- Provide specific recommendations based on their goal
- Include relevant learning paths and technologies
- Give estimated timeframes for learning
- End with an encouraging call-to-action
- Use markdown formatting for better readability

Remember: You're not just answering questions, you're mentoring someone on their programming journey!`

    // Build messages array with conversation history
    const messages: any[] = [
      {
        role: "system",
        content: systemPrompt
      }
    ]

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      // Filter out any invalid messages and limit to last 10 for context
      const validHistory = conversationHistory
        .filter(msg => msg.role && msg.content && typeof msg.content === 'string')
        .slice(-10) // Keep last 10 messages for context
      
      messages.push(...validHistory)
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message
    })

    console.log('Sending to OpenAI:', {
      messageCount: messages.length,
      currentMessage: message,
      hasHistory: conversationHistory && conversationHistory.length > 0
    })

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 1500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response right now."

    // Extract learning path recommendation from the response
    const responseText = aiResponse.toLowerCase()
    let recommendedPath = 'frontend-development' // default
    let pathTitle = 'Frontend Development'
    let pathDescription = 'Master the art of creating beautiful, interactive user interfaces'
    let languages = ['html', 'css', 'javascript']

    // Analyze response to determine recommended path
    if (responseText.includes('frontend') || responseText.includes('website') || responseText.includes('html') || responseText.includes('css')) {
      recommendedPath = 'frontend-development'
      pathTitle = 'Frontend Development'
      pathDescription = 'Master the art of creating beautiful, interactive user interfaces'
      languages = ['html', 'css', 'javascript', 'react']
    } else if (responseText.includes('full stack') || responseText.includes('web app') || responseText.includes('backend')) {
      recommendedPath = 'web-development'
      pathTitle = 'Web Development'
      pathDescription = 'Master modern web development from frontend to backend'
      languages = ['html', 'css', 'javascript', 'react', 'nodejs', 'sql']
    } else if (responseText.includes('mobile') || responseText.includes('app') || responseText.includes('ios') || responseText.includes('android')) {
      recommendedPath = 'mobile-development'
      pathTitle = 'Mobile Development'
      pathDescription = 'Build native and cross-platform mobile applications'
      languages = ['react-native', 'flutter', 'swift', 'kotlin']
    } else if (responseText.includes('data') || responseText.includes('analytics') || responseText.includes('machine learning')) {
      recommendedPath = 'data-science-analytics'
      pathTitle = 'Data Science & Analytics'
      pathDescription = 'Machine learning, data analysis, and artificial intelligence'
      languages = ['python', 'sql', 'tensorflow', 'pandas']
    } else if (responseText.includes('ai') || responseText.includes('artificial intelligence') || responseText.includes('neural network')) {
      recommendedPath = 'ai-machine-learning'
      pathTitle = 'AI & Machine Learning'
      pathDescription = 'Create intelligent systems and predictive models'
      languages = ['python', 'tensorflow', 'pytorch', 'scikit-learn']
    } else if (responseText.includes('game') || responseText.includes('unity') || responseText.includes('unreal')) {
      recommendedPath = 'game-development'
      pathTitle = 'Game Development'
      pathDescription = 'Create 2D and 3D games for multiple platforms'
      languages = ['csharp', 'cpp', 'javascript', 'unity']
    } else if (responseText.includes('backend') || responseText.includes('server') || responseText.includes('api')) {
      recommendedPath = 'backend-development'
      pathTitle = 'Backend Development'
      pathDescription = 'Server-side programming and database management'
      languages = ['python', 'java', 'nodejs', 'sql']
    } else if (responseText.includes('devops') || responseText.includes('cloud') || responseText.includes('deploy')) {
      recommendedPath = 'devops-cloud'
      pathTitle = 'DevOps & Cloud'
      pathDescription = 'Infrastructure, deployment, and cloud computing'
      languages = ['bash', 'docker', 'kubernetes', 'terraform']
    } else if (responseText.includes('automate') || responseText.includes('script') || responseText.includes('tools')) {
      recommendedPath = 'scripting-automation'
      pathTitle = 'Scripting & Automation'
      pathDescription = 'Automate tasks and build powerful tools'
      languages = ['python', 'bash', 'powershell']
    } else if (responseText.includes('system') || responseText.includes('low level') || responseText.includes('performance')) {
      recommendedPath = 'systems-programming'
      pathTitle = 'Systems Programming'
      pathDescription = 'Low-level programming and operating system development'
      languages = ['c', 'cpp', 'rust', 'assembly']
    } else if (responseText.includes('test') || responseText.includes('quality') || responseText.includes('qa')) {
      recommendedPath = 'testing'
      pathTitle = 'Testing'
      pathDescription = 'Master software testing from fundamentals to automation'
      languages = ['testing-fundamentals', 'selenium', 'postman']
    }

    return NextResponse.json({
      response: aiResponse,
      recommendation: {
        pathSlug: recommendedPath,
        pathTitle,
        pathDescription,
        languages
      }
    })

  } catch (error) {
    console.error('AI Chat API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate AI response',
        fallback: "I'm having trouble connecting to my AI services right now, but I can still help you! What would you like to learn? I can recommend learning paths for web development, mobile apps, data science, AI, game development, and more. Just tell me your goal! 🚀"
      },
      { status: 500 }
    )
  }
}
