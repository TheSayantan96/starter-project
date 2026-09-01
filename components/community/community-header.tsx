"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CommunityHeader({
  onTabChange,
}: {
  onTabChange?: (tab: string) => void
}) {
  const [following, setFollowing] = React.useState(true)

  return (
    <div className="space-y-4 pt-6 pb-2">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-xl font-medium">Studio</h1>
          <p className="text-sm text-muted-foreground">
            Community · 265 members · 42 online
          </p>
        </div>
        <Button
          variant={following ? "outline" : "default"}
          size="sm"
          onClick={() => setFollowing((value) => !value)}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </div>

      <Tabs defaultValue="top" onValueChange={onTabChange}>
        <TabsList variant="line" className="w-full justify-start">
          <TabsTrigger value="top">Top</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
