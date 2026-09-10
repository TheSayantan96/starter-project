"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { RowIcon, type IconTone } from "@/components/create-service/row-icon"

/**
 * The shared row for every "rarely-used" option in the builder: an icon, a
 * specific one-line label, a switch, and — only once switched on — its own
 * config underneath. This is the primitive behind findings #1, #7 and #10
 * from the audit: one line of copy instead of a paragraph, and the reason to
 * flip it on stays visible even while collapsed.
 */
export function ToggleRow({
  icon: Icon,
  tone = "neutral",
  title,
  description,
  badge,
  checked,
  onCheckedChange,
  children,
  className,
}: {
  icon: LucideIcon
  tone?: IconTone
  title: string
  description: string
  badge?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: React.ReactNode
  className?: string
}) {
  return (
    <Collapsible open={checked && !!children}>
      <Item variant="outline" className={cn("bg-card", className)}>
        <ItemMedia>
          <RowIcon icon={Icon} tone={checked ? tone : "neutral"} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {title}
            {badge && (
              <Badge variant="outline" className="text-[10px]">
                {badge}
              </Badge>
            )}
          </ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Switch
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-label={title}
          />
        </ItemActions>
      </Item>
      {children && (
        <CollapsibleContent>
          <div className="mt-2 mb-1 ml-14 rounded-tm-md border border-border bg-surface-sunken p-4">
            {children}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  )
}

/** A tighter variant for Advanced Settings — no separate description line,
 * just a specific label and an inline "on" pill (finding #7). */
export function CompactToggleRow({
  icon: Icon,
  label,
  caption,
  checked,
  onCheckedChange,
}: {
  icon: LucideIcon
  label: string
  caption: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <Item variant="default" size="sm" className={cn(checked && "bg-muted/60")}>
      <ItemMedia variant="icon">
        <Icon className={cn("size-4", checked ? "text-foreground" : "text-muted-foreground")} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{label}</ItemTitle>
        <ItemDescription className="line-clamp-1">{caption}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Switch
          size="sm"
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={label}
        />
      </ItemActions>
    </Item>
  )
}
