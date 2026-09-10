import { CopyIcon, MoreVerticalIcon, VideoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function WorkshopRowCard({
  title,
  subtitle = "—",
  meetingType,
  registrationUrl,
  canStartHost = false,
  onStartHost,
  onCopyLink,
  onDelete,
  className,
}: {
  title: string
  subtitle?: string
  meetingType: string
  registrationUrl: string
  canStartHost?: boolean
  onStartHost?: () => void
  onCopyLink?: () => void
  onDelete?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-tm-lg border border-border bg-card p-4",
        className
      )}
    >
      <div className="flex size-18 shrink-0 items-center justify-center rounded-tm-md bg-muted text-muted-foreground">
        <VideoIcon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{meetingType}</p>
        <button
          type="button"
          onClick={onCopyLink}
          className="mt-0.5 flex items-center gap-1.5 text-sm text-action-primary-text hover:underline"
        >
          <span className="truncate">{registrationUrl}</span>
          <CopyIcon className="size-3.5 shrink-0" />
        </button>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="sm" disabled={!canStartHost} onClick={onStartHost}>
          Start as host
        </Button>
        <Button variant="outline" size="sm" onClick={onCopyLink}>
          <CopyIcon data-icon="inline-start" />
          Copy registration link
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="neutral-ghost"
                size="icon-sm"
                aria-label="More options"
              />
            }
          >
            <MoreVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export { WorkshopRowCard }
