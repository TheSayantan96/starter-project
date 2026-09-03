import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import Page from "./page"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  title: "Pages/Home",
  component: Page,
  tags: ["ai-generated"],
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Project ready!")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Button" })).toBeVisible()
  },
}
