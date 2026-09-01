import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Label } from "./label"

const meta = {
  component: Label,
  tags: ["ai-generated"],
  args: {
    children: "Email address",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Email address")).toBeVisible()
  },
}

export const WithHtmlFor: Story = {
  args: {
    htmlFor: "email",
    children: "Email",
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} />
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="h-9 rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="group flex items-center gap-2" data-disabled="true">
      <input id="disabled-field" type="checkbox" disabled className="peer" />
      <Label {...args} htmlFor="disabled-field" />
    </div>
  ),
}
