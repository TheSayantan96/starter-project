import { CommunityHeader } from "@/components/community/community-header"
import { CommunityRail } from "@/components/community/community-rail"
import { Composer } from "@/components/community/composer"
import { Feed } from "@/components/community/feed"

export default function CommunityPage() {
  return (
    <div className="flex min-h-svh bg-background">
      <CommunityRail />

      <main className="mx-auto w-full max-w-xl px-4">
        <CommunityHeader />
        <Composer />
        <Feed />
      </main>
    </div>
  )
}
