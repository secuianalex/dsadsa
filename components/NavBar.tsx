// components/NavBar.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import ThemeToggle from "@/components/ThemeToggle"
import UserMenu from "@/components/UserMenu"

export default function NavBar() {
  const LINKS = [
    { href: "/languages", label: "Languages" },
    { href: "/paths", label: "Learning Paths" },
  ]

  return (
    <nav className="border-b backdrop-blur sticky top-0 z-50" style={{
      borderColor: 'var(--card-border)',
      backgroundColor: 'var(--card-bg)'
    }}>
                      <div className="mx-auto flex items-center justify-between w-full max-w-[72rem] px-4 md:px-6 lg:px-8 h-14">
                  {/* Logo + Brand */}
                  <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                    <Image src="/logo-mark.svg" alt="LearnMe" width={28} height={28} />
                    <span className="hidden sm:inline">LearnMe</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-blue-400 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

                          {/* Right side */}
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <UserMenu />
                  </div>
      </div>
    </nav>
  )
}
