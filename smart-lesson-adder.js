const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Lesson templates for different languages
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

function generateLessonContent(language, topic, lessonNumber) {
  const templates = {
    javascript: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in JavaScript ${topic.toLowerCase()}.</p>

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
<p>Create a simple application that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    python: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in Python ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>Python-specific implementation</li>
<li>Best practices</li>
<li>Common patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Example code for ${topic.toLowerCase()}
print("Hello from lesson ${lessonNumber}")

# More detailed examples would go here
# Based on the specific topic</code></pre>

<h3>Practice Exercise</h3>
<p>Create a Python script that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    react: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in React ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>React-specific implementation</li>
<li>Best practices</li>
<li>Component patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example React component for ${topic.toLowerCase()}
import React from 'react';

function Lesson${lessonNumber}() {
  return (
    <div>
      <h1>Lesson ${lessonNumber}: ${topic}</h1>
      {/* More detailed examples would go here */}
    </div>
  );
}

export default Lesson${lessonNumber};</code></pre>

<h3>Practice Exercise</h3>
<p>Create a React component that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    nodejs: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in Node.js ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>Node.js-specific implementation</li>
<li>Best practices</li>
<li>Server-side patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example Node.js code for ${topic.toLowerCase()}
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from lesson ${lessonNumber}');
});

// More detailed examples would go here</code></pre>

<h3>Practice Exercise</h3>
<p>Create a Node.js application that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    java: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in Java ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>Java-specific implementation</li>
<li>Best practices</li>
<li>Object-oriented patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example Java code for ${topic.toLowerCase()}
public class Lesson${lessonNumber} {
    public static void main(String[] args) {
        System.out.println("Hello from lesson ${lessonNumber}");
        // More detailed examples would go here
    }
}</code></pre>

<h3>Practice Exercise</h3>
<p>Create a Java application that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    csharp: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in C# ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>C#-specific implementation</li>
<li>Best practices</li>
<li>.NET patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example C# code for ${topic.toLowerCase()}
using System;

class Lesson${lessonNumber} {
    static void Main() {
        Console.WriteLine("Hello from lesson ${lessonNumber}");
        // More detailed examples would go here
    }
}</code></pre>

<h3>Practice Exercise</h3>
<p>Create a C# application that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    typescript: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in TypeScript ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>TypeScript-specific implementation</li>
<li>Best practices</li>
<li>Type safety patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example TypeScript code for ${topic.toLowerCase()}
interface Lesson${lessonNumber} {
    title: string;
    content: string;
}

const lesson: Lesson${lessonNumber} = {
    title: "Lesson ${lessonNumber}: ${topic}",
    content: "TypeScript examples here"
};

console.log(lesson.title);</code></pre>

<h3>Practice Exercise</h3>
<p>Create a TypeScript application that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    vuejs: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in Vue.js ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>Vue.js-specific implementation</li>
<li>Best practices</li>
<li>Component patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code>// Example Vue.js component for ${topic.toLowerCase()}
<template>
  <div>
    <h1>Lesson ${lessonNumber}: {{ title }}</h1>
    <!-- More detailed examples would go here -->
  </div>
</template>

<script>
export default {
  name: 'Lesson${lessonNumber}',
  data() {
    return {
      title: '${topic}'
    }
  }
}
</script></code></pre>

<h3>Practice Exercise</h3>
<p>Create a Vue.js component that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    html: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in HTML ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>HTML-specific implementation</li>
<li>Best practices</li>
<li>Semantic markup</li>
</ul>

<h3>Code Examples</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Lesson ${lessonNumber}: ${topic}&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Lesson ${lessonNumber}: ${topic}&lt;/h1&gt;
    &lt;!-- More detailed examples would go here --&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

<h3>Practice Exercise</h3>
<p>Create an HTML document that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
    ansible: `
<h2>${topic}</h2>
<p>This lesson covers essential concepts in Ansible ${topic.toLowerCase()}.</p>

<h3>Key Concepts</h3>
<ul>
<li>Understanding ${topic.toLowerCase()}</li>
<li>Ansible-specific implementation</li>
<li>Best practices</li>
<li>Automation patterns</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Example Ansible playbook for ${topic.toLowerCase()}
---
- name: Lesson ${lessonNumber} - ${topic}
  hosts: all
  tasks:
    - name: Example task
      debug:
        msg: "Hello from lesson ${lessonNumber}"
    # More detailed examples would go here</code></pre>

<h3>Practice Exercise</h3>
<p>Create an Ansible playbook that demonstrates ${topic.toLowerCase()} concepts.</p>
    `,
  };

  return templates[language] || templates.javascript;
}

async function addLessonsToLanguage(language, startNumber, count = 5) {
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
      content: generateLessonContent(language, topic, lessonNumber),
      exercise: `Create a practical example demonstrating ${topic.toLowerCase()} concepts in ${language}.`,
      difficulty:
        lessonNumber <= 5
          ? "beginner"
          : lessonNumber <= 10
          ? "intermediate"
          : "advanced",
      estimatedTime: 20 + Math.floor(lessonNumber / 5) * 5,
    });
  }

  return lessons;
}

async function getLanguageWithFewestLessons() {
  const languages = await prisma.language.findMany({
    include: {
      _count: {
        select: { lessons: true },
      },
    },
  });

  // Sort by lesson count (ascending)
  languages.sort((a, b) => a._count.lessons - b._count.lessons);

  return languages[0];
}

async function addNextBatch() {
  try {
    console.log("🔍 Finding language with fewest lessons...");

    const targetLanguage = await getLanguageWithFewestLessons();
    const currentLessonCount = targetLanguage._count.lessons;

    console.log(
      `📚 Target Language: ${targetLanguage.name} (${targetLanguage.slug})`
    );
    console.log(`📊 Current Lessons: ${currentLessonCount}`);

    if (currentLessonCount >= 100) {
      console.log("🎉 All languages have reached 100 lessons!");
      return;
    }

    const startNumber = currentLessonCount + 1;
    const lessonsToAdd = Math.min(5, 100 - currentLessonCount);

    console.log(
      `➕ Adding lessons ${startNumber}-${startNumber + lessonsToAdd - 1}...`
    );

    const newLessons = await addLessonsToLanguage(
      targetLanguage.slug,
      startNumber,
      lessonsToAdd
    );

    for (const lessonData of newLessons) {
      const lesson = await prisma.lesson.create({
        data: {
          ...lessonData,
          languageId: targetLanguage.id,
        },
      });
      console.log(`✅ Created lesson ${lesson.number}: ${lesson.title}`);
    }

    const newCount = currentLessonCount + lessonsToAdd;
    console.log(`\n🎯 Progress Update:`);
    console.log(`   Language: ${targetLanguage.name}`);
    console.log(`   Lessons: ${currentLessonCount} → ${newCount}`);
    console.log(`   Remaining to 100: ${100 - newCount}`);

    // Show overall progress
    const allLanguages = await prisma.language.findMany({
      include: {
        _count: {
          select: { lessons: true },
        },
      },
    });

    console.log(`\n📈 Overall Progress:`);
    allLanguages.forEach((lang) => {
      const progress = Math.round((lang._count.lessons / 100) * 100);
      const bar =
        "█".repeat(Math.floor(progress / 10)) +
        "░".repeat(10 - Math.floor(progress / 10));
      console.log(
        `   ${lang.name.padEnd(12)}: ${bar} ${
          lang._count.lessons
        }/100 (${progress}%)`
      );
    });
  } catch (error) {
    console.error("❌ Error adding lessons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the batch processor
addNextBatch();
