import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// TagMango Visual Foundations v0.1 — semantic typography scale. Each variant
// is one Tailwind utility (text-display-lg, text-heading-1, ...) that fuses
// font-size + line-height + weight, defined once in app/globals.css's
// @theme block. This component exists so the scale is a real, reusable
// primitive rather than raw utility strings scattered across call sites —
// it does not migrate any existing screen typography.
const textVariants = cva("", {
  variants: {
    variant: {
      "display-lg": "text-display-lg",
      "display-sm": "text-display-sm",
      "heading-1": "text-heading-1",
      "heading-2": "text-heading-2",
      "heading-3": "text-heading-3",
      "body-lg": "text-body-lg",
      body: "text-body",
      caption: "text-caption",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>

// Sensible default element per role -- override with `as` when the
// surrounding document outline calls for a different heading level.
const defaultTag: Record<TextVariant, React.ElementType> = {
  "display-lg": "h1",
  "display-sm": "h1",
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "body-lg": "p",
  body: "p",
  caption: "span",
}

function Text({
  className,
  variant = "body",
  as,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof textVariants> & { as?: React.ElementType }) {
  const Comp = as ?? defaultTag[variant ?? "body"]
  return (
    <Comp
      data-slot="text"
      data-variant={variant}
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Text, textVariants }
