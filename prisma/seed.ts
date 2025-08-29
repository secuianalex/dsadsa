import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const langs = [
  // Core Web Technologies
  "HTML", "CSS", "JavaScript", "TypeScript",
  
  // Popular Programming Languages
  "Python", "Java", "C#", "C", "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Dart",
  
  // Functional & Modern Languages
  "Scala", "Haskell", "Elixir", "Clojure", "F#", "OCaml", "Erlang",
  
  // Data & Analytics
  "R", "MATLAB", "Julia", "SAS", "Stata",
  
  // Database & Query Languages
  "SQL", "PL/SQL", "T-SQL", "MongoDB", "GraphQL",
  
  // Scripting & Automation
  "Bash", "PowerShell", "Perl", "Lua", "Groovy", "VBScript",
  
  // Mobile & Cross-platform
  "React Native", "Flutter", "Xamarin", "Ionic",
  
  // Web Frameworks & Libraries
  "React", "Vue.js", "Angular", "Node.js", "Express.js", "Django", "Flask", "Laravel", "Spring",
  
  // Cloud & DevOps
  "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "Git",
  
  // Game Development
  "Unity", "Unreal Engine", "Godot", "GameMaker",
  
  // AI & Machine Learning
  "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
  
  // Low-level & Embedded
  "Assembly", "VHDL", "Verilog", "Arduino", "Raspberry Pi",
  
  // Other Popular Technologies
  "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Webpack", "Babel", "ESLint", "Prettier"
]

