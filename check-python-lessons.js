const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkPythonLessons() {
  try {
    const python = await prisma.language.findUnique({
      where: { slug: "python" },
      include: {
        lessons: {
          orderBy: { number: "asc" },
        },
      },
    });

    if (!python) {
      console.error("Python language not found");
      return;
    }

    console.log(`🐍 Python Lessons (${python.lessons.length} total):\n`);

    python.lessons.forEach((lesson) => {
      console.log(`📚 Lesson ${lesson.number}: ${lesson.title}`);
      console.log(`   Difficulty: ${lesson.difficulty}`);
      console.log(`   Time: ${lesson.estimatedTime} minutes`);
      console.log(`   Content preview: ${lesson.content.substring(0, 100)}...`);
      console.log(`   Exercise: ${lesson.exercise.substring(0, 80)}...`);
      console.log("");
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Total lessons: ${python.lessons.length}`);
    console.log(
      `   Beginner: ${
        python.lessons.filter((l) => l.difficulty === "beginner").length
      }`
    );
    console.log(
      `   Intermediate: ${
        python.lessons.filter((l) => l.difficulty === "intermediate").length
      }`
    );
    console.log(
      `   Advanced: ${
        python.lessons.filter((l) => l.difficulty === "advanced").length
      }`
    );
  } catch (error) {
    console.error("Error checking Python lessons:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPythonLessons();
