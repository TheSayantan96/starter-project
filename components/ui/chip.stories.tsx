import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { Chip } from "./toggle"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

const meta = {
  component: Chip,
  tags: ["ai-generated"],
  args: {
    children: "Design",
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const chip = canvas.getByRole("button", { name: "Design" })
    await expect(chip).toHaveAttribute("aria-pressed", "false")
  },
}

export const Selected: Story = {
  args: { defaultPressed: true },
  play: async ({ canvas }) => {
    const chip = canvas.getByRole("button", { name: "Design" })
    await expect(chip).toHaveAttribute("aria-pressed", "true")
  },
}

export const FocusVisible: Story = {
  play: async ({ canvas }) => {
    const chip = canvas.getByRole("button", { name: "Design" })
    await userEvent.tab()
    await expect(chip).toHaveFocus()
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Design" })).toBeDisabled()
  },
}

export const Toggling: Story = {
  play: async ({ canvas }) => {
    const chip = canvas.getByRole("button", { name: "Design" })
    await userEvent.click(chip)
    await expect(chip).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(chip)
    await expect(chip).toHaveAttribute("aria-pressed", "false")
  },
}

// Realistic filter-row composition: ToggleGroupItem already forwards
// `variant` into toggleVariants, so `variant="chip"` on the group is all
// a multi-select filter row needs -- no group-level changes were required.
export const FilterRow: Story = {
  render: () => (
    <ToggleGroup variant="chip" defaultValue={["design"]}>
      <ToggleGroupItem value="design">Design</ToggleGroupItem>
      <ToggleGroupItem value="engineering">Engineering</ToggleGroupItem>
      <ToggleGroupItem value="product">Product</ToggleGroupItem>
      <ToggleGroupItem value="research" disabled>
        Research
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Design" })
    ).toHaveAttribute("aria-pressed", "true")
    await expect(
      canvas.getByRole("button", { name: "Engineering" })
    ).toHaveAttribute("aria-pressed", "false")
  },
}
