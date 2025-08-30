const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Comprehensive lesson templates with detailed content
const lessonTemplates = {
  javascript: {
    topics: [
      "Variables and Data Types",
      "Functions and Scope",
      "Arrays and Objects",
      "DOM Manipulation",
      "Event Handling",
      "Async Programming",
      "ES6+ Features",
      "Error Handling",
      "Modules and Imports",
      "Testing with Jest",
      "Node.js Basics",
      "Express.js Framework",
      "Database Integration",
      "API Development",
      "Security Best Practices",
    ],
  },
  python: {
    topics: [
      "Variables and Data Types",
      "Control Structures",
      "Functions and Modules",
      "Object-Oriented Programming",
      "File Handling",
      "Exception Handling",
      "List Comprehensions",
      "Decorators",
      "Context Managers",
      "Unit Testing",
      "Web Development with Flask",
      "Django Framework",
      "Data Analysis with Pandas",
      "Machine Learning Basics",
      "Database Operations",
    ],
  },
  react: {
    topics: [
      "Components and Props",
      "State Management",
      "Lifecycle Methods",
      "Hooks (useState, useEffect)",
      "Custom Hooks",
      "Context API",
      "React Router",
      "Form Handling",
      "API Integration",
      "Error Boundaries",
      "Performance Optimization",
      "Testing with React Testing Library",
      "State Management with Redux",
      "TypeScript with React",
      "Deployment",
    ],
  },
  nodejs: {
    topics: [
      "Node.js Fundamentals",
      "Modules and NPM",
      "File System Operations",
      "HTTP Server Creation",
      "Express.js Framework",
      "Middleware Development",
      "Database Integration",
      "Authentication and Authorization",
      "API Development",
      "Error Handling",
      "Testing with Jest",
      "Performance Optimization",
      "Security Best Practices",
      "Deployment Strategies",
      "Microservices",
    ],
  },
  java: {
    topics: [
      "Variables and Data Types",
      "Control Structures",
      "Object-Oriented Programming",
      "Inheritance and Polymorphism",
      "Exception Handling",
      "Collections Framework",
      "File I/O Operations",
      "Multithreading",
      "Lambda Expressions",
      "Streams API",
      "Spring Framework",
      "Database Connectivity",
      "Web Development",
      "Testing with JUnit",
      "Design Patterns",
    ],
  },
  csharp: {
    topics: [
      "Variables and Data Types",
      "Control Structures",
      "Object-Oriented Programming",
      "Inheritance and Polymorphism",
      "Exception Handling",
      "Collections",
      "LINQ Queries",
      "File Operations",
      "Async Programming",
      "Events and Delegates",
      "ASP.NET Core",
      "Entity Framework",
      "Web API Development",
      "Unit Testing",
      "Design Patterns",
    ],
  },
  typescript: {
    topics: [
      "Basic Types",
      "Interfaces",
      "Classes",
      "Functions",
      "Generics",
      "Advanced Types",
      "Modules",
      "Decorators",
      "Utility Types",
      "Type Guards",
      "Error Handling",
      "Testing",
      "Configuration",
      "Integration with Frameworks",
      "Best Practices",
    ],
  },
  vuejs: {
    topics: [
      "Components and Props",
      "Reactivity",
      "Computed Properties",
      "Watchers",
      "Event Handling",
      "Form Handling",
      "Routing with Vue Router",
      "State Management",
      "Composition API",
      "Custom Directives",
      "Plugins",
      "Testing",
      "Performance",
      "Deployment",
      "Advanced Patterns",
    ],
  },
  html: {
    topics: [
      "Document Structure",
      "Text Elements",
      "Links and Navigation",
      "Images and Media",
      "Forms and Inputs",
      "Tables",
      "Semantic HTML",
      "Accessibility",
      "Meta Tags",
      "SEO Best Practices",
      "HTML5 Features",
      "Validation",
      "Templates",
      "Integration",
      "Best Practices",
    ],
  },
  ansible: {
    topics: [
      "Installation and Setup",
      "Inventory Management",
      "Playbooks",
      "Variables",
      "Conditionals and Loops",
      "Handlers",
      "Roles",
      "Templates",
      "File Operations",
      "Package Management",
      "Service Management",
      "User Management",
      "Security",
      "Best Practices",
      "Advanced Features",
    ],
  },
};

