"use client"

import { ImagePlusIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import type { DetailsState } from "@/components/create-service/types"

/**
 * Finding #5 — the one tab every seller must finish stays spare: three
 * fields, one small caption, no standing spec paragraphs or extra chrome.
 * Everything optional (cover format specifics, AI copy help) is a small
 * secondary action, not competing visual weight.
 */
export function ServiceDetailsTab({
  state,
  onChange,
}: {
  state: DetailsState
  onChange: (next: DetailsState) => void
}) {
  return (
    <div className="flex flex-col gap-7">
      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="service-title">Service title</FieldLabel>
          <Button variant="neutral-ghost" size="sm">
            <SparklesIcon /> Enhance with AI
          </Button>
        </div>
        <FieldContent>
          <Input
            id="service-title"
            placeholder="e.g. Mango Mastermind: 6-Week Growth Intensive"
            value={state.title}
            onChange={(event) => onChange({ ...state, title: event.target.value })}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Cover</FieldLabel>
        <FieldContent>
          <button
            type="button"
            onClick={() => onChange({ ...state, coverAdded: !state.coverAdded })}
            className="group flex h-32 w-full flex-col items-center justify-center gap-2 rounded-tm-md border border-border-strong bg-surface-sunken text-sm text-muted-foreground transition-colors hover:border-action-primary-surface-border hover:bg-action-primary-surface"
          >
            {state.coverAdded ? (
              <span className="text-foreground">Cover uploaded — click to remove</span>
            ) : (
              <>
                <span className="flex size-10 items-center justify-center rounded-tm-full bg-card text-muted-foreground shadow-tm-1 transition-colors group-hover:text-action-primary-text">
                  <ImagePlusIcon className="size-5" />
                </span>
                Upload cover image or video
              </>
            )}
          </button>
        </FieldContent>
      </Field>

      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="service-description">Description</FieldLabel>
          <Button variant="neutral-ghost" size="sm">
            <SparklesIcon /> Enhance with AI
          </Button>
        </div>
        <FieldContent>
          <Textarea
            id="service-description"
            placeholder="Describe what buyers will get, who it's for, and the outcome they can expect…"
            rows={5}
            value={state.description}
            onChange={(event) => onChange({ ...state, description: event.target.value })}
          />
        </FieldContent>
      </Field>
    </div>
  )
}
