"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-tm-full text-sm font-medium whitespace-nowrap transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
        // TagMango chip/filter pattern -- reuses Toggle's Base UI pressed
        // state (aria-pressed standalone, data-state=on inside a
        // ToggleGroup) rather than a new component. Selected reuses the
        // same --selected-surface/-foreground/-border Orange tokens as
        // community-rail's nav treatment, so "selected" reads the same
        // way everywhere. Orange/4 fill is a soft tint, not the vivid
        // Orange/9 of primary-solid, so it doesn't compete with a CTA.
        // Polish pass: selected adds border-2 (up from the resting 1px) and
        // font-semibold (up from the shared base's font-medium) on top of
        // the existing selected-surface/-foreground/-border tokens, so a
        // selected chip is unmistakable while scanning without approaching
        // primary-solid's vivid Orange/9 fill -- still just a firmer Orange/4
        // tint. Strengthens the existing selected-* relationship rather
        // than adding a new token or a decorative element (e.g. a checkmark).
        chip: "border border-border bg-surface-sunken text-muted-foreground hover:bg-border hover:text-foreground aria-pressed:border-2 aria-pressed:border-selected-border aria-pressed:bg-selected-surface aria-pressed:text-selected-foreground aria-pressed:font-semibold aria-pressed:hover:bg-selected-surface data-[state=on]:border-2 data-[state=on]:border-selected-border data-[state=on]:bg-selected-surface data-[state=on]:text-selected-foreground data-[state=on]:font-semibold data-[state=on]:hover:bg-selected-surface",
      },
      size: {
        default:
          "h-9 min-w-9 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        sm: "h-8 min-w-8 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 min-w-10 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// Chip/filter -- a thin, discoverable preset over Toggle (variant="chip"),
// not a new interactive primitive. Toggle/@base-ui's Toggle already gives
// pressed state, keyboard activation, focus-visible and disabled for free;
// building a parallel component would just re-implement that. Compose with
// ToggleGroup (variant="chip") for a filter row -- ToggleGroupItem already
// forwards `variant` into toggleVariants, so no changes were needed there.
function Chip({
  className,
  size = "default",
  ...props
}: Omit<TogglePrimitive.Props, "className"> & {
  className?: string
} & Omit<VariantProps<typeof toggleVariants>, "variant">) {
  return (
    <TogglePrimitive
      data-slot="chip"
      className={cn(toggleVariants({ variant: "chip", size, className }))}
      {...props}
    />
  )
}

export { Toggle, Chip, toggleVariants }
