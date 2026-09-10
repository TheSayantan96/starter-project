import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { PromoCarousel } from "./promo-carousel"

const slides = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=60",
    alt: "Yoga coaching promo",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=60",
    alt: "New course announcement",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=60",
    alt: "Community challenge",
  },
]

const meta = {
  component: PromoCarousel,
  tags: ["ai-generated"],
  args: {
    slides,
  },
} satisfies Meta<typeof PromoCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xl">
      <PromoCarousel {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region")).toBeVisible()
    await expect(canvas.getAllByRole("group")).toHaveLength(3)
  },
}

export const SingleSlide: Story = {
  args: { slides: [slides[0]] },
  render: (args) => (
    <div className="max-w-xl">
      <PromoCarousel {...args} />
    </div>
  ),
}
