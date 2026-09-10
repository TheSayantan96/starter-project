"use client"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// A row of single-select filter chips (e.g. All/Published/Draft/Recommended)
// plus any number of trailing dropdown filters (e.g. Service, Duration) --
// the pattern used above list/grid views across Courses, Workshops, etc.
function FilterBar({
  filters,
  value,
  onValueChange,
  dropdowns,
  className,
}: {
  filters: string[]
  value: string
  onValueChange?: (value: string) => void
  dropdowns?: { label: string; options: string[] }[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <ToggleGroup
        variant="outline"
        spacing={0}
        value={[value]}
        onValueChange={(next) => {
          const [first] = next as string[]
          if (first) onValueChange?.(first)
        }}
      >
        {filters.map((filter) => (
          <ToggleGroupItem key={filter} value={filter}>
            {filter}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {dropdowns?.map((dropdown) => (
        <Select key={dropdown.label}>
          <SelectTrigger size="sm">
            <SelectValue placeholder={dropdown.label} />
          </SelectTrigger>
          <SelectContent>
            {dropdown.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}

export { FilterBar }
