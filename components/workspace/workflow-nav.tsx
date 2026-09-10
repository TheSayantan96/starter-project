"use client"

import { CheckCircle2Icon, CircleAlertIcon, CircleIcon, ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The real production status model: a section starts "not-started", becomes
 * "in-progress" once opened, "incomplete" if a required field is still
 * missing, and "completed" once everything required is present.
 */
export type WorkflowStepStatus = "not-started" | "in-progress" | "incomplete" | "completed"

export interface WorkflowStep {
  id: string
  label: string
  status: WorkflowStepStatus
}

const STATUS_META: Record<
  WorkflowStepStatus,
  { text: string; icon: typeof CircleIcon; className: string }
> = {
  completed: { text: "Completed", icon: CheckCircle2Icon, className: "text-success" },
  incomplete: { text: "Incomplete", icon: CircleAlertIcon, className: "text-warning" },
  "in-progress": { text: "In progress", icon: ClockIcon, className: "text-muted-foreground" },
  "not-started": { text: "Not started", icon: CircleIcon, className: "text-muted-foreground" },
}

/**
 * Direct, non-linear section navigation — not a forced stepper. Any section
 * is reachable at any time; status is secondary to the label.
 */
export function WorkflowNav({
  steps,
  activeId,
  onSelect,
}: {
  steps: WorkflowStep[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex w-full gap-1 rounded-tm-md border border-border bg-surface-sunken p-1">
      {steps.map((step) => {
        const active = step.id === activeId
        const meta = STATUS_META[step.status]
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onSelect(step.id)}
            className={cn(
              "flex flex-1 flex-col items-start gap-0.5 rounded-tm-sm px-4 py-2.5 text-left transition-colors",
              active ? "bg-card shadow-tm-1" : "hover:bg-card/60"
            )}
          >
            <span className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>
              {step.label}
            </span>
            <span className={cn("flex items-center gap-1 text-xs", meta.className)}>
              <meta.icon className="size-3" /> {meta.text}
            </span>
          </button>
        )
      })}
    </div>
  )
}
