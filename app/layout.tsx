import { ReactNode } from 'react'
import NavBar from '@/components/NavBar'
import Providers from '@/components/Providers'
import ThemeScript from '@/components/ThemeScript'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeScript />
        <Providers>
          <NavBar />
          <main className="mx-auto w-full max-w-[72rem] px-4 md:px-6 lg:px-8 py-8 space-y-10">
            {children}
          </main>
          <footer className="mt-10 border-t" style={{
            borderColor: 'var(--card-border)'
          }}>
            <div className="mx-auto w-full max-w-[72rem] px-4 md:px-6 lg:px-8 py-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-2" style={{
              color: 'var(--text-muted)'
            }}>
              <span>© {new Date().getFullYear()} LearnMe</span>
              <span>
                Built with Next.js & Prisma •{" "}
                <a className="underline" href="/languages" style={{ color: 'var(--text-primary)' }}>Browse courses</a>
              </span>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
