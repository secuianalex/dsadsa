"use client"

import { useLocale } from "@/components/LocaleProvider"
import { t } from "@/lib/translations"

export default function PathsPage() {
  const { locale } = useLocale()
  
  const learningPaths = [
    {
      title: "Web Development",
      description: "Master modern web development from frontend to backend",
      technologies: "HTML • CSS • JavaScript • React • Node.js • TypeScript",
      difficulty: "Beginner to Advanced",
      duration: "6-12 months",
      icon: "🌐"
    },
    {
      title: "Mobile Development",
      description: "Build native and cross-platform mobile applications",
      technologies: "React Native • Flutter • Swift • Kotlin • Ionic",
      difficulty: "Intermediate to Advanced",
      duration: "4-8 months",
      icon: "📱"
    },
    {
      title: "Backend Development",
      description: "Server-side programming and database management",
      technologies: "Python • Java • C# • Node.js • SQL • MongoDB",
      difficulty: "Intermediate to Advanced",
      duration: "6-10 months",
      icon: "⚙️"
    },
    {
      title: "Data Science & AI",
      description: "Machine learning, data analysis, and artificial intelligence",
      technologies: "Python • R • TensorFlow • PyTorch • Pandas • NumPy",
      difficulty: "Intermediate to Advanced",
      duration: "8-12 months",
      icon: "🤖"
    },
    {
      title: "DevOps & Cloud",
      description: "Infrastructure, deployment, and cloud computing",
      technologies: "Docker • Kubernetes • AWS • Azure • Linux • Ansible",
      difficulty: "Intermediate to Advanced",
      duration: "4-8 months",
      icon: "☁️"
    },
    {
      title: "Game Development",
      description: "Create 2D and 3D games for multiple platforms",
      technologies: "Unity • Unreal • C# • C++ • JavaScript • Python",
      difficulty: "Beginner to Advanced",
      duration: "6-12 months",
      icon: "🎮"
    },
    {
      title: "Cybersecurity",
      description: "Network security, ethical hacking, and digital forensics",
      technologies: "Python • Linux • Networking • Cryptography • Wireshark",
      difficulty: "Intermediate to Advanced",
      duration: "6-10 months",
      icon: "🔒"
    },
    {
      title: "Blockchain Development",
      description: "Decentralized applications and smart contracts",
      technologies: "Solidity • Ethereum • Web3.js • Rust • Go",
      difficulty: "Advanced",
      duration: "4-8 months",
      icon: "⛓️"
    },
    {
      title: "UI/UX Design",
      description: "User interface design and user experience optimization",
      technologies: "Figma • Adobe XD • Sketch • HTML/CSS • JavaScript",
      difficulty: "Beginner to Advanced",
      duration: "4-8 months",
      icon: "🎨"
    },
    {
      title: "Full Stack Development",
      description: "Complete web application development from database to UI",
      technologies: "React • Node.js • MongoDB • Express • TypeScript",
      difficulty: "Intermediate to Advanced",
      duration: "8-12 months",
      icon: "🔄"
    },
    {
      title: "System Programming",
      description: "Low-level programming and operating system development",
      technologies: "C • C++ • Assembly • Rust • Go • Linux",
      difficulty: "Advanced",
      duration: "8-12 months",
      icon: "💻"
    },
    {
      title: "Database Administration",
      description: "Database design, optimization, and management",
      technologies: "SQL • MySQL • PostgreSQL • MongoDB • Redis • Oracle",
      difficulty: "Intermediate to Advanced",
      duration: "4-8 months",
      icon: "🗄️"
    },
    {
      title: "API Development",
      description: "RESTful APIs, GraphQL, and microservices architecture",
      technologies: "Node.js • Python • Java • GraphQL • Swagger • Docker",
      difficulty: "Intermediate to Advanced",
      duration: "4-6 months",
      icon: "🔌"
    },
    {
      title: "Testing & QA",
      description: "Software testing, automation, and quality assurance",
      technologies: "Selenium • Jest • Cypress • Python • Java • JavaScript",
      difficulty: "Beginner to Advanced",
      duration: "3-6 months",
      icon: "🧪"
    },
    {
      title: "Embedded Systems",
      description: "Programming for microcontrollers and IoT devices",
      technologies: "C • C++ • Arduino • Raspberry Pi • Python • Assembly",
      difficulty: "Intermediate to Advanced",
      duration: "6-10 months",
      icon: "🔧"
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
          <div key={index} className="card card-hover p-6">
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
          </div>
        ))}
      </div>
    </div>
  )
}
