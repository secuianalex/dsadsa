interface ErrorAnalysis {
  type: string
  severity: 'low' | 'medium' | 'high'
  explanation: string
  suggestions: string[]
  examples: string[]
  relatedConcepts: string[]
}

interface CodeContext {
  language: string
  code: string
  error: string
  lineNumber?: number
}

// Error patterns and their analysis
const errorPatterns: { [key: string]: (context: CodeContext) => ErrorAnalysis } = {
  // JavaScript/TypeScript Errors
  'ReferenceError:.*is not defined': (context: CodeContext) => ({
    type: 'ReferenceError',
    severity: 'medium',
    explanation: 'You\'re trying to use a variable or function that hasn\'t been declared or is out of scope.',
    suggestions: [
      'Check if the variable name is spelled correctly',
      'Make sure the variable is declared before using it',
      'Check if the variable is in the correct scope',
      'For functions, ensure they are defined or imported'
    ],
    examples: [
      '// ❌ Wrong\nconsole.log(myVariable);\n\n// ✅ Correct\nlet myVariable = "Hello";\nconsole.log(myVariable);',
      '// ❌ Wrong\nfunction greet() {\n  console.log(message);\n}\n\n// ✅ Correct\nfunction greet() {\n  let message = "Hello";\n  console.log(message);\n}'
    ],
    relatedConcepts: ['Variable Declaration', 'Scope', 'Hoisting', 'Import/Export']
  }),

  'SyntaxError:.*Unexpected token': (context: CodeContext) => ({
    type: 'SyntaxError',
    severity: 'high',
    explanation: 'There\'s a syntax error in your code - the JavaScript engine found something it wasn\'t expecting.',
    suggestions: [
      'Check for missing or extra brackets, parentheses, or semicolons',
      'Look for unclosed strings or comments',
      'Verify that all opening brackets have matching closing brackets',
      'Check for proper comma usage in objects and arrays'
    ],
    examples: [
      '// ❌ Wrong\nlet obj = {\n  name: "John"\n  age: 30\n};\n\n// ✅ Correct\nlet obj = {\n  name: "John",\n  age: 30\n};',
      '// ❌ Wrong\nconsole.log("Hello world;\n\n// ✅ Correct\nconsole.log("Hello world");'
    ],
    relatedConcepts: ['Syntax', 'Brackets and Parentheses', 'String Literals', 'Object Literals']
  }),

  'TypeError:.*is not a function': (context: CodeContext) => ({
    type: 'TypeError',
    severity: 'medium',
    explanation: 'You\'re trying to call something as a function, but it\'s not actually a function.',
    suggestions: [
      'Check if the function name is spelled correctly',
      'Make sure the function is defined before calling it',
      'Verify that you\'re not trying to call a property or variable as a function',
      'Check if the function is properly imported or accessible'
    ],
    examples: [
      '// ❌ Wrong\nlet name = "John";\nname();\n\n// ✅ Correct\nfunction greet() {\n  return "Hello";\n}\ngreet();',
      '// ❌ Wrong\nlet obj = { value: 42 };\nobj.value();\n\n// ✅ Correct\nlet obj = { value: () => 42 };\nobj.value();'
    ],
    relatedConcepts: ['Functions', 'Function Declaration', 'Function Expression', 'Method Calls']
  }),

  // Python Errors
  'NameError:.*is not defined': (context: CodeContext) => ({
    type: 'NameError',
    severity: 'medium',
    explanation: 'You\'re trying to use a variable or function that hasn\'t been defined in Python.',
    suggestions: [
      'Check if the variable name is spelled correctly',
      'Make sure the variable is assigned before using it',
      'Check if you need to import a module',
      'Verify the variable is in the correct scope'
    ],
    examples: [
      '# ❌ Wrong\nprint(my_variable)\n\n# ✅ Correct\nmy_variable = "Hello"\nprint(my_variable)',
      '# ❌ Wrong\nimport math\nprint(sqrt(16))\n\n# ✅ Correct\nimport math\nprint(math.sqrt(16))'
    ],
    relatedConcepts: ['Variable Assignment', 'Import Statements', 'Scope', 'Namespaces']
  }),

  'IndentationError': (context: CodeContext) => ({
    type: 'IndentationError',
    severity: 'high',
    explanation: 'Python uses indentation to define code blocks. Your indentation is inconsistent or incorrect.',
    suggestions: [
      'Use consistent indentation (spaces or tabs, but not both)',
      'Make sure all lines in a block have the same indentation level',
      'Check for mixed tabs and spaces',
      'Use 4 spaces per indentation level (Python standard)'
    ],
    examples: [
      '# ❌ Wrong\nif True:\nprint("This will cause an error")\n\n# ✅ Correct\nif True:\n    print("This is properly indented")',
      '# ❌ Wrong\nfor i in range(5):\n  print(i)\n    print("Wrong indentation")\n\n# ✅ Correct\nfor i in range(5):\n    print(i)\n    print("Correct indentation")'
    ],
    relatedConcepts: ['Indentation', 'Code Blocks', 'Control Flow', 'Python Syntax']
  }),

  'TypeError:.*object is not callable': (context: CodeContext) => ({
    type: 'TypeError',
    severity: 'medium',
    explanation: 'You\'re trying to call something as a function, but it\'s not callable in Python.',
    suggestions: [
      'Check if the function name is spelled correctly',
      'Make sure you\'re not overriding a built-in function name',
      'Verify that the object is actually a function',
      'Check if you need to import the function'
    ],
    examples: [
      '# ❌ Wrong\nlist = [1, 2, 3]\nlist()\n\n# ✅ Correct\nmy_list = [1, 2, 3]\nlen(my_list)',
      '# ❌ Wrong\nstr = "Hello"\nstr()\n\n# ✅ Correct\nmy_string = "Hello"\nlen(my_string)'
    ],
    relatedConcepts: ['Functions', 'Built-in Functions', 'Variable Names', 'Callable Objects']
  }),

  // CSS Errors
  'SyntaxError:.*Mismatched braces': (context: CodeContext) => ({
    type: 'SyntaxError',
    severity: 'high',
    explanation: 'Your CSS has mismatched opening and closing braces, which breaks the syntax.',
    suggestions: [
      'Count your opening and closing braces',
      'Make sure each opening brace { has a matching closing brace }',
      'Check for missing or extra braces in your CSS rules',
      'Use a code editor with brace matching to help identify issues'
    ],
    examples: [
      '/* ❌ Wrong */\nbody {\n    font-family: Arial;\n    margin: 0;\n\n/* ✅ Correct */\nbody {\n    font-family: Arial;\n    margin: 0;\n}',
      '/* ❌ Wrong */\n.container {\n    width: 100%;\n}\n.content {\n    padding: 20px;\n\n/* ✅ Correct */\n.container {\n    width: 100%;\n}\n.content {\n    padding: 20px;\n}'
    ],
    relatedConcepts: ['CSS Syntax', 'CSS Rules', 'Selectors', 'Properties']
  }),

  'SecurityError:.*Dangerous CSS properties': (context: CodeContext) => ({
    type: 'SecurityError',
    severity: 'high',
    explanation: 'You\'re using CSS properties that could be dangerous for security reasons.',
    suggestions: [
      'Avoid using expression() in CSS',
      'Be careful with url() functions that could load external resources',
      'Use safe CSS properties and values',
      'Consider using CSS custom properties for dynamic values'
    ],
    examples: [
      '/* ❌ Dangerous */\nwidth: expression(document.body.clientWidth);\n\n/* ✅ Safe */\nwidth: 100%;',
      '/* ❌ Potentially dangerous */\nbackground: url("http://external-site.com/image.jpg");\n\n/* ✅ Safe */\nbackground: url("./local-image.jpg");'
    ],
    relatedConcepts: ['CSS Security', 'CSS Properties', 'Safe CSS Practices', 'CSS Custom Properties']
  }),

  // HTML Errors
  'Unclosed tag': (context: CodeContext) => ({
    type: 'HTML Syntax Error',
    severity: 'medium',
    explanation: 'You have an HTML tag that isn\'t properly closed, which can cause rendering issues.',
    suggestions: [
      'Make sure all opening tags have corresponding closing tags',
      'Check for self-closing tags that don\'t need closing tags (like <img>, <br>)',
      'Verify that tags are nested properly',
      'Use an HTML validator to check your markup'
    ],
    examples: [
      '<!-- ❌ Wrong -->\n<div>\n    <h1>Title\n    <p>Paragraph\n</div>\n\n<!-- ✅ Correct -->\n<div>\n    <h1>Title</h1>\n    <p>Paragraph</p>\n</div>',
      '<!-- ❌ Wrong -->\n<img src="image.jpg">\n\n<!-- ✅ Correct -->\n<img src="image.jpg" />'
    ],
    relatedConcepts: ['HTML Tags', 'HTML Structure', 'Self-closing Tags', 'HTML Validation']
  }),

  'Invalid attribute': (context: CodeContext) => ({
    type: 'HTML Attribute Error',
    severity: 'low',
    explanation: 'You\'re using an HTML attribute that doesn\'t exist or is used incorrectly.',
    suggestions: [
      'Check the HTML specification for valid attributes',
      'Make sure attribute names are spelled correctly',
      'Verify that attributes are used on the correct elements',
      'Use lowercase for attribute names'
    ],
    examples: [
      '<!-- ❌ Wrong -->\n<div class="container" Class="main">\n\n<!-- ✅ Correct -->\n<div class="container main">',
      '<!-- ❌ Wrong -->\n<img src="image.jpg" href="link.html">\n\n<!-- ✅ Correct -->\n<img src="image.jpg" alt="Description">'
    ],
    relatedConcepts: ['HTML Attributes', 'HTML Elements', 'HTML Standards', 'Semantic HTML']
  })
}

