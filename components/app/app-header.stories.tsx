import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { AppHeader } from "./app-header"

const meta = {
  component: AppHeader,
  tags: ["ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Dashboard" })
    ).toBeVisible()
  },
}

export const CommunityActive: Story = {
  args: { activeLabel: "Community" },
}

export const NoNotifications: Story = {
  args: { notificationCount: 0 },
}
