import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test"

import { Composer } from "./composer"

const meta = {
  component: Composer,
  tags: ["ai-generated"],
} satisfies Meta<typeof Composer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Post" })).toBeDisabled()
    await expect(canvas.getByRole("button", { name: "Photo" })).toBeVisible()
  },
}

// The inline bar is a trigger, not a real text field -- tapping it opens
// the "Create new post" dialog, matching the production composer.
export const ClickOpensDialog: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() =>
      expect(body.getByText("Create new post")).toBeVisible()
    )
    await expect(
      body.getByPlaceholderText("What do you want to share about?")
    ).toBeVisible()
  },
}

export const TypingEnablesPublish: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    const textarea = await body.findByPlaceholderText(
      "What do you want to share about?"
    )
    await expect(body.getByRole("button", { name: "Publish" })).toBeDisabled()
    await userEvent.type(textarea, "Hello, community!")
    await expect(body.getByRole("button", { name: "Publish" })).toBeEnabled()
  },
}

// The "+" tag row opens a searchable, checkbox-driven tag picker -- matches
// production's "Add Tags" screen, including the free-text add-tag field.
export const TagsFlow: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(
      await body.findByText("Selected tags will show up here.")
    )
    await waitFor(() => expect(body.getByText("Add Tags")).toBeVisible())
    await userEvent.click(body.getByText("Finance & Banking"))
    await userEvent.click(body.getByRole("button", { name: "Save changes" }))
    await waitFor(() =>
      expect(body.getByText("1 tag selected")).toBeVisible()
    )
  },
}

// "+ service" / "+ exclude service" open the same picker, scoped by a
// different subheading ("Who can see" vs "who can't").
export const ServiceFlow: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByText("service"))
    await waitFor(() =>
      expect(body.getByText("Who can see your post?")).toBeVisible()
    )
    await userEvent.click(body.getByText("10 mins discovery call"))
    await userEvent.click(body.getByRole("button", { name: "Save changes" }))
    await waitFor(() =>
      expect(body.getByText("10 mins discovery call")).toBeVisible()
    )
  },
}

// The poll icon swaps the textarea for a question/options builder with a
// live preview, while keeping the compose dialog's other state intact.
export const PollFlow: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByLabelText("Add poll"))
    await waitFor(() => expect(body.getByText("Create poll")).toBeVisible())
    fireEvent.change(body.getByPlaceholderText("Ask something..."), {
      target: { value: "Favorite feature?" },
    })
    fireEvent.change(body.getByPlaceholderText("Option 1"), {
      target: { value: "Polls" },
    })
    fireEvent.change(body.getByPlaceholderText("Option 2"), {
      target: { value: "Scheduling" },
    })
    await waitFor(() => expect(body.getByText("Preview")).toBeVisible())
    await waitFor(() =>
      expect(body.getByRole("button", { name: "Publish" })).toBeEnabled()
    )
  },
}

// The clock icon opens a date/time picker for scheduling; "Done" returns to
// the main compose screen and swaps the submit button's label.
export const ScheduleFlow: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByLabelText("Schedule post"))
    await waitFor(() => expect(body.getByText("Schedule post")).toBeVisible())
    await expect(
      body.getByText("Choose date and time")
    ).toBeVisible()
    await userEvent.click(body.getByRole("button", { name: "Done" }))
    await waitFor(() =>
      expect(body.getByText("Create new post")).toBeVisible()
    )
  },
}

// The sliders icon opens post-level settings (currently just "turn off
// commenting").
export const SettingsFlow: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <Composer {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", {
        name: "Share something with the community...",
      })
    )
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(await body.findByLabelText("More options"))
    await waitFor(() =>
      expect(body.getByText("Change post settings")).toBeVisible()
    )
    await userEvent.click(body.getByRole("switch"))
    await userEvent.click(body.getByRole("button", { name: "Done" }))
    await waitFor(() =>
      expect(body.getByText("Create new post")).toBeVisible()
    )
  },
}
