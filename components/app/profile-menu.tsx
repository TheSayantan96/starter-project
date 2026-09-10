"use client"

import {
  BarChart3Icon,
  ChevronRightIcon,
  FileTextIcon,
  InfoIcon,
  KeyIcon,
  LogOutIcon,
  MoonIcon,
  MonitorIcon,
  SettingsIcon,
  SparkleIcon,
  SunIcon,
  WalletIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const accountLinks = [
  { label: "Personal Information", icon: FileTextIcon },
  { label: "Social Accounts", icon: BarChart3Icon },
  { label: "Payment Details", icon: WalletIcon },
  { label: "Update Number/Email", icon: KeyIcon },
  { label: "Settings", icon: SettingsIcon },
]

export function ProfileMenu({
  name = "Workspace Owner",
  email = "you@tagmango.com",
  initials = "WO",
  credits = 997.62,
  defaultOpen,
}: {
  name?: string
  email?: string
  initials?: string
  credits?: number
  defaultOpen?: boolean
}) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger
        aria-label="Open account menu"
        className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 gap-3 p-0 py-3"
      >
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-1 text-left hover:bg-muted"
        >
          <Avatar size="lg">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
          <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>

        <Separator />

        <div className="flex flex-col gap-2 px-4">
          <span className="text-xs text-muted-foreground">Appearance</span>
          <ToggleGroup
            variant="outline"
            spacing={0}
            defaultValue={["light"]}
            className="w-full"
          >
            <ToggleGroupItem value="system" className="flex-1 gap-1.5">
              <MonitorIcon />
              System
            </ToggleGroupItem>
            <ToggleGroupItem value="light" className="flex-1 gap-1.5">
              <SunIcon />
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" className="flex-1 gap-1.5">
              <MoonIcon />
              Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mx-4 flex flex-col gap-2 rounded-tm-lg bg-muted p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1.5 text-foreground">
              Available AI Credits
              <InfoIcon className="size-3.5 text-muted-foreground" />
            </span>
            <span className="inline-flex items-center gap-1 font-semibold">
              <SparkleIcon className="size-4" />
              {credits.toLocaleString()}
            </span>
          </div>
          <Button variant="neutral-solid" size="sm">
            <SparkleIcon data-icon="inline-start" />
            Buy More
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col px-1">
          {accountLinks.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex items-center gap-3 rounded-tm-md px-3 py-2 text-left text-sm hover:bg-muted"
            >
              <Icon className="size-4 text-muted-foreground" />
              {label}
            </button>
          ))}
        </div>

        <Separator />

        <div className="px-1">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-tm-md px-3 py-2 text-left text-sm text-destructive-text hover:bg-destructive-bg"
          >
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
