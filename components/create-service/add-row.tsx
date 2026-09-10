"use client"

import * as React from "react"
import { PlusIcon, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
 * Finding #6 — variant-like features (Funnel Bridging, Upsell services,
 * Custom fields) as a single "+ Add" action, not a standing card with a
 * paragraph rendered every time. Finding #10 — the one-line "why" survives
 * the collapse; it's the row's description, always visible.
 */
export function AddRow({
  icon: Icon,
  tone = "neutral",
  title,
  description,
  badge,
  count,
  onAdd,
  open,
  children,
}: {
  icon: LucideIcon
  tone?: IconTone
  title: string
  description: string
  badge?: string
  count?: number
  onAdd: () => void
  open?: boolean
  children?: React.ReactNode
}) {
  return (
    <Collapsible open={!!open}>
      <Item variant="outline" className="bg-card">
        <ItemMedia>
          <RowIcon icon={Icon} tone={count ? tone : "neutral"} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {title}
            {badge && (
              <Badge variant="outline" className="text-[10px]">
                {badge}
              </Badge>
            )}
            {!!count && <Badge className="text-[10px]">{count}</Badge>}
          </ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="neutral-surface" size="sm" onClick={onAdd}>
            <PlusIcon /> Add
          </Button>
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
