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
        className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {user?.name || user?.email || "Account"}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-md border bg-white dark:bg-[#0f172a] text-sm shadow-lg z-50"
        >
          <Link
            href="/dashboard"
            className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            Dashboard
          </Link>
          <button
            onClick={() => { setOpen(false); signOut() }}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
