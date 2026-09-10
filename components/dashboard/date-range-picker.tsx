"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function DateRangePicker({
  value,
  onValueChange,
  className,
}: {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  className?: string
}) {
  const label = value?.from
    ? value.to
      ? `${format(value.from, "MMM d, yyyy")} - ${format(value.to, "MMM d, yyyy")}`
      : format(value.from, "MMM d, yyyy")
    : "Start date - End date"

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" className={className} />}
      >
        <CalendarIcon data-icon="inline-start" />
        {label}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto p-0"
        aria-label="Choose date range"
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={onValueChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
