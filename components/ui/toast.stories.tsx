import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "./button"
import { Toaster, toast } from "./toast"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Toaster,
  tags: ["ai-generated"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: knownActionContrastException,
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
  parameters: knownActionContrastException,
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
  parameters: knownActionContrastException,
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
