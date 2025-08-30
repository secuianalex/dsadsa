interface HintContext {
  language: string
  code: string
  lessonId: string
  userLevel: 'beginner' | 'intermediate' | 'advanced'
  previousHints: string[]
  commonMistakes: string[]
  learningProgress: number // 0-100
}

interface SmartHint {
  id: string
  type: 'syntax' | 'logic' | 'best_practice' | 'concept' | 'debugging'
  priority: 'low' | 'medium' | 'high'
  message: string
  codeSuggestion?: string
  explanation?: string
  relatedConcepts: string[]
  triggers: string[] // Code patterns that trigger this hint
}

// Smart hints database
const smartHints: { [key: string]: SmartHint[] } = {
  javascript: [
    {
      id: 'js-var-declaration',
      type: 'syntax',
      priority: 'medium',
      message: 'Consider using `let` or `const` instead of `var` for better scoping',
      codeSuggestion: 'let variableName = value;',
      explanation: '`let` and `const` have block scope, while `var` has function scope. This prevents unexpected behavior.',
      relatedConcepts: ['Variable Declaration', 'Scope', 'ES6'],
      triggers: ['var ', 'var\t', 'var\n']
    },
    {
      id: 'js-strict-equality',
      type: 'best_practice',
      priority: 'high',
      message: 'Use `===` for strict equality comparison instead of `==`',
      codeSuggestion: 'if (value === "test") { }',
      explanation: '`===` checks both value and type, while `==` performs type coercion which can lead to unexpected results.',
      relatedConcepts: ['Equality Operators', 'Type Coercion', 'Comparison'],
      triggers: [' == ', ' ==\n', ' ==\t', '==', '!==']
    },
    {
      id: 'js-template-literals',
      type: 'best_practice',
      priority: 'medium',
      message: 'Consider using template literals for string concatenation',
      codeSuggestion: 'const message = `Hello, ${name}!`;',
      explanation: 'Template literals are more readable and efficient than string concatenation with `+`.',
      relatedConcepts: ['Template Literals', 'String Interpolation', 'ES6'],
      triggers: ['" + ', ' + "', ' + ', ' + \n', ' + \t']
    },
    {
      id: 'js-arrow-functions',
      type: 'best_practice',
      priority: 'medium',
      message: 'Consider using arrow functions for concise syntax',
      codeSuggestion: 'const add = (a, b) => a + b;',
      explanation: 'Arrow functions provide shorter syntax and lexical `this` binding.',
      relatedConcepts: ['Arrow Functions', 'ES6', 'Function Syntax'],
      triggers: ['function(', 'function (', 'function\t(']
    },
    {
      id: 'js-array-methods',
      type: 'concept',
      priority: 'medium',
      message: 'Consider using array methods like `map`, `filter`, or `reduce` instead of loops',
      codeSuggestion: 'const doubled = numbers.map(n => n * 2);',
      explanation: 'Array methods are more functional and often more readable than traditional loops.',
      relatedConcepts: ['Array Methods', 'Functional Programming', 'ES6'],
      triggers: ['for (', 'for(', 'for\t(', 'while (', 'while(']
    },
    {
      id: 'js-destructuring',
      type: 'best_practice',
      priority: 'low',
      message: 'Consider using destructuring for cleaner object/array access',
      codeSuggestion: 'const { name, age } = person;',
      explanation: 'Destructuring makes code more readable and reduces repetition.',
      relatedConcepts: ['Destructuring', 'ES6', 'Object Access'],
      triggers: ['object.', 'array[', 'person.name', 'person.age']
    }
  ],
  python: [
    {
      id: 'py-f-string',
      type: 'best_practice',
      priority: 'high',
      message: 'Use f-strings for string formatting instead of `.format()` or `%`',
      codeSuggestion: 'message = f"Hello, {name}!"',
      explanation: 'F-strings are more readable and efficient than other string formatting methods.',
      relatedConcepts: ['F-strings', 'String Formatting', 'Python 3.6+'],
      triggers: ['.format(', '.format(', ' % ', ' %s', ' %d']
    },
    {
      id: 'py-list-comprehension',
      type: 'concept',
      priority: 'medium',
      message: 'Consider using list comprehension for creating lists',
      codeSuggestion: 'squares = [x**2 for x in numbers]',
      explanation: 'List comprehensions are more Pythonic and often more efficient than loops.',
      relatedConcepts: ['List Comprehension', 'Pythonic Code', 'Functional Programming'],
      triggers: ['for ', 'for\t', 'for\n', 'append(']
    },
    {
      id: 'py-default-args',
      type: 'best_practice',
      priority: 'high',
      message: 'Use `None` as default argument instead of mutable objects',
      codeSuggestion: 'def add_item(item, items=None):\n    if items is None:\n        items = []',
      explanation: 'Mutable default arguments are created once and shared between function calls.',
      relatedConcepts: ['Default Arguments', 'Mutable vs Immutable', 'Function Parameters'],
      triggers: ['def ', 'def\t', 'def\n', '=[]', '={}', '=set()']
    },
    {
      id: 'py-context-manager',
      type: 'best_practice',
      priority: 'medium',
      message: 'Use context managers (`with` statement) for file operations',
      codeSuggestion: 'with open("file.txt", "r") as f:\n    content = f.read()',
      explanation: 'Context managers automatically handle resource cleanup and are more Pythonic.',
      relatedConcepts: ['Context Managers', 'File Operations', 'Resource Management'],
      triggers: ['open(', 'file(', '.close()', '.read()', '.write()']
    },
    {
      id: 'py-enumerate',
      type: 'concept',
      priority: 'medium',
      message: 'Use `enumerate()` when you need both index and value',
      codeSuggestion: 'for i, item in enumerate(items):\n    print(f"{i}: {item}")',
      explanation: '`enumerate()` is cleaner than using `range(len())` for indexed iteration.',
      relatedConcepts: ['Enumerate', 'Iteration', 'Indexing'],
      triggers: ['range(len(', 'range(len(', 'for i in range(']
    }
  ],
  css: [
    {
      id: 'css-flexbox',
      type: 'concept',
      priority: 'medium',
      message: 'Consider using Flexbox for layout instead of floats',
      codeSuggestion: 'display: flex;\njustify-content: center;\nalign-items: center;',
      explanation: 'Flexbox provides more powerful and predictable layout control than floats.',
      relatedConcepts: ['Flexbox', 'CSS Layout', 'Modern CSS'],
      triggers: ['float:', 'float: ', 'float: left', 'float: right', 'clear:']
    },
    {
      id: 'css-grid',
      type: 'concept',
      priority: 'low',
      message: 'Consider using CSS Grid for complex layouts',
      codeSuggestion: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(200px, 1fr));',
      explanation: 'CSS Grid is perfect for two-dimensional layouts and responsive design.',
      relatedConcepts: ['CSS Grid', 'Layout', 'Responsive Design'],
      triggers: ['display: flex', 'flex-direction:', 'flex-wrap:', 'justify-content:']
    },
    {
      id: 'css-custom-properties',
      type: 'best_practice',
      priority: 'medium',
      message: 'Use CSS custom properties (variables) for consistent theming',
      codeSuggestion: ':root {\n  --primary-color: #007bff;\n}\n.button {\n  background-color: var(--primary-color);\n}',
      explanation: 'CSS custom properties make it easier to maintain consistent colors and values.',
      relatedConcepts: ['CSS Variables', 'Custom Properties', 'Theming'],
      triggers: ['#', 'rgb(', 'rgba(', 'color:', 'background-color:']
    },
    {
      id: 'css-mobile-first',
      type: 'best_practice',
      priority: 'high',
      message: 'Write mobile-first CSS with progressive enhancement',
      codeSuggestion: '/* Mobile styles */\n.container {\n  padding: 1rem;\n}\n\n/* Desktop styles */\n@media (min-width: 768px) {\n  .container {\n    padding: 2rem;\n  }\n}',
      explanation: 'Mobile-first approach ensures better performance and user experience across devices.',
      relatedConcepts: ['Responsive Design', 'Mobile-First', 'Media Queries'],
      triggers: ['@media', 'min-width:', 'max-width:', 'width:', 'height:']
    }
  ],
  html: [
    {
      id: 'html-semantic',
      type: 'best_practice',
      priority: 'high',
      message: 'Use semantic HTML elements for better accessibility and SEO',
      codeSuggestion: '<header>, <nav>, <main>, <section>, <article>, <footer>',
      explanation: 'Semantic elements provide meaning to screen readers and search engines.',
      relatedConcepts: ['Semantic HTML', 'Accessibility', 'SEO'],
      triggers: ['<div', '<span', '<p', '<h1', '<h2', '<h3']
    },
    {
      id: 'html-forms',
      type: 'best_practice',
      priority: 'medium',
      message: 'Always include proper form labels and validation attributes',
      codeSuggestion: '<label for="email">Email:</label>\n<input type="email" id="email" required>',
      explanation: 'Proper labels and validation improve accessibility and user experience.',
      relatedConcepts: ['Forms', 'Accessibility', 'Validation'],
      triggers: ['<input', '<textarea', '<select', '<form']
    },
    {
      id: 'html-meta',
      type: 'best_practice',
      priority: 'medium',
      message: 'Include essential meta tags for SEO and mobile optimization',
      codeSuggestion: '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Page description">',
      explanation: 'Meta tags help with SEO, social sharing, and mobile responsiveness.',
      relatedConcepts: ['Meta Tags', 'SEO', 'Mobile Optimization'],
      triggers: ['<head', '<title', '<meta']
    }
  ]
}

