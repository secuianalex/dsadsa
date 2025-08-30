const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testDatabaseDirect() {
  try {
    console.log("🧪 Testing database access with regenerated Prisma client...");

    // Get the Python lesson with test cases
    const pythonLesson = await prisma.lesson.findUnique({
      where: {
        id: "cmey9z96q0001uhacdlbf5keu",
      },
      include: {
        language: true,
      },
    });

    if (!pythonLesson) {
      console.log("❌ Lesson not found");
      return;
    }

    console.log(`✅ Found lesson: ${pythonLesson.title}`);
    console.log(`   Language: ${pythonLesson.language.slug}`);
    console.log(`   Has testCases: ${!!pythonLesson.testCases}`);
    console.log(`   Has solution: ${!!pythonLesson.solution}`);
    console.log(`   Has hints: ${!!pythonLesson.hints}`);

    if (pythonLesson.testCases) {
      console.log(
        `   Test cases length: ${pythonLesson.testCases.length} characters`
      );
      console.log(
        `   Test cases preview: ${pythonLesson.testCases.substring(0, 100)}...`
      );

      // Try to parse the test cases
      try {
        const testCases = JSON.parse(pythonLesson.testCases);
        console.log(`   Parsed test cases: ${testCases.length} test cases`);

        testCases.forEach((testCase, index) => {
          console.log(
            `     ${index + 1}. ${testCase.name}: ${testCase.description}`
          );
        });
      } catch (parseError) {
        console.log(`   ❌ Error parsing test cases: ${parseError.message}`);
      }
    }

    // Test the verification logic directly
    if (pythonLesson.testCases) {
      console.log("\n🔧 Testing verification logic directly...");

      const testCases = JSON.parse(pythonLesson.testCases);
      const testCode = "name = 'Alice'\nage = 25";

      console.log(`Testing code: ${testCode}`);

      // Simulate the verification process
      const results = [];
      for (const testCase of testCases) {
        let passed = false;
        let error = null;

        // Basic Python validation
        if (testCase.name.includes("Variable") && !testCode.includes("=")) {
          passed = false;
          error = "No variable assignment found";
        } else {
          passed = true;
          error = null;
        }

        results.push({
          name: testCase.name,
          description: testCase.description,
          passed,
          error,
          expectedOutput: testCase.expectedOutput,
        });
      }

      console.log("\n📊 Verification Results:");
      results.forEach((result, index) => {
        console.log(
          `   ${index + 1}. ${result.name}: ${
            result.passed ? "✅ PASS" : "❌ FAIL"
          }`
        );
        if (!result.passed && result.error) {
          console.log(`      Error: ${result.error}`);
        }
      });

      const allPassed = results.every((r) => r.passed);
      console.log(
        `\n🎯 Overall Result: ${
          allPassed ? "✅ ALL TESTS PASSED" : "❌ SOME TESTS FAILED"
        }`
      );
    }
  } catch (error) {
    console.error("❌ Test error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseDirect();
