import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AspectRatio } from "./aspect-ratio"

const meta = {
  component: AspectRatio,
  tags: ["ai-generated"],
  args: {
    ratio: 16 / 9,
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <AspectRatio
        {...args}
        className="flex items-center justify-center rounded-lg bg-muted"
      >
        <span className="text-sm text-muted-foreground">16:9</span>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio
        {...args}
        className="flex items-center justify-center rounded-lg bg-muted"
      >
        <span className="text-sm text-muted-foreground">1:1</span>
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  args: { ratio: 3 / 4 },
  render: (args) => (
    <div className="w-[250px]">
      <AspectRatio
        {...args}
        className="flex items-center justify-center rounded-lg bg-muted"
      >
        <span className="text-sm text-muted-foreground">3:4</span>
      </AspectRatio>
    </div>
  ),
}
