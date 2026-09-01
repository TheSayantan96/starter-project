import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

const meta = {
  component: Carousel,
  tags: ["ai-generated"],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {[1, 2, 3, 4, 5].map((index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-square items-center justify-center rounded-xl border text-4xl font-semibold">
              {index}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region")).toBeVisible()
    await expect(canvas.getAllByRole("group")[0]).toBeVisible()
  },
}

export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="h-64">
        {[1, 2, 3, 4].map((index) => (
          <CarouselItem key={index}>
            <div className="flex h-full items-center justify-center rounded-xl border text-4xl font-semibold">
              {index}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
