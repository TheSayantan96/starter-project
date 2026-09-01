import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import { FileIcon, ImageIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "./attachment"

const meta = {
  component: Attachment,
  tags: ["ai-generated"],
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Attachment className="max-w-xs">
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Q3-report.pdf</AttachmentTitle>
        <AttachmentDescription>2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove attachment">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Q3-report.pdf")).toBeVisible()
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Attachment state="idle" className="max-w-xs">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop a file here</AttachmentTitle>
          <AttachmentDescription>Waiting for upload</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading" className="max-w-xs">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>invoice.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="processing" className="max-w-xs">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>invoice.pdf</AttachmentTitle>
          <AttachmentDescription>Processing…</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error" className="max-w-xs">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>invoice.pdf</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="done" className="max-w-xs">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>invoice.pdf</AttachmentTitle>
          <AttachmentDescription>2.1 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Attachment orientation="vertical">
      <AttachmentMedia variant="image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/200x200" alt="" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>photo.png</AttachmentTitle>
        <AttachmentDescription>1.2 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
}

export const Trigger: Story = {
  render: () => (
    <Attachment className="max-w-xs">
      <AttachmentTrigger aria-label="Open attachment" />
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>design-spec.pdf</AttachmentTitle>
        <AttachmentDescription>Click to open</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
}

export const Group: Story = {
  render: () => (
    <AttachmentGroup>
      <Attachment size="sm" className="max-w-40">
        <AttachmentMedia>
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>one.pdf</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
      <Attachment size="sm" className="max-w-40">
        <AttachmentMedia>
          <ImageIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>two.png</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  ),
}
