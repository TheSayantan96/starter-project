"use client"

import * as React from "react"
import { CreditCardIcon, PencilIcon, PlusIcon, ReceiptIcon, RefreshCwIcon, Trash2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ItemGroup } from "@/components/ui/item"
import { ToggleRow } from "@/components/create-service/toggle-row"
import type {
  BillingInterval,
  IntlPrice,
  PayType,
  PricingBaseState,
  PricingType,
} from "@/components/create-service/types"

let intlId = 0

function ChoiceCard({
  value,
  active,
  title,
  subtitle,
  onSelect,
}: {
  value: string
  active: boolean
  title: string
  subtitle: string
  onSelect: () => void
}) {
  return (
    <Label
      onClick={onSelect}
      className={cn(
        "flex flex-1 cursor-pointer flex-col gap-1 rounded-tm-md border p-4 transition-all",
        active
          ? "border-2 border-selected-border bg-selected-surface shadow-tm-1"
          : "border-border bg-card hover:border-border-strong"
      )}
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <RadioGroupItem value={value} /> {title}
      </span>
      <span className="pl-6 text-xs font-normal text-muted-foreground">{subtitle}</span>
    </Label>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-sm font-semibold text-foreground">{children}</Label>
}

export function PricingTab({
  base,
  onBaseChange,
  onOpenRenewalCard,
}: {
  base: PricingBaseState
  onBaseChange: (next: PricingBaseState) => void
  onOpenRenewalCard: () => void
}) {
  const addCurrency = () => {
    intlId += 1
    onBaseChange({
      ...base,
      intlPricing: [...base.intlPricing, { id: `intl-${intlId}`, currency: "USD", price: "" }],
    })
  }
  const updateCurrency = (id: string, patch: Partial<IntlPrice>) =>
    onBaseChange({
      ...base,
      intlPricing: base.intlPricing.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    })
  const removeCurrency = (id: string) =>
    onBaseChange({ ...base, intlPricing: base.intlPricing.filter((e) => e.id !== id) })

  const priceBox = (
    <div className="flex flex-col gap-3 rounded-tm-md border border-border bg-card p-4">
      <div className="flex items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Currency</Label>
          <Input value="INR" disabled className="w-20" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            {base.payType === "pwyw" ? "Minimum selling price" : "Selling price"}
          </Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={base.price}
            onChange={(e) => onBaseChange({ ...base, price: e.target.value })}
          />
        </div>
        {base.payType === "fixed" && (
          <div className="flex flex-1 flex-col gap-1.5">
            <Label className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
              <Checkbox
                checked={base.discountEnabled}
                onCheckedChange={(c) => onBaseChange({ ...base, discountEnabled: !!c })}
              />
              Discounted price
            </Label>
            {base.discountEnabled && (
              <Input
                type="number"
                placeholder="Enter amount"
                value={base.discountPrice}
                onChange={(e) => onBaseChange({ ...base, discountPrice: e.target.value })}
              />
            )}
          </div>
        )}
      </div>

      {base.intlPricing.map((entry) => (
        <div key={entry.id} className="flex items-center gap-2">
          <Input
            value={entry.currency}
            onChange={(e) => updateCurrency(entry.id, { currency: e.target.value.toUpperCase() })}
            className="w-20 uppercase"
            maxLength={3}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={entry.price}
            onChange={(e) => updateCurrency(entry.id, { price: e.target.value })}
          />
          <Button variant="neutral-ghost" size="icon-sm" onClick={() => removeCurrency(entry.id)} aria-label="Remove currency">
            <Trash2Icon />
          </Button>
        </div>
      ))}

      <Button variant="neutral-surface" size="sm" className="w-fit" onClick={addCurrency}>
        <PlusIcon /> Add international pricing
      </Button>
    </div>
  )

  const gstSection = (
    <ToggleRow
      icon={ReceiptIcon}
      tone="neutral"
      title="GST"
      description="Apply GST to this service and choose whether the price is inclusive or exclusive of tax."
      checked={base.gstEnabled}
      onCheckedChange={(v) => onBaseChange({ ...base, gstEnabled: v })}
    >
      <RadioGroup
        value={base.gstMode}
        onValueChange={(v) => onBaseChange({ ...base, gstMode: v as PricingBaseState["gstMode"] })}
        className="grid-flow-col justify-start gap-6"
      >
        <Label className="flex items-center gap-2 text-xs font-normal">
          <RadioGroupItem value="inclusive" /> Price includes GST
        </Label>
        <Label className="flex items-center gap-2 text-xs font-normal">
          <RadioGroupItem value="exclusive" /> Price excludes GST
        </Label>
      </RadioGroup>
    </ToggleRow>
  )

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2.5">
        <SectionLabel>Pricing type</SectionLabel>
        <RadioGroup
          value={base.type}
          onValueChange={(value) => onBaseChange({ ...base, type: value as PricingType })}
          className="grid-flow-col gap-3"
        >
          <ChoiceCard value="one-time" active={base.type === "one-time"} title="One-time" subtitle="Single payment" onSelect={() => onBaseChange({ ...base, type: "one-time" })} />
          <ChoiceCard value="subscription" active={base.type === "subscription"} title="Subscription" subtitle="Recurring" onSelect={() => onBaseChange({ ...base, type: "subscription" })} />
          <ChoiceCard value="free" active={base.type === "free"} title="Free" subtitle="No charge" onSelect={() => onBaseChange({ ...base, type: "free" })} />
        </RadioGroup>
      </div>

      {base.type === "one-time" && (
        <>
          <div className="flex flex-col gap-2.5">
            <SectionLabel>How customers pay</SectionLabel>
            <RadioGroup
              value={base.payType}
              onValueChange={(value) => onBaseChange({ ...base, payType: value as PayType })}
              className="grid-flow-col gap-3"
            >
              <ChoiceCard value="fixed" active={base.payType === "fixed"} title="Fixed" subtitle="Customers pay the price you set." onSelect={() => onBaseChange({ ...base, payType: "fixed" })} />
              <ChoiceCard value="pwyw" active={base.payType === "pwyw"} title="Pay what they want" subtitle="Customers pay any amount above your minimum." onSelect={() => onBaseChange({ ...base, payType: "pwyw" })} />
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel>Pricing</SectionLabel>
            {priceBox}
          </div>

          <ItemGroup>
            {base.payType === "fixed" && (
              <ToggleRow
                icon={CreditCardIcon}
                tone="primary"
                title="Payment plan"
                description="Offer flexible ways for customers to pay for this service. Let customers split the cost with FlexiPay or pay in parts with partial payment."
                checked={base.paymentPlanEnabled}
                onCheckedChange={(v) => onBaseChange({ ...base, paymentPlanEnabled: v })}
              >
                <div className="flex items-center gap-3">
                  <Label className="text-xs text-muted-foreground">Number of installments</Label>
                  <Input
                    type="number"
                    min={2}
                    max={12}
                    value={base.installments}
                    onChange={(e) => onBaseChange({ ...base, installments: Number(e.target.value) || 2 })}
                    className="w-20"
                  />
                </div>
              </ToggleRow>
            )}
            {gstSection}
          </ItemGroup>
        </>
      )}

      {base.type === "subscription" && (
        <>
          <div className="flex flex-col gap-2.5">
            <SectionLabel>Billing interval</SectionLabel>
            <Select
              value={base.billingInterval}
              onValueChange={(v) => onBaseChange({ ...base, billingInterval: (v ?? "monthly") as BillingInterval })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="half-yearly">Half Yearly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2.5">
            <SectionLabel>Pricing</SectionLabel>
            {priceBox}
          </div>

          <ItemGroup>
            {gstSection}
            <ToggleRow
              icon={RefreshCwIcon}
              tone="info"
              title="Offer a free trial"
              description="Give new subscribers a free trial before billing starts."
              checked={base.trialEnabled}
              onCheckedChange={(v) => onBaseChange({ ...base, trialEnabled: v })}
            >
              <div className="flex items-center gap-3">
                <Label className="text-xs text-muted-foreground">Trial days</Label>
                <Input
                  type="number"
                  value={base.trialDays}
                  onChange={(e) => onBaseChange({ ...base, trialDays: e.target.value })}
                  className="w-20"
                />
              </div>
            </ToggleRow>
          </ItemGroup>

          <div className="flex flex-col gap-3 rounded-tm-md border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Renewal card</p>
                <p className="text-xs text-muted-foreground">
                  Show a customised renewal card to subscribers before their plan renews.
                </p>
              </div>
              <Switch
                checked={base.renewalCard.enabled}
                onCheckedChange={(v) => onBaseChange({ ...base, renewalCard: { ...base.renewalCard, enabled: v } })}
              />
            </div>
            {base.renewalCard.enabled && (
              <div className="rounded-tm-md border border-border bg-surface-sunken p-3">
                <p className="text-sm font-medium">Customise Renewal Card</p>
                <ol className="mt-1 list-decimal pl-4 text-xs text-muted-foreground">
                  <li>Edit renewal message</li>
                  <li>Configure CTA button text and link</li>
                  <li>Configure the CTA button to redirect to a specific page</li>
                </ol>
                <Button variant="neutral-solid" size="sm" className="mt-3" onClick={onOpenRenewalCard}>
                  <PencilIcon /> Let&apos;s try it out
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {base.type === "free" && (
        <p className="rounded-tm-md border border-border bg-surface-sunken p-4 text-sm text-muted-foreground">
          This service will be offered for free. Buyers can access it without any payment.
        </p>
      )}
    </div>
  )
}
