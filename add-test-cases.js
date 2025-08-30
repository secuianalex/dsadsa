const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Sample test cases for different languages
const sampleTestCases = {
  python: {
    "Variables and Data Types": {
      testCases: JSON.stringify([
        {
          name: "Variable Assignment",
          description: "Check if variables are properly assigned",
          input: "name = 'Alice'\nage = 25",
          expectedOutput: "Variables should be assigned correctly",
          testFunction: "assert 'name' in locals() and 'age' in locals()",
        },
        {
          name: "Type Checking",
          description: "Verify correct data types",
          input: "x = 42\ny = 'hello'",
          expectedOutput: "x should be int, y should be str",
          testFunction: "assert type(x) == int and type(y) == str",
        },
      ]),
      solution: `# Solution for Variables and Data Types
name = "Alice"
age = 25
height = 1.75
is_student = True

print(f"Name: {name}, Age: {age}, Height: {height}, Student: {is_student}")`,
      hints: JSON.stringify([
        "Use the assignment operator (=) to create variables",
        "Python is dynamically typed - no need to declare types",
        "Use print() to display variable values",
      ]),
    },
    "Control Structures": {
      testCases: JSON.stringify([
        {
          name: "If Statement",
          description: "Test basic if-elif-else structure",
          input:
            "age = 18\nif age < 13:\n    result = 'Child'\nelif age < 20:\n    result = 'Teenager'\nelse:\n    result = 'Adult'",
          expectedOutput: "result should be 'Teenager'",
          testFunction: "assert result == 'Teenager'",
        },
        {
          name: "For Loop",
          description: "Test for loop with range",
          input: "numbers = []\nfor i in range(5):\n    numbers.append(i)",
          expectedOutput: "numbers should be [0, 1, 2, 3, 4]",
          testFunction: "assert numbers == [0, 1, 2, 3, 4]",
        },
      ]),
      solution: `# Solution for Control Structures
age = 18

if age < 13:
    print("Child")
elif age < 20:
    print("Teenager")
else:
    print("Adult")

# For loop example
for i in range(5):
    print(f"Number: {i}")`,
      hints: JSON.stringify([
        "Use if, elif, and else for conditional statements",
        "Use for loops with range() for iteration",
        "Remember proper indentation in Python",
      ]),
    },
  },
  javascript: {
    "Variables and Data Types": {
      testCases: JSON.stringify([
        {
          name: "Variable Declaration",
          description: "Check if variables are properly declared",
          input: "let name = 'John';\nconst age = 25;",
          expectedOutput: "Variables should be declared correctly",
          testFunction:
            "assert(typeof name === 'string' && typeof age === 'number')",
        },
        {
          name: "Array Operations",
          description: "Test array creation and manipulation",
          input: "let fruits = ['apple', 'banana'];\nfruits.push('orange');",
          expectedOutput: "fruits should be ['apple', 'banana', 'orange']",
          testFunction: "assert(fruits.length === 3 && fruits[2] === 'orange')",
        },
      ]),
      solution: `// Solution for Variables and Data Types
let name = "John";
const age = 25;
let isStudent = true;
let hobbies = ["reading", "coding"];

console.log(\`Name: \${name}, Age: \${age}, Student: \${isStudent}\`);
console.log("Hobbies:", hobbies);`,
      hints: JSON.stringify([
        "Use let for variables that can change, const for constants",
        "Use console.log() to output values",
        "Arrays can hold multiple values of any type",
      ]),
    },
  },
  css: {
    "CSS Selectors": {
      testCases: JSON.stringify([
        {
          name: "Element Selector",
          description: "Test basic element selector",
          input: "h1 {\n    color: blue;\n}",
          expectedOutput: "h1 elements should have blue color",
          testFunction:
            "assert(document.querySelector('h1').style.color === 'blue')",
        },
        {
          name: "Class Selector",
          description: "Test class selector",
          input: ".highlight {\n    background-color: yellow;\n}",
          expectedOutput:
            "Elements with 'highlight' class should have yellow background",
          testFunction:
            "assert(document.querySelector('.highlight').style.backgroundColor === 'yellow')",
        },
      ]),
      solution: `/* Solution for CSS Selectors */
h1 {
    color: blue;
    font-size: 24px;
}

.highlight {
    background-color: yellow;
    font-weight: bold;
}

#main-content {
    padding: 20px;
    margin: 10px;
}`,
      hints: JSON.stringify([
        "Use element names (h1, p, div) for element selectors",
        "Use .classname for class selectors",
        "Use #idname for ID selectors",
      ]),
    },
  },
};

async function addTestCases() {
  try {
    console.log("🔧 Adding test cases to lessons...");

    for (const [languageSlug, lessons] of Object.entries(sampleTestCases)) {
      console.log(`\n📚 Processing ${languageSlug} lessons...`);

      const language = await prisma.language.findUnique({
        where: { slug: languageSlug },
      });

      if (!language) {
        console.log(`⚠️ Language ${languageSlug} not found, skipping...`);
        continue;
      }

      for (const [lessonTitle, testData] of Object.entries(lessons)) {
        console.log(`   Adding test cases to: ${lessonTitle}`);

        const lesson = await prisma.lesson.findFirst({
          where: {
            languageId: language.id,
            title: lessonTitle,
          },
        });

        if (lesson) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: {
              testCases: testData.testCases,
              solution: testData.solution,
              hints: testData.hints,
            },
          });
          console.log(`   ✅ Updated lesson: ${lessonTitle}`);
        } else {
          console.log(`   ⚠️ Lesson not found: ${lessonTitle}`);
        }
      }
    }

    console.log("\n🎯 Test cases addition complete!");
    console.log(
      "   - Added test cases for Python, JavaScript, and CSS lessons"
    );
    console.log(
      "   - Each lesson now has sample test cases, solutions, and hints"
    );
    console.log("   - Ready for code verification implementation");
  } catch (error) {
    console.error("❌ Error adding test cases:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addTestCases();
