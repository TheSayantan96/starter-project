import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { Input } from "./input"

const meta = {
  component: Input,
  tags: ["ai-generated"],
  args: {
    placeholder: "Email",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByPlaceholderText("Email")).toBeVisible()
  },
}

export const WithValue: Story = { args: { defaultValue: "hello@example.com" } }

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByPlaceholderText("Email")).toBeDisabled()
  },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

export const Typing: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("Email")
    await userEvent.type(input, "sayantan@tagmango.com")
    await expect(input).toHaveValue("sayantan@tagmango.com")
  },
}

export const FileInput: Story = {
  args: { type: "file", placeholder: undefined, "aria-label": "Upload file" },
}
