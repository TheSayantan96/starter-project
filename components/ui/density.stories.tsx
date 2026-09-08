import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Card, CardContent } from "./card"
import { Button } from "./button"
import { Text } from "./text"

// Density is a documented CONVENTION for this pass, not a formal API --
// there's no `density` prop anywhere in the system. "Comfortable" and
// "compact" are composed from each component's own existing size axis
// (Card's size="sm", Button's size="sm", tighter gaps) rather than a new
// cross-cutting mode. See TAGMANGO_DESIGN_SYSTEM_V0.1_REVIEW.md's
// completion-pass section for why a density="compact" prop isn't
// introduced yet.
const meta = {
  component: Card,
  title: "Foundations/Density",
  tags: ["ai-generated"],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const rows = [
  { name: "Design review", meta: "Due tomorrow" },
  { name: "Engineering sync", meta: "Due Friday" },
  { name: "Product roadmap", meta: "Due next week" },
]

// Comfortable: Card's default size (24px padding), Button size="default",
// gap-3 between rows -- the resting rhythm for most surfaces.
export const Comfortable: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      {rows.map((row) => (
        <Card key={row.name}>
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <Text variant="body">{row.name}</Text>
              <Text variant="caption" className="text-muted-foreground">
                {row.meta}
              </Text>
            </div>
            <Button size="sm" variant="neutral-surface">
              Open
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

// Compact: Card size="sm" (16px padding), Button size="xs", gap-1.5 --
// for dense lists/tables/workflow rails where more rows need to fit.
export const Compact: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      {rows.map((row) => (
        <Card key={row.name} size="sm">
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <Text variant="body">{row.name}</Text>
              <Text variant="caption" className="text-muted-foreground">
                {row.meta}
              </Text>
            </div>
            <Button size="xs" variant="neutral-surface">
              Open
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
