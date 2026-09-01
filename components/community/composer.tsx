import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Composer() {
  return (
    <div>
      <div className="flex items-center gap-3 py-3">
        <Avatar size="sm">
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Post about Studio..."
          className="flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
        />
        <Button size="sm">Post</Button>
      </div>
      <Separator />
    </div>
  )
}
