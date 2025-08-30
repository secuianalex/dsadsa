import * as React from "react"
export function Button({ children, className="" }: { children: React.ReactNode; className?: string }) {
  return <button className={`btn btn-primary ${className}`}>{children}</button>
}
