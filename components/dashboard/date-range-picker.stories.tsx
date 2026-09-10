import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"
import { expect, userEvent, waitFor, within } from "storybook/test"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "./date-range-picker"

const meta = {
  component: DateRangePicker,
  tags: ["ai-generated"],
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<DateRange | undefined>()
    return <DateRangePicker value={range} onValueChange={setRange} />
  },
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Start date - End date" })
    )
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(body.getByRole("grid")).toBeVisible())
  },
}

export const Preselected: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2026, 8, 3),
      to: new Date(2026, 8, 9),
    })
    return <DateRangePicker value={range} onValueChange={setRange} />
  },
}
