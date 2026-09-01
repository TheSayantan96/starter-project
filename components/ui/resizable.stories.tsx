import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

const meta = {
  component: ResizablePanelGroup,
  tags: ["ai-generated"],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <ResizablePanelGroup
      {...args}
      className="h-48 max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("One")).toBeVisible()
    await expect(canvas.getByText("Two")).toBeVisible()
  },
}

export const Vertical: Story = {
  render: (args) => (
    // react-resizable-panels' Group always renders with an inline
    // `height: 100%`, which only resolves against a definite-height
    // ancestor — row-oriented groups get away without one because the
    // browser falls back to content-based auto-sizing, but a column
    // (vertical) group's percentage-based panel heights need a real
    // height further up the tree to resolve against.
    <div className="h-80 max-w-md">
      <ResizablePanelGroup
        {...args}
        orientation="vertical"
        className="rounded-lg border"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const ThreePanels: Story = {
  render: (args) => (
    <ResizablePanelGroup
      {...args}
      className="h-48 max-w-lg rounded-lg border"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Main</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Aside</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
