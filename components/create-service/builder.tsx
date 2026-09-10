"use client"

import * as React from "react"
import { PlayIcon, RocketIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"
import { RowIcon } from "@/components/create-service/row-icon"
import { WorkspaceShell } from "@/components/workspace/workspace-shell"
import { WorkflowHeader } from "@/components/workspace/workflow-header"
import { WorkflowNav, type WorkflowStep } from "@/components/workspace/workflow-nav"
import { PreviewPanel, type PreviewSection } from "@/components/create-service/preview-panel"
import { ServiceDetailsTab } from "@/components/create-service/service-details-tab"
import { PricingTab } from "@/components/create-service/pricing-tab"
import { CheckoutAddons } from "@/components/create-service/checkout-addons"
import { SuccessTab } from "@/components/create-service/success-tab"
import { RenewalCardEditor } from "@/components/create-service/renewal-card-editor"
import type {
  AdvancedSettingsState,
  CheckoutState,
  DetailsState,
  PricingBaseState,
  SuccessState,
} from "@/components/create-service/types"

type TabId = "details" | "pricing" | "checkout" | "success"

const DEFAULT_ADVANCED: AdvancedSettingsState = {
  otpLessCheckout: false,
  hideCoupon: false,
  multipleQuantity: false,
  freebieEnabled: false,
  freebieServiceIds: [],
  seatLimitEnabled: false,
  seatCount: "",
  seatLimitCustomText: false,
  seatLimitText: "",
  startDateEnabled: false,
  startDate: "",
  serviceValidityEnabled: false,
  validityDays: "",
  reRegisterEnabled: false,
  noCostEmiEnabled: false,
  juspayEnabled: false,
  overrideGatewayEnabled: false,
  gatewayRegion: "indian",
  notifyPurchase: false,
  notifyFailure: false,
  fbPixelEnabled: false,
}

export function ServiceBuilder() {
  const [activeTab, setActiveTab] = React.useState<TabId>("details")
  const [renewalOpen, setRenewalOpen] = React.useState(false)

  const [details, setDetails] = React.useState<DetailsState>({
    title: "",
    description: "",
    coverAdded: false,
  })

  const [pricing, setPricing] = React.useState<PricingBaseState>({
    type: "one-time",
    payType: "fixed",
    price: "",
    discountEnabled: false,
    discountPrice: "",
    intlPricing: [],
    gstEnabled: false,
    gstMode: "exclusive",
    paymentPlanEnabled: false,
    installments: 2,
    billingInterval: "monthly",
    trialEnabled: false,
    trialDays: "",
    renewalCard: {
      enabled: true,
      icon: "0",
      message: "",
      buttonEnabled: false,
      buttonTitle: "",
      buttonUrl: "",
    },
  })

  const [checkout, setCheckout] = React.useState<CheckoutState>({
    customFields: [],
    upsellServiceIds: [],
    funnelConnection: null,
    timerEnabled: false,
    timerType: "countdown",
    timerEndDate: "",
    tcEnabled: false,
    tcText: "",
  })

  const [advanced, setAdvanced] = React.useState<AdvancedSettingsState>(DEFAULT_ADVANCED)

  const [success, setSuccess] = React.useState<SuccessState>({
    customSection: null,
    scriptEnabled: false,
    script: "",
    buttonEnabled: false,
    buttonTitle: "",
    buttonUrl: "",
    buttonHidden: false,
    redirectEnabled: false,
    redirectUrl: "",
  })

  const detailsStatus = !details.title && !details.description ? "not-started" : !details.coverAdded || !details.title.trim() || !details.description.trim() ? "incomplete" : "completed"
  const pricingStatus = pricing.type === "free" ? "completed" : pricing.price.trim() ? "completed" : "in-progress"

  const steps: WorkflowStep[] = [
    { id: "details", label: "Service Details", status: detailsStatus },
    { id: "pricing", label: "Pricing", status: pricingStatus },
    { id: "checkout", label: "Checkout Page", status: "completed" },
    { id: "success", label: "Success Page", status: "in-progress" },
  ]

  const previewSection: PreviewSection = renewalOpen ? "renewal" : (activeTab as PreviewSection)

  return (
    <WorkspaceShell
      header={
        <WorkflowHeader
          eyebrow="Yourbrands"
          title="Create Service"
          badge={<Badge variant="outline">Draft</Badge>}
          primaryAction={
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button>
                    <RocketIcon /> Publish
                  </Button>
                }
              />
              <TooltipContent>Prototype — publishing isn&apos;t wired up here</TooltipContent>
            </Tooltip>
          }
        />
      }
      nav={
        <WorkflowNav
          steps={steps}
          activeId={activeTab}
          onSelect={(id) => {
            setRenewalOpen(false)
            setActiveTab(id as TabId)
          }}
        />
      }
      primary={
        <div className="flex flex-col gap-8">
          {!renewalOpen && (
            <Item variant="outline" className="bg-gradient-to-r from-action-primary-surface to-card">
              <ItemMedia>
                <RowIcon icon={PlayIcon} tone="primary" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-muted-foreground">Video walkthrough</ItemTitle>
                <ItemDescription className="text-foreground">
                  {activeTab === "details" && "Set up your offering"}
                  {activeTab === "pricing" && "Price your service"}
                  {activeTab === "checkout" && "Custom thank you page"}
                  {activeTab === "success" && "Custom thank you page"}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="neutral-solid" size="sm">
                  <PlayIcon /> Watch
                </Button>
              </ItemActions>
            </Item>
          )}

          {renewalOpen ? (
            <RenewalCardEditor
              state={pricing.renewalCard}
              onChange={(renewalCard) => setPricing({ ...pricing, renewalCard })}
              onBack={() => setRenewalOpen(false)}
            />
          ) : (
            <>
              {activeTab === "details" && <ServiceDetailsTab state={details} onChange={setDetails} />}
              {activeTab === "pricing" && (
                <PricingTab base={pricing} onBaseChange={setPricing} onOpenRenewalCard={() => setRenewalOpen(true)} />
              )}
              {activeTab === "checkout" && (
                <CheckoutAddons
                  state={checkout}
                  onChange={setCheckout}
                  advanced={advanced}
                  onAdvancedChange={setAdvanced}
                />
              )}
              {activeTab === "success" && <SuccessTab state={success} onChange={setSuccess} />}
            </>
          )}
        </div>
      }
      preview={
        <PreviewPanel
          section={previewSection}
          details={details}
          pricing={pricing}
          checkout={checkout}
          success={success}
          renewalIcon={pricing.renewalCard.icon}
          renewalMessage={pricing.renewalCard.message}
        />
      }
    />
  )
}
