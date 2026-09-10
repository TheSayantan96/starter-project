import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import CreateServicePage from "./page"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css).
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  title: "Pages/Create Service",
  component: CreateServicePage,
  tags: ["ai-generated"],
} satisfies Meta<typeof CreateServicePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Create Service")).toBeVisible()
    await expect(canvas.getByText("Service Details")).toBeVisible()
    await expect(
      canvas.getByPlaceholderText("e.g. Mango Mastermind: 6-Week Growth Intensive")
    ).toBeVisible()
  },
}

export const PricingSubscription: Story = {
  name: "Pricing — Subscription branch",
  parameters: knownActionContrastException,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Pricing"))
    await userEvent.click(canvas.getByText("Subscription"))
    await expect(canvas.getByText("Billing interval")).toBeVisible()
    await expect(canvas.getByText("Offer a free trial")).toBeVisible()
    await expect(canvas.getByText("Renewal card")).toBeVisible()
  },
}

export const CheckoutAdvancedSettings: Story = {
  name: "Checkout — Advanced Settings inline",
  parameters: knownActionContrastException,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Checkout Page"))
    await expect(canvas.getByText("Advanced Settings")).toBeVisible()
    await userEvent.click(canvas.getByText("Sales & Conversion"))
    await expect(canvas.getByText("Enable multiple quantity purchases")).toBeVisible()
    await expect(canvas.getByText("Add freebie services")).toBeVisible()
  },
}

export const SuccessPage: Story = {
  name: "Success Page — Hide button",
  parameters: knownActionContrastException,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Success Page"))
    await userEvent.click(canvas.getByRole("switch", { name: "Customise button" }))
    await expect(canvas.getByText("Hide button")).toBeVisible()
  },
}
