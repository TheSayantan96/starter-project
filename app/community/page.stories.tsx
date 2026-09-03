import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import CommunityPage from "./page"

const meta = {
  title: "Pages/Community",
  component: CommunityPage,
  tags: ["ai-generated"],
} satisfies Meta<typeof CommunityPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Studio")).toBeVisible()
    await expect(
      canvas.getByPlaceholderText("Post about Studio...")
    ).toBeVisible()
    await expect(canvas.getByRole("tab", { name: "Top" })).toBeVisible()
  },
}
