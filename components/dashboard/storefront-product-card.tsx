import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function StorefrontProductCard({
  title,
  price,
  originalPrice,
  ctaLabel,
  thumbnailUrl,
  onCta,
  className,
}: {
  title: string
  price: string
  originalPrice?: string
  ctaLabel: string
  thumbnailUrl?: string
  onCta?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-tm-lg border border-border bg-card",
        className
      )}
    >
      <div
        className="aspect-video w-full bg-muted bg-cover bg-center"
        style={
          thumbnailUrl ? { backgroundImage: `url(${thumbnailUrl})` } : undefined
        }
      />
      <div className="p-3">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 flex items-baseline gap-1.5">
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
          <span className="text-base font-semibold">{price}</span>
        </p>
        <Button
          variant="outline"
          className="mt-2 w-full border-action-primary-text/40 text-action-primary-text hover:bg-action-primary-surface"
          onClick={onCta}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}

export { StorefrontProductCard }
