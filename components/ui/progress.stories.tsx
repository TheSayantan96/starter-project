import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Progress, ProgressLabel, ProgressValue } from "./progress"

const meta = {
  component: Progress,
  tags: ["ai-generated"],
  args: {
    value: 40,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("progressbar")).toBeVisible()
  },
}

export const WithLabel: Story = {
  args: { value: 65 },
  render: (args) => (
    <Progress {...args} className="w-64">
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

export const Empty: Story = { args: { value: 0 } }

export const Complete: Story = { args: { value: 100 } }

export const Indeterminate: Story = { args: { value: null } }
