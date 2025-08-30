// components/UserMenu.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [open, setOpen] = React.useState(false)

  if (status === "loading") {
    return (
      <div className="px-3 py-1.5 rounded-md border text-sm opacity-70">
        Loading…
      </div>
    )
  }

  // Not signed in
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/signin"
          className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors"
        >
          Sign In
        </Link>
      </div>
    )
  }

  // Signed in
  const user = session.user

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>👤</span>
        <span>{user?.name || user?.email || "Profile"}</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-md border bg-white dark:bg-[#0f172a] text-sm shadow-lg z-50"
        >
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="font-medium text-gray-900 dark:text-white">My Account</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
          </div>
          
          <Link
            href="/dashboard"
            className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link
            href="/portfolio"
            className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <span>🎨</span>
            <span>Portfolio</span>
          </Link>
          
          <Link
            href="/resume"
            className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <span>📄</span>
            <span>Resume Generator</span>
          </Link>
          
          <Link
            href="/certificates"
            className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            <span>🏆</span>
            <span>Certificates</span>
          </Link>
          
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => { setOpen(false); signOut() }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              role="menuitem"
            >
              <span>🚪</span>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
