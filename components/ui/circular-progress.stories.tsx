import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CircularProgress } from "./circular-progress"

const meta = {
  component: CircularProgress,
  tags: ["ai-generated"],
  args: {
    value: 65,
  },
} satisfies Meta<typeof CircularProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <CircularProgress {...args}>
      <span className="text-xs font-semibold">{args.value}%</span>
    </CircularProgress>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CircularProgress value={30} size={32} strokeWidth={3}>
        <span className="text-[10px] font-semibold">30%</span>
      </CircularProgress>
      <CircularProgress value={65} size={48} strokeWidth={4}>
        <span className="text-xs font-semibold">65%</span>
      </CircularProgress>
      <CircularProgress value={90} size={72} strokeWidth={6}>
        <span className="text-sm font-semibold">90%</span>
      </CircularProgress>
    </div>
  ),
}

export const Empty: Story = {
  args: { value: 0 },
  render: (args) => (
    <CircularProgress {...args}>
      <span className="text-xs font-semibold">{args.value}%</span>
    </CircularProgress>
  ),
}

export const Complete: Story = {
  args: { value: 100 },
  render: (args) => (
    <CircularProgress {...args}>
      <span className="text-xs font-semibold">{args.value}%</span>
    </CircularProgress>
  ),
}
