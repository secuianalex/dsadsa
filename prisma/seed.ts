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
  "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Webpack", "Babel", "ESLint", "Prettier",
  
  // Testing Technologies
  "Testing Fundamentals", "Manual Testing", "Automation Testing"
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
  ],
  "Angular": [
    {
      number: 1,
      title: "Introduction to Angular",
      content: `# Welcome to Angular! 🅰️

Angular is a powerful framework for building dynamic web applications. It's like having a complete toolkit for creating modern websites!

## What is Angular?
Angular is a TypeScript-based framework that:
- Builds single-page applications (SPAs)
- Provides a complete development platform
- Uses component-based architecture
- Includes built-in tools for routing, forms, and HTTP

## Why Choose Angular?
- **Enterprise-Ready**: Used by Google and many large companies
- **TypeScript**: Better development experience with type safety
- **CLI Tools**: Powerful command-line tools for development
- **Comprehensive**: Everything you need in one framework

## Prerequisites
Before starting Angular, you should know:
- HTML basics
- CSS fundamentals
- JavaScript/TypeScript basics
- Command line basics

## Setting Up Your Development Environment
1. **Install Node.js** (from nodejs.org)
2. **Install Angular CLI**:
   \`\`\`bash
   npm install -g @angular/cli
   \`\`\`
3. **Create your first app**:
   \`\`\`bash
   ng new my-first-app
   cd my-first-app
   ng serve
   \`\`\`

## Angular Project Structure
\`\`\`
my-first-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   ├── assets/
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
\`\`\`

## Your First Angular Component
\`\`\`typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <h1>{{ title }}</h1>
    <p>Welcome to Angular!</p>
  \`,
  styles: [\`
    h1 { color: #3f51b5; }
    p { font-size: 18px; }
  \`]
})
export class AppComponent {
  title = 'My First Angular App';
}
\`\`\`

## Key Angular Concepts
- **Components**: Reusable UI building blocks
- **Templates**: HTML with Angular syntax
- **Data Binding**: Connecting data between component and template
- **Services**: Reusable business logic
- **Modules**: Organizing your application

## Next Steps
In the next lesson, we'll learn about components, templates, and data binding!`,
      exercise: "Create a new Angular project and build a simple component that displays your name and a welcome message. Use interpolation to display dynamic content.",
      difficulty: "beginner",
      estimatedTime: 30
    },
    {
      number: 2,
      title: "Angular Components and Data Binding",
      content: `# Angular Components and Data Binding 🔗

Components are the building blocks of Angular applications. Let's learn how to create them and connect data!

## What are Components?
Components are reusable UI elements that:
- Have their own template (HTML)
- Have their own styles (CSS)
- Have their own logic (TypeScript)
- Can be nested inside other components

## Creating a Component
\`\`\`bash
ng generate component user-profile
# or shorthand: ng g c user-profile
\`\`\`

This creates:
- \`user-profile.component.ts\` - Component logic
- \`user-profile.component.html\` - Template
- \`user-profile.component.css\` - Styles
- \`user-profile.component.spec.ts\` - Tests

## Component Structure
\`\`\`typescript
// user-profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userName = 'John Doe';
  userAge = 25;
  isActive = true;
  
  getUserInfo() {
    return \`\${this.userName} is \${this.userAge} years old\`;
  }
}
\`\`\`

\`\`\`html
<!-- user-profile.component.html -->
<div class="user-card">
  <h2>{{ userName }}</h2>
  <p>Age: {{ userAge }}</p>
  <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
  <p>{{ getUserInfo() }}</p>
</div>
\`\`\`

## Data Binding Types

### 1. Interpolation ({{ }})
\`\`\`html
<h1>{{ title }}</h1>
<p>{{ 2 + 2 }}</p>
<p>{{ getMessage() }}</p>
\`\`\`

### 2. Property Binding ([property])
\`\`\`html
<img [src]="imageUrl" [alt]="imageAlt">
<button [disabled]="isDisabled">Click me</button>
<div [class.active]="isActive">Content</div>
\`\`\`

### 3. Event Binding ((event))
\`\`\`html
<button (click)="onButtonClick()">Click me</button>
<input (input)="onInputChange($event)" (keyup)="onKeyUp($event)">
<form (submit)="onSubmit($event)">...</form>
\`\`\`

### 4. Two-Way Binding ([(ngModel)])
\`\`\`html
<input [(ngModel)]="userName" placeholder="Enter name">
<p>Hello, {{ userName }}!</p>
\`\`\`

## Using Components
\`\`\`html
<!-- app.component.html -->
<app-user-profile></app-user-profile>
<app-user-profile></app-user-profile>
\`\`\`

## Component Communication
\`\`\`typescript
// Parent component
export class AppComponent {
  parentData = 'Data from parent';
  
  onChildEvent(data: string) {
    console.log('Received from child:', data);
  }
}
\`\`\`

\`\`\`html
<!-- Parent template -->
<app-child 
  [inputData]="parentData"
  (outputEvent)="onChildEvent($event)">
</app-child>
\`\`\`

\`\`\`typescript
// Child component
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: \`
    <div>
      <p>Received: {{ inputData }}</p>
      <button (click)="sendData()">Send to Parent</button>
    </div>
  \`
})
export class ChildComponent {
  @Input() inputData: string = '';
  @Output() outputEvent = new EventEmitter<string>();
  
  sendData() {
    this.outputEvent.emit('Data from child!');
  }
}
\`\`\``,
      exercise: "Create a user profile component with input fields for name, email, and age. Use two-way binding to update the display in real-time as the user types.",
      difficulty: "beginner",
      estimatedTime: 35
    },
    {
      number: 3,
      title: "Angular Services and Dependency Injection",
      content: `# Angular Services and Dependency Injection 🔧

Services are the backbone of Angular applications. They handle business logic, data management, and communication between components.

## What are Services?
Services are classes that:
- Handle business logic
- Share data between components
- Communicate with external APIs
- Manage application state
- Are reusable across components

## Creating a Service
\`\`\`bash
ng generate service user
# or shorthand: ng g s user
\`\`\`

## Basic Service Structure
\`\`\`typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(\`\${this.apiUrl}/\${id}\`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }
}
\`\`\`

## Using Services in Components
\`\`\`typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
  template: \`
    <div class="user-list">
      <h2>Users</h2>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngFor="let user of users" class="user-item">
        <h3>{{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
        <button (click)="deleteUser(user.id)">Delete</button>
      </div>
    </div>
  \`
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
}
\`\`\`

## Dependency Injection
Angular's dependency injection system automatically provides services to components:

\`\`\`typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService], // Service is provided here
  bootstrap: [AppComponent]
})
export class AppModule { }
\`\`\`

## Service Lifecycle
\`\`\`typescript
// lifecycle.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LifecycleService implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor() {
    console.log('Service created');
  }

  ngOnDestroy(): void {
    console.log('Service destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Method that returns an observable that completes when service is destroyed
  getDestroy$() {
    return this.destroy$.asObservable();
  }
}
\`\`\`

## Shared State Management
\`\`\`typescript
// state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state$ = new BehaviorSubject<AppState>({
    currentUser: null,
    isAuthenticated: false,
    theme: 'light'
  });

  getState(): Observable<AppState> {
    return this.state$.asObservable();
  }

  updateState(updates: Partial<AppState>): void {
    this.state$.next({ ...this.state$.value, ...updates });
  }

  setCurrentUser(user: User | null): void {
    this.updateState({ 
      currentUser: user, 
      isAuthenticated: !!user 
    });
  }

  toggleTheme(): void {
    const currentTheme = this.state$.value.theme;
    this.updateState({ theme: currentTheme === 'light' ? 'dark' : 'light' });
  }
}
\`\`\`

## Best Practices
1. **Single Responsibility**: Each service should have one clear purpose
2. **Injectable Decorator**: Always use @Injectable() decorator
3. **Error Handling**: Implement proper error handling in services
4. **Observables**: Use observables for async operations
5. **Memory Management**: Clean up subscriptions to prevent memory leaks
6. **Testing**: Services should be easily testable

## Next Steps
In the next lesson, we'll learn about routing and navigation in Angular!`,
      exercise: "Create a service that manages a todo list. Include methods to add, remove, and mark todos as complete. Use this service in a component to display and manage todos.",
      difficulty: "intermediate",
      estimatedTime: 40
    }
  ],
  "React": [
    {
      number: 1,
      title: "Introduction to React",
      content: `# Welcome to React! ⚛️

React is a powerful JavaScript library for building user interfaces. It's used by Facebook, Instagram, Netflix, and many other major companies!

## What is React?
React is a JavaScript library that:
- Builds interactive user interfaces
- Uses component-based architecture
- Has a virtual DOM for performance
- Works with a rich ecosystem of tools

## Why React?
- **Popular**: Huge community and job market
- **Flexible**: Can be used for web, mobile, and desktop
- **Efficient**: Virtual DOM makes updates fast
- **Ecosystem**: Rich set of libraries and tools

## Setting Up React
\`\`\`bash
# Create a new React app
npx create-react-app my-react-app
cd my-react-app
npm start
\`\`\`

## Your First React Component
\`\`\`jsx
// App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello, React!</h1>
      <p>Welcome to my first React app</p>
    </div>
  );
}

export default App;
\`\`\`

## JSX - JavaScript XML
JSX lets you write HTML-like code in JavaScript:
\`\`\`jsx
const element = (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Today is {new Date().toLocaleDateString()}</p>
  </div>
);
\`\`\`

## Components
Components are reusable pieces of UI:
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}
\`\`\`

## Props
Props pass data from parent to child components:
\`\`\`jsx
function UserCard(props) {
  return (
    <div className="user-card">
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard 
        name="John Doe" 
        age={25} 
        email="john@example.com" 
      />
    </div>
  );
}
\`\`\`

## State
State manages data that can change over time:
\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
\`\`\`

## Key React Concepts
- **Components**: Reusable UI building blocks
- **Props**: Data passed from parent to child
- **State**: Data that can change within a component
- **JSX**: HTML-like syntax in JavaScript
- **Virtual DOM**: Efficient rendering system

## Next Steps
In the next lesson, we'll learn about hooks, effects, and more advanced React patterns!`,
      exercise: "Create a React app with a component that displays a list of your favorite movies. Use props to pass the movie data and state to manage a counter.",
      difficulty: "beginner",
      estimatedTime: 30
    },
    {
      number: 2,
      title: "React Hooks and Effects",
      content: `# React Hooks and Effects 🎣

Hooks are functions that let you use state and other React features in functional components!

## What are Hooks?
Hooks are functions that:
- Start with "use" (useState, useEffect, etc.)
- Can only be called at the top level of components
- Let you use state without classes
- Make components more readable and reusable

## useState Hook
\`\`\`jsx
import React, { useState } from 'react';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
\`\`\`

## useEffect Hook
\`\`\`jsx
import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs after the component mounts
    fetchUserData();
  }, []); // Empty array means run only once

  useEffect(() => {
    // This runs whenever user changes
    if (user) {
      document.title = \`Profile: \${user.name}\`;
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
\`\`\`

## Custom Hooks
\`\`\`jsx
// useCounter.js
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Using the custom hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

## useEffect Dependencies
\`\`\`jsx
function DataFetcher({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Runs when component mounts AND when userId changes
    fetchData(userId);
  }, [userId]); // userId is a dependency

  useEffect(() => {
    // Runs only when component mounts
    console.log('Component mounted');
  }, []); // Empty dependency array

  useEffect(() => {
    // Runs after every render
    console.log('Component rendered');
  }); // No dependency array
}
\`\`\`

## Cleanup in useEffect
\`\`\`jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function runs when component unmounts
    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
\`\`\`

## Other Important Hooks
\`\`\`jsx
import React, { useContext, useReducer, useCallback, useMemo } from 'react';

// useReducer for complex state
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
\`\`\``,
      exercise: "Create a React component that fetches and displays a list of posts from an API. Use useEffect for data fetching, useState for managing state, and implement loading and error states.",
      difficulty: "intermediate",
      estimatedTime: 40
    },
    {
      number: 3,
      title: "React Context and State Management",
      content: `# React Context and State Management 🗂️

Context provides a way to share data between components without having to explicitly pass props through every level.

## What is Context?
Context is a React feature that:
- Allows data to be shared between components
- Avoids prop drilling (passing props through multiple levels)
- Provides a way to manage global state
- Works well with hooks

## Creating Context
\`\`\`jsx
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
\`\`\`

## Using Context
\`\`\`jsx
// App.js
import React from 'react';
import { UserProvider } from './UserContext';
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </UserProvider>
  );
}

export default App;
\`\`\`

\`\`\`jsx
// Header.js
import React from 'react';
import { useUser } from './UserContext';

function Header() {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <header>
      <h1>My App</h1>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <span>Please log in</span>
      )}
    </header>
  );
}

export default Header;
\`\`\`

\`\`\`jsx
// LoginForm.js
import React, { useState } from 'react';
import { useUser } from './UserContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    login({ name: 'John Doe', email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
\`\`\`

## Multiple Contexts
\`\`\`jsx
// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

\`\`\`jsx
// App.js with multiple providers
import React from 'react';
import { UserProvider } from './UserContext';
import { ThemeProvider } from './ThemeContext';
import Header from './Header';
import Main from './Main';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <div className="App">
          <Header />
          <Main />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}
\`\`\`

## Context with Reducers
\`\`\`jsx
// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
\`\`\`

## Best Practices
1. **Keep Contexts Focused**: Each context should handle one specific concern
2. **Use Custom Hooks**: Create custom hooks for using context
3. **Avoid Over-engineering**: Don't use context for everything
4. **Performance**: Context can cause re-renders, so be mindful
5. **Testing**: Context makes testing easier as you can wrap components with providers

## When to Use Context
- **Global State**: User authentication, theme, language
- **Avoiding Prop Drilling**: When you need to pass data through many components
- **Shared Data**: Data that multiple components need access to
- **Configuration**: App-wide settings and configuration

## Next Steps
In the next lesson, we'll learn about React Router and navigation!`,
      exercise: "Create a shopping cart context that manages a list of products. Include functionality to add items, remove items, update quantities, and calculate totals. Use this context in multiple components.",
      difficulty: "intermediate",
      estimatedTime: 45
    }
  ],
  "TypeScript": [
    {
      number: 1,
      title: "Introduction to TypeScript",
      content: `# Welcome to TypeScript! 🔷

TypeScript is a superset of JavaScript that adds static typing. It helps you write more reliable and maintainable code!

## What is TypeScript?
TypeScript is:
- A superset of JavaScript (all valid JS is valid TS)
- Adds static type checking at compile time
- Provides better tooling and IDE support
- Helps catch errors before runtime
- Compiles to JavaScript for browsers

## Why TypeScript?
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete, refactoring, navigation
- **Self-Documenting**: Types serve as documentation
- **Easier Refactoring**: Safe to change code with confidence
- **Better for Teams**: Clear interfaces and contracts

## Setting Up TypeScript
1. **Install TypeScript**:
   \`\`\`bash
   npm install -g typescript
   # or locally
   npm install --save-dev typescript
   \`\`\`

2. **Initialize TypeScript**:
   \`\`\`bash
   tsc --init
   \`\`\`

3. **Compile TypeScript**:
   \`\`\`bash
   tsc filename.ts
   \`\`\`

## Your First TypeScript Program
\`\`\`typescript
// hello.ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message: string = greet("TypeScript");
console.log(message);
\`\`\`

## Basic Types
\`\`\`typescript
// Primitive types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let undefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let mixed: (string | number)[] = ["hello", 42, "world"];

// Objects
let person: { name: string; age: number } = {
  name: "John",
  age: 25
};

// Functions
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting?: string): string {
  return greeting ? \`\${greeting}, \${name}!\` : \`Hello, \${name}!\`;
}

// Union types
let id: string | number = "abc123";
id = 123; // This is also valid

// Type aliases
type UserID = string | number;
type User = {
  id: UserID;
  name: string;
  email: string;
  age?: number; // Optional property
};
\`\`\`

## Interfaces
\`\`\`typescript
// Basic interface
interface Person {
  name: string;
  age: number;
  email?: string; // Optional property
  readonly id: number; // Read-only property
}

// Using the interface
const person: Person = {
  name: "Alice",
  age: 30,
  id: 1
};

// Interface for functions
interface MathFunc {
  (x: number, y: number): number;
}

const add: MathFunc = (a, b) => a + b;
const multiply: MathFunc = (a, b) => a * b;

// Extending interfaces
interface Employee extends Person {
  department: string;
  salary: number;
}

const employee: Employee = {
  name: "Bob",
  age: 35,
  id: 2,
  department: "Engineering",
  salary: 75000
};
\`\`\`

## Classes
\`\`\`typescript
class Animal {
  private name: string;
  protected species: string;
  public age: number;

  constructor(name: string, species: string, age: number) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  public makeSound(): void {
    console.log("Some sound");
  }

  protected getInfo(): string {
    return \`\${this.name} is a \${this.species}\`;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, breed: string, age: number) {
    super(name, "Dog", age);
    this.breed = breed;
  }

  public makeSound(): void {
    console.log("Woof!");
  }

  public getBreed(): string {
    return this.breed;
  }

  public getFullInfo(): string {
    return \`\${this.getInfo()} of breed \${this.breed}\`;
  }
}

const myDog = new Dog("Buddy", "Golden Retriever", 3);
myDog.makeSound(); // "Woof!"
console.log(myDog.getFullInfo()); // "Buddy is a Dog of breed Golden Retriever"
\`\`\`

## Generics
\`\`\`typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

class NumberContainer implements Container<number> {
  constructor(public value: number) {}

  getValue(): number {
    return this.value;
  }
}

class StringContainer implements Container<string> {
  constructor(public value: string) {}

  getValue(): string {
    return this.value;
  }
}

// Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // 3
console.log(numberStack.peek()); // 2
\`\`\`

## Enums
\`\`\`typescript
// Numeric enum
enum Direction {
  North = 0,
  South = 1,
  East = 2,
  West = 3
}

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Using enums
let playerDirection: Direction = Direction.North;
let playerColor: Color = Color.Red;

function movePlayer(direction: Direction): void {
  switch (direction) {
    case Direction.North:
      console.log("Moving north");
      break;
    case Direction.South:
      console.log("Moving south");
      break;
    case Direction.East:
      console.log("Moving east");
      break;
    case Direction.West:
      console.log("Moving west");
      break;
  }
}
\`\`\`

## Type Guards
\`\`\`typescript
// Type guard functions
function isString(value: any): value is string {
  return typeof value === "string";
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

function isPerson(obj: any): obj is Person {
  return obj && typeof obj.name === "string" && typeof obj.age === "number";
}

// Using type guards
function processValue(value: string | number): void {
  if (isString(value)) {
    console.log("Processing string:", value.toUpperCase());
  } else if (isNumber(value)) {
    console.log("Processing number:", value.toFixed(2));
  }
}

// instanceof type guard
function processAnimal(animal: Animal | Dog): void {
  if (animal instanceof Dog) {
    console.log("It's a dog:", animal.getBreed());
  } else {
    console.log("It's an animal:", animal.getInfo());
  }
}
\`\`\`

## Key TypeScript Concepts
- **Static Typing**: Types are checked at compile time
- **Type Inference**: TypeScript can infer types automatically
- **Interfaces**: Define contracts for objects
- **Generics**: Reusable code that works with multiple types
- **Enums**: Named constants
- **Type Guards**: Runtime type checking
- **Access Modifiers**: public, private, protected

## Next Steps
In the next lesson, we'll learn about advanced TypeScript features and best practices!`,
      exercise: "Create a TypeScript class for a Book with properties like title, author, year, and genre. Add methods to get book info and check if it's a classic (older than 50 years). Use interfaces and enums where appropriate.",
      difficulty: "beginner",
      estimatedTime: 35
    }
  ],
  "C#": [
    {
      number: 1,
      title: "Introduction to C#",
      content: `# Welcome to C#! 🟦

C# is a modern, object-oriented programming language developed by Microsoft. It's used for building Windows applications, web services, and games!

## What is C#?
C# is:
- A modern, type-safe programming language
- Part of the .NET framework
- Object-oriented with strong typing
- Used for Windows apps, web services, and Unity games
- Similar to Java in syntax and concepts

## Why C#?
- **Microsoft Support**: Backed by Microsoft and .NET ecosystem
- **Cross-Platform**: Runs on Windows, macOS, and Linux
- **Game Development**: Primary language for Unity
- **Enterprise**: Widely used in business applications
- **Modern Features**: Async/await, LINQ, generics

## Setting Up C#
1. **Install .NET SDK** from microsoft.com
2. **Verify installation**:
   \`\`\`bash
   dotnet --version
   \`\`\`

3. **Create your first project**:
   \`\`\`bash
   dotnet new console -n MyFirstApp
   cd MyFirstApp
   dotnet run
   \`\`\`

## Your First C# Program
\`\`\`csharp
// Program.cs
using System;

namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, C#!");
        }
    }
}
\`\`\`

## Basic Syntax
\`\`\`csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        // Variables and data types
        string name = "John";
        int age = 25;
        double height = 5.9;
        bool isStudent = true;
        
        // Constants
        const double PI = 3.14159;
        
        // Output
        Console.WriteLine("Name: " + name);
        Console.WriteLine($"Age: {age}"); // String interpolation
        Console.WriteLine($"Height: {height:F2}"); // Format to 2 decimal places
        
        // Input
        Console.Write("Enter your name: ");
        string input = Console.ReadLine();
        Console.WriteLine($"Hello, {input}!");
    }
}
\`\`\`

## Data Types
\`\`\`csharp
// Value types (stored on stack)
int number = 42;           // 32-bit integer
long bigNumber = 123456789L; // 64-bit integer
double decimal = 3.14;     // 64-bit floating point
float smallDecimal = 3.14f; // 32-bit floating point
bool isTrue = true;        // Boolean
char letter = 'A';         // Single character
DateTime now = DateTime.Now; // Date and time

// Reference types (stored on heap)
string text = "Hello";     // String (immutable)
object obj = new object(); // Base class for all types
int[] numbers = {1, 2, 3}; // Array

// Nullable types
int? nullableInt = null;   // Can be null
string? nullableString = null; // Can be null (C# 8.0+)
\`\`\`

## Control Structures
\`\`\`csharp
class ControlStructures
{
    static void Main(string[] args)
    {
        int age = 18;
        
        // If-else statement
        if (age >= 18)
        {
            Console.WriteLine("You are an adult");
        }
        else
        {
            Console.WriteLine("You are a minor");
        }
        
        // Switch statement
        int day = 3;
        switch (day)
        {
            case 1:
                Console.WriteLine("Monday");
                break;
            case 2:
                Console.WriteLine("Tuesday");
                break;
            case 3:
                Console.WriteLine("Wednesday");
                break;
            default:
                Console.WriteLine("Other day");
                break;
        }
        
        // Loops
        // For loop
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine($"Count: {i}");
        }
        
        // While loop
        int count = 0;
        while (count < 3)
        {
            Console.WriteLine($"While count: {count}");
            count++;
        }
        
        // Do-while loop
        int num = 0;
        do
        {
            Console.WriteLine($"Do-while: {num}");
            num++;
        } while (num < 3);
        
        // Foreach loop
        string[] names = {"Alice", "Bob", "Charlie"};
        foreach (string name in names)
        {
            Console.WriteLine($"Name: {name}");
        }
    }
}
\`\`\`

## Arrays and Collections
\`\`\`csharp
class ArraysAndCollections
{
    static void Main(string[] args)
    {
        // Arrays
        int[] numbers = {1, 2, 3, 4, 5};
        string[] names = new string[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";
        
        // Array length
        Console.WriteLine($"Numbers length: {numbers.Length}");
        
        // Multi-dimensional arrays
        int[,] matrix = new int[2, 3] {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        // Lists (dynamic arrays)
        List<string> fruits = new List<string>();
        fruits.Add("Apple");
        fruits.Add("Banana");
        fruits.Add("Orange");
        
        // Dictionary (key-value pairs)
        Dictionary<string, int> ages = new Dictionary<string, int>();
        ages["Alice"] = 25;
        ages["Bob"] = 30;
        ages["Charlie"] = 35;
        
        // Iterating through collections
        foreach (string fruit in fruits)
        {
            Console.WriteLine($"Fruit: {fruit}");
        }
        
        foreach (KeyValuePair<string, int> pair in ages)
        {
            Console.WriteLine($"{pair.Key} is {pair.Value} years old");
        }
    }
}
\`\`\`

## Methods
\`\`\`csharp
class Methods
{
    // Simple method
    static void Greet(string name)
    {
        Console.WriteLine($"Hello, {name}!");
    }
    
    // Method with return value
    static int Add(int a, int b)
    {
        return a + b;
    }
    
    // Method with optional parameters
    static void PrintInfo(string name, int age = 0, string city = "Unknown")
    {
        Console.WriteLine($"Name: {name}, Age: {age}, City: {city}");
    }
    
    // Method with out parameter
    static bool TryParseNumber(string input, out int result)
    {
        return int.TryParse(input, out result);
    }
    
    // Method with params (variable number of arguments)
    static int Sum(params int[] numbers)
    {
        int total = 0;
        foreach (int num in numbers)
        {
            total += num;
        }
        return total;
    }
    
    static void Main(string[] args)
    {
        // Calling methods
        Greet("John");
        
        int result = Add(5, 3);
        Console.WriteLine($"Sum: {result}");
        
        PrintInfo("Alice", 25, "New York");
        PrintInfo("Bob"); // Uses default values
        
        if (TryParseNumber("42", out int number))
        {
            Console.WriteLine($"Parsed number: {number}");
        }
        
        int sum = Sum(1, 2, 3, 4, 5);
        Console.WriteLine($"Sum of numbers: {sum}");
    }
}
\`\`\`

## Classes and Objects
\`\`\`csharp
// Simple class
public class Person
{
    // Fields (private by default)
    private string name;
    private int age;
    
    // Properties
    public string Name
    {
        get { return name; }
        set { name = value; }
    }
    
    public int Age
    {
        get { return age; }
        set 
        { 
            if (value >= 0)
                age = value; 
        }
    }
    
    // Auto-implemented property
    public string Email { get; set; }
    
    // Constructor
    public Person(string name, int age)
    {
        this.name = name;
        this.age = age;
    }
    
    // Default constructor
    public Person()
    {
        name = "Unknown";
        age = 0;
    }
    
    // Method
    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }
    
    // Method with return value
    public string GetInfo()
    {
        return $"Name: {name}, Age: {age}";
    }
}

// Using the class
class Program
{
    static void Main(string[] args)
    {
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person();
        
        person1.DisplayInfo();
        person2.DisplayInfo();
        
        // Using properties
        person1.Name = "Alice Johnson";
        person1.Age = 26;
        
        Console.WriteLine(person1.GetInfo());
    }
}
\`\`\`

## Key C# Concepts
- **Strong Typing**: All variables must have a declared type
- **Object-Oriented**: Classes, inheritance, polymorphism
- **Garbage Collection**: Automatic memory management
- **Exception Handling**: Try-catch blocks for error handling
- **LINQ**: Language Integrated Query for data manipulation
- **Async/Await**: Asynchronous programming support

## Next Steps
In the next lesson, we'll learn about inheritance, interfaces, and more advanced C# features!`,
      exercise: "Create a C# class for a BankAccount with properties for account number, balance, and owner name. Add methods to deposit, withdraw, and display account information. Include validation to prevent negative balances.",
      difficulty: "beginner",
      estimatedTime: 30
    }
  ],
  "Node.js": [
    {
      number: 1,
      title: "Introduction to Node.js",
      content: `# Welcome to Node.js! 🟢

Node.js is a JavaScript runtime that allows you to run JavaScript on the server side. It's perfect for building fast, scalable web applications!

## What is Node.js?
Node.js is:
- A JavaScript runtime built on Chrome's V8 engine
- Event-driven and non-blocking I/O
- Perfect for building web servers and APIs
- Used by companies like Netflix, Uber, and LinkedIn

## Why Node.js?
- **JavaScript Everywhere**: Same language for frontend and backend
- **Fast**: Non-blocking I/O makes it very fast
- **Scalable**: Event-driven architecture handles many connections
- **Rich Ecosystem**: npm has over 1 million packages

## Setting Up Node.js
1. **Install Node.js** from nodejs.org
2. **Verify installation**:
   \`\`\`bash
   node --version
   npm --version
   \`\`\`

## Your First Node.js Program
\`\`\`javascript
// hello.js
console.log('Hello, Node.js!');

// Run it with: node hello.js
\`\`\`

## Creating a Simple Web Server
\`\`\`javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello from Node.js!</h1>');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
\`\`\`

## Using npm (Node Package Manager)
\`\`\`bash
# Initialize a new project
npm init

# Install a package
npm install express

# Install as development dependency
npm install --save-dev nodemon

# Run scripts
npm start
npm run dev
\`\`\`

## package.json
\`\`\`json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "My first Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
\`\`\`

## Modules in Node.js
\`\`\`javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

// main.js
const math = require('./math');
console.log(math.add(5, 3)); // 8
console.log(math.subtract(10, 4)); // 6
\`\`\`

## File System Operations
\`\`\`javascript
const fs = require('fs');

// Synchronous file reading
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// Asynchronous file reading
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log(data);
});

// Writing files
fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully!');
});
\`\`\`

## Key Node.js Concepts
- **Event Loop**: Handles asynchronous operations
- **Non-blocking I/O**: Operations don't block the main thread
- **Modules**: Code organization and reusability
- **npm**: Package management
- **CommonJS**: Module system

## Next Steps
In the next lesson, we'll learn about Express.js and building REST APIs!`,
      exercise: "Create a Node.js application that reads a text file and counts the number of words in it. Display the result in the console.",
      difficulty: "beginner",
      estimatedTime: 25
    }
  ],
  "Java": [
    {
      number: 1,
      title: "Introduction to Java",
      content: `# Welcome to Java! ☕

Java is one of the most popular programming languages in the world. It's used for everything from Android apps to enterprise software!

## What is Java?
Java is:
- A high-level, object-oriented programming language
- Platform-independent (Write Once, Run Anywhere)
- Used for web applications, mobile apps, and enterprise software
- Known for its security and reliability

## Why Java?
- **Portable**: Runs on any device with Java Virtual Machine (JVM)
- **Secure**: Built-in security features
- **Object-Oriented**: Clean, organized code structure
- **Large Ecosystem**: Huge library of frameworks and tools

## Setting Up Java
1. **Install Java Development Kit (JDK)** from oracle.com
2. **Set up environment variables**:
   - JAVA_HOME: Path to JDK installation
   - PATH: Include JDK bin directory
3. **Verify installation**:
   \`\`\`bash
   java --version
   javac --version
   \`\`\`

## Your First Java Program
\`\`\`java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
\`\`\`

**To run:**
\`\`\`bash
javac HelloWorld.java
java HelloWorld
\`\`\`

## Java Syntax Basics
\`\`\`java
public class Example {
    // Class variables (fields)
    private String name;
    private int age;
    
    // Constructor
    public Example(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
    
    // Main method - entry point
    public static void main(String[] args) {
        Example example = new Example("John", 25);
        example.displayInfo();
    }
}
\`\`\`

## Data Types
\`\`\`java
// Primitive types
int number = 42;           // Integer
double decimal = 3.14;     // Decimal number
boolean isTrue = true;     // True/False
char letter = 'A';         // Single character
String text = "Hello";     // Text (not primitive)

// Reference types
Integer wrapperNumber = 42;    // Wrapper class
Double wrapperDecimal = 3.14;  // Wrapper class
\`\`\`

## Variables and Constants
\`\`\`java
public class Variables {
    public static void main(String[] args) {
        // Variable declaration
        String name = "Alice";
        int age = 25;
        
        // Constants (final keyword)
        final double PI = 3.14159;
        final String COMPANY = "TechCorp";
        
        // Variable naming conventions
        String firstName = "John";      // camelCase
        String LAST_NAME = "Doe";       // UPPER_CASE for constants
        int userAge = 30;               // descriptive names
        
        System.out.println("Name: " + firstName + " " + LAST_NAME);
        System.out.println("Age: " + userAge);
    }
}
\`\`\`

## Control Structures
\`\`\`java
public class ControlStructures {
    public static void main(String[] args) {
        int age = 18;
        
        // If-else statement
        if (age >= 18) {
            System.out.println("You are an adult");
        } else {
            System.out.println("You are a minor");
        }
        
        // Switch statement
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Other day");
        }
        
        // Loops
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.println("Count: " + i);
        }
        
        // While loop
        int count = 0;
        while (count < 3) {
            System.out.println("While count: " + count);
            count++;
        }
        
        // Do-while loop
        int num = 0;
        do {
            System.out.println("Do-while: " + num);
            num++;
        } while (num < 3);
    }
}
\`\`\`

## Arrays
\`\`\`java
public class Arrays {
    public static void main(String[] args) {
        // Array declaration
        int[] numbers = {1, 2, 3, 4, 5};
        String[] names = new String[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";
        
        // Array length
        System.out.println("Numbers length: " + numbers.length);
        
        // Iterating through arrays
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Number: " + numbers[i]);
        }
        
        // Enhanced for loop (for-each)
        for (String name : names) {
            System.out.println("Name: " + name);
        }
    }
}
\`\`\`

## Key Java Concepts
- **Object-Oriented**: Everything is an object
- **Platform Independent**: Write once, run anywhere
- **Strongly Typed**: Type safety at compile time
- **Garbage Collection**: Automatic memory management
- **Exception Handling**: Robust error handling

## Next Steps
In the next lesson, we'll learn about object-oriented programming concepts!`,
      exercise: "Create a Java program that calculates the area and perimeter of a rectangle. Use variables for length and width, and display the results.",
      difficulty: "beginner",
      estimatedTime: 30
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
    },
    {
      slug: "testing",
      title: "Testing",
      description: "Master software testing from fundamentals to automation",
      languageSlugs: ["testing-fundamentals", "manual-testing", "automation-testing"]
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

    // Connect languages to this path with order
    for (let i = 0; i < pathData.languageSlugs.length; i++) {
      const langSlug = pathData.languageSlugs[i]
      const lang = await prisma.language.findUnique({ where: { slug: langSlug } })
      if (lang) {
        await prisma.pathLanguage.create({
          data: {
            pathId: path.id,
            languageId: lang.id,
            order: i
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
