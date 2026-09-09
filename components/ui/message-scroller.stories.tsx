import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, waitFor } from "storybook/test"

import { Bubble, BubbleContent } from "./bubble"
import { Message, MessageContent } from "./message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./message-scroller"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: MessageScroller,
  tags: ["ai-generated"],
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

const demoMessages = [
  { id: "1", align: "start" as const, text: "Hey, how's it going?" },
  { id: "2", align: "end" as const, text: "Pretty good, you?" },
  {
    id: "3",
    align: "start" as const,
    text: "Can't complain. Ready for the demo later?",
  },
  {
    id: "4",
    align: "end" as const,
    text: "Yep, just finishing up the slides now.",
  },
  { id: "5", align: "start" as const, text: "Awesome, see you at 3!" },
]

export const Default: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-72 max-w-md rounded-xl border">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {demoMessages.map((message) => (
              <MessageScrollerItem key={message.id} messageId={message.id}>
                <Message align={message.align}>
                  <MessageContent>
                    <Bubble align={message.align}>
                      <BubbleContent>{message.text}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByText("Awesome, see you at 3!")).toBeVisible()
    )
  },
}
