import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { ArrowLeftIcon, SparklesIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { SettingsSection } from "./settings-section"

const meta = {
  component: SettingsSection,
  tags: ["ai-generated"],
} satisfies Meta<typeof SettingsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Dashboard Experience",
    badge: <Badge variant="outline">Current: previewing V2</Badge>,
    description:
      "You're previewing the new design. Changes aren't visible to your subscribers until you switch.",
    meta: "Last changed on 7 Sep 2026, 6:18 PM.",
    actions: (
      <>
        <Button variant="outline" size="sm">
          <ArrowLeftIcon data-icon="inline-start" />
          Return to V1
        </Button>
        <Button variant="neutral-solid" size="sm">
          <SparklesIcon data-icon="inline-start" />
          Use new design
        </Button>
      </>
    ),
  },
  render: (args) => (
    <div className="max-w-2xl">
      <SettingsSection {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Dashboard Experience")).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Use new design" })
    ).toBeVisible()
  },
}

export const WithoutActions: Story = {
  args: {
    title: "Naming Conventions",
    description: "Customise your branding, menu, support and domain.",
  },
  render: (args) => (
    <div className="max-w-2xl">
      <SettingsSection {...args} />
    </div>
  ),
}
