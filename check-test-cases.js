const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkTestCases() {
  try {
    console.log("🔍 Checking test cases in database...");

    // Get all Python lessons
    const pythonLessons = await prisma.lesson.findMany({
      where: {
        language: {
          slug: "python",
        },
      },
      include: {
        language: true,
      },
    });

    console.log(`\n📚 Found ${pythonLessons.length} Python lessons:`);

    pythonLessons.forEach((lesson, index) => {
      console.log(`\n${index + 1}. ${lesson.title}`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Has testCases: ${!!lesson.testCases}`);
      console.log(`   Has solution: ${!!lesson.solution}`);
      console.log(`   Has hints: ${!!lesson.hints}`);

      if (lesson.testCases) {
        console.log(
          `   Test cases length: ${lesson.testCases.length} characters`
        );
        console.log(
          `   Test cases preview: ${lesson.testCases.substring(0, 100)}...`
        );
      }
    });

    // Check if there are any lessons with test cases
    const lessonsWithTests = await prisma.lesson.findMany({
      where: {
        testCases: {
          not: null,
        },
      },
      include: {
        language: true,
      },
    });

    console.log(
      `\n🎯 Total lessons with test cases: ${lessonsWithTests.length}`
    );

    if (lessonsWithTests.length > 0) {
      console.log("\n📋 Lessons with test cases:");
      lessonsWithTests.forEach((lesson) => {
        console.log(`   - ${lesson.language.slug}: ${lesson.title}`);
      });
    }
  } catch (error) {
    console.error("❌ Error checking test cases:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkTestCases();
