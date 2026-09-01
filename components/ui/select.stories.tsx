import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Label } from "./label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta = {
  component: Select,
  tags: ["ai-generated"],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="select-fruit">Fruit</Label>
      <Select {...args} defaultValue="banana">
        <SelectTrigger id="select-fruit" className="w-48">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("combobox")).toBeVisible()
    await userEvent.click(canvas.getByRole("combobox"))
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText("Cherry")).toBeVisible()
  },
}

export const WithGroups: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="select-timezone">Timezone</Label>
      <Select {...args}>
        <SelectTrigger id="select-timezone" className="w-56">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time</SelectItem>
            <SelectItem value="cst">Central Standard Time</SelectItem>
            <SelectItem value="pst">Pacific Standard Time</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
            <SelectItem value="cet">Central European Time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const SmallTrigger: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="select-size">Size</Label>
      <Select {...args} defaultValue="sm">
        <SelectTrigger id="select-size" size="sm" className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm">Small</SelectItem>
          <SelectItem value="md">Medium</SelectItem>
          <SelectItem value="lg">Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="select-fruit-disabled">Fruit</Label>
      <Select {...args} defaultValue="apple" disabled>
        <SelectTrigger id="select-fruit-disabled" className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox")).toBeDisabled()
  },
}
