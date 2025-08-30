const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkAllLessons() {
  try {
    console.log("🔍 Checking all lessons for hints and solutions...");

    // Get all lessons
    const allLessons = await prisma.lesson.findMany({
      include: {
        language: true,
      },
    });

    console.log(`\n📚 Found ${allLessons.length} total lessons:`);

    // Group by language
    const lessonsByLanguage = {};
    allLessons.forEach((lesson) => {
      if (!lessonsByLanguage[lesson.language.slug]) {
        lessonsByLanguage[lesson.language.slug] = [];
      }
      lessonsByLanguage[lesson.language.slug].push(lesson);
    });

    for (const [language, lessons] of Object.entries(lessonsByLanguage)) {
      console.log(
        `\n🌐 ${language.toUpperCase()} (${lessons.length} lessons):`
      );

      lessons.forEach((lesson, index) => {
        const hasHints = !!lesson.hints;
        const hasSolution = !!lesson.solution;
        const hasTestCases = !!lesson.testCases;

        console.log(`   ${index + 1}. ${lesson.title}`);
        console.log(`      Hints: ${hasHints ? "✅" : "❌"}`);
        console.log(`      Solution: ${hasSolution ? "✅" : "❌"}`);
        console.log(`      Test Cases: ${hasTestCases ? "✅" : "❌"}`);
      });
    }

    // Summary
    const lessonsWithHints = allLessons.filter((l) => !!l.hints).length;
    const lessonsWithSolutions = allLessons.filter((l) => !!l.solution).length;
    const lessonsWithTestCases = allLessons.filter((l) => !!l.testCases).length;

    console.log(`\n📊 Summary:`);
    console.log(
      `   Lessons with hints: ${lessonsWithHints}/${allLessons.length}`
    );
    console.log(
      `   Lessons with solutions: ${lessonsWithSolutions}/${allLessons.length}`
    );
    console.log(
      `   Lessons with test cases: ${lessonsWithTestCases}/${allLessons.length}`
    );
  } catch (error) {
    console.error("❌ Error checking lessons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkAllLessons();
