"use client"

import * as React from "react"
import { InfoIcon, XIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function NoticeBanner({
  title,
  items,
  onDismiss,
  className,
}: {
  title: string
  items: string[]
  onDismiss?: () => void
  className?: string
}) {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) {
    return null
  }

  return (
    <Alert variant="info" className={className}>
      <InfoIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <ul className="list-disc space-y-1 pl-4">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </AlertDescription>
      <AlertAction>
        <Button
          variant="neutral-ghost"
          size="icon-xs"
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true)
            onDismiss?.()
          }}
        >
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  )
}
