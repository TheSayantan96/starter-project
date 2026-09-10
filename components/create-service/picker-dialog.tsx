"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"

export function ServicePickerDialog({
  open,
  onOpenChange,
  title,
  description,
  options,
  selected,
  max,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  options: readonly string[]
  selected: string[]
  max?: number
  onConfirm: (selected: string[]) => void
}) {
  const [draft, setDraft] = React.useState<string[]>(selected)
  const [wasOpen, setWasOpen] = React.useState(open)

  // Reset the draft to the committed selection whenever the dialog
  // transitions to open — adjusted during render (not an effect) per
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setDraft(selected)
  }

  const toggle = (name: string) => {
    setDraft((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name)
      if (max && prev.length >= max) return prev
      return [...prev, name]
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
          {options.map((name) => (
            <Item
              key={name}
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => toggle(name)}
            >
              <Checkbox
                checked={draft.includes(name)}
                onCheckedChange={() => toggle(name)}
                onClick={(event) => event.stopPropagation()}
              />
              <ItemContent>
                <ItemTitle className="font-normal">{name}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(draft)
              onOpenChange(false)
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
