import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChallengeCard } from "./challenge-card"

const meta = {
  component: ChallengeCard,
  tags: ["ai-generated"],
  args: {
    title: "OPEN ENDED",
    participantsCount: 1,
  },
} satisfies Meta<typeof ChallengeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <ChallengeCard {...args} />
    </div>
  ),
}

export const WithEndDate: Story = {
  args: { title: "30-Day Fitness Streak", endsOn: "30 Sep 2026", participantsCount: 12 },
  render: (args) => (
    <div className="max-w-xs">
      <ChallengeCard {...args} />
    </div>
  ),
}

export const Row: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <ChallengeCard title="OPEN ENDED" participantsCount={1} />
      <ChallengeCard title="oe chaleh" participantsCount={0} />
      <ChallengeCard title="xyz" participantsCount={0} />
    </div>
  ),
}
