import { Separator } from "@/components/ui/separator"
import { PostCard } from "@/components/community/post-card"

export type Post = {
  id: string
  author: string
  timeAgo: string
  content: string
  imageUrl?: string
  likes: number
  comments: number
  views?: number
}

export const initialPosts: Post[] = [
  {
    id: "1",
    author: "ravindra.c",
    timeAgo: "2h",
    content:
      "This week's prompt: paint something you can hear. Post your work below before Friday's critique.",
    likes: 32,
    comments: 9,
    views: 210,
  },
  {
    id: "2",
    author: "gia.malhotra",
    timeAgo: "5h",
    content:
      "Finished my landscape study — still figuring out how to keep the sky from looking flat. Any tips?",
    likes: 24,
    comments: 6,
    views: 88,
  },
  {
    id: "3",
    author: "imran.m",
    timeAgo: "1d",
    content:
      "Recorded a short breakdown of my shading process from last week's session, linking it in the resources tab too.",
    likes: 41,
    comments: 12,
    views: 340,
  },
]

export function Feed({ posts = initialPosts }: { posts?: Post[] }) {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard
            author={post.author}
            timeAgo={post.timeAgo}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            views={post.views}
          />
          {index < posts.length - 1 ? <Separator /> : null}
        </div>
      ))}
    </div>
  )
}
