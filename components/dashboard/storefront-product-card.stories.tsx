import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { StorefrontProductCard } from "./storefront-product-card"

const meta = {
  component: StorefrontProductCard,
  tags: ["ai-generated"],
  args: {
    title: "Crystal Healing Mastery",
    price: "₹6999",
    originalPrice: "₹9999",
    ctaLabel: "Buy now",
  },
} satisfies Meta<typeof StorefrontProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-xs">
      <StorefrontProductCard {...args} />
    </div>
  ),
}

export const WithoutDiscount: Story = {
  args: { title: "1:1 Healing", price: "₹1999", originalPrice: undefined, ctaLabel: "book 1:1" },
  render: (args) => (
    <div className="max-w-xs">
      <StorefrontProductCard {...args} />
    </div>
  ),
}

export const Row: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <StorefrontProductCard
        title="Crystal Healing Mastery"
        price="₹6999"
        originalPrice="₹9999"
        ctaLabel="Buy now"
      />
      <StorefrontProductCard title="1:1 Healing" price="₹1999" ctaLabel="book 1:1" />
      <StorefrontProductCard title="1:1" price="₹1999" ctaLabel="book 1:1" />
    </div>
  ),
}
