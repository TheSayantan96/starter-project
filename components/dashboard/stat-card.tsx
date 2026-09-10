"use client"

import * as React from "react"
import { InfoIcon, type LucideIcon } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  type LineProps,
} from "recharts"

import { cn } from "@/lib/utils"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { CircularProgress } from "@/components/ui/circular-progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function StatLabel({
  label,
  tooltip,
}: {
  label: string
  tooltip?: string
}) {
  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {label}
      {tooltip && (
        <Tooltip>
          <TooltipTrigger
            render={<InfoIcon className="size-3.5 cursor-help" />}
          />
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

// Plain metric card -- label + value + a small icon swatch. No chart, no
// interactivity: for counts like "Total Workshops" / "Total Attendees".
function StatCard({
  label,
  value,
  icon: Icon,
  tooltip,
  className,
}: {
  label: string
  value: string | number
  icon: LucideIcon
  tooltip?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 rounded-tm-lg border border-border bg-card p-4",
        className
      )}
    >
      <div>
        <StatLabel label={label} tooltip={tooltip} />
        <p className="mt-2 text-2xl font-semibold">{value}</p>
      </div>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-tm-md bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
    </div>
  )
}

// Metric card with a trend line and a period selector -- for things like
// "Active Members" tracked over the last N days.
function StatCardChart({
  label,
  value,
  data,
  dataKey,
  tooltip,
  period,
  periodOptions = ["Past 7 Days", "Past 30 Days", "Past 90 Days"],
  onPeriodChange,
  className,
}: {
  label: string
  value: string | number
  data: Record<string, string | number>[]
  dataKey: string
  tooltip?: string
  period: string
  periodOptions?: string[]
  onPeriodChange?: (period: string) => void
  className?: string
}) {
  const config = {
    [dataKey]: { label, color: "var(--chart-2)" },
  } satisfies ChartConfig

  return (
    <div
      className={cn(
        "rounded-tm-lg border border-border bg-card p-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <StatLabel label={label} tooltip={tooltip} />
        <Select
          value={period}
          onValueChange={(value) => value && onPeriodChange?.(value)}
        >
          <SelectTrigger size="sm" className="bg-transparent">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {periodOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <ChartContainer config={config} className="mt-3 h-28 w-full">
        <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
          />
          <YAxis tickLine={false} axisLine={false} width={20} fontSize={11} />
          <Line
            dataKey={dataKey}
            stroke={`var(--color-${dataKey})` as LineProps["stroke"]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

// Metric card with a circular-progress ring -- for completion-style metrics
// like "Task Completion" / "Quiz Participation".
function StatCardProgress({
  icon: Icon,
  title,
  meta,
  value,
  className,
}: {
  icon: LucideIcon
  title: string
  meta: string
  value: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-tm-lg border border-border bg-card p-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
          <Icon className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{meta}</p>
        </div>
      </div>
      <CircularProgress value={value} size={48} strokeWidth={4}>
        <span className="text-xs font-semibold">{value}%</span>
      </CircularProgress>
    </div>
  )
}

export { StatCard, StatCardChart, StatCardProgress }
