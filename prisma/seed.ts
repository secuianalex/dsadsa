import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const langs = [
  // Core Web Technologies
  "HTML", "CSS", "JavaScript", "TypeScript",
  
  // Popular Programming Languages
  "Python", "Java", "C#", "C", "C++", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Dart",
  
  // Functional & Modern Languages
  "Scala", "Haskell", "Elixir", "Clojure", "F#", "OCaml", "Erlang",
  
  // Data & Analytics
  "R", "MATLAB", "Julia", "SAS", "Stata",
  
  // Database & Query Languages
  "SQL", "PL/SQL", "T-SQL", "MongoDB", "GraphQL",
  
  // Scripting & Automation
  "Bash", "PowerShell", "Perl", "Lua", "Groovy", "VBScript",
  
  // Mobile & Cross-platform
  "React Native", "Flutter", "Xamarin", "Ionic",
  
  // Web Frameworks & Libraries
  "React", "Vue.js", "Angular", "Node.js", "Express.js", "Django", "Flask", "Laravel", "Spring",
  
  // Cloud & DevOps
  "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "Git",
  
  // Game Development
  "Unity", "Unreal Engine", "Godot", "GameMaker",
  
  // AI & Machine Learning
  "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
  
  // Low-level & Embedded
  "Assembly", "VHDL", "Verilog", "Arduino", "Raspberry Pi",
  
  // Other Popular Technologies
  "Svelte", "Next.js", "Nuxt.js", "Gatsby", "Webpack", "Babel", "ESLint", "Prettier"
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
      slug: "web-development",
      title: "Web Development",
      description: "Build modern web applications with frontend and backend technologies.",
      slugs: ["html", "css", "javascript", "typescript", "php", "ruby", "python", "node-js", "express-js"],
    },
    {
      slug: "frontend-development",
      title: "Frontend Development",
      description: "Create interactive user interfaces and modern web experiences.",
      slugs: ["html", "css", "javascript", "typescript", "react", "vue-js", "angular", "svelte", "next-js", "nuxt-js", "gatsby"],
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      description: "Build robust server-side applications and APIs.",
      slugs: ["python", "java", "c-", "php", "ruby", "go", "rust", "node-js", "express-js", "django", "flask", "laravel", "spring"],
    },
    {
      slug: "data-science-analytics",
      title: "Data Science & Analytics",
      description: "Analyze data, build models, and create visualizations.",
      slugs: ["python", "r", "sql", "matlab", "julia", "sas", "stata", "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy"],
    },
    {
      slug: "systems-programming",
      title: "Systems Programming",
      description: "Low-level programming for performance-critical applications.",
      slugs: ["c", "c-", "rust", "go", "assembly"],
    },
    {
      slug: "mobile-development",
      title: "Mobile Development",
      description: "Create iOS and Android applications.",
      slugs: ["swift", "kotlin", "dart", "react-native", "flutter", "xamarin", "ionic"],
    },
    {
      slug: "functional-programming",
      title: "Functional Programming",
      description: "Learn functional programming paradigms and languages.",
      slugs: ["haskell", "elixir", "clojure", "scala", "f-", "ocaml", "erlang"],
    },
    {
      slug: "scripting-automation",
      title: "Scripting & Automation",
      description: "Automate tasks and build tools with scripting languages.",
      slugs: ["python", "bash", "powershell", "perl", "lua", "groovy", "vbscript"],
    },
    {
      slug: "enterprise-development",
      title: "Enterprise Development",
      description: "Build large-scale business applications and systems.",
      slugs: ["java", "c-", "scala", "sql", "pl-sql", "t-sql", "spring"],
    },
    {
      slug: "game-development",
      title: "Game Development",
      description: "Create games and interactive entertainment applications.",
      slugs: ["c-", "lua", "python", "javascript", "unity", "unreal-engine", "godot", "gamemaker"],
    },
    {
      slug: "cloud-devops",
      title: "Cloud & DevOps",
      description: "Deploy, manage, and scale applications in the cloud.",
      slugs: ["docker", "kubernetes", "terraform", "ansible", "jenkins", "git", "bash", "powershell"],
    },
    {
      slug: "ai-machine-learning",
      title: "AI & Machine Learning",
      description: "Build intelligent systems and machine learning models.",
      slugs: ["python", "r", "julia", "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "matlab"],
    },
    {
      slug: "embedded-systems",
      title: "Embedded Systems",
      description: "Program microcontrollers and embedded devices.",
      slugs: ["c", "c-", "assembly", "vhdl", "verilog", "arduino", "raspberry-pi"],
    },
    {
      slug: "full-stack-development",
      title: "Full Stack Development",
      description: "Master both frontend and backend development.",
      slugs: ["html", "css", "javascript", "typescript", "react", "node-js", "express-js", "python", "django", "sql", "mongodb"],
    },
    {
      slug: "modern-web-frameworks",
      title: "Modern Web Frameworks",
      description: "Build with the latest web frameworks and tools.",
      slugs: ["react", "vue-js", "angular", "svelte", "next-js", "nuxt-js", "gatsby", "webpack", "babel", "eslint", "prettier"],
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
