"use client"

import * as React from "react"
import {
  CodeIcon,
  LayoutTemplateIcon,
  Link2Icon,
  MousePointerClickIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
} from "@/components/ui/item"
import { ToggleRow } from "@/components/create-service/toggle-row"
import { AddRow } from "@/components/create-service/add-row"
import { RowIcon } from "@/components/create-service/row-icon"
import type { SuccessState } from "@/components/create-service/types"

export function SuccessTab({
  state,
  onChange,
}: {
  state: SuccessState
  onChange: (next: SuccessState) => void
}) {
  const [sectionOpen, setSectionOpen] = React.useState(false)
  const [draftTitle, setDraftTitle] = React.useState("")
  const [draftDescription, setDraftDescription] = React.useState("")

  const editSection = () => {
    setDraftTitle(state.customSection?.title ?? "")
    setDraftDescription(state.customSection?.description ?? "")
    onChange({ ...state, customSection: null })
    setSectionOpen(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <ItemGroup>
        <AddRow
          icon={LayoutTemplateIcon}
          tone="primary"
          title="Custom section"
          description="Add custom text, image or video to share next steps with your customers right after purchase."
          open={sectionOpen}
          onAdd={() => setSectionOpen((v) => !v)}
        >
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Section title, e.g. What's next"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
            />
            <Textarea
              placeholder="Check your email for the onboarding call link."
              rows={2}
              value={draftDescription}
              onChange={(event) => setDraftDescription(event.target.value)}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                disabled={!draftTitle.trim()}
                onClick={() => {
                  onChange({
                    ...state,
                    customSection: { title: draftTitle.trim(), description: draftDescription.trim() },
                  })
                  setSectionOpen(false)
                }}
              >
                Add section
              </Button>
            </div>
          </div>
        </AddRow>
        {state.customSection && (
          <Item variant="muted" size="sm" className="ml-14 w-auto">
            <ItemMedia>
              <RowIcon icon={LayoutTemplateIcon} tone="primary" className="size-7" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-sm font-normal">{state.customSection.title}</ItemTitle>
              {state.customSection.description && (
                <ItemDescription>{state.customSection.description}</ItemDescription>
              )}
            </ItemContent>
            <ItemActions>
              <Button variant="neutral-ghost" size="icon-xs" onClick={editSection}>
                <PencilIcon />
              </Button>
              <Button
                variant="neutral-ghost"
                size="icon-xs"
                onClick={() => onChange({ ...state, customSection: null })}
              >
                <Trash2Icon />
              </Button>
            </ItemActions>
          </Item>
        )}
      </ItemGroup>

      <ItemGroup>
        <ToggleRow
          icon={CodeIcon}
          tone="neutral"
          title="Add custom script"
          description="Add your Facebook Pixel, Google Tag Manager or custom scripts to track conversions."
          checked={state.scriptEnabled}
          onCheckedChange={(checked) => onChange({ ...state, scriptEnabled: checked })}
        >
          <Textarea
            placeholder="<script>…</script>"
            rows={4}
            value={state.script}
            onChange={(event) => onChange({ ...state, script: event.target.value })}
            className="font-mono text-xs"
          />
        </ToggleRow>

        <ToggleRow
          icon={MousePointerClickIcon}
          tone="info"
          title="Customise button"
          description="Change the button text and URL shown on the thank-you page."
          checked={state.buttonEnabled}
          onCheckedChange={(checked) => onChange({ ...state, buttonEnabled: checked })}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Button title</Label>
              <Input
                value={state.buttonTitle}
                onChange={(event) => onChange({ ...state, buttonTitle: event.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-xs text-muted-foreground">Button URL</Label>
              <Input
                placeholder="https://example.com"
                value={state.buttonUrl}
                onChange={(event) => onChange({ ...state, buttonUrl: event.target.value })}
              />
            </div>
            <Label className="flex items-center gap-2 text-xs font-normal">
              <Checkbox
                checked={state.buttonHidden}
                onCheckedChange={(c) => onChange({ ...state, buttonHidden: !!c })}
              />
              Hide button
            </Label>
          </div>
        </ToggleRow>

        <ToggleRow
          icon={Link2Icon}
          tone="success"
          title="Redirect URL"
          description="After purchase, redirect customers to any URL after a short timeout."
          checked={state.redirectEnabled}
          onCheckedChange={(checked) => onChange({ ...state, redirectEnabled: checked })}
        >
          <Input
            placeholder="https://example.com/thank-you"
            value={state.redirectUrl}
            onChange={(event) => onChange({ ...state, redirectUrl: event.target.value })}
          />
        </ToggleRow>
      </ItemGroup>
    </div>
  )
}
