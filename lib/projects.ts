// Project-based learning system for Dev AI Tutor

export interface Project {
  id: string
  title: string
  description: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  requirements: string[]
  starterCode: string
  hints: string[]
  solution?: string
  estimatedTime: number // in minutes
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface ProjectSubmission {
  id: string
  projectId: string
  userId: string
  code: string
  submittedAt: Date
  status: 'pending' | 'approved' | 'needs-revision'
  feedback?: string
  score?: number
}

export const PROJECTS: Record<string, Record<string, Project[]>> = {
  javascript: {
    beginner: [
      {
        id: 'js-beginner-1',
        title: 'Personal Portfolio Website',
        description: 'Create a simple personal portfolio website using HTML, CSS, and JavaScript. Include sections for about, skills, and contact information.',
        language: 'javascript',
        level: 'beginner',
        requirements: [
          'Create an HTML structure with header, main, and footer sections',
          'Style the page using CSS with a responsive design',
          'Add JavaScript functionality for a contact form',
          'Include smooth scrolling navigation',
          'Make the website mobile-friendly'
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        /* Add your CSS here */
    </style>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h1>About Me</h1>
            <p>Add your introduction here</p>
        </section>
        
        <section id="skills">
            <h2>Skills</h2>
            <ul>
                <li>JavaScript</li>
                <li>HTML</li>
                <li>CSS</li>
            </ul>
        </section>
        
        <section id="contact">
            <h2>Contact Me</h2>
            <form id="contactForm">
                <input type="text" placeholder="Name" required>
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Portfolio</p>
    </footer>
    
    <script>
        // Add your JavaScript here
    </script>
</body>
</html>`,
        hints: [
          'Use CSS Grid or Flexbox for layout',
          'Add hover effects to navigation links',
          'Use JavaScript to handle form submission',
          'Include form validation',
          'Add smooth scrolling with JavaScript'
        ],
        estimatedTime: 120,
        difficulty: 'easy'
      },
      {
        id: 'js-beginner-2',
        title: 'Todo List Application',
        description: 'Build a simple todo list application where users can add, delete, and mark tasks as complete.',
        language: 'javascript',
        level: 'beginner',
        requirements: [
          'Create a form to add new todos',
          'Display all todos in a list',
          'Allow marking todos as complete',
          'Allow deleting todos',
          'Save todos to localStorage',
          'Add input validation'
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <style>
        /* Add your CSS here */
    </style>
</head>
<body>
    <div class="container">
        <h1>Todo List</h1>
        
        <form id="todoForm">
            <input type="text" id="todoInput" placeholder="Add a new task..." required>
            <button type="submit">Add Task</button>
        </form>
        
        <ul id="todoList">
            <!-- Todos will be added here -->
        </ul>
    </div>
    
    <script>
        // Add your JavaScript here
    </script>
</body>
</html>`,
        hints: [
          'Use localStorage to persist data',
          'Create functions for adding, deleting, and toggling todos',
          'Use event delegation for delete buttons',
          'Add CSS for completed todos',
          'Include error handling for empty inputs'
        ],
        estimatedTime: 90,
        difficulty: 'easy'
      }
    ],
    intermediate: [
      {
        id: 'js-intermediate-1',
        title: 'Weather Dashboard',
        description: 'Create a weather dashboard that fetches data from a weather API and displays current conditions and forecasts.',
        language: 'javascript',
        level: 'intermediate',
        requirements: [
          'Fetch weather data from a public API',
          'Display current weather conditions',
          'Show 5-day forecast',
          'Allow searching by city',
          'Handle API errors gracefully',
          'Add loading states',
          'Make it responsive'
        ],
        starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
    <style>
        /* Add your CSS here */
    </style>
</head>
<body>
    <div class="container">
        <h1>Weather Dashboard</h1>
        
        <div class="search-section">
            <input type="text" id="cityInput" placeholder="Enter city name...">
            <button id="searchBtn">Search</button>
        </div>
        
        <div id="loading" style="display: none;">Loading...</div>
        
        <div id="weatherInfo">
            <!-- Weather data will be displayed here -->
        </div>
        
        <div id="forecast">
            <!-- 5-day forecast will be displayed here -->
        </div>
    </div>
    
    <script>
        // Add your JavaScript here
        // You can use OpenWeatherMap API (free tier available)
        const API_KEY = 'your_api_key_here';
        const BASE_URL = 'https://api.openweathermap.org/data/2.5';
    </script>
</body>
</html>`,
        hints: [
          'Use fetch() or axios for API calls',
          'Handle async/await properly',
          'Create reusable functions for API calls',
          'Add error handling for network issues',
          'Use CSS Grid for the forecast layout',
          'Add icons for weather conditions'
        ],
        estimatedTime: 180,
        difficulty: 'medium'
      }
    ],
    advanced: [
      {
        id: 'js-advanced-1',
        title: 'Real-time Chat Application',
        description: 'Build a real-time chat application using WebSockets or Socket.io with user authentication and message persistence.',
        language: 'javascript',
        level: 'advanced',
        requirements: [
          'Implement user authentication',
          'Create real-time messaging',
          'Add user typing indicators',
          'Store messages in a database',
          'Add user profiles and avatars',
          'Implement message encryption',
          'Add file sharing capabilities',
          'Create admin panel'
        ],
        starterCode: `// Server-side (Node.js with Express and Socket.io)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Add your server code here

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
        hints: [
          'Use Socket.io for real-time communication',
          'Implement JWT for authentication',
          'Use MongoDB or PostgreSQL for data storage',
          'Add input sanitization for security',
          'Implement rate limiting',
          'Add message encryption using crypto-js',
          'Use Redis for session management'
        ],
        estimatedTime: 480,
        difficulty: 'hard'
      }
    ]
  },
  python: {
    beginner: [
      {
        id: 'py-beginner-1',
        title: 'Number Guessing Game',
        description: 'Create a number guessing game where the computer generates a random number and the player tries to guess it.',
        language: 'python',
        level: 'beginner',
        requirements: [
          'Generate a random number between 1 and 100',
          'Ask user for input and validate it',
          'Provide hints (higher/lower)',
          'Keep track of number of guesses',
          'Ask if player wants to play again',
          'Add difficulty levels'
        ],
        starterCode: `import random

def number_guessing_game():
    # Add your code here
    pass

if __name__ == "__main__":
    number_guessing_game()`,
        hints: [
          'Use random.randint() for number generation',
          'Create a while loop for the game',
          'Add input validation with try/except',
          'Use a counter variable for guesses',
          'Create a function to check the guess'
        ],
        estimatedTime: 60,
        difficulty: 'easy'
      }
    ],
    intermediate: [
      {
        id: 'py-intermediate-1',
        title: 'Web Scraper',
        description: 'Build a web scraper that extracts data from a website and saves it to a CSV file.',
        language: 'python',
        level: 'intermediate',
        requirements: [
          'Use requests or urllib for HTTP requests',
          'Parse HTML using BeautifulSoup',
          'Extract specific data (titles, prices, etc.)',
          'Handle pagination',
          'Save data to CSV file',
          'Add error handling',
          'Respect robots.txt'
        ],
        starterCode: `import requests
from bs4 import BeautifulSoup
import csv
import time

def scrape_website():
    # Add your code here
    pass

if __name__ == "__main__":
    scrape_website()`,
        hints: [
          'Use requests.get() with headers',
          'Parse HTML with BeautifulSoup',
          'Use CSS selectors or find() methods',
          'Add delays between requests',
          'Handle connection errors',
          'Use csv.writer() for file output'
        ],
        estimatedTime: 120,
        difficulty: 'medium'
      }
    ],
    advanced: [
      {
        id: 'py-advanced-1',
        title: 'Machine Learning Model',
        description: 'Create a machine learning model using scikit-learn to predict outcomes based on a dataset.',
        language: 'python',
        level: 'advanced',
        requirements: [
          'Load and preprocess a dataset',
          'Split data into training and testing sets',
          'Train multiple ML models',
          'Evaluate model performance',
          'Create visualizations',
          'Deploy model as API',
          'Add model persistence'
        ],
        starterCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

def build_ml_model():
    # Add your code here
    pass

if __name__ == "__main__":
    build_ml_model()`,
        hints: [
          'Use pandas for data manipulation',
          'Handle missing values and outliers',
          'Use cross-validation for better evaluation',
          'Try different algorithms (Random Forest, SVM, etc.)',
          'Create confusion matrix visualization',
          'Use pickle or joblib for model saving'
        ],
        estimatedTime: 240,
        difficulty: 'hard'
      }
    ]
  }
}

// Helper functions
export function getProjectsForLanguage(language: string, level: 'beginner' | 'intermediate' | 'advanced'): Project[] {
  return PROJECTS[language]?.[level] || []
}

export function getProjectById(projectId: string): Project | null {
  for (const language in PROJECTS) {
    for (const level in PROJECTS[language]) {
      const project = PROJECTS[language][level as keyof typeof PROJECTS[typeof language]].find(p => p.id === projectId)
      if (project) return project
    }
  }
  return null
}

export function validateProjectSubmission(project: Project, code: string): { isValid: boolean; feedback: string[] } {
  const feedback: string[] = []
  let isValid = true

  // Basic validation
  if (!code || code.trim().length < 50) {
    feedback.push('Code submission is too short. Please provide a complete implementation.')
    isValid = false
  }

  // Language-specific validation
  if (project.language === 'javascript') {
    if (!code.includes('function') && !code.includes('const') && !code.includes('let')) {
      feedback.push('JavaScript code should include functions and variable declarations.')
      isValid = false
    }
  } else if (project.language === 'python') {
    if (!code.includes('def ') && !code.includes('import ')) {
      feedback.push('Python code should include function definitions and imports.')
      isValid = false
    }
  }

  // Requirements validation (basic)
  project.requirements.forEach((req, index) => {
    const reqLower = req.toLowerCase()
    if (reqLower.includes('function') && !code.toLowerCase().includes('function')) {
      feedback.push(`Requirement ${index + 1}: ${req}`)
      isValid = false
    }
  })

  return { isValid, feedback }
}

export function calculateProjectScore(project: Project, submission: ProjectSubmission): number {
  // Basic scoring algorithm
  let score = 0
  const maxScore = 100

  // Code quality (30 points)
  if (submission.code.length > 200) score += 15
  if (submission.code.includes('function') || submission.code.includes('def ')) score += 15

  // Requirements met (40 points)
  const requirementsMet = project.requirements.filter(req => {
    const reqLower = req.toLowerCase()
    return submission.code.toLowerCase().includes(reqLower.split(' ')[0])
  }).length
  score += (requirementsMet / project.requirements.length) * 40

  // Completeness (30 points)
  if (submission.code.includes('html') || submission.code.includes('<!DOCTYPE')) score += 15
  if (submission.code.includes('css') || submission.code.includes('style')) score += 15

  return Math.min(score, maxScore)
}
