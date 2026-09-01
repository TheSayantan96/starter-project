import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "./button"
import { Toaster, toast } from "./toast"

const meta = {
  component: Toaster,
  tags: ["ai-generated"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({
            title: "Event created",
            description: "Monday, January 1st at 6:00pm",
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(body.getByText("Event created")).toBeVisible()
    await expect(
      body.getByText("Monday, January 1st at 6:00pm")
    ).toBeVisible()
  },
}

export const Success: Story = {
  render: () => (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({
            title: "Changes saved",
            description: "Your profile has been updated.",
            type: "success",
          })
        }
      >
        Show success toast
      </Button>
    </Toaster>
  ),
}

export const Error: Story = {
  render: () => (
    <Toaster>
      <Button
        variant="destructive"
        onClick={() =>
          toast.add({
            title: "Something went wrong",
            description: "Please try again.",
            type: "error",
          })
        }
      >
        Show error toast
      </Button>
    </Toaster>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Toaster>
      <Button
        onClick={() =>
          toast.add({
            title: "Message deleted",
            description: "The message has been removed.",
            actionProps: {
              children: "Undo",
              onClick: () => {},
            },
          })
        }
      >
        Show toast with action
      </Button>
    </Toaster>
  ),
}
