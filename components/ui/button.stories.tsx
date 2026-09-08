import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"
import { SettingsIcon } from "lucide-react"

import { Button } from "./button"

// KNOWN V0.1 BRAND/ACTION CONTRAST EXCEPTION (DS-A11Y-01): white text on the
// solid Orange/9 fill is 2.97:1, below WCAG AA. Retained deliberately per
// TagMango Visual Foundations v0.1 (see app/globals.css) — not hidden, just
// scoped here so it doesn't weaken this story's other a11y checks.
const knownActionContrastException = {
  a11y: { options: { rules: { "color-contrast": { enabled: false } } } },
}

const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// One consolidated matrix of real <Button> instances -- canonical variants,
// loading, and icon composition -- for the v0.1 visual review board. Real
// components, not a hand-reconstructed class-string approximation.
export const AllVariants: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary-solid">Primary solid</Button>
        <Button variant="primary-surface">Primary surface</Button>
        <Button variant="neutral-solid">Neutral solid</Button>
        <Button variant="neutral-elevated">Neutral elevated</Button>
        <Button variant="neutral-surface">Neutral surface</Button>
        <Button variant="neutral-ghost">Neutral ghost</Button>
        <Button variant="destructive-solid">Destructive solid</Button>
        <Button variant="destructive-surface">Destructive surface</Button>
        <Button variant="glass-primary">Glass primary</Button>
        <Button variant="glass-adaptive">Glass adaptive</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary-solid" loading>
          Save
        </Button>
        <Button variant="neutral-surface" loading>
          Save
        </Button>
        <Button variant="destructive-solid" loading>
          Delete
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="neutral-surface" size="icon" aria-label="Settings">
          <SettingsIcon />
        </Button>
        <Button variant="primary-solid">
          <SettingsIcon data-icon="inline-start" />
          Settings
        </Button>
      </div>
    </div>
  ),
}

export const Default: Story = {
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Button" })).toBeVisible()
  },
}

export const Small: Story = {
  args: { size: "sm" },
  parameters: knownActionContrastException,
}
export const Large: Story = {
  args: { size: "lg" },
  parameters: knownActionContrastException,
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Button" })).toBeDisabled()
  },
}

// Button uses `rounded-tm-full` -> --radius-tm-full: 9999px (TagMango's
// canonical pill radius). Fails if Tailwind / the TagMango theme tokens
// did not load.
export const CssCheck: Story = {
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(getComputedStyle(button).borderRadius).toBe("9999px")
  },
}

// ============================================================
// CORE
// ============================================================

export const PrimarySolid: Story = {
  args: { variant: "primary-solid" },
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Button" })
    await userEvent.tab()
    await expect(button).toHaveFocus()
    await userEvent.click(button)
  },
}

export const PrimarySurface: Story = {
  args: { variant: "primary-surface" },
}

// Leaves the pointer hovered / the button pressed-and-held at the end of
// the play function, so the story's own canvas shows the live state, not
// just an assertion.
export const Hover: Story = {
  args: { variant: "primary-solid" },
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "Button" }))
  },
}

export const Pressed: Story = {
  args: { variant: "primary-solid" },
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Button" })
    await userEvent.pointer({ keys: "[MouseLeft>]", target: button })
  },
}

// ============================================================
// NEUTRAL
// ============================================================

export const NeutralSolid: Story = { args: { variant: "neutral-solid" } }
export const NeutralElevated: Story = { args: { variant: "neutral-elevated" } }
export const NeutralSurface: Story = { args: { variant: "neutral-surface" } }
export const NeutralGhost: Story = { args: { variant: "neutral-ghost" } }

// Intent (variant) and size/geometry are separate axes — an icon-only
// button composes an existing neutral intent with size="icon" rather than
// a dedicated "neutral-icon" variant.
export const NeutralSurfaceIcon: Story = {
  render: () => (
    <Button variant="neutral-surface" size="icon" aria-label="Settings">
      <SettingsIcon />
    </Button>
  ),
}

// ============================================================
// SEMANTIC — mirrors the primary-solid/-surface split
// ============================================================

export const DestructiveSolid: Story = { args: { variant: "destructive-solid" } }
export const DestructiveSurface: Story = {
  args: { variant: "destructive-surface" },
}

// ============================================================
// GLASS — Button variants, not a separate component
// ============================================================

export const GlassPrimary: Story = { args: { variant: "glass-primary" } }
export const GlassAdaptive: Story = { args: { variant: "glass-adaptive" } }

// ============================================================
// LOADING — same Button primitive, no separate LoadingButton. Dimensions
// stay stable (label is hidden, not removed, so it keeps its layout space);
// interaction is blocked via the native disabled attribute; aria-busy is
// exposed on the button itself.
// ============================================================

export const LoadingPrimarySolid: Story = {
  args: { variant: "primary-solid", loading: true },
  parameters: knownActionContrastException,
  play: async ({ canvas }) => {
    // The label is visually (and so accessibly) hidden while loading, by
    // design -- query by role alone rather than by name.
    const button = canvas.getByRole("button")
    await expect(button).toHaveAttribute("aria-busy", "true")
    await expect(button).toBeDisabled()
  },
}

export const LoadingNeutralSurface: Story = {
  args: { variant: "neutral-surface", loading: true },
}

export const LoadingDestructive: Story = {
  args: { variant: "destructive-solid", children: "Delete", loading: true },
}

// Regression guard for "no layout shift while loading": a resting and a
// loading button with identical children must measure the same width.
export const LoadingDimensionsStable: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button data-testid="resting">Save changes</Button>
      <Button data-testid="loading" loading>
        Save changes
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    const resting = canvas.getByTestId("resting")
    const loading = canvas.getByTestId("loading")
    await expect(loading.getBoundingClientRect().width).toBeCloseTo(
      resting.getBoundingClientRect().width,
      0
    )
    await expect(loading.getBoundingClientRect().height).toBe(
      resting.getBoundingClientRect().height
    )
  },
}

// ============================================================
// LEGACY — kept outside the TagMango naming scheme, not as aliases of
// anything else here. `outline` has no TagMango equivalent and 49 real
// call sites (migrating it is a separate, much larger effort than this
// pass); `link` has zero usages today but is a genuinely distinct pattern.
// The former `default`/`ghost`/`secondary`/`destructive` names are gone
// entirely — each was either byte-identical to a canonical name
// (default→primary-solid, ghost→neutral-ghost) or unused and undecided
// (secondary); all real call sites were migrated to the canonical names.
// ============================================================

export const Outline: Story = { args: { variant: "outline" } }
export const Link: Story = { args: { variant: "link" } }

// ============================================================
// CANDIDATE / EXPERIMENTAL — Iris. Deliberately NOT a `variant` value on
// the real Button component (see button.tsx): no recurring semantic role
// has been validated for it yet, so it's demonstrated here only, styled
// ad hoc from the raw Iris foundation scale, and must not spread into
// production feature code.
// ============================================================

export const IrisCandidateSolid: Story = {
  parameters: knownActionContrastException,
  render: () => (
    <Button className="bg-(--tm-iris-9) text-white hover:bg-(--tm-iris-10)">
      Button
    </Button>
  ),
}

export const IrisCandidateSurface: Story = {
  render: () => (
    <Button className="border-(--tm-iris-6) bg-(--tm-iris-3) text-(--tm-iris-12) hover:bg-(--tm-iris-6)/60">
      Button
    </Button>
  ),
}
