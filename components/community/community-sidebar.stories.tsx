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
    const [firstPanelText] = canvas.getAllByText("No channels yet")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(firstPanelText).toBeVisible()
    await userEvent.click(trigger)
    // The Collapsible animates height to 0 rather than unmounting its
    // panel, so the text stays in the DOM -- assert on visibility, not
    // presence/count.
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await expect(firstPanelText).not.toBeVisible()
  },
}