function generateDetailedLessonContent(language, topic, lessonNumber) {
  const detailedTemplates = {
    python: {
      "Variables and Data Types": `
<h2>Variables and Data Types in Python</h2>
<p>Python is a dynamically typed language, which means you don't need to declare variable types explicitly. This lesson covers the fundamental data types and how to work with variables effectively.</p>

<h3>Key Concepts</h3>
<ul>
<li>Variable assignment and naming conventions</li>
<li>Numeric types: int, float, complex</li>
<li>Text type: str</li>
<li>Sequence types: list, tuple, range</li>
<li>Mapping type: dict</li>
<li>Set types: set, frozenset</li>
<li>Boolean type: bool</li>
<li>Type checking and conversion</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Variable assignment
name = "Alice"
age = 25
height = 1.75
is_student = True

# Numeric types
integer_num = 42
float_num = 3.14159
complex_num = 3 + 4j

# String operations
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
formatted_name = f"{first_name} {last_name}"

# Lists and tuples
fruits_list = ["apple", "banana", "orange"]
fruits_tuple = ("apple", "banana", "orange")
numbers = list(range(1, 6))  # [1, 2, 3, 4, 5]

# Dictionaries
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Sets
unique_numbers = {1, 2, 3, 4, 5}
set_from_list = set([1, 2, 2, 3, 3, 4])  # {1, 2, 3, 4}

# Type checking
print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_student))  # <class 'bool'>

# Type conversion
string_number = "123"
converted_number = int(string_number)
float_number = float(string_number)

# Practical example
def calculate_bmi(weight, height):
    """Calculate BMI given weight in kg and height in meters."""
    bmi = weight / (height ** 2)
    return round(bmi, 2)

# Usage
weight_kg = 70
height_m = 1.75
bmi_result = calculate_bmi(weight_kg, height_m)
print(f"BMI: {bmi_result}")</code></pre>

<h3>Practice Exercise</h3>
<p>Create a student grade calculator that:</p>
<ol>
<li>Stores student information (name, ID, grades for 5 subjects) using appropriate data types</li>
<li>Calculates the average grade</li>
<li>Determines the letter grade (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60)</li>
<li>Stores multiple students in a list of dictionaries</li>
<li>Finds the student with the highest average</li>
</ol>

<h3>Common Pitfalls</h3>
<ul>
<li>Mutable vs immutable types (lists vs tuples)</li>
<li>Variable scope and shadowing</li>
<li>Type conversion errors</li>
<li>String concatenation with different types</li>
</ul>
      `,
      "Control Structures": `
<h2>Control Structures in Python</h2>
<p>Control structures allow you to control the flow of your program execution. Python provides several ways to make decisions and repeat code blocks.</p>

<h3>Key Concepts</h3>
<ul>
<li>Conditional statements (if, elif, else)</li>
<li>Comparison operators</li>
<li>Logical operators</li>
<li>Loops: for and while</li>
<li>Loop control: break, continue, pass</li>
<li>Nested control structures</li>
<li>Ternary operators</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Conditional statements
age = 18

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
elif age < 65:
    print("Adult")
else:
    print("Senior")

# Comparison operators
x = 10
y = 5

print(x == y)   # False
print(x != y)   # True
print(x > y)    # True
print(x <= y)   # False

# Logical operators
is_student = True
has_id = False
age_ok = True

if is_student and (has_id or age_ok):
    print("Can enter library")

# For loops
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# Range in for loops
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# While loops
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Loop control
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i)

# Nested loops
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})", end=" ")
    print()  # New line

# Ternary operator
age = 20
status = "adult" if age >= 18 else "minor"

# Practical example: Number guessing game
import random

def number_guessing_game():
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("I'm thinking of a number between 1 and 100!")
    
    while attempts < max_attempts:
        try:
            guess = int(input(f"Attempt {attempts + 1}: Enter your guess: "))
            attempts += 1
            
            if guess < secret_number:
                print("Too low!")
            elif guess > secret_number:
                print("Too high!")
            else:
                print(f"Congratulations! You guessed it in {attempts} attempts!")
                return
                
        except ValueError:
            print("Please enter a valid number!")
            continue
    
    print(f"Game over! The number was {secret_number}")

# List comprehensions (advanced control structure)
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]</code></pre>

<h3>Practice Exercise</h3>
<p>Create a simple calculator that:</p>
<ol>
<li>Displays a menu with operations (+, -, *, /, power, sqrt)</li>
<li>Uses while loops to keep running until user chooses to exit</li>
<li>Uses if/elif/else to handle different operations</li>
<li>Includes error handling for division by zero and invalid inputs</li>
<li>Keeps track of calculation history</li>
</ol>

<h3>Common Pitfalls</h3>
<ul>
<li>Indentation errors</li>
<li>Infinite loops</li>
<li>Off-by-one errors in loops</li>
<li>Missing colons after if/for/while</li>
<li>Confusing = (assignment) with == (comparison)</li>
</ul>
      `,
      "Functions and Modules": `
<h2>Functions and Modules in Python</h2>
<p>Functions are reusable blocks of code that perform specific tasks. Modules help organize code into separate files and provide a way to reuse code across different programs.</p>

<h3>Key Concepts</h3>
<ul>
<li>Function definition and calling</li>
<li>Parameters and arguments</li>
<li>Return values</li>
<li>Default parameters</li>
<li>Variable scope (local vs global)</li>
<li>Lambda functions</li>
<li>Module imports</li>
<li>Creating your own modules</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Basic function definition
def greet(name):
    """Simple greeting function with docstring."""
    return f"Hello, {name}!"

# Function call
message = greet("Alice")
print(message)  # Hello, Alice!

# Function with multiple parameters
def calculate_area(length, width):
    """Calculate area of a rectangle."""
    area = length * width
    return area

# Function with default parameters
def greet_with_title(name, title="Mr."):
    """Greet with optional title."""
    return f"Hello, {title} {name}!"

print(greet_with_title("Smith"))           # Hello, Mr. Smith!
print(greet_with_title("Johnson", "Dr."))  # Hello, Dr. Johnson!

# Function with multiple return values
def get_name_and_age():
    """Return multiple values as a tuple."""
    name = "Alice"
    age = 25
    return name, age

name, age = get_name_and_age()
print(f"{name} is {age} years old")

# Lambda functions (anonymous functions)
square = lambda x: x ** 2
add = lambda x, y: x + y

print(square(5))  # 25
print(add(3, 4))  # 7

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))

print(squared)  # [1, 4, 9, 16, 25]
print(evens)    # [2, 4]

# Variable scope
global_var = "I'm global"

def scope_demo():
    local_var = "I'm local"
    print(global_var)  # Can access global
    print(local_var)   # Can access local
    
    def nested_function():
        nested_var = "I'm nested"
        print(global_var)    # Can access global
        print(local_var)     # Can access outer local
        print(nested_var)    # Can access own local

# Module imports
import math
import random
from datetime import datetime
import os

# Using imported modules
print(math.pi)                    # 3.141592653589793
print(random.randint(1, 10))      # Random number 1-10
print(datetime.now())             # Current date/time
print(os.getcwd())                # Current working directory

# Creating your own module
# Save this as 'calculator.py'
"""
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
"""

# Using your module
import calculator

result = calculator.add(5, 3)
print(result)  # 8

# Practical example: Temperature converter
def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius."""
    return (fahrenheit - 32) * 5/9

def temperature_converter():
    """Interactive temperature converter."""
    print("Temperature Converter")
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    
    choice = input("Enter your choice (1 or 2): ")
    
    try:
        temp = float(input("Enter temperature: "))
        
        if choice == "1":
            result = celsius_to_fahrenheit(temp)
            print(f"{temp}°C = {result:.2f}°F")
        elif choice == "2":
            result = fahrenheit_to_celsius(temp)
            print(f"{temp}°F = {result:.2f}°C")
        else:
            print("Invalid choice!")
            
    except ValueError:
        print("Please enter a valid number!")

# Advanced: Function decorators
def timer(func):
    """Decorator to measure function execution time."""
    import time
    
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    
    return wrapper

@timer
def slow_function():
    """A function that takes time to execute."""
    import time
    time.sleep(1)
    return "Done!"

# Usage
result = slow_function()  # Will print execution time</code></pre>

<h3>Practice Exercise</h3>
<p>Create a library management system with the following functions:</p>
<ol>
<li>add_book(title, author, isbn) - Add a book to the library</li>
<li>remove_book(isbn) - Remove a book by ISBN</li>
<li>find_book(isbn) - Find and return book details</li>
<li>list_books() - Display all books</li>
<li>checkout_book(isbn, user) - Check out a book</li>
<li>return_book(isbn) - Return a book</li>
</ol>
<p>Store books in a dictionary and implement proper error handling.</p>

<h3>Common Pitfalls</h3>
<ul>
<li>Mutable default arguments</li>
<li>Forgetting return statements</li>
<li>Confusing local and global variables</li>
<li>Circular imports</li>
<li>Not handling exceptions in functions</li>
</ul>
      `,
    },
    javascript: {
      "Variables and Data Types": `
<h2>Variables and Data Types in JavaScript</h2>
<p>JavaScript is a dynamically typed language with several primitive and reference data types. Understanding these is fundamental to writing effective JavaScript code.</p>

<h3>Key Concepts</h3>
<ul>
<li>Variable declaration (var, let, const)</li>
<li>Primitive types: number, string, boolean, null, undefined, symbol</li>
<li>Reference types: object, array, function</li>
<li>Type coercion and conversion</li>
<li>Hoisting and scope</li>
<li>Template literals</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Variable declaration
let name = "Alice";
const age = 25;
var oldWay = "not recommended";

// Primitive types
let number = 42;
let float = 3.14159;
let string = "Hello World";
let boolean = true;
let nullValue = null;
let undefinedValue = undefined;
let symbol = Symbol("unique");

// Template literals
let firstName = "John";
let lastName = "Doe";
let fullName = \`${firstName} ${lastName}\`;
let message = \`Hello ${fullName}, you are ${age} years old!\`;

// Arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

// Objects
let person = {
    name: "Alice",
    age: 25,
    city: "New York",
    hobbies: ["reading", "coding"]
};

// Type checking
console.log(typeof number);        // "number"
console.log(typeof string);        // "string"
console.log(typeof boolean);       // "boolean"
console.log(typeof nullValue);     // "object" (this is a known bug)
console.log(typeof undefinedValue); // "undefined"
console.log(typeof fruits);        // "object"
console.log(typeof person);        // "object"

// Type conversion
let stringNumber = "123";
let convertedNumber = parseInt(stringNumber);
let convertedFloat = parseFloat("123.45");
let convertedString = String(123);

// Truthy and falsy values
let falsyValues = [false, 0, "", null, undefined, NaN];
let truthyValues = [true, 1, "hello", [], {}, function(){}];

// Practical example: User registration
function createUser(username, email, age) {
    // Validation
    if (!username || typeof username !== 'string') {
        throw new Error('Username must be a non-empty string');
    }
    
    if (!email || !email.includes('@')) {
        throw new Error('Valid email is required');
    }
    
    if (age < 13 || age > 120) {
        throw new Error('Age must be between 13 and 120');
    }
    
    return {
        id: Date.now(),
        username: username,
        email: email,
        age: age,
        createdAt: new Date(),
        isActive: true
    };
}

// Usage
try {
    let user = createUser("alice123", "alice@example.com", 25);
    console.log(user);
} catch (error) {
    console.error("Error creating user:", error.message);
}

// Advanced: Destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);   // 1
console.log(second);  // 2
console.log(rest);    // [3, 4, 5]

let {name: userName, age: userAge} = person;
console.log(userName); // "Alice"
console.log(userAge);  // 25

// Spread operator
let originalArray = [1, 2, 3];
let newArray = [...originalArray, 4, 5];
console.log(newArray); // [1, 2, 3, 4, 5]

let originalObject = {name: "Alice", age: 25};
let newObject = {...originalObject, city: "New York"};
console.log(newObject); // {name: "Alice", age: 25, city: "New York"}</code></pre>

<h3>Practice Exercise</h3>
<p>Create a shopping cart system that:</p>
<ol>
<li>Stores items with properties (id, name, price, quantity)</li>
<li>Adds items to cart</li>
<li>Removes items from cart</li>
<li>Updates item quantities</li>
<li>Calculates total price</li>
<li>Applies discounts based on total amount</li>
<li>Displays cart contents</li>
</ol>

<h3>Common Pitfalls</h3>
<ul>
<li>Using var instead of let/const</li>
<li>Confusing == with ===</li>
<li>Not understanding hoisting</li>
<li>Mutating const objects</li>
<li>Forgetting semicolons</li>
</ul>
      `,
    },
  };

  // Get the detailed template for this language and topic
  const languageTemplates = detailedTemplates[language];
  if (languageTemplates && languageTemplates[topic]) {
    return languageTemplates[topic];
  }

  // Fallback to basic template if no detailed version exists
  return `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in ${language} ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>Practical implementation</li>
<li>Best practices</li>
<li>Common pitfalls</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example code for ${topic.toLowerCase()}
console.log("Hello from lesson ${lessonNumber}");

// More detailed examples would go here
// Based on the specific topic</code></pre>

<h3>Practice Exercise</h3>
<p>Create a practical example demonstrating ${topic.toLowerCase()} concepts in ${language}.</p>
  `;
}

