"use client"

import { BellIcon, HouseIcon, SearchIcon, SquarePenIcon, UserIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const railItems = [
  { icon: HouseIcon, label: "For you", active: true },
  { icon: SquarePenIcon, label: "New post" },
  { icon: SearchIcon, label: "Search" },
  { icon: BellIcon, label: "Activity" },
  { icon: UserIcon, label: "Profile" },
]

export function CommunityRail() {
  return (
    <nav className="sticky top-0 flex h-svh w-16 shrink-0 flex-col items-center gap-1 border-r border-border py-4">
      <div className="mb-4 flex size-8 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
        S
      </div>
      {railItems.map(({ icon: Icon, label, active }) => (
        <Button
          key={label}
          variant={active ? "secondary" : "ghost"}
          size="icon"
          aria-label={label}
        >
          <Icon />
        </Button>
      ))}
      <div className="flex-1" />
      <Avatar size="sm">
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </nav>
  )
}
