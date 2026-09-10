export type PricingType = "one-time" | "subscription" | "free"
export type PayType = "fixed" | "pwyw"
export type GstMode = "inclusive" | "exclusive"
export type BillingInterval = "monthly" | "quarterly" | "half-yearly" | "yearly"
export type GatewayRegion = "indian" | "international"

export interface CustomField {
  id: string
  label: string
  type: "text" | "dropdown"
  optional: boolean
}

export interface IntlPrice {
  id: string
  currency: string
  price: string
}

export interface RenewalCardState {
  enabled: boolean
  icon: string
  message: string
  buttonEnabled: boolean
  buttonTitle: string
  buttonUrl: string
}

export interface PricingBaseState {
  type: PricingType
  payType: PayType
  price: string
  discountEnabled: boolean
  discountPrice: string
  intlPricing: IntlPrice[]
  gstEnabled: boolean
  gstMode: GstMode
  // One-time + Fixed only
  paymentPlanEnabled: boolean
  installments: number
  // Subscription only
  billingInterval: BillingInterval
  trialEnabled: boolean
  trialDays: string
  renewalCard: RenewalCardState
}

export interface CheckoutState {
  customFields: CustomField[]
  upsellServiceIds: string[]
  funnelConnection: string | null
  timerEnabled: boolean
  timerType: "countdown" | "daily"
  timerEndDate: string
  tcEnabled: boolean
  tcText: string
}

export interface AdvancedSettingsState {
  otpLessCheckout: boolean
  hideCoupon: boolean
  multipleQuantity: boolean
  freebieEnabled: boolean
  freebieServiceIds: string[]

  seatLimitEnabled: boolean
  seatCount: string
  seatLimitCustomText: boolean
  seatLimitText: string

  startDateEnabled: boolean
  startDate: string

  serviceValidityEnabled: boolean
  validityDays: string

  reRegisterEnabled: boolean

  noCostEmiEnabled: boolean
  juspayEnabled: boolean
  overrideGatewayEnabled: boolean
  gatewayRegion: GatewayRegion

  notifyPurchase: boolean
  notifyFailure: boolean

  fbPixelEnabled: boolean
}

export interface SuccessState {
  customSection: { title: string; description: string } | null
  scriptEnabled: boolean
  script: string
  buttonEnabled: boolean
  buttonTitle: string
  buttonUrl: string
  buttonHidden: boolean
  redirectEnabled: boolean
  redirectUrl: string
}

export interface DetailsState {
  title: string
  description: string
  coverAdded: boolean
}

export const AVAILABLE_SERVICES = [
  "Occult Basic Course",
  "Scholarship exam for 7th std",
  "Tarot advance course",
  "Basics of Tarot",
  "Parenting - 1:1",
] as const

export const AVAILABLE_CONNECTIONS = [
  "Priya Sharma — Career Coaching Hub",
  "Rohit Verma — Fitness Studio",
] as const
