const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Comprehensive hints and solutions for all programming languages
const languageContent = {
  python: {
    hints: [
      "Remember that Python variables don't need type declarations",
      "Use descriptive variable names that explain what the data represents",
      "Python is case-sensitive, so be careful with variable naming",
      "You can use type hints in Python 3.6+ for better code documentation",
      "Consider using meaningful variable names instead of single letters",
    ],
    solutions: {
      variables: `# Create variables with meaningful names
name = "Alice"
age = 25
height = 1.75
is_student = True

# Print the variables
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height} meters")
print(f"Is student: {is_student}")`,
      dataTypes: `# Different data types in Python
text = "Hello World"          # String
number = 42                   # Integer
decimal = 3.14               # Float
is_valid = True              # Boolean
my_list = [1, 2, 3]         # List
my_dict = {"key": "value"}   # Dictionary

print(f"Text: {text} (type: {type(text)})")
print(f"Number: {number} (type: {type(number)})")
print(f"Decimal: {decimal} (type: {type(decimal)})")
print(f"Boolean: {is_valid} (type: {type(is_valid)})")`,
    },
  },
  javascript: {
    hints: [
      "Use 'let' for variables that can be reassigned, 'const' for constants",
      "Remember that JavaScript is loosely typed",
      "Use camelCase for variable naming conventions",
      "Be careful with hoisting - declare variables before using them",
      "Consider using template literals for string interpolation",
    ],
    solutions: {
      variables: `// Declare variables using let and const
let userName = "John";
const age = 30;
let isActive = true;

// Use template literals for string interpolation
console.log(\`User: \${userName}\`);
console.log(\`Age: \${age}\`);
console.log(\`Active: \${isActive}\`);`,
      functions: `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Function expression
const multiply = function(x, y) {
  return x * y;
};

console.log(greet("Alice")); // Hello, Alice!
console.log(add(5, 3));      // 8
console.log(multiply(4, 6)); // 24`,
    },
  },
  angular: {
    hints: [
      "Remember to import necessary modules in your component",
      "Use Angular CLI commands for generating components and services",
      "Follow the Angular style guide for naming conventions",
      "Use TypeScript interfaces for type safety",
      "Remember to inject dependencies in the constructor",
    ],
    solutions: {
      components: `import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: \`
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Age: {{ user.age }}</p>
    </div>
  \`,
  styles: [\`
    .user-card {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
  \`]
})
export class UserProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  };
}`,
      services: `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(\`\${this.apiUrl}/\${id}\`);
  }
}`,
    },
  },
  react: {
    hints: [
      "Use functional components with hooks for modern React development",
      "Remember to handle state updates immutably",
      "Use useEffect for side effects and lifecycle management",
      "Consider using React.memo for performance optimization",
      "Follow the rules of hooks - only call them at the top level",
    ],
    solutions: {
      components: `import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 25
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="user-profile">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </>
      )}
    </div>
  );
}

export default UserProfile;`,
      hooks: `import React, { useState, useEffect, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [doubled, setDoubled] = useState(0);

  // Update doubled value when count changes
  useEffect(() => {
    setDoubled(count * 2);
  }, [count]);

  // Memoized callback to prevent unnecessary re-renders
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <p>Doubled: {doubled}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`,
    },
  },
  nodejs: {
    hints: [
      "Use async/await for handling asynchronous operations",
      "Remember to handle errors with try-catch blocks",
      "Use environment variables for configuration",
      "Follow the Node.js error-first callback pattern",
      "Consider using middleware for request processing",
    ],
    solutions: {
      server: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/users', async (req, res) => {
  try {
    // Simulate database query
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      async: `const fs = require('fs').promises;

async function readAndProcessFile(filename) {
  try {
    // Read file asynchronously
    const data = await fs.readFile(filename, 'utf8');
    
    // Process the data
    const lines = data.split('\\n');
    const wordCount = lines.reduce((count, line) => {
      return count + line.split(' ').length;
    }, 0);
    
    return {
      lines: lines.length,
      words: wordCount,
      content: data
    };
  } catch (error) {
    console.error('Error reading file:', error.message);
    throw error;
  }
}

// Usage
readAndProcessFile('example.txt')
  .then(result => console.log(result))
  .catch(error => console.error('Failed:', error));`,
    },
  },
  java: {
    hints: [
      "Remember to declare variable types explicitly in Java",
      "Use meaningful class and method names following Java conventions",
      "Consider access modifiers (public, private, protected)",
      "Use try-catch blocks for exception handling",
      "Follow Java naming conventions (camelCase for methods, PascalCase for classes)",
    ],
    solutions: {
      classes: `public class User {
    // Private fields
    private String name;
    private String email;
    private int age;
    
    // Constructor
    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getters and setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    // Method to display user info
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Age: " + age);
    }
}`,
      inheritance: `// Base class
public class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void makeSound() {
        System.out.println("Some animal sound");
    }
    
    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

// Derived class
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {
        System.out.println("Woof! Woof!");
    }
    
    public void displayBreed() {
        System.out.println("Breed: " + breed);
    }
}`,
    },
  },
  csharp: {
    hints: [
      "Use proper C# naming conventions (PascalCase for methods, camelCase for variables)",
      "Consider using properties instead of public fields",
      "Use LINQ for data manipulation when possible",
      "Remember to implement IDisposable for resource management",
      "Use async/await for asynchronous operations",
    ],
    solutions: {
      classes: `using System;

public class Product
{
    // Properties with auto-implemented getters and setters
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    
    // Constructor
    public Product(string name, decimal price, int stock)
    {
        Name = name;
        Price = price;
        Stock = stock;
    }
    
    // Method to calculate total value
    public decimal GetTotalValue()
    {
        return Price * Stock;
    }
    
    // Method to display product info
    public void DisplayInfo()
    {
        Console.WriteLine("Name: " + Name);
        Console.WriteLine("Price: $" + Price.ToString("F2"));
        Console.WriteLine("Stock: " + Stock);
        Console.WriteLine("Total Value: $" + GetTotalValue().ToString("F2"));
    }
}`,
      linq: `using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
    public static void Main()
    {
        var products = new List<Product>
        {
            new Product("Laptop", 999.99m, 5),
            new Product("Mouse", 25.50m, 20),
            new Product("Keyboard", 75.00m, 10),
            new Product("Monitor", 299.99m, 8)
        };
        
        // LINQ queries
        var expensiveProducts = products.Where(p => p.Price > 100);
        var totalValue = products.Sum(p => p.GetTotalValue());
        var averagePrice = products.Average(p => p.Price);
        
        Console.WriteLine("Expensive Products (>$100):");
        foreach (var product in expensiveProducts)
        {
            Console.WriteLine("- " + product.Name + ": $" + product.Price.ToString("F2"));
        }
        
        Console.WriteLine("\\nTotal Inventory Value: $" + totalValue.ToString("F2"));
        Console.WriteLine("Average Price: $" + averagePrice.ToString("F2"));
    }
}`,
    },
  },
  typescript: {
    hints: [
      "Use TypeScript interfaces for type definitions",
      "Leverage union types and generics for flexible typing",
      "Use strict mode for better type safety",
      "Consider using utility types like Partial, Pick, Omit",
      "Use type guards for runtime type checking",
    ],
    solutions: {
      interfaces: `// Define interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: 'electronics' | 'clothing' | 'books'; // Union type
}

// Function with typed parameters
function createUser(userData: Partial<User>): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name: userData.name || 'Anonymous',
    email: userData.email || '',
    age: userData.age
  };
}

// Generic function
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Usage
const user: User = createUser({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

console.log(getProperty(user, 'name')); // 'John Doe'`,
      generics: `// Generic class
class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  getAll(): T[] {
    return [...this.data];
  }

  remove(index: number): T | undefined {
    return this.data.splice(index, 1)[0];
  }
}

// Usage with different types
const stringStore = new DataStore<string>();
stringStore.add('Hello');
stringStore.add('World');

const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);
numberStore.add(3);

console.log(stringStore.getAll()); // ['Hello', 'World']
console.log(numberStore.getAll()); // [1, 2, 3]`,
    },
  },
  vuejs: {
    hints: [
      "Use Vue 3 Composition API for better logic organization",
      "Remember to use ref() or reactive() for reactive data",
      "Use computed properties for derived state",
      "Consider using provide/inject for deep component communication",
      "Use Vue Router for navigation between components",
    ],
    solutions: {
      components: `<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="updateAge">Update Age</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data
const user = ref({
  name: 'Jane Doe',
  email: 'jane@example.com',
  age: 25
})

// Computed property
const userInfo = computed(() => {
  return \`\${user.value.name} (\${user.value.age} years old)\`
})

// Method
const updateAge = () => {
  user.value.age += 1
}
</script>

<style scoped>
.user-profile {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>`,
      composition: `<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="counter">
      <p>Count: {{ count }}</p>
      <p>Doubled: {{ doubled }}</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive state
const title = ref('Vue 3 Counter')
const count = ref(0)

// Computed property
const doubled = computed(() => count.value * 2)

// Methods
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

// Lifecycle hook
onMounted(() => {
  console.log('Component mounted!')
})
</script>`,
    },
  },
  html: {
    hints: [
      "Use semantic HTML elements for better accessibility",
      "Remember to include proper meta tags in the head",
      "Use descriptive alt text for images",
      "Structure your HTML with proper heading hierarchy",
      "Consider using ARIA attributes for enhanced accessibility",
    ],
    solutions: {
      semantic: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Main Article Title</h1>
                <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
            </header>
            
            <section>
                <h2>Introduction</h2>
                <p>This is the introduction section of the article.</p>
            </section>
            
            <section>
                <h2>Main Content</h2>
                <p>This is the main content of the article.</p>
                <figure>
                    <img src="example.jpg" alt="Example image description">
                    <figcaption>Figure 1: Example image</figcaption>
                </figure>
            </section>
        </article>
    </main>

    <aside>
        <h3>Related Articles</h3>
        <ul>
            <li><a href="#">Related Article 1</a></li>
            <li><a href="#">Related Article 2</a></li>
        </ul>
    </aside>

    <footer>
        <p>&copy; 2024 Your Website. All rights reserved.</p>
    </footer>
</body>
</html>`,
      forms: `<form action="/submit" method="POST">
    <fieldset>
        <legend>Personal Information</legend>
        
        <div>
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div>
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" min="18" max="120">
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Preferences</legend>
        
        <div>
            <label for="newsletter">Subscribe to newsletter:</label>
            <input type="checkbox" id="newsletter" name="newsletter">
        </div>
        
        <div>
            <label>Gender:</label>
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female">Female</label>
        </div>
        
        <div>
            <label for="country">Country:</label>
            <select id="country" name="country">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
            </select>
        </div>
    </fieldset>
    
    <button type="submit">Submit</button>
</form>`,
    },
  },
  css: {
    hints: [
      "Use CSS Grid and Flexbox for modern layouts",
      "Remember to use vendor prefixes for better browser compatibility",
      "Use CSS custom properties (variables) for consistent theming",
      "Consider mobile-first responsive design approach",
      "Use semantic class names following BEM methodology",
    ],
    solutions: {
      flexbox: `/* Flexbox Layout */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.card {
  flex: 1;
  min-width: 250px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-content {
  color: #666;
  line-height: 1.5;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .card {
    min-width: 100%;
  }
}`,
      grid: `/* CSS Grid Layout */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.grid-item {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.grid-item:nth-child(1) {
  grid-column: span 2;
  background: #e3f2fd;
}

.grid-item:nth-child(4) {
  grid-row: span 2;
  background: #f3e5f5;
}

/* Responsive grid */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .grid-item:nth-child(1),
  .grid-item:nth-child(4) {
    grid-column: span 1;
    grid-row: span 1;
  }
}`,
    },
  },
  ansible: {
    hints: [
      "Use YAML syntax with proper indentation",
      "Use descriptive task names for better readability",
      "Consider using variables and templates for reusability",
      "Use handlers for tasks that should run only when notified",
      "Follow Ansible best practices for security and performance",
    ],
    solutions: {
      playbook: `---
- name: Configure web server
  hosts: webservers
  become: yes
  vars:
    app_name: myapp
    app_port: 8080
    
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes
        cache_valid_time: 3600
      
    - name: Install required packages
      apt:
        name:
          - nginx
          - python3
          - python3-pip
        state: present
      
    - name: Create application directory
      file:
        path: /var/www/{{ app_name }}
        state: directory
        owner: www-data
        group: www-data
        mode: '0755'
      
    - name: Copy application files
      copy:
        src: ../app/
        dest: /var/www/{{ app_name }}/
        owner: www-data
        group: www-data
        
    - name: Configure nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}
        owner: root
        group: root
        mode: '0644'
      notify: restart nginx
      
  handlers:
    - name: restart nginx
      service:
        name: nginx
        state: restarted`,
      variables: `---
# group_vars/all.yml
app_name: mywebapp
app_version: "1.0.0"
db_host: localhost
db_name: myapp_db
db_user: myapp_user

# host_vars/webserver.yml
nginx_port: 80
ssl_enabled: true
cert_path: /etc/ssl/certs/myapp.crt
key_path: /etc/ssl/private/myapp.key

# tasks/main.yml
- name: Install application
  hosts: webservers
  become: yes
  tasks:
    - name: Create application user
      user:
        name: "{{ app_name }}"
        system: yes
        shell: /bin/false
        home: /var/lib/{{ app_name }}
        
    - name: Create application directory
      file:
        path: /var/lib/{{ app_name }}
        state: directory
        owner: "{{ app_name }}"
        group: "{{ app_name }}"
        mode: '0755'
        
    - name: Download application
      get_url:
        url: "https://example.com/{{ app_name }}-{{ app_version }}.tar.gz"
        dest: /tmp/{{ app_name }}.tar.gz
        mode: '0644'
        
    - name: Extract application
      unarchive:
        src: /tmp/{{ app_name }}.tar.gz
        dest: /var/lib/{{ app_name }}
        remote_src: yes
        owner: "{{ app_name }}"
        group: "{{ app_name }}"`,
    },
  },
};

async function addHintsAndSolutions() {
  try {
    console.log("🚀 Starting to add hints and solutions to all lessons...");

    // Get all languages
    const languages = await prisma.language.findMany();
    console.log(`Found ${languages.length} languages`);

    let totalUpdated = 0;

    for (const language of languages) {
      console.log(`\n📝 Processing ${language.name}...`);

      // Get all lessons for this language
      const lessons = await prisma.lesson.findMany({
        where: { languageId: language.id },
        orderBy: { number: "asc" },
      });

      console.log(`Found ${lessons.length} lessons for ${language.name}`);

      const languageKey = language.slug.toLowerCase();
      const content = languageContent[languageKey];

      if (!content) {
        console.log(
          `⚠️  No content template found for ${language.name}, skipping...`
        );
        continue;
      }

      for (const lesson of lessons) {
        try {
          // Generate hints based on lesson content
          const hints = content.hints.slice(0, 3); // Use first 3 hints

          // Generate solution based on lesson title/content
          let solution = "";
          if (lesson.title.toLowerCase().includes("variable")) {
            solution =
              content.solutions.variables || content.solutions.dataTypes;
          } else if (lesson.title.toLowerCase().includes("function")) {
            solution =
              content.solutions.functions || content.solutions.components;
          } else if (lesson.title.toLowerCase().includes("class")) {
            solution =
              content.solutions.classes || content.solutions.inheritance;
          } else {
            // Default solution
            solution = Object.values(content.solutions)[0];
          }

          // Generate test cases
          const testCases = [
            {
              name: "Basic Syntax Check",
              description: "Verify the code compiles without syntax errors",
              test: "syntax_check",
              expected: true,
            },
            {
              name: "Output Verification",
              description: "Check if the code produces expected output",
              test: "output_check",
              expected: "success",
            },
          ];

          // Update the lesson
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              hints: JSON.stringify(hints),
              solution: solution,
              testCases: JSON.stringify(testCases),
            },
          });

          totalUpdated++;
          console.log(`✅ Updated lesson: ${lesson.title}`);
        } catch (error) {
          console.error(
            `❌ Error updating lesson ${lesson.title}:`,
            error.message
          );
        }
      }
    }

    console.log(
      `\n🎉 Successfully updated ${totalUpdated} lessons with hints and solutions!`
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addHintsAndSolutions();
