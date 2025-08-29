// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import NavBar from "@/components/NavBar"
import Providers from "@/components/Providers"
import ThemeScript from "@/components/ThemeScript"
// import { Inter } from "next/font/google"

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// })

export const metadata: Metadata = {
  title: "LearnMe",
  description: "Learn programming by doing. Levels, projects, trophies.",
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeScript />
        <Providers>
          <NavBar />
          <main className="mx-auto w-full max-w-[72rem] px-4 md:px-6 lg:px-8 py-8 space-y-10">
            {children}
          </main>
          <footer className="mt-10 border-t border-white/10">
            <div className="mx-auto w-full max-w-[72rem] px-4 md:px-6 lg:px-8 py-6 text-sm text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} LearnMe</span>
              <span>
                Built with Next.js & Prisma •{" "}
                <a className="underline" href="/languages">Browse courses</a>
              </span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
