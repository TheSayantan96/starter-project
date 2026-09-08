import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Text } from "./text"

const meta = {
  component: Text,
  tags: ["ai-generated"],
  args: {
    children: "The quick brown fox",
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const DisplayLg: Story = { args: { variant: "display-lg" } }
export const DisplaySm: Story = { args: { variant: "display-sm" } }
export const Heading1: Story = { args: { variant: "heading-1" } }
export const Heading2: Story = { args: { variant: "heading-2" } }
export const Heading3: Story = { args: { variant: "heading-3" } }
export const BodyLg: Story = { args: { variant: "body-lg" } }
export const Body: Story = { args: { variant: "body" } }
export const Caption: Story = { args: { variant: "caption" } }

// Every role stacked in document order -- the fastest way to eyeball the
// whole scale for rhythm/hierarchy in one screenshot.
export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Text variant="display-lg">Display LG</Text>
      <Text variant="display-sm">Display SM</Text>
      <Text variant="heading-1">Heading 1</Text>
      <Text variant="heading-2">Heading 2</Text>
      <Text variant="heading-3">Heading 3</Text>
      <Text variant="body-lg">Body LG — the quick brown fox jumps over the lazy dog.</Text>
      <Text variant="body">Body — the quick brown fox jumps over the lazy dog.</Text>
      <Text variant="caption" className="text-muted-foreground">
        Caption — the quick brown fox jumps over the lazy dog.
      </Text>
    </div>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByText("Display LG")
    await expect(getComputedStyle(heading).fontWeight).toBe("700")
  },
}

// CSS-regression guard, same pattern as button.stories.tsx's CssCheck --
// fails if the @theme typography tokens don't load.
export const CssCheck: Story = {
  args: { variant: "heading-1" },
  play: async ({ canvas }) => {
    const el = canvas.getByText("The quick brown fox")
    const cs = getComputedStyle(el)
    await expect(cs.fontSize).toBe("32px")
    await expect(cs.lineHeight).toBe("40px")
    await expect(cs.fontWeight).toBe("700")
  },
}
