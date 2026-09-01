import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select"

const meta = {
  component: NativeSelect,
  tags: ["ai-generated"],
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox")).toBeVisible()
  },
}

export const WithOptGroups: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="">
      <NativeSelectOption value="" disabled>
        Select a fruit
      </NativeSelectOption>
      <NativeSelectOptGroup label="Citrus">
        <NativeSelectOption value="orange">Orange</NativeSelectOption>
        <NativeSelectOption value="lemon">Lemon</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Berries">
        <NativeSelectOption value="strawberry">Strawberry</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <NativeSelect {...args} defaultValue="medium">
      <NativeSelectOption value="small">Small</NativeSelectOption>
      <NativeSelectOption value="medium">Medium</NativeSelectOption>
      <NativeSelectOption value="large">Large</NativeSelectOption>
    </NativeSelect>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <NativeSelect {...args} defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox")).toBeDisabled()
  },
}
