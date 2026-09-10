import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { ProfileMenu } from "./profile-menu"

const meta = {
  component: ProfileMenu,
  tags: ["ai-generated"],
} satisfies Meta<typeof ProfileMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Open account menu" }))
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(body.getByText("Logout")).toBeVisible())
  },
}

export const Open: Story = {
  args: { defaultOpen: true },
}
