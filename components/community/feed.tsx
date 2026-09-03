import { HeartIcon, MessageCircleIcon, Repeat2Icon, SendIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Post = {
  author: string
  timeAgo: string
  content: string
  image?: boolean
  likes: number
  comments: number
  reposts: number
}

const posts: Post[] = [
  {
    author: "ravindra.c",
    timeAgo: "2h",
    content:
      "This week's prompt: paint something you can hear. Post your work below before Friday's critique.",
    likes: 32,
    comments: 9,
    reposts: 3,
  },
  {
    author: "gia.malhotra",
    timeAgo: "5h",
    content:
      "Finished my landscape study — still figuring out how to keep the sky from looking flat. Any tips?",
    image: true,
    likes: 24,
    comments: 6,
    reposts: 1,
  },
  {
    author: "imran.m",
    timeAgo: "1d",
    content:
      "Recorded a short breakdown of my shading process from last week's session, linking it in the resources tab too.",
    likes: 41,
    comments: 12,
    reposts: 5,
  },
]

export function Feed() {
  return (
    <div>
      {posts.map((post, index) => (
        <article key={post.author + post.timeAgo}>
          <div className="flex gap-3 py-4">
            <Avatar size="sm" className="mt-0.5">
              <AvatarFallback>
                {post.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-medium">{post.author}</span>
                <span className="text-sm text-muted-foreground">
                  {post.timeAgo}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{post.content}</p>
              {post.image ? (
                <div className="aspect-video rounded-2xl bg-muted" />
              ) : null}
              <div className="flex items-center gap-5 pt-1 text-muted-foreground">
                <button className="flex items-center gap-1.5 text-sm hover:text-foreground">
                  <HeartIcon className="size-[18px]" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-foreground">
                  <MessageCircleIcon className="size-[18px]" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-sm hover:text-foreground">
                  <Repeat2Icon className="size-[18px]" />
                  {post.reposts}
                </button>
                <button
                  aria-label="Share post"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <SendIcon className="size-[18px]" />
                </button>
              </div>
            </div>
          </div>
          {index < posts.length - 1 ? <Separator /> : null}
        </article>
      ))}
    </div>
  )
}
