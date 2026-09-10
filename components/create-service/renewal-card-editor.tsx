"use client"

import {
  BellIcon,
  ChevronLeftIcon,
  CrownIcon,
  GiftIcon,
  HeartIcon,
  RocketIcon,
  SparklesIcon,
  TagIcon,
  ZapIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { RenewalCardState } from "@/components/create-service/types"

const ICONS = [BellIcon, GiftIcon, TagIcon, CrownIcon, HeartIcon, ZapIcon, SparklesIcon, RocketIcon]

/**
 * Preserved from production as-is (not redesigned) — a nested screen inside
 * the Subscription pricing flow, not a new pattern of its own.
 */
export function RenewalCardEditor({
  state,
  onChange,
  onBack,
}: {
  state: RenewalCardState
  onChange: (next: RenewalCardState) => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeftIcon className="size-4" /> Back to Service creation
      </button>

      <div>
        <h2 className="text-heading-3">Customise Renewal Card</h2>
        <p className="text-sm text-muted-foreground">
          Personalise the renewal alert subscribers see before their plan renews.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-tm-md border border-border bg-card p-5">
        <div>
          <Label className="mb-2 block">Icon</Label>
          <div className="flex flex-wrap gap-2">
            {ICONS.map((Icon, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange({ ...state, icon: String(i) })}
                className={
                  "flex size-9 items-center justify-center rounded-tm-md border transition-colors " +
                  (state.icon === String(i)
                    ? "border-2 border-selected-border bg-selected-surface text-selected-foreground"
                    : "border-border bg-surface-sunken text-muted-foreground hover:bg-border")
                }
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="renewal-message">Renewal message</Label>
            <span className="text-xs text-muted-foreground">{state.message.length} / 50</span>
          </div>
          <Input
            id="renewal-message"
            maxLength={50}
            placeholder="Renew your subscription now for uninterrupted access."
            value={state.message}
            onChange={(e) => onChange({ ...state, message: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-sm font-medium">Customise button</p>
            <p className="text-xs text-muted-foreground">Add a call-to-action button with custom text and a link.</p>
          </div>
          <Switch
            checked={state.buttonEnabled}
            onCheckedChange={(v) => onChange({ ...state, buttonEnabled: v })}
          />
        </div>

        {state.buttonEnabled && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Button title</Label>
              <Input value={state.buttonTitle} onChange={(e) => onChange({ ...state, buttonTitle: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">Button URL</Label>
              <Input
                placeholder="https://example.com"
                value={state.buttonUrl}
                onChange={(e) => onChange({ ...state, buttonUrl: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { ICONS as RENEWAL_CARD_ICONS }