// Main error analysis function
export function analyzeError(context: CodeContext): ErrorAnalysis | null {
  const { error, language } = context

  // Find matching error pattern
  for (const [pattern, analyzer] of Object.entries(errorPatterns)) {
    if (new RegExp(pattern, 'i').test(error)) {
      return analyzer(context)
    }
  }

  // Generic error analysis if no specific pattern matches
  return {
    type: 'Unknown Error',
    severity: 'medium',
    explanation: 'This is an error that occurred during code execution. The specific cause needs further investigation.',
    suggestions: [
      'Check the error message carefully for clues',
      'Verify your code syntax is correct',
      'Make sure all variables and functions are properly defined',
      'Test your code step by step to isolate the issue'
    ],
    examples: [],
    relatedConcepts: ['Debugging', 'Code Review', 'Error Handling']
  }
}

// Get common mistakes for a specific language
export function getCommonMistakes(language: string): ErrorAnalysis[] {
  const mistakes: { [key: string]: ErrorAnalysis[] } = {
    javascript: [
      {
        type: 'Common JavaScript Mistake',
        severity: 'medium',
        explanation: 'Using == instead of === for comparison',
        suggestions: [
          'Use === for strict equality comparison',
          'Use !== for strict inequality comparison',
          'Only use == when you specifically need type coercion'
        ],
        examples: [
          '// ❌ Loose equality\nif (5 == "5") { }\n\n// ✅ Strict equality\nif (5 === "5") { }',
          '// ❌ Loose equality\nif (null == undefined) { }\n\n// ✅ Strict equality\nif (null === undefined) { }'
        ],
        relatedConcepts: ['Equality Operators', 'Type Coercion', 'Comparison Operators']
      }
    ],
    python: [
      {
        type: 'Common Python Mistake',
        severity: 'medium',
        explanation: 'Using mutable default arguments',
        suggestions: [
          'Use None as default argument instead of mutable objects',
          'Create mutable objects inside the function if needed',
          'Be aware of how Python handles default arguments'
        ],
        examples: [
          '# ❌ Mutable default\ndef add_item(item, items=[]):\n    items.append(item)\n    return items\n\n# ✅ Immutable default\ndef add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items'
        ],
        relatedConcepts: ['Default Arguments', 'Mutable vs Immutable', 'Function Parameters']
      }
    ]
  }

  return mistakes[language.toLowerCase()] || []
}

// Get learning resources for error types
export function getLearningResources(errorType: string, language: string): string[] {
  const resources: { [key: string]: string[] } = {
    'ReferenceError': [
      'MDN: JavaScript Variables',
      'MDN: JavaScript Scope',
      'MDN: JavaScript Hoisting'
    ],
    'SyntaxError': [
      'MDN: JavaScript Syntax',
      'JavaScript Style Guide',
      'Code Style Best Practices'
    ],
    'TypeError': [
      'MDN: JavaScript Functions',
      'MDN: JavaScript Objects',
      'JavaScript Type System'
    ],
    'NameError': [
      'Python Variables and Assignment',
      'Python Import System',
      'Python Scope and Namespaces'
    ],
    'IndentationError': [
      'Python Style Guide (PEP 8)',
      'Python Indentation Rules',
      'Python Code Blocks'
    ]
  }

  return resources[errorType] || ['General Programming Best Practices', 'Language Documentation', 'Code Review Guidelines']
}