// Analyze code and generate smart hints
export function generateSmartHints(context: HintContext): SmartHint[] {
  const { language, code, userLevel, previousHints, learningProgress } = context
  const languageHints = smartHints[language.toLowerCase()] || []
  const relevantHints: SmartHint[] = []

  // Filter hints based on user level and learning progress
  for (const hint of languageHints) {
    // Skip if user has already seen this hint
    if (previousHints.includes(hint.id)) {
      continue
    }

    // Check if hint is triggered by current code
    const isTriggered = hint.triggers.some(trigger => 
      code.toLowerCase().includes(trigger.toLowerCase())
    )

    if (isTriggered) {
      // Adjust priority based on user level and learning progress
      let adjustedPriority = hint.priority
      
      if (userLevel === 'beginner' && hint.priority === 'low') {
        adjustedPriority = 'medium'
      } else if (userLevel === 'advanced' && hint.priority === 'high') {
        adjustedPriority = 'medium'
      }

      // Adjust based on learning progress
      if (learningProgress < 30 && hint.priority === 'low') {
        adjustedPriority = 'medium'
      } else if (learningProgress > 70 && hint.priority === 'high') {
        adjustedPriority = 'medium'
      }

      relevantHints.push({
        ...hint,
        priority: adjustedPriority
      })
    }
  }

  // Sort by priority and limit to top 3
  return relevantHints
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
    .slice(0, 3)
}

