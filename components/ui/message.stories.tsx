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

const meta = {
  component: Message,
  tags: ["ai-generated"],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Incoming: Story = {
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
