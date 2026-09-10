"use client"

import {
  ChevronDownIcon,
  EyeIcon,
  MessageSquareIcon,
  PlusIcon,
  RssIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type ChannelGroup = {
  label: string
  channels: { label: string }[]
}

const navItems = [
  { label: "Feed", icon: RssIcon },
  { label: "Messages", icon: MessageSquareIcon },
  { label: "Service Requests", icon: UserRoundIcon },
]

function CommunitySidebar({
  title = "Community",
  activeItem = "Feed",
  groups,
  onCreate,
  onAddChannel,
  className,
}: {
  title?: string
  activeItem?: string
  groups: ChannelGroup[]
  onCreate?: () => void
  onAddChannel?: (groupLabel: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex w-64 shrink-0 flex-col gap-1 border-r border-border p-4",
        className
      )}
    >
      <h2 className="mb-3 font-semibold">{title}</h2>

      <Button variant="neutral-solid" onClick={onCreate} className="mb-2 w-full">
        <PlusIcon data-icon="inline-start" />
        Create
      </Button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-tm-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
      >
        <EyeIcon className="size-4" />
        From the TagMango Team
      </button>

      {navItems.map((item) => (
        <button
          key={item.label}
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-tm-md px-3 py-2 text-left text-sm hover:bg-muted",
            item.label === activeItem &&
              "bg-selected-surface text-selected-foreground hover:bg-selected-surface"
          )}
        >
          <item.icon className="size-4" />
          {item.label}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onAddChannel?.("")}
        className="flex items-center gap-2 rounded-tm-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
      >
        <PlusIcon className="size-4" />
        Add channel group
      </button>

      <div className="mt-2 flex flex-col gap-1">
        {groups.map((group) => (
          <Collapsible
            key={group.label}
            defaultOpen
            className="group/channel-group"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-tm-md px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase hover:bg-muted">
              {group.label}
              <ChevronDownIcon className="size-3.5 transition-transform group-data-open/channel-group:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-3 py-1">
                {group.channels.length === 0 ? (
                  <>
                    <p className="text-xs text-muted-foreground">
                      No channels yet
                    </p>
                    <button
                      type="button"
                      onClick={() => onAddChannel?.(group.label)}
                      className="mt-1 flex items-center gap-1 text-xs text-action-primary-text hover:underline"
                    >
                      <PlusIcon className="size-3" />
                      Add a channel
                    </button>
                  </>
                ) : (
                  group.channels.map((channel) => (
                    <p key={channel.label} className="py-1 text-sm">
                      {channel.label}
                    </p>
                  ))
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

export { CommunitySidebar }
