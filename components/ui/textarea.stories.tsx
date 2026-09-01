import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Textarea } from "./textarea"

const meta = {
  component: Textarea,
  tags: ["ai-generated"],
  args: {
    placeholder: "Type your message here.",
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: "This is some pre-filled text in the textarea.",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "This textarea is disabled.",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "This value failed validation.",
  },
}
