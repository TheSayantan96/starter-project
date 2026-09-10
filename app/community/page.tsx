"use client"

import * as React from "react"

import { CommunityHeader } from "@/components/community/community-header"
import { CommunityRail } from "@/components/community/community-rail"
import { Composer } from "@/components/community/composer"
import { Feed, initialPosts, type Post } from "@/components/community/feed"

export default function CommunityPage() {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts)

  return (
    <div className="flex min-h-svh bg-background">
      <CommunityRail />

      <main className="mx-auto w-full max-w-xl px-4">
        <CommunityHeader />
        <Composer
          placeholder="Post about Studio..."
          onPost={(content) => {
            setPosts((current) => [
              {
                id: crypto.randomUUID(),
                author: "SC",
                timeAgo: "Just now",
                content,
                likes: 0,
                comments: 0,
                views: 0,
              },
              ...current,
            ])
          }}
        />
        <Feed posts={posts} />
      </main>
    </div>
  )
}
