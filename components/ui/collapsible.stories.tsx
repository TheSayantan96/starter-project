import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "./button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

const meta = {
  component: Collapsible,
  tags: ["ai-generated"],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">
          @peduarte starred 3 repositories
        </span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon">
              <ChevronsUpDownIcon />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText("@stitches/react")).not.toBeInTheDocument()

    await userEvent.click(canvas.getByRole("button", { name: "Toggle" }))
    await expect(await canvas.findByText("@stitches/react")).toBeVisible()
  },
}

export const InitiallyOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Advanced settings</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon">
              <ChevronsUpDownIcon />
              <span className="sr-only">Toggle</span>
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          Enable experimental features
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
