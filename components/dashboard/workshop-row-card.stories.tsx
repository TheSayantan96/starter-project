import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { WorkshopRowCard } from "./workshop-row-card"

const meta = {
  component: WorkshopRowCard,
  tags: ["ai-generated"],
  args: {
    title: "Untitled",
    subtitle: "—",
    meetingType: "Zoom Meeting",
    registrationUrl:
      "https://zoom.tagmango.com/redirect/webinar/single/6a8fdba3b5c253e8f284f3b2",
  },
} satisfies Meta<typeof WorkshopRowCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-3xl">
      <WorkshopRowCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Start as host" })
    ).toBeDisabled()
  },
}

export const CanStartHost: Story = {
  args: { canStartHost: true },
  render: (args) => (
    <div className="max-w-3xl">
      <WorkshopRowCard {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Start as host" })
    ).toBeEnabled()
  },
}

export const List: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-3">
      <WorkshopRowCard
        title="Untitled"
        meetingType="Zoom Meeting"
        registrationUrl="https://zoom.tagmango.com/redirect/webinar/single/6a8fdba3b5c253e8f284f3b2"
      />
      <WorkshopRowCard
        title="Untitled"
        meetingType="Zoom Meeting"
        registrationUrl="https://zoom.tagmango.com/redirect/webinar/single/6a8de35c58d5ddd98a7ef2da"
      />
    </div>
  ),
}
