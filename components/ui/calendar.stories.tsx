import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Calendar } from "./calendar"

const meta = {
  component: Calendar,
  tags: ["ai-generated"],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("grid")).toBeVisible()
  },
}

export const WithoutOutsideDays: Story = {
  args: {
    showOutsideDays: false,
  },
}

export const DropdownCaption: Story = {
  args: {
    captionLayout: "dropdown",
  },
}
