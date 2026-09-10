import * as React from "react"

import { cn } from "@/lib/utils"

function CircularProgress({
  value,
  size = 56,
  strokeWidth = 5,
  className,
  children,
}: {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset =
    circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference

  return (
    <div
      data-slot="circular-progress"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none stroke-foreground transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {children}
        </div>
      )}
    </div>
  )
}

export { CircularProgress }
