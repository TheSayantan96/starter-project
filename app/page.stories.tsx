import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import Page from "./page"

const meta = {
  title: "Pages/Home",
  component: Page,
  tags: ["ai-generated"],
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Project ready!")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Button" })).toBeVisible()
  },
}
