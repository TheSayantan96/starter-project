import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import * as React from "react"

import { PrefixedSearchInput } from "./prefixed-search-input"

const meta = {
  component: PrefixedSearchInput,
  tags: ["ai-generated"],
  args: {
    scopeOptions: ["Course", "Chapter", "Section"],
    scope: "Course",
    placeholder: "Search by course, chapter, or section title",
  },
} satisfies Meta<typeof PrefixedSearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [scope, setScope] = React.useState(args.scope)
    const [value, setValue] = React.useState("")
    return (
      <div className="max-w-md">
        <PrefixedSearchInput
          {...args}
          scope={scope}
          onScopeChange={setScope}
          value={value}
          onValueChange={setValue}
        />
      </div>
    )
  },
}
