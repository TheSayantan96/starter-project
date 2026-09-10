import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

function ChallengeCard({
  title,
  thumbnailUrl,
  participantsCount = 0,
  participantAvatarUrl,
  endsOn,
  className,
}: {
  title: string
  thumbnailUrl?: string
  participantsCount?: number
  participantAvatarUrl?: string
  endsOn?: string
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
        className="aspect-video w-full bg-muted bg-cover bg-center"
        style={
          thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined
        }
      />
      <div className="p-3">
        <p className="text-sm font-semibold">{title}</p>
        <div className="mt-3 flex items-end justify-between text-xs text-muted-foreground">
          <div>
            <p>Participants</p>
            <Avatar size="sm" className="mt-1">
              {participantAvatarUrl && (
                <AvatarImage src={participantAvatarUrl} alt="" />
              )}
              <AvatarFallback>{participantsCount}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-right">
            <p>Ends on</p>
            <p className="mt-1 font-medium text-foreground">
              {endsOn ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ChallengeCard }
