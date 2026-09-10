import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent } from "storybook/test"

import { FilterBar } from "./filter-bar"

const meta = {
  component: FilterBar,
  tags: ["ai-generated"],
  args: {
    filters: ["All", "Published", "Draft", "Recommended"],
    value: "All",
    dropdowns: [
      { label: "Service", options: ["Courses", "Workshops", "1:1"] },
      { label: "Duration", options: ["This week", "This month", "All time"] },
    ],
  },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState(args.value)
    return <FilterBar {...args} value={value} onValueChange={setValue} />
  },
  play: async ({ canvas }) => {
    const draft = canvas.getByRole("button", { name: "Draft" })
    await userEvent.click(draft)
    await expect(draft).toHaveAttribute("aria-pressed", "true")
  },
}
