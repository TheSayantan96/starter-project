"use client"

import {
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PinIcon,
  Repeat2Icon,
  SendIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function PostCard({
  author,
  authorInitials,
  authorAvatarUrl,
  role,
  pinned = false,
  timeAgo,
  tagCount,
  content,
  imageUrl,
  likes,
  comments,
  views,
  liked = false,
  onLike,
  onComment,
  onShare,
  onRepost,
  onDelete,
  className,
}: {
  author: string
  authorInitials?: string
  authorAvatarUrl?: string
  role?: string
  pinned?: boolean
  timeAgo: string
  tagCount?: number
  content: string
  imageUrl?: string
  likes: number
  comments: number
  views?: number
  liked?: boolean
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onRepost?: () => void
  onDelete?: () => void
  className?: string
}) {
  return (
    <article className={cn("py-4", className)}>
      {pinned && (
        <p className="mb-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <PinIcon className="size-3" />
          Pinned
        </p>
      )}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Avatar size="sm" className="mt-0.5">
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} alt="" />}
            <AvatarFallback>
              {authorInitials ?? author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{author}</span>
              {role && <Badge variant="secondary">{role}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {timeAgo}
              {tagCount ? ` · +${tagCount}` : ""}
            </p>
          </div>
        </div>
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
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mt-3 text-sm leading-relaxed">{content}</p>

      {imageUrl && (
        <div
          className="mt-3 aspect-video rounded-tm-lg bg-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      <div className="mt-3 flex items-center gap-5 text-muted-foreground">
        <button
          type="button"
          onClick={onLike}
          className={cn(
            "flex items-center gap-1.5 text-sm hover:text-foreground",
            liked && "text-destructive-text"
          )}
        >
          <HeartIcon className={cn("size-[18px]", liked && "fill-current")} />
          {likes}
        </button>
        <button
          type="button"
          onClick={onComment}
          className="flex items-center gap-1.5 text-sm hover:text-foreground"
        >
          <MessageCircleIcon className="size-[18px]" />
          {comments}
        </button>
        {views !== undefined && (
          <span className="flex items-center gap-1.5 text-sm">
            <EyeIcon className="size-[18px]" />
            {views}
          </span>
        )}
        <div className="ml-auto flex items-center gap-1">
          <Button variant="neutral-ghost" size="sm" onClick={onShare}>
            <SendIcon data-icon="inline-start" />
            Share
          </Button>
          <Button variant="neutral-ghost" size="sm" onClick={onRepost}>
            <Repeat2Icon data-icon="inline-start" />
            Repost
          </Button>
        </div>
      </div>
    </article>
  )
}

export { PostCard }