// Comprehensive lesson content for each language
const lessonTemplates = {
  "Python": [
    {
      number: 1,
      title: "Getting Started with Python",
      content: `# Welcome to Python! 🐍

Python is one of the most beginner-friendly programming languages. It's like writing in plain English!

## What is Python?
Python is a high-level programming language that's perfect for beginners because:
- It reads like English
- It has simple, clean syntax
- It's used everywhere (web apps, data science, AI, automation)

## Your First Python Program
Let's start with the classic "Hello, World!" program:

\`\`\`python
print("Hello, World!")
\`\`\`

**What this does:**
- \`print()\` is a function that displays text on the screen
- The text inside quotes is called a "string"
- Run this and you'll see "Hello, World!" appear!

## Try It Yourself
1. Open a text editor (like Notepad, VS Code, or use an online Python editor)
2. Type the code above
3. Save it as \`hello.py\`
4. Run it and see the magic happen!

## Key Concepts
- **Comments**: Lines starting with # are notes for humans (Python ignores them)
- **Functions**: Commands that do something (like \`print()\`)
- **Strings**: Text wrapped in quotes

## Next Steps
In the next lesson, we'll learn about variables - containers for storing information!`,
      exercise: "Create a program that prints your name and age. For example: 'My name is Alex and I am 25 years old.'",
      difficulty: "beginner",
      estimatedTime: 15
    },
    {
      number: 2,
      title: "Variables and Data Types",
      content: `# Variables: Your Data Containers 📦

Variables are like labeled boxes where you store information. Think of them as containers with names!

## Creating Variables
\`\`\`python
name = "Alice"
age = 25
height = 5.6
is_student = True
\`\`\`

**What's happening:**
- \`name\` stores text (string)
- \`age\` stores a whole number (integer)
- \`height\` stores a decimal number (float)
- \`is_student\` stores True/False (boolean)

## Data Types in Python
1. **Strings** - Text (always in quotes)
   \`\`\`python
   message = "Hello there!"
   \`\`\`

2. **Integers** - Whole numbers
   \`\`\`python
   count = 42
   \`\`\`

3. **Floats** - Decimal numbers
   \`\`\`python
   price = 19.99
   \`\`\`

4. **Booleans** - True or False
   \`\`\`python
   is_active = True
   \`\`\`

## Using Variables
\`\`\`python
name = "Bob"
print("Hello, " + name)
print(f"Hello, {name}")  # This is called an f-string (easier!)
\`\`\`

## Variable Naming Rules
- Use letters, numbers, and underscores
- Start with a letter or underscore
- Use descriptive names: \`user_age\` not \`a\`
- Python is case-sensitive: \`Name\` and \`name\` are different

## Practice Example
\`\`\`python
first_name = "John"
last_name = "Doe"
age = 30
print(f"{first_name} {last_name} is {age} years old")
\`\`\``,
      exercise: "Create variables for your favorite movie, its year, and rating. Then print a sentence using all three variables.",
      difficulty: "beginner",
      estimatedTime: 20
    },
    {
      number: 3,
      title: "User Input and Basic Operations",
      content: `# Getting Input from Users 👤

Now let's make our programs interactive by getting information from users!

## Getting User Input
\`\`\`python
name = input("What's your name? ")
print(f"Hello, {name}!")
\`\`\`

**What happens:**
1. \`input()\` shows a message and waits for the user to type
2. Whatever the user types gets stored in the \`name\` variable
3. We can then use that information

## Basic Math Operations
\`\`\`python
# Addition
result = 5 + 3  # 8

# Subtraction
result = 10 - 4  # 6

# Multiplication
result = 6 * 7  # 42

# Division
result = 15 / 3  # 5.0 (always gives a float)

# Integer division (removes decimal)
result = 15 // 3  # 5

# Modulo (remainder)
result = 17 % 5  # 2 (remainder when dividing 17 by 5)

# Power
result = 2 ** 3  # 8 (2 to the power of 3)
\`\`\`

## Converting Input Types
\`\`\`python
# Input always gives a string, so we need to convert for numbers
age = input("How old are you? ")
age = int(age)  # Convert string to integer

height = input("What's your height in meters? ")
height = float(height)  # Convert string to float
\`\`\`

## Building a Simple Calculator
\`\`\`python
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

sum_result = num1 + num2
difference = num1 - num2
product = num1 * num2
quotient = num1 / num2

print(f"Sum: {sum_result}")
print(f"Difference: {difference}")
print(f"Product: {product}")
print(f"Quotient: {quotient}")
\`\`\`

## Error Handling Basics
Sometimes users enter invalid data:
\`\`\`python
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old")
except ValueError:
    print("Please enter a valid number!")
\`\`\``,
      exercise: "Create a program that asks for the user's name, age, and favorite color, then prints a personalized message using all three pieces of information.",
      difficulty: "beginner",
      estimatedTime: 25
    }
  ],
  "JavaScript": [
    {
      number: 1,
      title: "Introduction to JavaScript",
      content: `# Welcome to JavaScript! 🚀

JavaScript is the language of the web! It makes websites interactive and dynamic.

## What is JavaScript?
JavaScript is a programming language that:
- Runs in web browsers
- Makes websites interactive
- Can also run on servers (Node.js)
- Is essential for modern web development

## Your First JavaScript Program
\`\`\`javascript
console.log("Hello, World!");
\`\`\`

**What this does:**
- \`console.log()\` displays text in the browser's developer console
- The text inside quotes is a string
- The semicolon (;) marks the end of a statement

## Running JavaScript
1. **In Browser Console:**
   - Press F12 to open developer tools
   - Go to Console tab
   - Type your code and press Enter

2. **In HTML File:**
   \`\`\`html
   <!DOCTYPE html>
   <html>
   <head>
       <title>My First JavaScript</title>
   </head>
   <body>
       <script>
           console.log("Hello from HTML!");
       </script>
   </body>
   </html>
   \`\`\`

## Variables in JavaScript
\`\`\`javascript
let name = "Alice";
const age = 25;
var oldWay = "not recommended";
\`\`\`

**Variable Types:**
- \`let\` - for variables that can change
- \`const\` - for variables that won't change
- \`var\` - old way (avoid in modern code)

## Data Types
\`\`\`javascript
let text = "Hello";           // String
let number = 42;              // Number
let decimal = 3.14;           // Number (floats are numbers too)
let isTrue = true;            // Boolean
let nothing = null;           // Null
let undefined;                // Undefined
let symbol = Symbol();        // Symbol
let object = {};              // Object
let array = [];               // Array
\`\`\``,
      exercise: "Create a JavaScript program that declares variables for your name, age, and favorite hobby, then prints them to the console.",
      difficulty: "beginner",
      estimatedTime: 20
    }
  ],
  "HTML": [
    {
      number: 1,
      title: "HTML Basics: Structure of a Web Page",
      content: `# Welcome to HTML! 🌐

HTML (HyperText Markup Language) is the foundation of every website. It's like the skeleton of a web page!

## What is HTML?
HTML is a markup language that:
- Defines the structure of web pages
- Uses tags to organize content
- Is the first step in web development
- Works with CSS (styling) and JavaScript (interactivity)

## Your First HTML Page
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
\`\`\`

**What each part does:**
- \`<!DOCTYPE html>\` - Tells the browser this is an HTML5 document
- \`<html>\` - The root element that contains everything
- \`<head>\` - Contains metadata (title, links to CSS, etc.)
- \`<title>\` - Sets the page title (shows in browser tab)
- \`<body>\` - Contains all visible content
- \`<h1>\` - Main heading (largest text)
- \`<p>\` - Paragraph of text

## Basic HTML Tags
\`\`\`html
<h1>Main Heading</h1>
<h2>Sub Heading</h2>
<h3>Smaller Heading</h3>
<p>This is a paragraph of text.</p>
<br> <!-- Line break -->
<hr> <!-- Horizontal line -->
\`\`\`

## Creating Your First Page
1. Open a text editor (Notepad, VS Code, etc.)
2. Copy the HTML code above
3. Save it as \`index.html\`
4. Double-click to open in your browser

## HTML Structure Rules
- Tags usually come in pairs: \`<tag>\` and \`</tag>\`
- Some tags are self-closing: \`<br>\`, \`<hr>\`
- HTML is not case-sensitive, but lowercase is standard
- Indentation helps readability (but doesn't affect the page)

## Common Mistakes to Avoid
- Forgetting to close tags
- Missing the DOCTYPE declaration
- Not saving files with .html extension`,
      exercise: "Create an HTML page about yourself with a title, main heading, and at least two paragraphs describing your interests and goals.",
      difficulty: "beginner",
      estimatedTime: 15
    }
  ]
}

