import * as React from "react"

import { cn } from "@/lib/utils"

// A titled, card-shaped section used throughout the Settings pages --
// heading + optional status badge, a description, an optional meta caption
// (e.g. "Last changed on ..."), arbitrary body content, and a trailing row
// of action buttons.
function SettingsSection({
  title,
  badge,
  description,
  meta,
  actions,
  children,
  className,
}: {
  title: string
  badge?: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-tm-lg border border-border bg-card p-6",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {meta && (
            <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
          )}
        </div>
        {badge}
      </div>
      {children}
      {actions && (
        <div className="mt-4 flex items-center justify-end gap-2">
          {actions}
        </div>
      )}
    </div>
  )
}

export { SettingsSection }
