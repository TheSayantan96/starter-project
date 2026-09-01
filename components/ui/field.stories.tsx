import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./field"
import { Input } from "./input"

const meta = {
  component: Field,
  tags: ["ai-generated"],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" type="email" placeholder="you@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Email")).toBeVisible()
  },
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="field-username">Username</FieldLabel>
        <FieldDescription>Shown on your public profile.</FieldDescription>
      </FieldContent>
      <Input id="field-username" placeholder="jsmith" className="w-40" />
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="field-password">Password</FieldLabel>
      <Input
        id="field-password"
        type="password"
        aria-invalid
        className="max-w-sm"
      />
      <FieldError>Password must be at least 8 characters.</FieldError>
    </Field>
  ),
}

export const FieldSetGroup: Story = {
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldset-name">Name</FieldLabel>
          <Input id="fieldset-name" placeholder="Ada Lovelace" />
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="fieldset-email">Email</FieldLabel>
          <Input id="fieldset-email" placeholder="ada@example.com" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
