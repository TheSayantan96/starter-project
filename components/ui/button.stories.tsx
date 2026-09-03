import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Button } from "./button"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Button" })).toBeVisible()
  },
}

export const Outline: Story = { args: { variant: "outline" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Link: Story = { args: { variant: "link" } }

export const Small: Story = {
  args: { size: "sm" },
  parameters: knownActionContrastException,
}
export const Large: Story = {
  args: { size: "lg" },
  parameters: knownActionContrastException,
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Button" })).toBeDisabled()
  },
}

// Button uses `rounded-tm-full` -> --radius-tm-full: 9999px (TagMango's
// canonical pill radius). Fails if Tailwind / the TagMango theme tokens
// did not load.
export const CssCheck: Story = {
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(getComputedStyle(button).borderRadius).toBe("9999px")
  },
}
