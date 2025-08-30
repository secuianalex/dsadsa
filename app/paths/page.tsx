"use client"

import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"
import Link from "next/link"

export default function PathsPage() {
  const { locale } = useLocale()
  
  const learningPaths = [
    {
      slug: "web-development",
      title: "Web Development",
      description: "Master modern web development from frontend to backend",
      technologies: "HTML • CSS • JavaScript • React • Node.js • TypeScript",
      difficulty: "Beginner to Advanced",
      duration: "6-12 months",
      icon: "🌐"
    },
    {
      slug: "frontend-development",
      title: "Frontend Development",
      description: "Master the art of creating beautiful, interactive user interfaces",
      technologies: "HTML • CSS • JavaScript • React • Vue.js • Angular • TypeScript",
      difficulty: "Beginner to Advanced",
      duration: "6-10 months",
      icon: "🎨"
    },
    {
      slug: "backend-development",
      title: "Backend Development",
      description: "Server-side programming and database management",
      technologies: "Python • Java • C# • Node.js • SQL • MongoDB",
      difficulty: "Intermediate to Advanced",
      duration: "6-10 months",
      icon: "⚙️"
    },
    {
      slug: "data-science-analytics",
      title: "Data Science & Analytics",
      description: "Machine learning, data analysis, and artificial intelligence",
      technologies: "Python • R • TensorFlow • PyTorch • Pandas • NumPy",
      difficulty: "Intermediate to Advanced",
      duration: "8-12 months",
      icon: "🤖"
    },
    {
      slug: "mobile-development",
      title: "Mobile Development",
      description: "Build native and cross-platform mobile applications",
      technologies: "React Native • Flutter • Swift • Kotlin • Ionic",
      difficulty: "Intermediate to Advanced",
      duration: "4-8 months",
      icon: "📱"
    },
    {
      slug: "game-development",
      title: "Game Development",
      description: "Create 2D and 3D games for multiple platforms",
      technologies: "Unity • Unreal • C# • C++ • JavaScript • Python",
      difficulty: "Beginner to Advanced",
      duration: "6-12 months",
      icon: "🎮"
    },
    {
      slug: "ai-machine-learning",
      title: "AI & Machine Learning",
      description: "Create intelligent systems and predictive models",
      technologies: "Python • TensorFlow • PyTorch • Scikit-learn • Pandas • NumPy",
      difficulty: "Intermediate to Advanced",
      duration: "8-12 months",
      icon: "🧠"
    },
    {
      slug: "devops-cloud",
      title: "DevOps & Cloud",
      description: "Infrastructure, deployment, and cloud computing",
      technologies: "Docker • Kubernetes • AWS • Azure • Linux • Ansible",
      difficulty: "Intermediate to Advanced",
      duration: "4-8 months",
      icon: "☁️"
    },
    {
      slug: "scripting-automation",
      title: "Scripting & Automation",
      description: "Automate tasks and build powerful tools",
      technologies: "Python • Bash • PowerShell • Perl • Lua • Groovy",
      difficulty: "Beginner to Advanced",
      duration: "3-6 months",
      icon: "🔧"
    },
    {
      slug: "systems-programming",
      title: "Systems Programming",
      description: "Low-level programming and operating system development",
      technologies: "C • C++ • Rust • Go • Assembly • VHDL • Verilog",
      difficulty: "Advanced",
      duration: "8-12 months",
      icon: "💻"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {t(locale, "paths.title")}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t(locale, "paths.subtitle")}
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path, index) => (
          <Link key={index} href={`/paths/${path.slug}`} className="card card-hover p-6 block">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{path.icon}</span>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                {path.title}
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              {path.description}
            </p>
            <div className="space-y-2">
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <strong>{t(locale, "paths.technologies")}</strong> {path.technologies}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <strong>{t(locale, "paths.difficulty")}</strong> {path.difficulty}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <strong>{t(locale, "paths.duration")}</strong> {path.duration}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
