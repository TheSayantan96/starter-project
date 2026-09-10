import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { PostCard } from "./post-card"

const meta = {
  component: PostCard,
  tags: ["ai-generated"],
  args: {
    author: "Yourbrands",
    role: "CREATOR",
    timeAgo: "4w",
    tagCount: 954,
    content: "Welcome to Fitness Freak Academy",
    likes: 1,
    comments: 0,
    views: 16,
  },
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <PostCard {...args} />
    </div>
  ),
}

export const Pinned: Story = {
  args: { pinned: true },
  render: (args) => (
    <div className="max-w-xl">
      <PostCard {...args} />
    </div>
  ),
}

export const WithImage: Story = {
  args: {
    author: "gia.malhotra",
    role: undefined,
    tagCount: undefined,
    content:
      "Finished my landscape study — still figuring out how to keep the sky from looking flat. Any tips?",
    imageUrl:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=60",
    likes: 24,
    comments: 6,
    views: 88,
  },
  render: (args) => (
    <div className="max-w-xl">
      <PostCard {...args} />
    </div>
  ),
}

export const Liked: Story = {
  args: { liked: true, likes: 2 },
  render: (args) => (
    <div className="max-w-xl">
      <PostCard {...args} />
    </div>
  ),
}

export const OverflowMenu: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <PostCard {...args} />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "More options" })
    )
    const body = within(canvasElement.ownerDocument.body)
    await waitFor(() =>
      expect(body.getByRole("menuitem", { name: "Delete" })).toBeVisible()
    )
  },
}
