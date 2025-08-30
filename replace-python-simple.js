const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const comprehensivePythonLessons = [
  {
    number: 1,
    title: "Variables and Data Types",
    content: `
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
formatted_name = first_name + " " + last_name

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
print("BMI: " + str(bmi_result))</code></pre>

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
</ul>`,
    exercise:
      "Create a student grade calculator that stores student information using appropriate data types, calculates averages, determines letter grades, and finds the top performer.",
    difficulty: "beginner",
    estimatedTime: 35,
  },
  {
    number: 2,
    title: "Control Structures",
    content: `
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
    print("I like " + fruit)

# Range in for loops
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# While loops
count = 0
while count < 5:
    print("Count: " + str(count))
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
        print("(" + str(i) + ", " + str(j) + ")", end=" ")
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
            guess = int(input("Attempt " + str(attempts + 1) + ": Enter your guess: "))
            attempts += 1
            
            if guess < secret_number:
                print("Too low!")
            elif guess > secret_number:
                print("Too high!")
            else:
                print("Congratulations! You guessed it in " + str(attempts) + " attempts!")
                return
                
        except ValueError:
            print("Please enter a valid number!")
            continue
    
    print("Game over! The number was " + str(secret_number))

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
</ul>`,
    exercise:
      "Create a calculator with menu-driven interface, error handling, and calculation history tracking.",
    difficulty: "beginner",
    estimatedTime: 40,
  },
  {
    number: 3,
    title: "Functions and Modules",
    content: `
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
    return "Hello, " + name + "!"

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
    return "Hello, " + title + " " + name + "!"

print(greet_with_title("Smith"))           # Hello, Mr. Smith!
print(greet_with_title("Johnson", "Dr."))  # Hello, Dr. Johnson!

# Function with multiple return values
def get_name_and_age():
    """Return multiple values as a tuple."""
    name = "Alice"
    age = 25
    return name, age

name, age = get_name_and_age()
print(name + " is " + str(age) + " years old")

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
            print(str(temp) + "°C = " + str(round(result, 2)) + "°F")
        elif choice == "2":
            result = fahrenheit_to_celsius(temp)
            print(str(temp) + "°F = " + str(round(result, 2)) + "°C")
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
        print(func.__name__ + " took " + str(end_time - start_time) + " seconds")
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
</ul>`,
    exercise:
      "Create a library management system with functions for adding, removing, finding, and managing book checkouts.",
    difficulty: "intermediate",
    estimatedTime: 45,
  },
  {
    number: 4,
    title: "Object-Oriented Programming",
    content: `
<h2>Object-Oriented Programming in Python</h2>
<p>Object-Oriented Programming (OOP) is a programming paradigm that uses objects to design applications and computer programs. Python supports OOP through classes and objects.</p>

<h3>Key Concepts</h3>
<ul>
<li>Classes and objects</li>
<li>Attributes and methods</li>
<li>Constructor (__init__)</li>
<li>Inheritance</li>
<li>Encapsulation</li>
<li>Polymorphism</li>
<li>Magic methods</li>
<li>Class and static methods</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Basic class definition
class Person:
    """A simple class representing a person."""
    
    def __init__(self, name, age):
        """Constructor method."""
        self.name = name
        self.age = age
    
    def greet(self):
        """Instance method."""
        return "Hello, my name is " + self.name + " and I am " + str(self.age) + " years old."
    
    def have_birthday(self):
        """Method that modifies instance state."""
        self.age += 1
        return "Happy birthday! " + self.name + " is now " + str(self.age) + " years old."

# Creating objects
person1 = Person("Alice", 25)
person2 = Person("Bob", 30)

print(person1.greet())  # Hello, my name is Alice and I am 25 years old.
print(person2.greet())  # Hello, my name is Bob and I am 30 years old.

# Modifying object state
print(person1.have_birthday())  # Happy birthday! Alice is now 26 years old.

# Inheritance
class Student(Person):
    """Student class inheriting from Person."""
    
    def __init__(self, name, age, student_id, major):
        # Call parent constructor
        super().__init__(name, age)
        self.student_id = student_id
        self.major = major
        self.courses = []
    
    def add_course(self, course):
        """Add a course to student's schedule."""
        self.courses.append(course)
        return "Added " + course + " to " + self.name + "'s schedule."
    
    def get_schedule(self):
        """Get student's course schedule."""
        return self.name + " is taking: " + ", ".join(self.courses)
    
    def greet(self):
        """Override parent method."""
        return "Hi, I'm " + self.name + ", a " + self.major + " student!"

# Using inheritance
student = Student("Charlie", 20, "S12345", "Computer Science")
print(student.greet())  # Hi, I'm Charlie, a Computer Science student!
print(student.add_course("Python Programming"))
print(student.add_course("Data Structures"))
print(student.get_schedule())

# Encapsulation with private attributes
class BankAccount:
    """Bank account with private attributes."""
    
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self._balance = initial_balance  # Protected attribute
        self.__account_number = self._generate_account_number()  # Private attribute
    
    def _generate_account_number(self):
        """Private method to generate account number."""
        import random
        return "ACC" + str(random.randint(10000, 99999))
    
    def get_balance(self):
        """Public method to get balance."""
        return self._balance
    
    def deposit(self, amount):
        """Deposit money into account."""
        if amount > 0:
            self._balance += amount
            return "Deposited $" + str(amount) + ". New balance: $" + str(self._balance)
        else:
            return "Invalid deposit amount."
    
    def withdraw(self, amount):
        """Withdraw money from account."""
        if amount > 0 and amount <= self._balance:
            self._balance -= amount
            return "Withdrew $" + str(amount) + ". New balance: $" + str(self._balance)
        else:
            return "Insufficient funds or invalid amount."

# Using encapsulation
account = BankAccount("David", 1000)
print(account.deposit(500))  # Deposited $500. New balance: $1500
print(account.withdraw(200))  # Withdrew $200. New balance: $1300
print(account.get_balance())  # 1300

# Magic methods
class Vector:
    """Vector class demonstrating magic methods."""
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        """String representation."""
        return "Vector(" + str(self.x) + ", " + str(self.y) + ")"
    
    def __repr__(self):
        """Detailed string representation."""
        return "Vector(x=" + str(self.x) + ", y=" + str(self.y) + ")"
    
    def __add__(self, other):
        """Add two vectors."""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """Subtract two vectors."""
        return Vector(self.x - other.x, self.y - other.y)
    
    def __eq__(self, other):
        """Check if vectors are equal."""
        return self.x == other.x and self.y == other.y
    
    def magnitude(self):
        """Calculate vector magnitude."""
        import math
        return math.sqrt(self.x**2 + self.y**2)

# Using magic methods
v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2
print(v1)  # Vector(3, 4)
print(v3)  # Vector(4, 6)
print(v1.magnitude())  # 5.0

# Class and static methods
class MathUtils:
    """Utility class with class and static methods."""
    
    PI = 3.14159
    
    @classmethod
    def circle_area(cls, radius):
        """Calculate circle area using class variable."""
        return cls.PI * radius**2
    
    @staticmethod
    def is_even(number):
        """Check if number is even."""
        return number % 2 == 0
    
    @staticmethod
    def factorial(n):
        """Calculate factorial."""
        if n <= 1:
            return 1
        return n * MathUtils.factorial(n - 1)

# Using class and static methods
print(MathUtils.circle_area(5))  # 78.53975
print(MathUtils.is_even(10))     # True
print(MathUtils.factorial(5))    # 120</code></pre>

<h3>Practice Exercise</h3>
<p>Create a simple banking system with the following classes:</p>
<ol>
<li>Account (base class with balance, account number, deposit, withdraw)</li>
<li>SavingsAccount (inherits from Account, with interest rate)</li>
<li>CheckingAccount (inherits from Account, with overdraft limit)</li>
<li>Bank (manages multiple accounts)</li>
</ol>
<p>Implement proper inheritance, encapsulation, and error handling.</p>

<h3>Common Pitfalls</h3>
<ul>
<li>Forgetting to call super().__init__() in child classes</li>
<li>Confusing class and instance variables</li>
<li>Not using proper encapsulation</li>
<li>Overriding methods incorrectly</li>
<li>Circular imports with classes</li>
</ul>`,
    exercise:
      "Create a banking system with Account, SavingsAccount, CheckingAccount, and Bank classes using proper OOP principles.",
    difficulty: "intermediate",
    estimatedTime: 50,
  },
  {
    number: 5,
    title: "File Handling and Data Processing",
    content: `
<h2>File Handling and Data Processing in Python</h2>
<p>File handling is essential for reading from and writing to files. This lesson covers various file operations and data processing techniques commonly used in Python applications.</p>

<h3>Key Concepts</h3>
<ul>
<li>File opening modes (read, write, append)</li>
<li>Context managers (with statement)</li>
<li>Text vs binary files</li>
<li>CSV file processing</li>
<li>JSON data handling</li>
<li>Exception handling for files</li>
<li>File and directory operations</li>
<li>Data processing with pandas</li>
</ul>

<h3>Code Examples</h3>
<pre><code># Basic file operations
# Writing to a file
with open('sample.txt', 'w') as file:
    file.write("Hello, World!\\n")
    file.write("This is a sample file.\\n")
    file.write("Python file handling is awesome!")

# Reading from a file
with open('sample.txt', 'r') as file:
    content = file.read()
    print("Full content:")
    print(content)

# Reading line by line
with open('sample.txt', 'r') as file:
    print("\\nLine by line:")
    for line in file:
        print("Line: " + line.strip())

# Appending to a file
with open('sample.txt', 'a') as file:
    file.write("\\nThis line was appended!")

# CSV file processing
import csv

# Writing CSV data
data = [
    ['Name', 'Age', 'City'],
    ['Alice', 25, 'New York'],
    ['Bob', 30, 'Los Angeles'],
    ['Charlie', 35, 'Chicago']
]

with open('people.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Reading CSV data
with open('people.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        print("Name: " + row[0] + ", Age: " + row[1] + ", City: " + row[2])

# Using DictReader for better CSV handling
with open('people.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row['Name'] + " is " + row['Age'] + " years old from " + row['City'])

# JSON data handling
import json

# Python object to JSON
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "hobbies": ["reading", "coding", "hiking"],
    "is_student": True
}

# Writing JSON to file
with open('person.json', 'w') as file:
    json.dump(person, file, indent=2)

# Reading JSON from file
with open('person.json', 'r') as file:
    loaded_person = json.load(file)
    print("Loaded person:", loaded_person)

# JSON string operations
json_string = json.dumps(person, indent=2)
print("JSON string:")
print(json_string)

parsed_person = json.loads(json_string)
print("Parsed person:", parsed_person)

# File and directory operations
import os
import shutil

# Check if file exists
if os.path.exists('sample.txt'):
    print("File exists!")

# Get file information
file_stats = os.stat('sample.txt')
print("File size: " + str(file_stats.st_size) + " bytes")
print("Last modified: " + str(file_stats.st_mtime))

# List directory contents
print("Current directory contents:")
for item in os.listdir('.'):
    if os.path.isfile(item):
        print("File: " + item)
    elif os.path.isdir(item):
        print("Directory: " + item)

# Create directories
os.makedirs('data/backup', exist_ok=True)

# Copy files
shutil.copy('sample.txt', 'data/backup/sample_backup.txt')

# Practical example: Log file processor
class LogProcessor:
    """Process log files and extract information."""
    
    def __init__(self, log_file):
        self.log_file = log_file
        self.logs = []
    
    def load_logs(self):
        """Load logs from file."""
        try:
            with open(self.log_file, 'r') as file:
                for line in file:
                    self.logs.append(line.strip())
        except FileNotFoundError:
            print("Log file " + self.log_file + " not found.")
    
    def filter_by_level(self, level):
        """Filter logs by log level."""
        return [log for log in self.logs if level.upper() in log.upper()]
    
    def count_errors(self):
        """Count error logs."""
        return len(self.filter_by_level('ERROR'))
    
    def save_filtered_logs(self, level, output_file):
        """Save filtered logs to new file."""
        filtered_logs = self.filter_by_level(level)
        with open(output_file, 'w') as file:
            for log in filtered_logs:
                file.write(log + '\\n')
        print("Saved " + str(len(filtered_logs)) + " " + level + " logs to " + output_file)

# Data processing with pandas
import pandas as pd

# Create sample data
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'Salary': [50000, 60000, 70000, 55000],
    'Department': ['IT', 'HR', 'IT', 'Marketing']
}

# Create DataFrame
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

# Basic operations
print("\\nAverage age:", df['Age'].mean())
print("Total salary:", df['Salary'].sum())
print("Department counts:")
print(df['Department'].value_counts())

# Filtering
it_employees = df[df['Department'] == 'IT']
print("\\nIT Employees:")
print(it_employees)

# Grouping
dept_stats = df.groupby('Department').agg({
    'Age': 'mean',
    'Salary': ['mean', 'sum', 'count']
})
print("\\nDepartment Statistics:")
print(dept_stats)

# Save to CSV
df.to_csv('employees.csv', index=False)

# Read from CSV
loaded_df = pd.read_csv('employees.csv')
print("\\nLoaded DataFrame:")
print(loaded_df)</code></pre>

<h3>Practice Exercise</h3>
<p>Create a data processing system that:</p>
<ol>
<li>Reads a CSV file with sales data (date, product, quantity, price)</li>
<li>Calculates total sales by product</li>
<li>Finds the best-selling product</li>
<li>Generates a sales report in JSON format</li>
<li>Saves the report to a file</li>
<li>Creates visualizations of the data</li>
</ol>

<h3>Common Pitfalls</h3>
<ul>
<li>Not using context managers (with statements)</li>
<li>Forgetting to close files</li>
<li>Not handling file exceptions</li>
<li>Using wrong file modes</li>
<li>Not checking file existence before operations</li>
</ul>`,
    exercise:
      "Create a sales data processing system that reads CSV files, calculates statistics, generates reports, and creates visualizations.",
    difficulty: "intermediate",
    estimatedTime: 55,
  },
];

