import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"

import { Leaderboard } from "./leaderboard"

const entries = [
  { rank: 1, name: "SALIF RAZA", xp: 1400 },
  { rank: 2, name: "Adil khan", xp: 910 },
  { rank: 3, name: "Aanshik", xp: 300 },
  { rank: 4, name: "Mayank", xp: 230 },
  { rank: 5, name: "Kanishk", xp: 130 },
  { rank: 6, name: "Kutub", xp: 65 },
]

const meta = {
  component: Leaderboard,
  tags: ["ai-generated"],
  args: {
    entries,
  },
} satisfies Meta<typeof Leaderboard>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {
  render: function Render(args) {
    const [period, setPeriod] = React.useState("All Time")
    return (
      <div className="max-w-xs">
        <Leaderboard
          {...args}
          periods={["All Time", "Week", "Month"]}
          period={period}
          onPeriodChange={setPeriod}
        />
      </div>
    )
  },
}

export const Gradient: Story = {
  args: { title: "Levelup Members Leaderboard", variant: "gradient" },
  render: (args) => (
    <div className="max-w-xs">
      <Leaderboard {...args} />
    </div>
  ),
}