async function createRealLessons(language, startNumber, count = 5) {
  const template = lessonTemplates[language];
  if (!template) {
    console.log(`No template found for language: ${language}`);
    return;
  }

  const topics = template.topics;
  const lessons = [];

  for (let i = 0; i < count; i++) {
    const lessonNumber = startNumber + i;
    const topicIndex = (lessonNumber - 1) % topics.length;
    const topic = topics[topicIndex];

    lessons.push({
      number: lessonNumber,
      title: `${topic}`,
      content: generateDetailedLessonContent(language, topic, lessonNumber),
      exercise: `Create a practical example demonstrating ${topic.toLowerCase()} concepts in ${language}. Include proper error handling and best practices.`,
      difficulty:
        lessonNumber <= 5
          ? "beginner"
          : lessonNumber <= 10
          ? "intermediate"
          : "advanced",
      estimatedTime: 30 + Math.floor(lessonNumber / 3) * 10,
    });
  }

  return lessons;
}

async function findLanguageWith3Lessons() {
  const languages = await prisma.language.findMany({
    include: {
      _count: {
        select: { lessons: true },
      },
    },
  });

  // Find languages with exactly 3 lessons
  const languagesWith3Lessons = languages.filter(
    (lang) => lang._count.lessons === 3
  );

  if (languagesWith3Lessons.length === 0) {
    return null;
  }

  // Return the first one (we'll process them one by one)
  return languagesWith3Lessons[0];
}

