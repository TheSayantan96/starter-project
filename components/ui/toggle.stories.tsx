import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"
import { BoldIcon } from "lucide-react"

import { Toggle } from "./toggle"

const meta = {
  component: Toggle,
  tags: ["ai-generated"],
  args: {
    children: "Bold",
    "aria-label": "Toggle bold",
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle bold" })
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

export const WithIcon: Story = {
  args: {
    children: <BoldIcon data-icon="inline-start" />,
  },
}

export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
