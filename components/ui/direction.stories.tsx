import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { DirectionProvider, useDirection } from "./direction"

function DirectionLabel() {
  const direction = useDirection()
  return (
    <div dir={direction} className="rounded-md border p-4 text-sm">
      Current direction: <strong>{direction}</strong>
    </div>
  )
}

const meta = {
  component: DirectionProvider,
  tags: ["ai-generated"],
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

export const LeftToRight: Story = {
  render: () => (
    <DirectionProvider direction="ltr">
      <DirectionLabel />
    </DirectionProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("ltr")).toBeVisible()
  },
}

export const RightToLeft: Story = {
  render: () => (
    <DirectionProvider direction="rtl">
      <DirectionLabel />
    </DirectionProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("rtl")).toBeVisible()
  },
}
