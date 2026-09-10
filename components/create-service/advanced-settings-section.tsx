"use client"

import * as React from "react"
import {
  BellRingIcon,
  KeyRoundIcon,
  LineChartIcon,
  TrendingUpIcon,
  WalletCardsIcon,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ItemGroup } from "@/components/ui/item"
import { CompactToggleRow, ToggleRow } from "@/components/create-service/toggle-row"
import { RowIcon } from "@/components/create-service/row-icon"
import { ServicePickerDialog } from "@/components/create-service/picker-dialog"
import { AVAILABLE_SERVICES } from "@/components/create-service/types"
import type { AdvancedSettingsState } from "@/components/create-service/types"

/**
 * Advanced Settings, matching production: five collapsed groups inline in
 * the Checkout Page (not a drawer), each with its own real sub-fields —
 * this is production's own conditional structure, not an invented one.
 */
export function AdvancedSettingsSection({
  state,
  onChange,
}: {
  state: AdvancedSettingsState
  onChange: (next: AdvancedSettingsState) => void
}) {
  const [freebieOpen, setFreebieOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-heading-3">Advanced Settings</h3>

      <Accordion className="w-auto" defaultValue={[]}>
        <AccordionItem value="sales">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <RowIcon icon={TrendingUpIcon} tone="primary" className="size-7 rounded-tm-sm" />
              Sales & Conversion
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ItemGroup>
              <CompactToggleRow
                icon={TrendingUpIcon}
                label="Enable OTP less checkout"
                caption="Let customers check out without verifying an OTP."
                checked={state.otpLessCheckout}
                onCheckedChange={(v) => onChange({ ...state, otpLessCheckout: v })}
              />
              <CompactToggleRow
                icon={TrendingUpIcon}
                label="Hide coupon code on payment page"
                caption="Hide the coupon code box on checkout. Customers won't be able to apply discount coupons."
                checked={state.hideCoupon}
                onCheckedChange={(v) => onChange({ ...state, hideCoupon: v })}
              />
              <CompactToggleRow
                icon={TrendingUpIcon}
                label="Enable multiple quantity purchases"
                caption="Allow customers to purchase multiple quantities of this service (event tickets, physical products, etc.)."
                checked={state.multipleQuantity}
                onCheckedChange={(v) => onChange({ ...state, multipleQuantity: v })}
              />
              <ToggleRow
                icon={TrendingUpIcon}
                tone="primary"
                title="Add freebie services"
                description="Grant access to additional services for free when this one is purchased. Applies to new purchases only."
                checked={state.freebieEnabled}
                onCheckedChange={(v) => onChange({ ...state, freebieEnabled: v })}
              >
                <Button variant="neutral-surface" size="sm" onClick={() => setFreebieOpen(true)}>
                  {state.freebieServiceIds.length > 0
                    ? `${state.freebieServiceIds.length} service${state.freebieServiceIds.length > 1 ? "s" : ""} selected`
                    : "All Services"}
                </Button>
              </ToggleRow>
            </ItemGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <RowIcon icon={KeyRoundIcon} tone="info" className="size-7 rounded-tm-sm" />
              Availability & Access
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ItemGroup>
              <ToggleRow
                icon={KeyRoundIcon}
                tone="info"
                title="Limit the seats available for sale"
                description="Stop sales once this many customers have bought."
                checked={state.seatLimitEnabled}
                onCheckedChange={(v) => onChange({ ...state, seatLimitEnabled: v })}
              >
                <div className="flex flex-col gap-3">
                  <Input
                    type="number"
                    placeholder="Seat count"
                    value={state.seatCount}
                    onChange={(e) => onChange({ ...state, seatCount: e.target.value })}
                    className="max-w-40"
                  />
                  <Label className="flex items-center gap-2 text-xs font-normal">
                    <Checkbox
                      checked={state.seatLimitCustomText}
                      onCheckedChange={(c) => onChange({ ...state, seatLimitCustomText: !!c })}
                    />
                    Customise text for seat limit
                  </Label>
                  {state.seatLimitCustomText && (
                    <Input
                      placeholder="e.g. Only {{seatNo}} seats left"
                      value={state.seatLimitText}
                      onChange={(e) => onChange({ ...state, seatLimitText: e.target.value })}
                    />
                  )}
                </div>
              </ToggleRow>

              <ToggleRow
                icon={KeyRoundIcon}
                tone="info"
                title="Add a start date"
                description="The date the service itself starts — a workshop, masterclass or webinar date. Not needed for courses or memberships that can be bought any time."
                checked={state.startDateEnabled}
                onCheckedChange={(v) => onChange({ ...state, startDateEnabled: v })}
              >
                <Input
                  type="date"
                  value={state.startDate}
                  onChange={(e) => onChange({ ...state, startDate: e.target.value })}
                  className="max-w-52"
                />
              </ToggleRow>

              <ToggleRow
                icon={KeyRoundIcon}
                tone="info"
                title="Set service validity"
                description="Give customers access for a limited period after purchase. Lifetime access if off."
                checked={state.serviceValidityEnabled}
                onCheckedChange={(v) => onChange({ ...state, serviceValidityEnabled: v })}
              >
                <Input
                  type="number"
                  placeholder="Validity in days"
                  value={state.validityDays}
                  onChange={(e) => onChange({ ...state, validityDays: e.target.value })}
                  className="max-w-40"
                />
              </ToggleRow>

              <CompactToggleRow
                icon={KeyRoundIcon}
                label="Enable re-register / re-purchase of service"
                caption="Allow customers to re-register or repurchase this service. If disabled, they can buy it only once."
                checked={state.reRegisterEnabled}
                onCheckedChange={(v) => onChange({ ...state, reRegisterEnabled: v })}
              />
            </ItemGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payments">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <RowIcon icon={WalletCardsIcon} tone="success" className="size-7 rounded-tm-sm" />
              Payments & Checkout
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ItemGroup>
              <CompactToggleRow
                icon={WalletCardsIcon}
                label="Enable No Cost EMI"
                caption="Let customers pay via interest-free EMI; the interest is borne by you. Minimum price ₹6000, Indian payments only."
                checked={state.noCostEmiEnabled}
                onCheckedChange={(v) => onChange({ ...state, noCostEmiEnabled: v })}
              />
              <CompactToggleRow
                icon={WalletCardsIcon}
                label="Enable Juspay for improved payment success rates"
                caption="Enabling Juspay will attract an additional 0.25% payment gateway fee."
                checked={state.juspayEnabled}
                onCheckedChange={(v) => onChange({ ...state, juspayEnabled: v })}
              />
              <ToggleRow
                icon={WalletCardsIcon}
                tone="success"
                title="Override Payment Gateway logic"
                description="Override TagMango's automatic payment gateway selection for this service."
                checked={state.overrideGatewayEnabled}
                onCheckedChange={(v) => onChange({ ...state, overrideGatewayEnabled: v })}
              >
                <div className="flex flex-col gap-3">
                  <RadioGroup
                    value={state.gatewayRegion}
                    onValueChange={(v) => onChange({ ...state, gatewayRegion: v as AdvancedSettingsState["gatewayRegion"] })}
                  >
                    <Label className="flex items-center gap-2 text-xs font-normal">
                      <RadioGroupItem value="indian" /> Indian (Razorpay / Paytm)
                    </Label>
                    <Label className="flex items-center gap-2 text-xs font-normal">
                      <RadioGroupItem value="international" /> International (Stripe)
                    </Label>
                  </RadioGroup>
                  {state.gatewayRegion === "indian" && (
                    <p className="rounded-tm-md bg-destructive-bg px-3 py-2 text-xs text-destructive-text">
                      Enabling this allows purchases only with Indian payment options and a valid Indian phone number.
                    </p>
                  )}
                </div>
              </ToggleRow>
            </ItemGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notifications">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <RowIcon icon={BellRingIcon} tone="warning" className="size-7 rounded-tm-sm" />
              Notifications
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ItemGroup>
              <CompactToggleRow
                icon={BellRingIcon}
                label="Email on every purchase"
                caption="Get buyer details as soon as they pay."
                checked={state.notifyPurchase}
                onCheckedChange={(v) => onChange({ ...state, notifyPurchase: v })}
              />
              <CompactToggleRow
                icon={BellRingIcon}
                label="Email on payment failure"
                caption="Get notified when a payment doesn't go through."
                checked={state.notifyFailure}
                onCheckedChange={(v) => onChange({ ...state, notifyFailure: v })}
              />
            </ItemGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tracking">
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              <RowIcon icon={LineChartIcon} tone="neutral" className="size-7 rounded-tm-sm" />
              Tracking & Analytics
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ItemGroup>
              <CompactToggleRow
                icon={LineChartIcon}
                label="Facebook Pixel"
                caption="Track PageView events from your META Ads Manager."
                checked={state.fbPixelEnabled}
                onCheckedChange={(v) => onChange({ ...state, fbPixelEnabled: v })}
              />
            </ItemGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ServicePickerDialog
        open={freebieOpen}
        onOpenChange={setFreebieOpen}
        title="Add freebie services"
        description="Grant access to these services for free when this one is purchased."
        options={AVAILABLE_SERVICES}
        selected={state.freebieServiceIds}
        onConfirm={(selected) => onChange({ ...state, freebieServiceIds: selected })}
      />
    </div>
  )
}
