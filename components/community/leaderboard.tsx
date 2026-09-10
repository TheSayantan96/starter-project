"use client"

import { CoinsIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type LeaderboardEntry = {
  rank: number
  name: string
  xp: number
  avatarUrl?: string
}

// Top-3 gradient treatment, reused wherever the "gamified" variant of the
// leaderboard is called for (e.g. Level Up). Token-driven -- gold/silver/
// bronze mapped onto the Amber/Sand/Orange foundation scales rather than
// hardcoded hex.
const rankTones: Record<number, string> = {
  1: "bg-gradient-to-r from-[var(--tm-amber-8)] to-[var(--tm-amber-10)]",
  2: "bg-gradient-to-r from-[var(--tm-sand-8)] to-[var(--tm-sand-10)]",
  3: "bg-gradient-to-r from-[var(--tm-orange-7)] to-[var(--tm-orange-9)]",
}

function Leaderboard({
  title = "Leaderboard",
  entries,
  variant = "plain",
  periods,
  period,
  onPeriodChange,
  className,
}: {
  title?: string
  entries: LeaderboardEntry[]
  variant?: "plain" | "gradient"
  periods?: string[]
  period?: string
  onPeriodChange?: (period: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-tm-lg border border-border bg-card p-4",
        className
      )}
    >
      <h3 className="font-semibold">{title}</h3>

      {periods && period && (
        <Tabs
          value={period}
          onValueChange={(value) => value && onPeriodChange?.(value)}
          className="mt-2"
        >
          <TabsList variant="line" className="w-full justify-start">
            {periods.map((option) => (
              <TabsTrigger key={option} value={option}>
                {option}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <ul className="mt-3 flex flex-col gap-1">
        {entries.map((entry) => {
          const tone = variant === "gradient" ? rankTones[entry.rank] : undefined
          return (
            <li
              key={entry.rank}
              className={cn(
                "flex items-center gap-3 rounded-tm-md px-2 py-2",
                tone
              )}
            >
              <span
                className={cn(
                  "w-5 text-center text-sm font-medium",
                  tone ? "text-white" : "text-muted-foreground"
                )}
              >
                {entry.rank}
              </span>
              <Avatar size="sm">
                {entry.avatarUrl && (
                  <AvatarImage src={entry.avatarUrl} alt="" />
                )}
                <AvatarFallback>
                  {entry.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "flex-1 truncate text-sm font-medium",
                  tone && "text-white"
                )}
              >
                {entry.name}
              </span>
              <Badge
                variant={tone ? "outline" : "secondary"}
                className={cn(tone && "border-white/40 bg-white/15 text-white")}
              >
                <CoinsIcon data-icon="inline-start" />
                {entry.xp.toLocaleString()} XP
              </Badge>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { Leaderboard }
