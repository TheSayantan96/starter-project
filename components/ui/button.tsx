import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

// TagMango canonical Button variants. Every intent gets exactly one name —
// no bare "default"/"ghost"/"destructive" aliases duplicating a canonical
// name with identical CSS (that's what "neutral-ghost" vs "ghost" used to
// be). `outline` and `link` are the only two kept outside the naming
// scheme: `outline` has no TagMango equivalent and 49 real call sites;
// `link` has zero usages today but is a genuinely distinct pattern, not a
// duplicate of anything else here.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-tm-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // legacy — no TagMango equivalent (outline) or currently unused but
        // distinct (link); kept as-is rather than folded into anything
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30",
        link: "text-action-primary-text underline-offset-4 hover:underline",

        // CORE
        "primary-solid":
          "bg-action-primary text-action-primary-foreground hover:bg-action-primary-hover",
        "primary-surface":
          "bg-action-primary-surface border-action-primary-surface-border text-action-primary-text hover:bg-action-primary-surface-border/60",

        // NEUTRAL
        "neutral-solid": "bg-foreground text-surface hover:bg-ink-soft",
        "neutral-elevated":
          "bg-surface-raised border-border-strong text-foreground shadow-tm-1 hover:bg-surface-sunken",
        "neutral-surface":
          "bg-surface-sunken border-border text-foreground hover:bg-border",
        "neutral-ghost":
          "text-muted-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",

        // SEMANTIC — mirrors the primary-solid/-surface split
        "destructive-solid":
          "bg-destructive-solid text-white hover:bg-[color-mix(in_srgb,var(--destructive-solid),black_12%)]",
        "destructive-surface":
          "bg-destructive-bg text-destructive-text hover:bg-[color-mix(in_srgb,var(--destructive-bg),var(--destructive-text)_12%)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",

        // GLASS — a Button variant, not a separate component. Both derive
        // their gradient/tint from tokens (never hardcoded hex) so a future
        // brand-color change propagates here automatically.
        "glass-primary":
          "relative isolate border-white/50 text-white [text-shadow:0_1px_2px_rgba(90,24,8,0.5)] bg-[linear-gradient(135deg,color-mix(in_oklch,var(--action-primary)_65%,white)_0%,var(--action-primary)_46%,color-mix(in_oklch,var(--action-primary)_85%,black)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(93,20,8,0.22),0_8px_18px_rgba(247,107,21,0.28),0_2px_4px_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:inset-x-[7px] before:top-px before:h-[42%] before:rounded-tm-full before:bg-gradient-to-b before:from-white/40 before:to-transparent hover:brightness-105 hover:saturate-110 hover:-translate-y-px",
        "glass-adaptive":
          "relative isolate text-foreground border-[color-mix(in_srgb,var(--foreground)_20%,transparent)] bg-[linear-gradient(-75deg,color-mix(in_oklch,var(--background)_5%,transparent),color-mix(in_oklch,var(--background)_20%,transparent),color-mix(in_oklch,var(--background)_5%,transparent))] shadow-[inset_0_2px_2px_color-mix(in_srgb,var(--foreground)_5%,transparent),inset_0_-2px_2px_color-mix(in_srgb,var(--background)_50%,transparent),0_4px_2px_-2px_color-mix(in_srgb,var(--foreground)_20%,transparent),0_0_2px_4px_inset_color-mix(in_srgb,var(--background)_20%,transparent)] backdrop-blur-[3px] hover:backdrop-blur-[1px] hover:shadow-[inset_0_2px_2px_color-mix(in_srgb,var(--foreground)_5%,transparent),inset_0_-2px_2px_color-mix(in_srgb,var(--background)_50%,transparent),0_2px_1px_-2px_color-mix(in_srgb,var(--foreground)_25%,transparent),0_0_1px_2px_inset_color-mix(in_srgb,var(--background)_50%,transparent)]",
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
      variant: "primary-solid",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary-solid",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(
        buttonVariants({ variant, size, className }),
        // Loading keeps the button's own variant color at full strength
        // (disabled:opacity-50 above is for genuine disabled, not busy) and
        // gives the absolutely-positioned Spinner below a positioning
        // context, without touching layout for the non-loading case.
        "data-loading:relative data-loading:opacity-100!"
      )}
      {...props}
    >
      {/* display:contents keeps `children` as direct flex items of the
          button (preserving its existing gap/has-data-[icon] spacing rules)
          while still being one node `invisible` can target; visibility
          (unlike opacity) still hides content correctly through
          display:contents, and the hidden text keeps reserving its layout
          space so the button's dimensions don't change while loading. */}
      <span className="contents data-loading:invisible" data-loading={loading || undefined}>
        {children}
      </span>
      {loading && (
        // Not aria-hidden: Spinner's own role="status" aria-label="Loading"
        // is what gives the button a discernible accessible name once its
        // own label is hidden above -- axe's button-name check requires it.
        <Spinner className="absolute size-4 animate-spin" />
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
