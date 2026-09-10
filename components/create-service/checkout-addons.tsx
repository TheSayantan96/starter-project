"use client"

import * as React from "react"
import {
  ClockIcon,
  FileTextIcon,
  TicketPlusIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemActions } from "@/components/ui/item"
import { ToggleRow } from "@/components/create-service/toggle-row"
import { AddRow } from "@/components/create-service/add-row"
import { AdvancedSettingsSection } from "@/components/create-service/advanced-settings-section"
import { ServicePickerDialog } from "@/components/create-service/picker-dialog"
import {
  AVAILABLE_CONNECTIONS,
  AVAILABLE_SERVICES,
} from "@/components/create-service/types"
import type {
  AdvancedSettingsState,
  CheckoutState,
  CustomField,
} from "@/components/create-service/types"

let fieldId = 0

export function CheckoutAddons({
  state,
  onChange,
  advanced,
  onAdvancedChange,
}: {
  state: CheckoutState
  onChange: (next: CheckoutState) => void
  advanced: AdvancedSettingsState
  onAdvancedChange: (next: AdvancedSettingsState) => void
}) {
  const [fieldFormOpen, setFieldFormOpen] = React.useState(false)
  const [fieldLabel, setFieldLabel] = React.useState("")
  const [fieldType, setFieldType] = React.useState<CustomField["type"]>("text")
  const [fieldOptional, setFieldOptional] = React.useState(true)

  const [upsellOpen, setUpsellOpen] = React.useState(false)
  const [funnelOpen, setFunnelOpen] = React.useState(false)

  const saveField = () => {
    if (!fieldLabel.trim()) return
    fieldId += 1
    onChange({
      ...state,
      customFields: [
        ...state.customFields,
        { id: `field-${fieldId}`, label: fieldLabel.trim(), type: fieldType, optional: fieldOptional },
      ],
    })
    setFieldLabel("")
    setFieldType("text")
    setFieldOptional(true)
    setFieldFormOpen(false)
  }

  const removeField = (id: string) =>
    onChange({ ...state, customFields: state.customFields.filter((f) => f.id !== id) })

  return (
    <div className="flex flex-col gap-8">
      <ItemGroup>
        <AddRow
          icon={FileTextIcon}
          tone="info"
          title="Custom field"
          description="On the checkout page, if you want to get some more information from your subscriber, you can add it here."
          count={state.customFields.length || undefined}
          open={fieldFormOpen}
          onAdd={() => setFieldFormOpen((v) => !v)}
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <Input
                placeholder="e.g. How did you hear about us"
                value={fieldLabel}
                onChange={(event) => setFieldLabel(event.target.value)}
                className="flex-1"
              />
              <Select value={fieldType} onValueChange={(v) => setFieldType(v as CustomField["type"])}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Short Text</SelectItem>
                  <SelectItem value="dropdown">Drop Down</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Label className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
              <Checkbox checked={fieldOptional} onCheckedChange={(c) => setFieldOptional(!!c)} />
              Optional for the buyer
            </Label>
            <div className="flex justify-end">
              <Button size="sm" onClick={saveField}>
                Add field
              </Button>
            </div>
          </div>
        </AddRow>
        {state.customFields.map((field) => (
          <Item key={field.id} variant="muted" size="sm" className="ml-14 w-auto">
            <ItemMedia variant="icon">
              <FileTextIcon className="text-muted-foreground" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-sm font-normal">
                {field.label}
                <Badge variant="outline" className="text-[10px]">
                  {field.type === "text" ? "Short Text" : "Drop Down"}
                </Badge>
              </ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button variant="neutral-ghost" size="icon-xs" onClick={() => removeField(field.id)}>
                <Trash2Icon />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>

      <ItemGroup>
        <AddRow
          icon={TicketPlusIcon}
          tone="primary"
          title="Upsell services"
          description="With this option, you can attach up to three of your services to this one and show them as options for the buyer."
          count={state.upsellServiceIds.length || undefined}
          onAdd={() => setUpsellOpen(true)}
        />

        <AddRow
          icon={UsersIcon}
          tone="success"
          title="Funnel Bridging"
          badge="NEW"
          description="With this option, you can attach your connected creator's services to your own service and earn a commission."
          count={state.funnelConnection ? 1 : undefined}
          onAdd={() => setFunnelOpen(true)}
        />
      </ItemGroup>

      <ItemGroup>
        <ToggleRow
          icon={ClockIcon}
          tone="warning"
          title="Timer"
          badge="NEW"
          description="Show a countdown timer on checkout to create urgency and boost conversions."
          checked={state.timerEnabled}
          onCheckedChange={(checked) => onChange({ ...state, timerEnabled: checked })}
        >
          <div className="flex flex-col gap-3">
            <Select
              value={state.timerType}
              onValueChange={(v) => onChange({ ...state, timerType: (v ?? "countdown") as CheckoutState["timerType"] })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="countdown">Countdown timer</SelectItem>
                <SelectItem value="daily">Daily Countdown</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="datetime-local"
              value={state.timerEndDate}
              onChange={(event) => onChange({ ...state, timerEndDate: event.target.value })}
            />
          </div>
        </ToggleRow>

        <ToggleRow
          icon={FileTextIcon}
          tone="neutral"
          title="Terms & Conditions"
          badge="NEW"
          description="Enabling this will allow you to set the Terms and Conditions that the user will be required to accept before they can purchase this service."
          checked={state.tcEnabled}
          onCheckedChange={(checked) => onChange({ ...state, tcEnabled: checked })}
        >
          <Textarea
            placeholder="Add your terms & conditions here…"
            value={state.tcText}
            onChange={(event) => onChange({ ...state, tcText: event.target.value })}
            rows={4}
          />
        </ToggleRow>
      </ItemGroup>

      <AdvancedSettingsSection state={advanced} onChange={onAdvancedChange} />

      <ServicePickerDialog
        open={upsellOpen}
        onOpenChange={setUpsellOpen}
        title="Select services for upselling"
        description="These services are also shown on the checkout page. Up to three."
        options={AVAILABLE_SERVICES}
        selected={state.upsellServiceIds}
        max={3}
        onConfirm={(selected) => onChange({ ...state, upsellServiceIds: selected })}
      />
      <ServicePickerDialog
        open={funnelOpen}
        onOpenChange={setFunnelOpen}
        title="Bridge a connected creator's service"
        description="Pick a connection, then choose the service to show on your checkout."
        options={AVAILABLE_CONNECTIONS}
        selected={state.funnelConnection ? [state.funnelConnection] : []}
        max={1}
        onConfirm={(selected) => onChange({ ...state, funnelConnection: selected[0] ?? null })}
      />
    </div>
  )
}
