const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testVerification() {
  try {
    console.log("🧪 Testing code verification system...");

    // Get a Python lesson with test cases
    const pythonLesson = await prisma.lesson.findFirst({
      where: {
        language: {
          slug: "python",
        },
        testCases: {
          not: null,
        },
      },
      include: {
        language: true,
      },
    });

    if (!pythonLesson) {
      console.log("❌ No Python lesson with test cases found");
      return;
    }

    console.log(`✅ Found lesson: ${pythonLesson.title}`);
    console.log(`   Language: ${pythonLesson.language.slug}`);
    console.log(`   Has test cases: ${!!pythonLesson.testCases}`);

    // Test the API endpoint
    const testCode = "name = 'Alice'\nage = 25";

    console.log("\n📝 Testing with code:");
    console.log(testCode);

    const response = await fetch("http://localhost:3000/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonId: pythonLesson.id,
        code: testCode,
        language: pythonLesson.language.slug,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("\n✅ API Response:");
      console.log(`   Success: ${result.success}`);
      console.log(`   Passed: ${result.passed}`);
      console.log(`   Tests: ${result.passedTests}/${result.totalTests}`);

      if (result.results) {
        console.log("\n📊 Test Results:");
        result.results.forEach((test, index) => {
          console.log(
            `   ${index + 1}. ${test.name}: ${
              test.passed ? "✅ PASS" : "❌ FAIL"
            }`
          );
          if (!test.passed && test.error) {
            console.log(`      Error: ${test.error}`);
          }
        });
      }
    } else {
      const error = await response.text();
      console.log(`❌ API Error: ${response.status} - ${error}`);
    }
  } catch (error) {
    console.error("❌ Test error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testVerification();
