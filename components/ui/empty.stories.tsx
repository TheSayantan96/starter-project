import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { FolderIcon, InboxIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty"
import { Button } from "./button"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Empty,
  tags: ["ai-generated"],
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages yet</EmptyTitle>
        <EmptyDescription>
          When you receive messages, they will show up here.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No messages yet")).toBeVisible()
  },
}

export const WithAction: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>
          Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  ),
}

export const DefaultMedia: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <InboxIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>Nothing here</EmptyTitle>
        <EmptyDescription>Try adjusting your filters.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}
