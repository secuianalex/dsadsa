import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const langs = [
  "Python", "JavaScript", "Java", "C#", "C", "C++", "Go", "Rust", "PHP", "TypeScript",
  "Kotlin", "Swift", "Ruby", "Dart", "Scala", "Haskell", "Elixir", "Clojure", "R",
  "MATLAB", "SQL", "Bash", "PowerShell", "Perl", "Lua"
]

async function main() {
  // --- Seed Languages, Levels, Courses, Exams, Freestyles ----------------
  for (const name of langs) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const lang = await prisma.language.upsert({
      where: { slug },
      update: { name: name },
      create: { slug, name: name },
    })

    // Levels 1..3
    for (let number = 1; number <= 3; number++) {
      let level = await prisma.level.findFirst({ where: { languageId: lang.id, number } })
      if (!level) level = await prisma.level.create({ data: { languageId: lang.id, number } })

      // Freestyle placeholder per level
      const freestyleExists = await prisma.freestyle.findUnique({ where: { levelId: level.id } })
      if (!freestyleExists) {
        await prisma.freestyle.create({
          data: {
            levelId: level.id,
            prompt: `[${name}] Level ${number} Freestyle: Combine everything learned to build a small project.`,
          },
        })
      }

      // Courses: add 1-2 beginner courses for level 1, 1 for others
      const coursesToAdd =
        number === 1
          ? [
              { title: "Basics & Variables", content: `Intro to ${name} syntax, variables, and types.` },
              { title: "Control Flow", content: `Conditions and loops in ${name}.` },
            ]
          : [
              {
                title: number === 2 ? "Functions & Modules" : "Data Structures",
                content: `Core concepts in ${name}.`,
              },
            ]

      for (const c of coursesToAdd) {
        let course = await prisma.course.findFirst({ where: { levelId: level.id, title: c.title } })
        if (!course) {
          course = await prisma.course.create({
            data: { levelId: level.id, title: c.title, content: c.content },
          })
        }

        // Ensure exam exists
        const ex = await prisma.exam.findUnique({ where: { courseId: course.id } })
        if (!ex) {
          await prisma.exam.create({
            data: {
              courseId: course.id,
              prompt: `[${name}] Exam for ${c.title}: Build a small app demonstrating these skills.`,
            },
          })
        }
      }
    }
  }

  console.log("Seed complete for", langs.length, "languages.")

  // --- Seed Learning Paths -----------------------------------------------

  // helper to connect languages by slug
  async function connectLangsBySlugs(slugs: string[]) {
    const langs = await prisma.language.findMany({
      where: { slug: { in: slugs } },
      select: { id: true, slug: true },
    })
    const foundSlugs = new Set(langs.map((l) => l.slug))
    const missing = slugs.filter((s) => !foundSlugs.has(s))
    if (missing.length) {
      console.warn("Seed warning: missing language slugs for path:", missing)
    }
    return langs.map((l) => ({ languageId: l.id }))
  }

  const pathsData = [
    {
      slug: "frontend",
      title: "Frontend Development",
      description: "Build modern web apps with JavaScript, TypeScript, and UI frameworks.",
      slugs: ["javascript", "typescript"], // add html/css later if you add them as languages
    },
    {
      slug: "data-science",
      title: "Data Science",
      description: "Analyze data, build models, and visualize insights.",
      slugs: ["python", "r", "sql"],
    },
    {
      slug: "systems",
      title: "Systems Programming",
      description: "Low-level, high-performance software and tooling.",
      // FIXED: use "c-" to match your slug generator result for C++/C#
      // If your "C++" ended up as "c-" (due to replacement), include that here.
      slugs: ["c", "c-", "rust", "go"],
    },
    {
      slug: "mobile",
      title: "Mobile Development",
      description: "Create iOS and Android apps with Swift, Kotlin, and Dart.",
      slugs: ["swift", "kotlin", "dart"],
    },
  ]

  for (const p of pathsData) {
    const connects = await connectLangsBySlugs(p.slugs)

    // upsert the path and its language links
    const path = await prisma.path.upsert({
      where: { slug: p.slug },
      create: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        languages: {
          create: connects, // create join rows
        },
      },
      update: {
        title: p.title,
        description: p.description,
        languages: {
          deleteMany: {}, // reset links then recreate
          create: connects,
        },
      },
    })

    console.log(`Seeded path: ${path.title}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
