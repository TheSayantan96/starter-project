import { FilmIcon, PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function WalkthroughBanner({
  title,
  onWatch,
}: {
  title: string
  onWatch?: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-tm-lg border border-border bg-muted px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-tm-md bg-background text-muted-foreground">
          <FilmIcon className="size-4" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Video walkthrough</p>
          <p className="text-sm font-semibold">{title}</p>
        </div>
      </div>
      <Button variant="neutral-solid" size="sm" onClick={onWatch}>
        <PlayIcon data-icon="inline-start" />
        Watch
      </Button>
    </div>
  )
}
