import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Kbd, KbdGroup } from "./kbd"

const meta = {
  component: Kbd,
  tags: ["ai-generated"],
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "⌘" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("⌘")).toBeVisible()
  },
}

export const Letter: Story = { args: { children: "K" } }

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const ShortcutCombo: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>P</Kbd>
    </KbdGroup>
  ),
}
