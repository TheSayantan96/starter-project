"use client"

import * as React from "react"
import { CheckIcon, ImageIcon, MonitorIcon, SmartphoneIcon, TimerIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { RENEWAL_CARD_ICONS } from "@/components/create-service/renewal-card-editor"
import type {
  CheckoutState,
  DetailsState,
  PricingBaseState,
  SuccessState,
} from "@/components/create-service/types"

type PreviewMode = "mobile" | "desktop"
export type PreviewSection = "details" | "pricing" | "checkout" | "success" | "renewal"

function Frame({ mode, children }: { mode: PreviewMode; children: React.ReactNode }) {
  if (mode === "mobile") {
    return (
      <div className="rounded-[2.25rem] bg-foreground p-2.5 shadow-tm-3">
        <div className="relative flex h-[26rem] w-72 flex-col overflow-hidden rounded-[1.75rem] bg-card">
          <div className="absolute top-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded-tm-full bg-foreground" />
          <div className="flex-1 overflow-y-auto px-4 pt-8 pb-4">{children}</div>
        </div>
      </div>
    )
  }
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-tm-lg border border-border shadow-tm-2">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-sunken px-3 py-2">
        <span className="size-2 rounded-full bg-destructive-solid/70" />
        <span className="size-2 rounded-full bg-warning-solid/70" />
        <span className="size-2 rounded-full bg-success/60" />
      </div>
      <div className="bg-card p-5">{children}</div>
    </div>
  )
}

function PurchasePreview({ details, pricing }: { details: DetailsState; pricing: PricingBaseState }) {
  const buyLabel = pricing.type === "free" ? "Register now" : "Buy now"
  const priceDisplay = (() => {
    if (pricing.type === "free") return "Free"
    if (!pricing.price) return pricing.payType === "pwyw" ? "₹0+" : "₹0"
    const suffix = pricing.type === "subscription" ? " /month" : pricing.payType === "pwyw" ? "+" : ""
    return `₹${pricing.price}${suffix}`
  })()

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">by Yourbrands</p>
      <h2 className="font-heading text-lg leading-tight font-semibold text-balance">
        {details.title || "Service title"}
      </h2>
      <div className="flex h-36 w-full items-center justify-center rounded-tm-md bg-gradient-to-br from-action-primary-surface to-surface-sunken text-muted-foreground">
        {details.coverAdded ? <span className="text-xs">Cover preview</span> : <ImageIcon className="size-6" />}
      </div>
      {details.description && (
        <p className="line-clamp-3 text-sm text-muted-foreground">{details.description}</p>
      )}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-lg font-semibold">
          {pricing.discountEnabled && pricing.discountPrice && pricing.type !== "free" ? (
            <>
              <span className="mr-1.5 text-sm text-muted-foreground line-through">₹{pricing.price || 0}</span>
              ₹{pricing.discountPrice}
            </>
          ) : (
            priceDisplay
          )}
        </span>
        <Button size="sm">{buyLabel}</Button>
      </div>
    </div>
  )
}

function CheckoutPreview({ pricing, checkout }: { pricing: PricingBaseState; checkout: CheckoutState }) {
  const price = pricing.discountEnabled && pricing.discountPrice ? pricing.discountPrice : pricing.price || "0"
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-base font-semibold">Payment Details</h2>
        <p className="text-xs text-muted-foreground">Complete your payment by providing your payment details.</p>
      </div>

      {checkout.timerEnabled && (
        <div className="flex items-center gap-2 rounded-tm-md bg-destructive-bg px-3 py-2 text-xs font-medium text-destructive-text">
          <TimerIcon className="size-3.5" /> Offer ends soon
        </div>
      )}

      {pricing.paymentPlanEnabled && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground">Select Payment Plan</p>
          <div className="rounded-tm-md border-2 border-selected-border bg-selected-surface p-2.5 text-xs font-medium">
            Full Payment · Pay ₹{price} once
          </div>
          <div className="rounded-tm-md border border-border p-2.5 text-xs text-muted-foreground">
            FlexiPay · {pricing.installments} easy installments
          </div>
        </div>
      )}

      <div className="rounded-tm-md border border-border px-3 py-2 text-xs text-muted-foreground">Have a coupon? +</div>

      {checkout.tcEnabled && (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="size-3.5" readOnly />
          I agree to the Terms and Conditions
        </label>
      )}

      <div className="border-t border-border pt-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount to be paid</span>
          <span className="font-semibold">₹{price}</span>
        </div>
      </div>

      <Button className="w-full">Proceed to pay ₹{price}</Button>
      <p className="text-center text-[10px] text-muted-foreground">Secured by TagMango · 100% safe payments</p>
    </div>
  )
}

