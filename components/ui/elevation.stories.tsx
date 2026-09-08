import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Text } from "./text"

// Not a component -- a swatch board for the --shadow-tm-* elevation
// hierarchy. See card.tsx (Level 1), popover.tsx/dropdown-menu.tsx/etc.
// (Level 2), and dialog.tsx/drawer.tsx (Level 3) for the real consumers.
const meta = {
  title: "Foundations/Elevation",
  tags: ["ai-generated"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const levels = [
  { name: "shadow-tm-1", cls: "shadow-tm-1", use: "Card — resting surface" },
  { name: "shadow-tm-2", cls: "shadow-tm-2", use: "Popover, DropdownMenu, Select, Menu layer" },
  { name: "shadow-tm-3", cls: "shadow-tm-3", use: "Dialog, AlertDialog, Drawer, Sheet" },
]

export const Levels: Story = {
  render: () => (
    <div className="flex gap-10 bg-surface-sunken p-10">
      {levels.map((l) => (
        <div key={l.name} className="flex flex-col items-center gap-3">
          <div className={`flex size-28 items-center justify-center rounded-tm-lg bg-popover ${l.cls}`}>
            <Text variant="caption" className="font-mono">
              {l.name}
            </Text>
          </div>
          <Text variant="caption" className="max-w-32 text-center text-muted-foreground">
            {l.use}
          </Text>
        </div>
      ))}
    </div>
  ),
}
