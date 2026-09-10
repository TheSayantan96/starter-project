import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The two-region desktop layout behind a guided creation workspace:
 * a primary task area (~65-70%) and a sticky live-preview area (~30-35%),
 * centered within a sensible max-width. No nested scrolling — the primary
 * area scrolls with the page; the preview stays put via `sticky`.
 */
export function WorkspaceShell({
  header,
  nav,
  primary,
  preview,
  className,
}: {
  header: React.ReactNode
  nav: React.ReactNode
  primary: React.ReactNode
  preview: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto flex min-h-svh max-w-(--workspace-max) flex-col gap-7 px-4 py-8 sm:px-6 [--workspace-max:80rem]", className)}>
      {header}
      {nav}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">{primary}</div>
        <div className="hidden lg:block">
          <div className="sticky top-8">{preview}</div>
        </div>
        <div className="lg:hidden">{preview}</div>
      </div>
    </div>
  )
}
