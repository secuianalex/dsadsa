// Real AI Teaching System for Dev AI Tutor
export interface TeachingContext {
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  currentConcept: string
  sessionStartTime: Date
  totalTimeSpent: number
  completedConcepts: string[]
  exercisesCompleted: number
  lastActivity: Date
  userPreferences: {
    learningStyle: 'visual' | 'hands-on' | 'theoretical'
    pace: 'slow' | 'normal' | 'fast'
    showExamples: boolean
    showExercises: boolean
  }
}

export interface LessonPlan {
  concept: string
  title: string
  description: string
  content: string
  examples: CodeExample[]
  exercises: Exercise[]
  estimatedTime: number // in minutes
  prerequisites: string[]
}

export interface CodeExample {
  title: string
  code: string
  explanation: string
  language: string
}

export interface Exercise {
  title: string
  description: string
  task: string
  solution: string
  difficulty: 'easy' | 'medium' | 'hard'
  estimatedTime: number // in minutes
}

export interface TeachingPrompt {
  systemPrompt: string
  userPrompt: string
  context: {
    language: string
    level: string
    concept: string
    userProgress: number
    learningStyle: string
  }
}

export const TEACHING_CONFIG = {
  maxExamplesPerLesson: 3,
  maxExercisesPerLesson: 2,
  sessionTimeoutMinutes: 30,
  progressThreshold: 0.8, // 80% completion to move to next concept
  exerciseFrequency: 0.3, // 30% chance to generate exercise
  exampleFrequency: 0.7, // 70% chance to show examples
}

export const TEACHING_PROMPTS = {
  system: `You are Dev, an expert programming tutor with a warm, encouraging personality. Your role is to:

1. **Teach Effectively**: Explain complex concepts in simple, understandable terms
2. **Provide Examples**: Always include practical code examples
3. **Encourage Practice**: Suggest exercises and coding challenges
4. **Track Progress**: Monitor user understanding and progress
5. **Adapt Teaching**: Adjust your style based on user preferences and progress
6. **Be Encouraging**: Use positive reinforcement and celebrate achievements

**Teaching Style:**
- Use clear, concise explanations
- Include code examples with comments
- Ask questions to check understanding
- Provide step-by-step guidance
- Use analogies when helpful
- Encourage experimentation

**Response Format:**
- Start with a brief, encouraging greeting
- Explain the concept clearly
- Show practical examples
- Suggest next steps or exercises
- End with motivation and encouragement

Remember: You're not just teaching code, you're building confidence and fostering a love for programming!`,

  conceptIntroduction: (context: TeachingContext, concept: string) => `I'm excited to teach you about ${concept} in ${context.language}! 

This is a fundamental concept that will help you build a strong foundation in ${context.language} programming. Let me break it down for you in a way that's easy to understand.

**What you'll learn:**
- The core concepts and principles
- Practical examples you can use immediately
- Common patterns and best practices
- How this fits into your overall learning journey

Ready to dive in? Let's start with the basics and then work our way up to more advanced applications! 🚀`,

  conceptExplanation: (context: TeachingContext, concept: string) => `Perfect! Let's explore ${concept} in ${context.language}.

This concept is essential for ${context.level} level programming and will help you write better, more efficient code. I'll explain it step by step, show you practical examples, and then we can practice together.

**Key Learning Objectives:**
- Understand the core principles
- See real-world applications
- Practice with hands-on examples
- Learn best practices and common pitfalls

Let me walk you through this concept with clear examples and explanations. Feel free to ask questions at any time! 💡`,

  exerciseGeneration: (context: TeachingContext, concept: string) => `I have a great interactive coding exercise for you! Let me generate a practice exercise for the concept: ${concept}

This will be a hands-on coding challenge where you can:
- Write real code in a code editor
- Get instant feedback on your solution
- See test results in real-time
- Access helpful hints if you get stuck
- View the solution when you're ready

The exercise will be tailored for ${context.level} level ${context.language} programming. Would you like to start the interactive exercise now?

Just say "yes" or "start exercise" and I'll launch the coding environment for you!`,

  feedback: (context: TeachingContext, userCode: string, exercise: Exercise) => `Great job working on the exercise! Let me review your code and provide some helpful feedback.

**Your Solution:**
\`\`\`${context.language}
${userCode}
\`\`\`

**What I noticed:**
- [Positive feedback about what they did well]
- [Constructive suggestions for improvement]
- [Best practices to consider]

**Key Learning Points:**
- [Specific concept reinforcement]
- [Common patterns or techniques]
- [How this applies to real-world coding]

**Next Steps:**
- Try the exercise again with the feedback in mind
- Experiment with different approaches
- Ask me any questions about the concepts

Remember: Every attempt is a learning opportunity! Keep practicing and you'll get better with each exercise. 💪`,

  progression: (context: TeachingContext) => `Excellent progress! You've been working hard on ${context.language} at the ${context.level} level.

**Your Learning Journey:**
- Concepts completed: ${context.completedConcepts.length}
- Exercises completed: ${context.exercisesCompleted}
- Time invested: ${context.totalTimeSpent} minutes
- Current focus: ${context.currentConcept}

**What's Next:**
- Continue with the current concept
- Move to the next topic in your learning path
- Practice with additional exercises
- Start working on a small project

You're making fantastic progress! What would you like to focus on next? I'm here to guide you through every step of your programming journey! 🎯`
}

