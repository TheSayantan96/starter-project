import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

const meta = {
  component: HoverCard,
  tags: ["ai-generated"],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="text-sm font-medium underline underline-offset-4">
        @shadcn
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="font-medium">shadcn</p>
        <p className="mt-1 text-muted-foreground">
          Building UI components you can copy and paste into your apps.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("@shadcn")).toBeVisible()
  },
}

export const Open: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger className="text-sm font-medium underline underline-offset-4">
        @shadcn
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="font-medium">shadcn</p>
        <p className="mt-1 text-muted-foreground">
          Building UI components you can copy and paste into your apps.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
}
