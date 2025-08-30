const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testLessonData() {
  try {
    console.log("🧪 Testing lesson data retrieval...");

    // Test the same query as the server component
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: "cmey9z96q0001uhacdlbf5keu",
      },
      include: {
        language: true,
        exam: true,
      },
    });

    if (!lesson) {
      console.log("❌ Lesson not found");
      return;
    }

    console.log("✅ Lesson found:");
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Has testCases: ${!!lesson.testCases}`);
    console.log(`   Has solution: ${!!lesson.solution}`);
    console.log(`   Has hints: ${!!lesson.hints}`);
    console.log(`   testCases length: ${lesson.testCases?.length || 0}`);
    console.log(`   solution length: ${lesson.solution?.length || 0}`);
    console.log(`   hints length: ${lesson.hints?.length || 0}`);

    // Check if the fields exist on the object
    console.log("\n🔍 Field existence check:");
    console.log(`   lesson.testCases: ${typeof lesson.testCases}`);
    console.log(`   lesson.solution: ${typeof lesson.solution}`);
    console.log(`   lesson.hints: ${typeof lesson.hints}`);

    // Try to access the fields directly
    if (lesson.testCases) {
      console.log(
        `   testCases preview: ${lesson.testCases.substring(0, 50)}...`
      );
    }
    if (lesson.solution) {
      console.log(
        `   solution preview: ${lesson.solution.substring(0, 50)}...`
      );
    }
    if (lesson.hints) {
      console.log(`   hints preview: ${lesson.hints.substring(0, 50)}...`);
    }
  } catch (error) {
    console.error("❌ Test error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testLessonData();
