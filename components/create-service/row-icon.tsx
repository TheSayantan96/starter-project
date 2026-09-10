import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type IconTone = "primary" | "info" | "success" | "warning" | "destructive" | "neutral"

const TONE_CLASSES: Record<IconTone, string> = {
  primary: "bg-action-primary-surface text-action-primary-text",
  info: "bg-info-bg text-info",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  destructive: "bg-destructive-bg text-destructive-text",
  neutral: "bg-surface-sunken text-muted-foreground",
}

/**
 * A small, tinted icon chip — the visual-pass answer to every row using the
 * same muted-gray glyph in an identical plain circle. Tone is drawn only
 * from tokens the design system already maps to Tailwind utilities
 * (action-primary/info/success/warning/destructive), never the raw
 * foundation scale directly.
 */
export function RowIcon({
  icon: Icon,
  tone = "neutral",
  className,
}: {
  icon: LucideIcon
  tone?: IconTone
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-tm-md",
        TONE_CLASSES[tone],
        className
      )}
    >
      <Icon className="size-4.5" />
    </div>
  )
}
