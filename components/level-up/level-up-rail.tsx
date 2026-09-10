"use client"

import {
  CalendarIcon,
  ChartNoAxesColumnIcon,
  CircleHelpIcon,
  LayoutGridIcon,
  ListChecksIcon,
  PanelLeftIcon,
  SettingsIcon,
  TargetIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const railItems = [
  { icon: LayoutGridIcon, label: "Overview", active: true },
  { icon: ChartNoAxesColumnIcon, label: "Analytics" },
  { icon: ListChecksIcon, label: "Tasks" },
  { icon: TargetIcon, label: "Quizzes" },
  { icon: CalendarIcon, label: "Challenges" },
  { icon: UsersIcon, label: "Members" },
  { icon: CircleHelpIcon, label: "Help" },
  { icon: TrophyIcon, label: "Leaderboard" },
  { icon: SettingsIcon, label: "Settings" },
]

// Level Up's own icon-only sub-navigation -- a second, separately-iconed
// rail alongside the main AppSidebar (this mini-app is a standalone
// section within the dashboard, not a page under it).
function LevelUpRail({
  activeLabel = "Overview",
  onToggle,
  className,
}: {
  activeLabel?: string
  onToggle?: () => void
  className?: string
}) {
  return (
    <nav
      className={cn(
        "sticky top-0 flex h-svh w-16 shrink-0 flex-col items-center gap-1 border-r border-border py-4",
        className
      )}
    >
      <Button
        variant="neutral-ghost"
        size="icon"
        aria-label="Toggle panel"
        onClick={onToggle}
        className="mb-3"
      >
        <PanelLeftIcon />
      </Button>
      {railItems.map(({ icon: Icon, label }) => (
        <Button
          key={label}
          variant="neutral-ghost"
          size="icon"
          aria-label={label}
          className={cn(
            label === activeLabel &&
              "bg-selected-surface text-selected-foreground hover:bg-selected-surface [&_svg]:stroke-[2.25]"
          )}
        >
          <Icon />
        </Button>
      ))}
    </nav>
  )
}

export { LevelUpRail }
