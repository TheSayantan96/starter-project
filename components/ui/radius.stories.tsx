import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Text } from "./text"

// Not a component -- a swatch board for the --radius-tm-* hierarchy itself.
// See TAGMANGO_DESIGN_SYSTEM_V0.1_REVIEW.md's completion-pass section for
// the full per-primitive migration/classification table this scale drives.
const meta = {
  title: "Foundations/Radius",
  tags: ["ai-generated"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { name: "tm-sm", cls: "rounded-tm-sm", px: "8px", use: "small internal controls" },
  { name: "tm-md", cls: "rounded-tm-md", px: "12px", use: "inputs, compact controls" },
  { name: "tm-lg", cls: "rounded-tm-lg", px: "16px", use: "cards, menus, popovers" },
  { name: "tm-xl", cls: "rounded-tm-xl", px: "24px", use: "dialogs, drawers, large panels" },
  { name: "tm-full", cls: "rounded-tm-full", px: "9999px", use: "buttons, chips, avatars" },
]

export const Scale: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {steps.map((s) => (
        <div key={s.name} className="flex flex-col items-center gap-2">
          <div className={`size-20 border-2 border-action-primary bg-surface-sunken ${s.cls}`} />
          <Text variant="body" className="font-mono text-xs">
            {s.name} — {s.px}
          </Text>
          <Text variant="caption" className="max-w-24 text-center text-muted-foreground">
            {s.use}
          </Text>
        </div>
      ))}
    </div>
  ),
}
