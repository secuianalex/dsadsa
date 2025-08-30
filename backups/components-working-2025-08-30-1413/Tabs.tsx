"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Tabs({
  baseHref,
  items,
}: {
  baseHref: string
  items: Array<{ href: string; label: string }>
}) {
  const pathname = usePathname()
  return (
    <div className="flex gap-2 border-b">
      {items.map((i) => {
        const full = `${baseHref}${i.href}`
        const active = pathname === full
        return (
          <Link
            key={i.href}
            href={full}
            className={`px-3 py-2 text-sm rounded-t-md border-b-2 ${
              active
                ? "border-brand-600 text-brand-700 font-semibold"
                : "border-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i.label}
          </Link>
        )
      })}
    </div>
  )
}
