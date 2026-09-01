import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Slider } from "./slider"

const meta = {
  component: Slider,
  tags: ["ai-generated"],
  args: {
    "aria-label": "Volume",
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 25,
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
}

export const Stepped: Story = {
  args: {
    defaultValue: 50,
    step: 10,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 40,
    disabled: true,
  },
}

export const Vertical: Story = {
  render: (args) => (
    <div className="h-48">
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: 40,
    orientation: "vertical",
  },
}
