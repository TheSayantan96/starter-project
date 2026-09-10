import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "./app-sidebar"

const meta = {
  component: AppSidebar,
  tags: ["ai-generated"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <SidebarProvider className="min-h-[640px]">
      <AppSidebar {...args} />
      <SidebarInset>
        <div className="p-4 text-sm text-muted-foreground">Content area</div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Mango Studio")).toBeVisible()
  },
}

export const Collapsed: Story = {
  render: (args) => (
    <SidebarProvider defaultOpen={false} className="min-h-[640px]">
      <AppSidebar {...args} />
      <SidebarInset>
        <div className="p-4 text-sm text-muted-foreground">Content area</div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

// The "Products" nested group starts expanded (Workshops, 1-1 Consultation
// visible) -- click its row in the canvas above to collapse it.
export const NestedGroupExpanded: Story = {
  render: (args) => (
    <SidebarProvider className="min-h-[640px]">
      <AppSidebar {...args} />
      <SidebarInset>
        <div className="p-4 text-sm text-muted-foreground">Content area</div>
      </SidebarInset>
    </SidebarProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Workshops")).toBeVisible()
    await expect(canvas.getByText("1-1 Consultation")).toBeVisible()
  },
}
