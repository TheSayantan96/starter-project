import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { BellIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./item"
import { Button } from "./button"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Item,
  tags: ["ai-generated"],
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Item className="max-w-sm">
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Notifications</ItemTitle>
        <ItemDescription>
          Get notified when someone mentions you.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Manage
        </Button>
      </ItemActions>
    </Item>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Notifications")).toBeVisible()
  },
}

export const Outline: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <Item variant="outline" className="max-w-sm">
      <ItemContent>
        <ItemTitle>Two-factor authentication</ItemTitle>
        <ItemDescription>Add an extra layer of security.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm">Enable</Button>
      </ItemActions>
    </Item>
  ),
}

export const Muted: Story = {
  render: () => (
    <Item variant="muted" size="sm" className="max-w-sm">
      <ItemContent>
        <ItemTitle>Archived project</ItemTitle>
      </ItemContent>
    </Item>
  ),
}

export const Group: Story = {
  render: () => (
    <ItemGroup className="max-w-sm">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Billing</ItemTitle>
          <ItemDescription>Manage your payment methods.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Team members</ItemTitle>
          <ItemDescription>Invite people to collaborate.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