async function replaceExampleLessons() {
  try {
    console.log("🔍 Finding language with exactly 3 lessons...");

    const targetLanguage = await findLanguageWith3Lessons();

    if (!targetLanguage) {
      console.log("✅ No languages found with exactly 3 lessons!");
      console.log(
        "🎉 All languages have been processed or already have more than 3 lessons."
      );
      return;
    }

    console.log(
      `📚 Target Language: ${targetLanguage.name} (${targetLanguage.slug})`
    );
    console.log(`📊 Current Lessons: ${targetLanguage._count.lessons}`);

    // Get existing lessons to delete related records
    const existingLessons = await prisma.lesson.findMany({
      where: { languageId: targetLanguage.id },
    });

    console.log(
      `🗑️ Deleting ${existingLessons.length} existing example lessons...`
    );

    // Delete related records first (Progress and Exam)
    for (const lesson of existingLessons) {
      console.log(`   Deleting related records for lesson ${lesson.id}...`);

      // Delete progress records
      await prisma.progress.deleteMany({
        where: { lessonId: lesson.id },
      });

      // Delete exam if exists
      await prisma.exam.deleteMany({
        where: { lessonId: lesson.id },
      });
    }

    // Delete existing lessons
    await prisma.lesson.deleteMany({
      where: { languageId: targetLanguage.id },
    });
    console.log("✅ Existing lessons deleted");

    // Create 5 new real lessons
    console.log("➕ Creating 5 new comprehensive lessons...");

    const newLessons = await createRealLessons(targetLanguage.slug, 1, 5);

    for (const lessonData of newLessons) {
      const lesson = await prisma.lesson.create({
        data: {
          ...lessonData,
          languageId: targetLanguage.id,
        },
      });
      console.log(`✅ Created lesson ${lesson.number}: ${lesson.title}`);
    }

    console.log(`\n🎯 Replacement Complete:`);
    console.log(`   Language: ${targetLanguage.name}`);
    console.log(`   Lessons: 3 example → 5 comprehensive`);
    console.log(`   Status: Ready for smart batch processing`);

    // Show current state of all languages
    const allLanguages = await prisma.language.findMany({
      include: {
        _count: {
          select: { lessons: true },
        },
      },
    });

    console.log(`\n📈 Current Language Status:`);
    allLanguages.forEach((lang) => {
      const status =
        lang._count.lessons === 3
          ? "⚠️ Needs replacement"
          : lang._count.lessons < 3
          ? "❌ Too few"
          : lang._count.lessons >= 100
          ? "🎉 Complete"
          : "✅ Ready";
      console.log(
        `   ${lang.name.padEnd(12)}: ${lang._count.lessons} lessons ${status}`
      );
    });
  } catch (error) {
    console.error("❌ Error replacing lessons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the replacement processor
replaceExampleLessons();
