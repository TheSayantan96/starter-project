"use client"

import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// A search field with a scope dropdown fused to its leading edge -- e.g.
// "Course ▾" + a search icon + the input, all inside one pill.
function PrefixedSearchInput({
  scopeOptions,
  scope,
  onScopeChange,
  placeholder,
  value,
  onValueChange,
  className,
}: {
  scopeOptions: string[]
  scope: string
  onScopeChange?: (scope: string) => void
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}) {
  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <Select value={scope} onValueChange={(next) => next && onScopeChange?.(next)}>
          <SelectTrigger
            size="sm"
            className="h-auto! gap-1 border-none! bg-transparent! p-0! shadow-none!"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            {scopeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputGroupAddon>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
      />
    </InputGroup>
  )
}

export { PrefixedSearchInput }
