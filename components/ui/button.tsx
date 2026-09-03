import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// TagMango canonical variants. `default` and `ghost` are kept as compatibility
// aliases for existing call sites (EXTEND -> ALIAS -> MIGRATE -> DEPRECATE,
// per the Visual Foundations v0.1 migration strategy) — their class strings
// are intentionally identical to primary-solid / neutral-ghost, not just
// visually similar, so the alias can be retired later with zero visual diff.
const primarySolid =
  "bg-action-primary text-action-primary-foreground hover:bg-action-primary-hover"
const neutralGhost =
  "text-muted-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-tm-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // legacy shadcn variants — compatibility aliases, retained as-is
        // until product usage is migrated (see button.tsx module comment)
        default: primarySolid,
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: neutralGhost,
        link: "text-action-primary-text underline-offset-4 hover:underline",

        // CORE
        "primary-solid": primarySolid,
        "primary-surface":
          "bg-action-primary-surface border-action-primary-surface-border text-action-primary-text hover:bg-action-primary-surface-border/60",

        // NEUTRAL
        "neutral-solid":
          "bg-foreground text-surface hover:bg-ink-soft",
        "neutral-elevated":
          "bg-surface-raised border-border-strong text-foreground shadow-tm-1 hover:bg-surface-sunken",
        "neutral-surface":
          "bg-surface-sunken border-border text-foreground hover:bg-border",
        "neutral-ghost": neutralGhost,

        // SEMANTIC
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",

        // GLASS — a Button variant, not a separate component. Both derive
        // their gradient/tint from tokens (never hardcoded hex) so a future
        // brand-color change propagates here automatically.
        "glass-primary":
          "relative isolate border-white/50 text-white [text-shadow:0_1px_2px_rgba(90,24,8,0.5)] bg-[linear-gradient(135deg,color-mix(in_oklch,var(--action-primary)_65%,white)_0%,var(--action-primary)_46%,color-mix(in_oklch,var(--action-primary)_85%,black)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(93,20,8,0.22),0_8px_18px_rgba(247,107,21,0.28),0_2px_4px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-x-[7px] before:top-px before:h-[42%] before:rounded-tm-full before:bg-gradient-to-b before:from-white/40 before:to-transparent hover:brightness-105 hover:saturate-110 hover:-translate-y-px",
        "glass-adaptive":
          "relative isolate text-foreground border-[color-mix(in_srgb,var(--foreground)_16%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface-raised)_85%,transparent),color-mix(in_srgb,var(--surface-sunken)_62%,transparent))] shadow-[inset_0_1px_0_color-mix(in_srgb,white_75%,transparent),inset_0_-1px_0_color-mix(in_srgb,var(--foreground)_8%,transparent),0_10px_16px_-8px_color-mix(in_srgb,var(--foreground)_24%,transparent),0_24px_44px_-16px_color-mix(in_srgb,var(--foreground)_18%,transparent)] backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-x-[7px] before:top-px before:h-[44%] before:rounded-tm-full before:bg-gradient-to-b before:from-white/55 before:to-transparent hover:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface-raised)_96%,transparent),color-mix(in_srgb,var(--surface-sunken)_72%,transparent))] hover:-translate-y-0.5",
      },
      size: {
        // TagMango: all normal (non-icon) buttons are 40px by default.
        // `lg` is bumped a step to stay meaningfully distinct from it.
        default:
          "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
