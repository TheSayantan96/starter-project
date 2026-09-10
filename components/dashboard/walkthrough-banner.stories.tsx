import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { WalkthroughBanner } from "./walkthrough-banner"

const meta = {
  component: WalkthroughBanner,
  tags: ["ai-generated"],
  args: {
    title: "Hosting workshops",
  },
} satisfies Meta<typeof WalkthroughBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Watch" })
    ).toBeVisible()
  },
}
