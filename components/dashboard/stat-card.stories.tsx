import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { UserCheckIcon, UsersIcon, VideoIcon } from "lucide-react"

import { StatCard, StatCardChart, StatCardProgress } from "./stat-card"

const meta = {
  component: StatCard,
  tags: ["ai-generated"],
  args: {
    label: "Total Workshops",
    value: 4,
    icon: VideoIcon,
    tooltip: "Workshops scheduled in the selected date range.",
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {
  render: (args) => (
    <div className="grid max-w-sm gap-3">
      <StatCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Total Workshops")).toBeVisible()
    await expect(canvas.getByText("4")).toBeVisible()
  },
}

export const Row: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-3">
      <StatCard label="Total Workshops" value={4} icon={VideoIcon} />
      <StatCard label="Total Registrations" value="34,014" icon={UsersIcon} />
      <StatCard label="Total Attendees" value={3} icon={UserCheckIcon} />
    </div>
  ),
}

const chartData = [
  { label: "Thu", members: 0 },
  { label: "Fri", members: 0 },
  { label: "Sat", members: 0 },
  { label: "Sun", members: 0 },
  { label: "Mon", members: 0 },
  { label: "Tue", members: 0 },
  { label: "Wed", members: 34015 },
]

export const WithChart: Story = {
  render: () => (
    <div className="max-w-sm">
      <StatCardChart
        label="Active Level Up Members"
        tooltip="Members who completed at least one action this period."
        value={chartData.at(-1)?.members ?? 0}
        data={chartData}
        dataKey="members"
        period="Past 7 Days"
      />
    </div>
  ),
}

export const WithProgress: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-3">
      <StatCardProgress
        icon={VideoIcon}
        title="Task Completion"
        meta="No of task created 30"
        value={3}
      />
      <StatCardProgress
        icon={UsersIcon}
        title="Quiz Participation"
        meta="No of Quiz Created 71"
        value={0}
      />
    </div>
  ),
}