function SuccessPreview({ success }: { success: SuccessState }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 py-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
          <CheckIcon className="size-6" />
        </div>
        <h2 className="text-base font-semibold">Payment successful!</h2>
        <p className="text-xs text-muted-foreground">Thank you — your purchase is confirmed. 🎉</p>
      </div>
      {success.customSection && (
        <div className="rounded-tm-md border border-border bg-surface-sunken p-3">
          <p className="text-sm font-medium">{success.customSection.title}</p>
          {success.customSection.description && (
            <p className="text-xs text-muted-foreground">{success.customSection.description}</p>
          )}
        </div>
      )}
      {success.buttonEnabled && !success.buttonHidden && (
        <Button className="w-full">{success.buttonTitle || "Continue"}</Button>
      )}
    </div>
  )
}

function RenewalPreview({ icon, message }: { icon: string; message: string }) {
  const Icon = RENEWAL_CARD_ICONS[Number(icon)] ?? RENEWAL_CARD_ICONS[0]
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-tm-md bg-surface-sunken px-3 py-2 text-xs text-muted-foreground">
        <span className="size-6 rounded-full bg-action-primary-surface" /> Dashboard
      </div>
      <div className="flex gap-3 rounded-tm-md border-l-4 border-destructive-solid bg-destructive-bg p-3">
        <Icon className="size-4 shrink-0 text-destructive-text" />
        <p className="text-xs text-destructive-text">{message || "Renew your subscription now for uninterrupted access."}</p>
      </div>
    </div>
  )
}

export function PreviewPanel({
  section,
  details,
  pricing,
  checkout,
  success,
  renewalIcon,
  renewalMessage,
}: {
  section: PreviewSection
  details: DetailsState
  pricing: PricingBaseState
  checkout: CheckoutState
  success: SuccessState
  renewalIcon?: string
  renewalMessage?: string
}) {
  const [mode, setMode] = React.useState<PreviewMode>("mobile")

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between">
        <Text variant="caption" className="font-medium text-muted-foreground">
          Preview
        </Text>
        <div className="flex items-center gap-0.5 rounded-tm-full border border-border bg-surface-sunken p-0.5">
          <button
            type="button"
            onClick={() => setMode("mobile")}
            aria-label="Mobile preview"
            aria-pressed={mode === "mobile"}
            className={cn(
              "flex size-7 items-center justify-center rounded-tm-full transition-colors",
              mode === "mobile" ? "bg-card text-foreground shadow-tm-1" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <SmartphoneIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMode("desktop")}
            aria-label="Desktop preview"
            aria-pressed={mode === "desktop"}
            className={cn(
              "flex size-7 items-center justify-center rounded-tm-full transition-colors",
              mode === "desktop" ? "bg-card text-foreground shadow-tm-1" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MonitorIcon className="size-3.5" />
          </button>
        </div>
      </div>

      <Frame mode={mode}>
        {section === "details" || section === "pricing" ? (
          <PurchasePreview details={details} pricing={pricing} />
        ) : section === "checkout" ? (
          <CheckoutPreview pricing={pricing} checkout={checkout} />
        ) : section === "success" ? (
          <SuccessPreview success={success} />
        ) : (
          <RenewalPreview icon={renewalIcon ?? "0"} message={renewalMessage ?? ""} />
        )}
      </Frame>
    </div>
  )
}
