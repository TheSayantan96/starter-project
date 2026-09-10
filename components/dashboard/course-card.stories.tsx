import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { CourseCard } from "./course-card"

const meta = {
  component: CourseCard,
  tags: ["ai-generated"],
  args: {
    title: "Health basics",
    author: "Yourbrands",
    sections: 1,
    lectures: 2,
    status: "draft",
    tone: "iris",
  },
} satisfies Meta<typeof CourseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <CourseCard {...args} />
    </div>
  ),
}

export const Grid: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <CourseCard
        title="चैटजीपीटी और उन्नत प्रॉम्प्ट इंजीनियरिंग (Chapter 1)"
        author="Yourbrands"
        sections={1}
        lectures={1}
        status="draft"
        tone="orange"
      />
      <CourseCard
        title="Health basics"
        author="Yourbrands"
        sections={1}
        lectures={2}
        status="draft"
        tone="iris"
      />
      <CourseCard
        title="Occult basic"
        author="Yourbrands"
        sections={2}
        lectures={2}
        status="draft"
        tone="grass"
      />
    </div>
  ),
}

export const OverflowMenu: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <CourseCard {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "More options" })
    )
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() =>
      expect(body.getByRole("menuitem", { name: "Delete" })).toBeVisible()
    )
  },
}
