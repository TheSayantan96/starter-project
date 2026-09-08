import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { HouseIcon, SearchIcon, BellIcon, UserIcon } from "lucide-react"

import { Button } from "./button"
import { cn } from "@/lib/utils"

// Not a new component -- the exact selected/unselected pattern
// components/community/community-rail.tsx uses (neutral-ghost base +
// bg-selected-surface/text-selected-foreground override on the active
// item), demonstrated here in isolation since community-rail itself isn't
// a components/ui primitive with its own story.
const meta = {
  title: "Foundations/Navigation",
  tags: ["ai-generated"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { icon: HouseIcon, label: "For you", active: true },
  { icon: SearchIcon, label: "Search" },
  { icon: BellIcon, label: "Activity" },
  { icon: UserIcon, label: "Profile" },
]

export const SelectedVsUnselected: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-tm-lg border border-border bg-background p-3">
      {items.map(({ icon: Icon, label, active }) => (
        <Button
          key={label}
          variant="neutral-ghost"
          size="icon"
          aria-label={label}
          className={cn(
            active &&
              "bg-selected-surface text-selected-foreground hover:bg-selected-surface [&_svg]:stroke-[2.25]"
          )}
        >
          <Icon />
        </Button>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const active = canvas.getByRole("button", { name: "For you" })
    const inactive = canvas.getByRole("button", { name: "Search" })
    await expect(active.className).toContain("bg-selected-surface")
    await expect(inactive.className).not.toContain("bg-selected-surface")
  },
}
