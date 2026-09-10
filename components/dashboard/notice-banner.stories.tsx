import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { NoticeBanner } from "./notice-banner"

const meta = {
  component: NoticeBanner,
  tags: ["ai-generated"],
  args: {
    title: "Please note:",
    items: [
      "Analytics are available only for Zoom workshops conducted from 31st March 2026 onward.",
      'Chat interactions are included in engagement metrics only if "Enable automatic recording" was on when the workshop was created.',
    ],
  },
} satisfies Meta<typeof NoticeBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Dismiss: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Please note:")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }))
    await expect(canvas.queryByText("Please note:")).not.toBeInTheDocument()
  },
}
