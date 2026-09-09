import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { Avatar, AvatarFallback } from "./avatar"
import { Bubble, BubbleContent } from "./bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./message"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Message,
  tags: ["ai-generated"],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Incoming: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <Message className="max-w-md">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Jamie Doe</MessageHeader>
        <Bubble>
          <BubbleContent>Hey, how&apos;s it going?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hey, how's it going?")).toBeVisible()
  },
}

export const Outgoing: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <Message align="end" className="max-w-md">
      <MessageContent>
        <Bubble align="end">
          <BubbleContent>Pretty good, thanks for asking!</BubbleContent>
        </Bubble>
        <MessageFooter>Sent 2:41 PM</MessageFooter>
      </MessageContent>
    </Message>
  ),
}

export const Conversation: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <MessageGroup className="max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Jamie Doe</MessageHeader>
          <Bubble>
            <BubbleContent>Are we still on for the demo?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>Yep, see you at 3!</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}
