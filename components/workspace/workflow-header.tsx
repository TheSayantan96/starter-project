"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * Restrained workspace chrome, not a content card: close/exit + identity on
 * the left, a single primary action on the right. No Next/Back — direct
 * section navigation lives in WorkflowNav below this.
 */
export function WorkflowHeader({
  eyebrow,
  title,
  badge,
  primaryAction,
  onClose,
}: {
  eyebrow?: string
  title: string
  badge?: React.ReactNode
  primaryAction: React.ReactNode
  onClose?: () => void
}) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="neutral-ghost" size="icon" aria-label="Close" onClick={onClose}>
          <XIcon />
        </Button>
        <div>
          {eyebrow && <p className="text-xs text-muted-foreground">{eyebrow}</p>}
          <div className="flex items-center gap-2">
            <h1 className="text-heading-2">{title}</h1>
            {badge}
          </div>
        </div>
      </div>
      {primaryAction}
    </header>
  )
}
