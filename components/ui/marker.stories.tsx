import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CheckIcon, CircleIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "./marker"

const meta = {
  component: Marker,
  tags: ["ai-generated"],
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <CircleIcon />
      </MarkerIcon>
      <MarkerContent>Order placed</MarkerContent>
    </Marker>
  ),
}

export const WithCheckIcon: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <CheckIcon />
      </MarkerIcon>
      <MarkerContent>Payment confirmed</MarkerContent>
    </Marker>
  ),
}

export const Separator: Story = {
  args: { variant: "separator" },
  render: (args) => (
    <Marker {...args}>
      <MarkerContent>OR</MarkerContent>
    </Marker>
  ),
}

export const Border: Story = {
  args: { variant: "border" },
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <CircleIcon />
      </MarkerIcon>
      <MarkerContent>Section heading</MarkerContent>
    </Marker>
  ),
}

export const List: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Marker {...args}>
        <MarkerIcon>
          <CheckIcon />
        </MarkerIcon>
        <MarkerContent>Step one is complete</MarkerContent>
      </Marker>
      <Marker {...args}>
        <MarkerIcon>
          <CircleIcon />
        </MarkerIcon>
        <MarkerContent>Step two is in progress</MarkerContent>
      </Marker>
    </div>
  ),
}