export function generateTeachingPrompt(
  context: TeachingContext,
  userMessage: string,
  expectedResponse: 'explanation' | 'exercise' | 'feedback' | 'guidance'
): TeachingPrompt {
  const { language, level, currentConcept, userPreferences } = context
  
  let systemPrompt = TEACHING_PROMPTS.system
  let userPrompt = userMessage

  // Add context-specific instructions
  if (expectedResponse === 'explanation') {
    systemPrompt += `\n\n**Current Focus:** Teaching ${currentConcept} in ${language} (${level} level)
**User Preferences:** ${userPreferences.learningStyle} learner, ${userPreferences.pace} pace
**Teaching Approach:** Provide clear explanations with ${userPreferences.showExamples ? 'examples' : 'minimal examples'}`
    
    userPrompt = `The user wants to learn about ${currentConcept} in ${language}. 
User message: "${userMessage}"
Provide a comprehensive explanation suitable for ${level} level with practical examples.`
  }

  if (expectedResponse === 'exercise') {
    systemPrompt += `\n\n**Exercise Mode:** Generate an interactive coding exercise
**Language:** ${language}
**Level:** ${level}
**Concept:** ${currentConcept}
**Requirements:** Create a hands-on exercise that reinforces the concept`
    
    userPrompt = `Generate an interactive coding exercise for ${currentConcept} in ${language} (${level} level).
User message: "${userMessage}"
Create an engaging, practical exercise with clear instructions and expected outcomes.`
  }

  if (expectedResponse === 'feedback') {
    systemPrompt += `\n\n**Feedback Mode:** Provide constructive code review
**Language:** ${language}
**Level:** ${level}
**Focus:** Encourage learning and improvement`
    
    userPrompt = `Review the user's code and provide helpful feedback.
Language: ${language}
Level: ${level}
User message: "${userMessage}"
Provide encouraging, constructive feedback that helps them learn and improve.`
  }

  return {
    systemPrompt,
    userPrompt,
    context: {
      language,
      level,
      concept: currentConcept,
      userProgress: context.completedConcepts.length,
      learningStyle: userPreferences.learningStyle
    }
  }
}

export function analyzeUserResponse(
  message: string,
  context: TeachingContext
): {
  intent: 'learn' | 'practice' | 'help' | 'progress' | 'general'
  confidence: number
  suggestedAction: string
} {
  const lowerMessage = message.toLowerCase()
  
  // Learning intent
  if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how does') || lowerMessage.includes('teach me')) {
    return {
      intent: 'learn',
      confidence: 0.9,
      suggestedAction: 'Provide detailed explanation with examples'
    }
  }

  // Practice intent
  if (lowerMessage.includes('exercise') || lowerMessage.includes('practice') || lowerMessage.includes('challenge') || lowerMessage.includes('try')) {
    return {
      intent: 'practice',
      confidence: 0.85,
      suggestedAction: 'Generate interactive coding exercise'
    }
  }

  // Help intent
  if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('confused') || lowerMessage.includes('don\'t understand')) {
    return {
      intent: 'help',
      confidence: 0.8,
      suggestedAction: 'Provide clarification and additional examples'
    }
  }

  // Progress intent
  if (lowerMessage.includes('progress') || lowerMessage.includes('how am i doing') || lowerMessage.includes('status') || lowerMessage.includes('completed')) {
    return {
      intent: 'progress',
      confidence: 0.9,
      suggestedAction: 'Show learning progress and next steps'
    }
  }

  // General intent (default)
  return {
    intent: 'general',
    confidence: 0.5,
    suggestedAction: 'Provide general guidance and encouragement'
  }
}

export function shouldGenerateExercise(context: TeachingContext): boolean {
  const { exercisesCompleted, completedConcepts, userPreferences } = context
  
  // Generate exercise if:
  // 1. User prefers hands-on learning
  if (userPreferences.learningStyle === 'hands-on') return true
  
  // 2. User hasn't done many exercises recently
  if (exercisesCompleted < completedConcepts.length * 0.5) return true
  
  // 3. Random chance based on config
  if (Math.random() < TEACHING_CONFIG.exerciseFrequency) return true
  
  return false
}

export function updateTeachingContext(
  context: TeachingContext,
  userMessage: string,
  aiResponse: string
): TeachingContext {
  const now = new Date()
  const timeDiff = Math.floor((now.getTime() - context.lastActivity.getTime()) / (1000 * 60))
  
  return {
    ...context,
    lastActivity: now,
    totalTimeSpent: context.totalTimeSpent + Math.min(timeDiff, 5), // Cap at 5 minutes per interaction
    userPreferences: {
      ...context.userPreferences,
      showExamples: context.userPreferences.showExamples || aiResponse.includes('example'),
      showExercises: context.userPreferences.showExercises || aiResponse.includes('exercise')
    }
  }
}

export function getNextConcept(context: TeachingContext): string | null {
  const { language, level, completedConcepts } = context
  
  // This would typically query the LANGUAGE_CONCEPTS from devAI.ts
  // For now, return a placeholder
  const availableConcepts = ['variables-and-data-types', 'functions-basics', 'conditionals', 'loops']
  const nextConcept = availableConcepts.find(concept => !completedConcepts.includes(concept))
  
  return nextConcept || null
}

export function calculateProgress(context: TeachingContext): number {
  const { completedConcepts } = context
  
  // This would typically calculate based on total concepts for the language/level
  // For now, use a simple calculation
  const totalConcepts = 10 // Placeholder
  return Math.round((completedConcepts.length / totalConcepts) * 100)
}