// Get contextual hints based on specific code patterns
export function getContextualHints(code: string, language: string): SmartHint[] {
  const context: HintContext = {
    language,
    code,
    lessonId: '',
    userLevel: 'beginner',
    previousHints: [],
    commonMistakes: [],
    learningProgress: 50
  }

  return generateSmartHints(context)
}

// Get learning path suggestions
export function getLearningPathSuggestions(
  language: string, 
  currentConcepts: string[], 
  userLevel: string
): string[] {
  const conceptPaths: { [key: string]: string[] } = {
    javascript: [
      'Variables and Data Types',
      'Functions and Scope',
      'Arrays and Objects',
      'DOM Manipulation',
      'Async Programming',
      'ES6+ Features',
      'Error Handling',
      'Testing and Debugging'
    ],
    python: [
      'Variables and Data Types',
      'Control Flow',
      'Functions and Modules',
      'Data Structures',
      'Object-Oriented Programming',
      'File Handling',
      'Error Handling',
      'Testing and Libraries'
    ],
    css: [
      'Selectors and Properties',
      'Box Model and Layout',
      'Flexbox',
      'CSS Grid',
      'Responsive Design',
      'CSS Variables',
      'Animations and Transitions',
      'CSS Architecture'
    ],
    html: [
      'Basic Structure',
      'Semantic Elements',
      'Forms and Inputs',
      'Accessibility',
      'SEO Best Practices',
      'Meta Tags',
      'Multimedia',
      'Advanced Features'
    ]
  }

  const path = conceptPaths[language.toLowerCase()] || []
  const currentIndex = currentConcepts.length
  const nextConcepts = path.slice(currentIndex, currentIndex + 3)

  return nextConcepts
}

// Get personalized learning recommendations
export function getPersonalizedRecommendations(
  language: string,
  userLevel: string,
  learningProgress: number,
  commonMistakes: string[]
): string[] {
  const recommendations: string[] = []

  if (learningProgress < 30) {
    recommendations.push('Focus on fundamentals and basic syntax')
    recommendations.push('Practice with simple exercises')
    recommendations.push('Review basic concepts regularly')
  } else if (learningProgress < 70) {
    recommendations.push('Work on intermediate concepts')
    recommendations.push('Practice with real-world examples')
    recommendations.push('Learn best practices and patterns')
  } else {
    recommendations.push('Focus on advanced topics')
    recommendations.push('Build complex projects')
    recommendations.push('Learn about performance optimization')
  }

  if (commonMistakes.length > 0) {
    recommendations.push('Review areas where you commonly make mistakes')
  }

  return recommendations
}
