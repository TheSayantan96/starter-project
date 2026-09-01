import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Button } from "./button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"

const meta = {
  component: ButtonGroup,
  tags: ["ai-generated"],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Bold</Button>
      <Button variant="outline">Italic</Button>
      <Button variant="outline">Underline</Button>
    </ButtonGroup>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Bold">
        <BoldIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Italic">
        <ItalicIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Underline">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}

export const WithSeparatorAndText: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
      <ButtonGroupSeparator />
      <ButtonGroupText>v1.2.0</ButtonGroupText>
    </ButtonGroup>
  ),
}