async function replacePythonLessons() {
  try {
    console.log("🐍 Replacing Python lessons with comprehensive content...");

    // Get Python language
    const python = await prisma.language.findUnique({
      where: { slug: "python" },
    });

    if (!python) {
      console.error("Python language not found");
      return;
    }

    console.log(`📚 Found Python language: ${python.name}`);

    // Get existing lessons to delete related records
    const existingLessons = await prisma.lesson.findMany({
      where: { languageId: python.id },
    });

    console.log(
      `🗑️ Deleting ${existingLessons.length} existing Python lessons...`
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
      where: { languageId: python.id },
    });
    console.log("✅ Existing lessons deleted");

    // Create new comprehensive lessons
    console.log("➕ Creating 5 comprehensive Python lessons...");

    for (const lessonData of comprehensivePythonLessons) {
      const lesson = await prisma.lesson.create({
        data: {
          ...lessonData,
          languageId: python.id,
        },
      });
      console.log(`✅ Created lesson ${lesson.number}: ${lesson.title}`);
    }

    console.log(`\n🎯 Python Lessons Replacement Complete!`);
    console.log(`   Language: ${python.name}`);
    console.log(`   Lessons: 5 comprehensive lessons created`);
    console.log(`   Content: Real Python knowledge with practical examples`);
    console.log(`   Status: Ready for learning!`);
  } catch (error) {
    console.error("❌ Error replacing Python lessons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the replacement
replacePythonLessons();
