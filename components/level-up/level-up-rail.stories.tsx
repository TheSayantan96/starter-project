import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { LevelUpRail } from "./level-up-rail"

const meta = {
  component: LevelUpRail,
  tags: ["ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LevelUpRail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Analytics" })
    ).toBeVisible()
  },
}

export const AnalyticsActive: Story = {
  args: { activeLabel: "Analytics" },
}
