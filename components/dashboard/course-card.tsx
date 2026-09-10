import { MoreVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Token-driven placeholder gradients -- stand in for a real thumbnail image
// when a course has none, cycling through the foundation scales instead of
// hardcoded hex so a brand palette change propagates here too.
const thumbnailTones = {
  orange: "from-[var(--tm-orange-5)] to-[var(--tm-orange-9)]",
  iris: "from-[var(--tm-iris-5)] to-[var(--tm-iris-9)]",
  grass: "from-[var(--tm-grass-5)] to-[var(--tm-grass-9)]",
  blue: "from-[var(--tm-blue-5)] to-[var(--tm-blue-9)]",
} as const

function CourseCard({
  title,
  author,
  sections,
  lectures,
  status,
  tone = "orange",
  thumbnailUrl,
  onEdit,
  onDelete,
  className,
}: {
  title: string
  author: string
  sections: number
  lectures: number
  status?: "draft" | "published"
  tone?: keyof typeof thumbnailTones
  thumbnailUrl?: string
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-tm-lg border border-border bg-card",
        className
      )}
    >
      <div
        className={cn(
          "aspect-video w-full bg-cover bg-center",
          !thumbnailUrl && "bg-gradient-to-br",
          !thumbnailUrl && thumbnailTones[tone]
        )}
        style={
          thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined
        }
      />
      <div className="p-4">
        <h4 className="line-clamp-2 text-sm font-semibold">{title}</h4>
        {status && (
          <Badge variant="secondary" className="mt-2">
            {status === "draft" ? "DRAFT" : "PUBLISHED"}
          </Badge>
        )}
        <p className="mt-2 text-sm text-muted-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">
          {sections} section{sections === 1 ? "" : "s"} • {lectures} lecture
          {lectures === 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex items-center gap-2 border-t border-border p-3">
        <Button
          variant="neutral-surface"
          size="sm"
          className="flex-1"
          onClick={onEdit}
        >
          Edit Course
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
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

export { CourseCard }
