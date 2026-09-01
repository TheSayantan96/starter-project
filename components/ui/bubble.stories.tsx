import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./bubble"

const meta = {
  component: Bubble,
  tags: ["ai-generated"],
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Bubble>
      <BubbleContent>Hey, how&apos;s it going?</BubbleContent>
    </Bubble>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hey, how's it going?")).toBeVisible()
  },
}

export const Align: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Bubble align="start">
        <BubbleContent>Hey, how&apos;s it going?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Pretty good, thanks for asking!</BubbleContent>
      </Bubble>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-2">
      <Bubble variant="default">
        <BubbleContent>Default</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>Secondary</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Muted</BubbleContent>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>Tinted</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>Outline</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>Ghost</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Destructive</BubbleContent>
      </Bubble>
    </div>
  ),
}

export const WithReactions: Story = {
  render: () => (
    <Bubble>
      <BubbleContent>That&apos;s awesome, congrats!</BubbleContent>
      <BubbleReactions>🎉 2</BubbleReactions>
    </Bubble>
  ),
}

export const Group: Story = {
  render: () => (
    <BubbleGroup>
      <Bubble>
        <BubbleContent>Hey!</BubbleContent>
      </Bubble>
      <Bubble>
        <BubbleContent>Are you free later today?</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}
