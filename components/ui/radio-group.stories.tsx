import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta = {
  component: RadioGroup,
  tags: ["ai-generated"],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvas }) => {
    const radios = canvas.getAllByRole("radio")
    await expect(radios).toHaveLength(3)
    await expect(canvas.getByRole("radio", { name: "Comfortable" })).toBeChecked()
  },
}

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="comfortable" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="d1" />
        <Label htmlFor="d1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="d2" />
        <Label htmlFor="d2">Comfortable</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="monthly" className="flex w-fit gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="h1" />
        <Label htmlFor="h1">Monthly</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yearly" id="h2" />
        <Label htmlFor="h2">Yearly</Label>
      </div>
    </RadioGroup>
  ),
}