async function main() {
  // Clear existing data
  await prisma.progress.deleteMany()
  await prisma.exam.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.pathLanguage.deleteMany()
  await prisma.path.deleteMany()
  await prisma.language.deleteMany()

  // --- Seed Languages and Lessons ----------------
  for (const name of langs) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const lang = await prisma.language.upsert({
      where: { slug },
      update: { name: name },
      create: { slug, name: name },
    })

    // Get lesson template for this language or use a default one
    const lessons = lessonTemplates[name as keyof typeof lessonTemplates] || [
      {
        number: 1,
        title: `Getting Started with ${name}`,
        content: `# Welcome to ${name}! 🚀

${name} is a powerful programming language/technology that you can use to build amazing things.

## What is ${name}?
${name} is used for:
- [Specific use cases for this technology]
- [Another use case]
- [And more applications]

## Your First ${name} Program
Let's start with a simple example:

\`\`\`
[Code example here]
\`\`\`

## Key Concepts
- **Concept 1**: Explanation
- **Concept 2**: Explanation
- **Concept 3**: Explanation

## Next Steps
In the next lesson, we'll learn more advanced concepts!`,
        exercise: `Create a simple ${name} program that demonstrates the basic concepts we learned.`,
        difficulty: "beginner",
        estimatedTime: 20
      },
      {
        number: 2,
        title: `${name} Fundamentals`,
        content: `# ${name} Fundamentals 📚

Now that you understand the basics, let's dive deeper into ${name}.

## Core Concepts
[Detailed content about fundamental concepts]

## Examples
[Practical examples with code]

## Best Practices
[Important tips and guidelines]`,
        exercise: `Build a more complex ${name} program that combines multiple concepts.`,
        difficulty: "beginner",
        estimatedTime: 25
      },
      {
        number: 3,
        title: `Advanced ${name} Techniques`,
        content: `# Advanced ${name} Techniques 🔧

Ready to take your ${name} skills to the next level!

## Advanced Features
[Advanced concepts and techniques]

## Real-World Applications
[How to apply these concepts in practice]

## Optimization Tips
[Performance and best practices]`,
        exercise: `Create a complete ${name} project that demonstrates advanced techniques.`,
        difficulty: "intermediate",
        estimatedTime: 30
      }
    ]

    // Create lessons for this language
    for (const lessonData of lessons) {
      const lesson = await prisma.lesson.upsert({
        where: { 
          languageId_number: {
            languageId: lang.id,
            number: lessonData.number
          }
        },
        update: {
          title: lessonData.title,
          content: lessonData.content,
          exercise: lessonData.exercise,
          difficulty: lessonData.difficulty,
          estimatedTime: lessonData.estimatedTime
        },
        create: {
          languageId: lang.id,
          ...lessonData
        }
      })

      // Create exam for this lesson
      await prisma.exam.upsert({
        where: { lessonId: lesson.id },
        update: {
          prompt: `Complete the exercise for ${name} Lesson ${lessonData.number}: "${lessonData.title}". Build a working program that demonstrates the concepts learned in this lesson.`
        },
        create: {
          lessonId: lesson.id,
          prompt: `Complete the exercise for ${name} Lesson ${lessonData.number}: "${lessonData.title}". Build a working program that demonstrates the concepts learned in this lesson.`
        }
      })
    }
  }

  console.log("Seed complete for", langs.length, "languages.")

  // --- Seed Learning Paths -----------------------------------------------
  const pathsData = [
    {
      slug: "web-development",
      title: "Web Development",
      description: "Learn to build modern websites and web applications",
      languageSlugs: ["html", "css", "javascript", "react", "node-js", "express-js"]
    },
    {
      slug: "frontend-development",
      title: "Frontend Development",
      description: "Master the art of creating beautiful, interactive user interfaces",
      languageSlugs: ["html", "css", "javascript", "react", "vue-js", "angular", "typescript"]
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      description: "Build powerful server-side applications and APIs",
      languageSlugs: ["python", "django", "flask", "node-js", "express-js", "java", "spring", "php", "laravel"]
    },
    {
      slug: "data-science-analytics",
      title: "Data Science & Analytics",
      description: "Analyze data, build models, and extract insights",
      languageSlugs: ["python", "r", "matlab", "julia", "pandas", "numpy", "scikit-learn", "tensorflow", "pytorch"]
    },
    {
      slug: "mobile-development",
      title: "Mobile Development",
      description: "Create apps for iOS, Android, and cross-platform",
      languageSlugs: ["swift", "kotlin", "react-native", "flutter", "dart", "xamarin", "ionic"]
    },
    {
      slug: "game-development",
      title: "Game Development",
      description: "Build interactive games and immersive experiences",
      languageSlugs: ["c-sharp", "unity", "unreal-engine", "godot", "gamemaker", "lua"]
    },
    {
      slug: "ai-machine-learning",
      title: "AI & Machine Learning",
      description: "Create intelligent systems and predictive models",
      languageSlugs: ["python", "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "r", "matlab"]
    },
    {
      slug: "devops-cloud",
      title: "DevOps & Cloud",
      description: "Deploy, manage, and scale applications in the cloud",
      languageSlugs: ["docker", "kubernetes", "terraform", "ansible", "jenkins", "git", "bash", "powershell"]
    },
    {
      slug: "scripting-automation",
      title: "Scripting & Automation",
      description: "Automate tasks and build powerful tools",
      languageSlugs: ["python", "bash", "powershell", "perl", "lua", "groovy", "vbscript"]
    },
    {
      slug: "systems-programming",
      title: "Systems Programming",
      description: "Build high-performance, low-level applications",
      languageSlugs: ["c", "c-plus-plus", "rust", "go", "assembly", "vhdl", "verilog"]
    }
  ]

  for (const pathData of pathsData) {
    const path = await prisma.path.create({
      data: {
        slug: pathData.slug,
        title: pathData.title,
        description: pathData.description
      }
    })

    // Connect languages to this path
    for (const langSlug of pathData.languageSlugs) {
      const lang = await prisma.language.findUnique({ where: { slug: langSlug } })
      if (lang) {
        await prisma.pathLanguage.create({
          data: {
            pathId: path.id,
            languageId: lang.id
          }
        })
      }
    }

    console.log("Seeded path:", pathData.title)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
