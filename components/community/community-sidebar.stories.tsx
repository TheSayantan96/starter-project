import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { CommunitySidebar } from "./community-sidebar"

const groups = [
  { label: "Get Started", channels: [] },
  { label: "General", channels: [] },
  { label: "Announcements", channels: [] },
]

const meta = {
  component: CommunitySidebar,
  tags: ["ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    groups,
  },
} satisfies Meta<typeof CommunitySidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByText("No channels yet")).toHaveLength(3)
    await expect(
      canvas.getByRole("button", { name: "Create" })
    ).toBeVisible()
  },
}

export const WithChannels: Story = {
  args: {
    groups: [
      {
        label: "Get Started",
        channels: [{ label: "# welcome" }, { label: "# introductions" }],
      },
      { label: "General", channels: [] },
    ],
  },
}

export const CollapseGroup: Story = {
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: /Get Started/ })
    await expect(canvas.getAllByText("No channels yet")[0]).toBeVisible()
    await userEvent.click(trigger)
    await expect(canvas.queryAllByText("No channels yet")).toHaveLength(2)
  },
}
