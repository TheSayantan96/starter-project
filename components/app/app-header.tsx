"use client"

import {
  BellIcon,
  LayoutGridIcon,
  MoonIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProfileMenu } from "@/components/app/profile-menu"

const primaryNav = [
  "Dashboard",
  "Community",
  "Workshops",
  "Courses",
  "Storefront",
  "Level Up",
]

export function AppHeader({
  activeLabel = "Dashboard",
  notificationCount = 3,
}: {
  activeLabel?: string
  notificationCount?: number
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4">
      <div className="flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-tm-md bg-foreground text-sm font-semibold text-background">
          A
        </div>
        <nav className="flex items-center gap-1">
          {primaryNav.map((label) => (
            <Button
              key={label}
              variant={label === activeLabel ? "neutral-solid" : "neutral-ghost"}
              size="sm"
            >
              {label}
            </Button>
          ))}
          <Button variant="neutral-ghost" size="icon-sm" aria-label="More">
            <LayoutGridIcon />
          </Button>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <SparklesIcon data-icon="inline-start" />
          Mango AI
        </Button>
        <Button variant="neutral-ghost" size="icon-sm" aria-label="Search">
          <SearchIcon />
        </Button>
        <Button
          variant="neutral-ghost"
          size="icon-sm"
          aria-label="Toggle dark mode"
        >
          <MoonIcon />
        </Button>
        <Button
          variant="neutral-ghost"
          size="icon-sm"
          aria-label="Notifications"
          className="relative"
        >
          <BellIcon />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive-solid text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          )}
        </Button>
        <ProfileMenu />
      </div>
    </header>
  )
}
