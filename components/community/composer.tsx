"use client"

import * as React from "react"
import {
  BarChart3Icon,
  CheckIcon,
  ChevronLeftIcon,
  ClockIcon,
  HeadphonesIcon,
  ImageIcon,
  MicIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  TagIcon,
  VideoIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

type Screen =
  | "compose"
  | "tags"
  | "service"
  | "exclude-service"
  | "poll"
  | "schedule"
  | "settings"

type ServiceOption = {
  id: string
  name: string
  price: string
  billing: string
}

type PollDraft = {
  question: string
  options: string[]
  showResults: boolean
  allowChangeVote: boolean
  duration: string
}

// Sourced from the real "Select a service" list on the production platform
// -- not a live catalog, just enough sample data to demonstrate the picker.
const SERVICES: ServiceOption[] = [
  { id: "madhuri", name: "Madhuri Garg (DO NOT DELETE)", price: "free", billing: "one-time" },
  { id: "demo", name: "Demo (DO NOT DELETE)", price: "free", billing: "one-time" },
  { id: "chess", name: "Demo call - Chess Classes", price: "free", billing: "one-time" },
  { id: "discovery", name: "10 mins discovery call", price: "free", billing: "one-time" },
  { id: "career", name: "Free Career Counselling Session", price: "free", billing: "one-time" },
]

const TAG_OPTIONS = [
  "Digital Future & Technologies",
  "Finance & Banking",
  "Media & Entertainment",
  "Entrepreneurs",
  "Wellness & Longevity",
  "L&D and The Future Of Work",
  "Climate Change & Sustainability",
]

const POLL_DURATIONS = ["1d", "3d", "1w", "2w"]

const emptyPoll: PollDraft = {
  question: "",
  options: ["", ""],
  showResults: true,
  allowChangeVote: true,
  duration: "1w",
}

function ScreenHeader({
  title,
  onBack,
  action,
}: {
  title: string
  onBack: () => void
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-base font-medium"
      >
        <ChevronLeftIcon className="size-4" />
        {title}
      </button>
      {action}
    </div>
  )
}

function SaveChangesButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="neutral-solid" size="sm" onClick={onClick}>
      <CheckIcon data-icon="inline-start" />
      Save changes
    </Button>
  )
}

export function Composer({
  placeholder = "Share something with the community...",
  onPost,
}: {
  placeholder?: string
  onPost?: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [screen, setScreen] = React.useState<Screen>("compose")
  const [content, setContent] = React.useState("")
  const [tags, setTags] = React.useState<string[]>([])
  const [tagSearch, setTagSearch] = React.useState("")
  const [customTag, setCustomTag] = React.useState("")
  const [includedServices, setIncludedServices] = React.useState<string[]>([])
  const [excludedServices, setExcludedServices] = React.useState<string[]>([])
  const [serviceSearch, setServiceSearch] = React.useState("")
  const [poll, setPoll] = React.useState<PollDraft | null>(null)
  const [scheduledAt, setScheduledAt] = React.useState("")
  const [commentingOff, setCommentingOff] = React.useState(false)

  const reset = () => {
    setScreen("compose")
    setContent("")
    setTags([])
    setTagSearch("")
    setCustomTag("")
    setIncludedServices([])
    setExcludedServices([])
    setServiceSearch("")
    setPoll(null)
    setScheduledAt("")
    setCommentingOff(false)
  }

  const publish = () => {
    if (!content.trim() && !poll?.question.trim()) return
    onPost?.(content)
    reset()
    setOpen(false)
  }

  const canPublish = Boolean(content.trim() || poll?.question.trim())

  return (
    <div>
      <div className="flex items-center gap-3 py-3">
        <Avatar size="sm">
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex-1 rounded-tm-full bg-input/50 px-4 py-2 text-left text-sm text-muted-foreground hover:bg-input"
        >
          {placeholder}
        </button>
        <Button size="sm" disabled>
          Post
        </Button>
      </div>
      <div className="flex items-center gap-1 pb-3">
        <Button variant="neutral-ghost" size="sm">
          <ImageIcon data-icon="inline-start" />
          Photo
        </Button>
        <Button variant="neutral-ghost" size="sm">
          <VideoIcon data-icon="inline-start" />
          Video
        </Button>
        <Button variant="neutral-ghost" size="sm">
          <MicIcon data-icon="inline-start" />
          Audio
        </Button>
      </div>
      <Separator />

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) reset()
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {screen === "compose" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-tm-md bg-muted">
                  <ImageIcon className="size-4 text-muted-foreground" />
                </div>
                <DialogTitle>Create new post</DialogTitle>
              </div>

              <button
                type="button"
                onClick={() => setScreen("tags")}
                className="flex items-center gap-2 rounded-tm-full border border-border px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted"
              >
                <TagIcon className="size-4 shrink-0" />
                <span className="flex-1">
                  {tags.length > 0
                    ? `${tags.length} tag${tags.length === 1 ? "" : "s"} selected`
                    : "Selected tags will show up here."}
                </span>
                <PlusIcon className="size-4 shrink-0 text-foreground" />
              </button>

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="neutral-surface"
                    size="sm"
                    onClick={() => setScreen("service")}
                  >
                    {includedServices.length > 0 ? (
                      <>
                        {SERVICES.find((s) => s.id === includedServices[0])?.name}
                        {includedServices.length > 1
                          ? ` +${includedServices.length - 1}`
                          : ""}
                      </>
                    ) : (
                      <>
                        <PlusIcon data-icon="inline-start" />
                        service
                      </>
                    )}
                  </Button>
                </div>
                <Button
                  variant="neutral-surface"
                  size="sm"
                  onClick={() => setScreen("exclude-service")}
                >
                  {excludedServices.length > 0 ? (
                    <>
                      {SERVICES.find((s) => s.id === excludedServices[0])?.name}
                      {excludedServices.length > 1
                        ? ` +${excludedServices.length - 1}`
                        : ""}
                    </>
                  ) : (
                    <>
                      <PlusIcon data-icon="inline-start" />
                      exclude service
                    </>
                  )}
                </Button>
              </div>

              <Textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="What do you want to share about?"
                className="min-h-32"
                autoFocus
              />

              <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
                <div className="flex items-center gap-1">
                  <Button
                    variant="neutral-ghost"
                    size="icon-sm"
                    aria-label="Add image"
                  >
                    <ImageIcon />
                  </Button>
                  <Button
                    variant="neutral-ghost"
                    size="icon-sm"
                    aria-label="Add video"
                  >
                    <PlayIcon />
                  </Button>
                  <Button
                    variant="neutral-ghost"
                    size="icon-sm"
                    aria-label="Add audio"
                  >
                    <HeadphonesIcon />
                  </Button>
                  <Button
                    variant="neutral-ghost"
                    size="icon-sm"
                    aria-label="Add poll"
                    onClick={() => {
                      setPoll(emptyPoll)
                      setScreen("poll")
                    }}
                  >
                    <BarChart3Icon />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="neutral-ghost"
                    size="icon-sm"
                    aria-label="Schedule post"
                    onClick={() => setScreen("schedule")}
                  >
                    <ClockIcon />
                  </Button>
                  <Button
                    variant="neutral-ghost"
                    size="icon-sm"
                    aria-label="More options"
                    onClick={() => setScreen("settings")}
                  >
                    <SlidersHorizontalIcon />
                  </Button>
                  <Button
                    variant="neutral-solid"
                    size="sm"
                    disabled={!canPublish}
                    onClick={publish}
                  >
                    {scheduledAt ? "Schedule" : "Publish"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {screen === "tags" && (
            <div className="flex flex-col gap-4">
              <ScreenHeader
                title="Add Tags"
                onBack={() => setScreen("compose")}
                action={<SaveChangesButton onClick={() => setScreen("compose")} />}
              />

              <div className="relative">
                <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={tagSearch}
                  onChange={(event) => setTagSearch(event.target.value)}
                  placeholder="Search tags by name"
                  className="w-full rounded-tm-full border border-border bg-transparent py-2 pr-3 pl-9 text-sm outline-none focus-visible:border-ring"
                />
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                <Checkbox
                  checked={tags.length === TAG_OPTIONS.length}
                  onCheckedChange={(checked) =>
                    setTags(checked ? [...TAG_OPTIONS] : [])
                  }
                />
                Select all
              </label>

              <div className="flex max-h-56 flex-col gap-1 overflow-y-auto">
                {TAG_OPTIONS.filter((tag) =>
                  tag.toLowerCase().includes(tagSearch.toLowerCase())
                ).map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center justify-between gap-3 rounded-tm-md px-1 py-2 text-sm hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <TagIcon className="size-4 text-muted-foreground" />
                      {tag}
                    </span>
                    <Checkbox
                      checked={tags.includes(tag)}
                      onCheckedChange={(checked) =>
                        setTags((current) =>
                          checked
                            ? [...current, tag]
                            : current.filter((t) => t !== tag)
                        )
                      }
                    />
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-border pt-4">
                <input
                  value={customTag}
                  onChange={(event) => setCustomTag(event.target.value)}
                  placeholder="e.g. Finance, Marketing"
                  className="flex-1 rounded-tm-md border border-border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring"
                />
                <Button
                  variant="neutral-surface"
                  size="sm"
                  disabled={!customTag.trim()}
                  onClick={() => {
                    const newTags = customTag
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                    setTags((current) => [...new Set([...current, ...newTags])])
                    setCustomTag("")
                  }}
                >
                  <PlusIcon data-icon="inline-start" />
                  Add
                </Button>
              </div>
              <p className="-mt-2 text-xs text-muted-foreground">
                Tags are comma separated
              </p>
            </div>
          )}

          {(screen === "service" || screen === "exclude-service") && (
            <div className="flex flex-col gap-4">
              <ScreenHeader
                title="Select service"
                onBack={() => setScreen("compose")}
                action={
                  <SaveChangesButton onClick={() => setScreen("compose")} />
                }
              />

              <p className="text-sm text-muted-foreground">
                {screen === "service"
                  ? "Who can see your post?"
                  : "These members won't see this post."}
              </p>

              <div className="relative">
                <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={serviceSearch}
                  onChange={(event) => setServiceSearch(event.target.value)}
                  placeholder="Search service by name"
                  className="w-full rounded-tm-full border border-border bg-transparent py-2 pr-3 pl-9 text-sm outline-none focus-visible:border-ring"
                />
              </div>

              {(() => {
                const selected =
                  screen === "service" ? includedServices : excludedServices
                const setSelected =
                  screen === "service" ? setIncludedServices : setExcludedServices
                const opposite =
                  screen === "service" ? excludedServices : includedServices
                const available = SERVICES.filter(
                  (service) =>
                    !opposite.includes(service.id) &&
                    service.name.toLowerCase().includes(serviceSearch.toLowerCase())
                )

                return (
                  <>
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Checkbox
                        checked={
                          available.length > 0 &&
                          available.every((service) => selected.includes(service.id))
                        }
                        onCheckedChange={(checked) =>
                          setSelected(
                            checked ? available.map((service) => service.id) : []
                          )
                        }
                      />
                      Select all
                    </label>

                    <div className="flex max-h-56 flex-col gap-1 overflow-y-auto">
                      {available.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center justify-between gap-3 rounded-tm-md px-1 py-2 text-sm hover:bg-muted"
                        >
                          <div>
                            <p>{service.name}</p>
                            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              {service.price}
                              <Badge variant="secondary" className="bg-selected-surface text-selected-foreground">
                                ACTIVE
                              </Badge>
                              {service.billing}
                            </p>
                          </div>
                          <Checkbox
                            checked={selected.includes(service.id)}
                            onCheckedChange={(checked) =>
                              setSelected((current) =>
                                checked
                                  ? [...current, service.id]
                                  : current.filter((id) => id !== service.id)
                              )
                            }
                          />
                        </label>
                      ))}
                    </div>
                  </>
                )
              })()}
            </div>
          )}

          {screen === "poll" && poll && (
            <div className="flex flex-col gap-4">
              <ScreenHeader title="Create poll" onBack={() => setScreen("compose")} />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Question</label>
                <input
                  value={poll.question}
                  onChange={(event) => {
                    const question = event.target.value
                    setPoll((current) => current && { ...current, question })
                  }}
                  placeholder="Ask something..."
                  className="rounded-tm-md border border-border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Options</label>
                {poll.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      value={option}
                      maxLength={30}
                      onChange={(event) => {
                        const value = event.target.value
                        setPoll(
                          (current) =>
                            current && {
                              ...current,
                              options: current.options.map((o, i) =>
                                i === index ? value : o
                              ),
                            }
                        )
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 rounded-tm-md border border-border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring"
                    />
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {option.length}/30
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setPoll(
                      (current) =>
                        current && { ...current, options: [...current.options, ""] }
                    )
                  }
                  className="flex items-center gap-1.5 self-start text-sm text-action-primary-text hover:underline"
                >
                  <PlusIcon className="size-4" />
                  Add option
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Allow members to see results</span>
                <Switch
                  checked={poll.showResults}
                  onCheckedChange={(checked) =>
                    setPoll((current) => current && { ...current, showResults: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Allow members to change their vote</span>
                <Switch
                  checked={poll.allowChangeVote}
                  onCheckedChange={(checked) =>
                    setPoll((current) => current && { ...current, allowChangeVote: checked })
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Poll duration</label>
                <Select
                  value={poll.duration}
                  onValueChange={(value) =>
                    value &&
                    setPoll((current) => current && { ...current, duration: value })
                  }
                >
                  <SelectTrigger size="sm" className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {POLL_DURATIONS.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {poll.question.trim() && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Preview</label>
                  <div className="rounded-tm-lg border border-border p-4">
                    <p className="font-semibold">{poll.question}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {poll.options
                        .filter((option) => option.trim())
                        .map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-tm-md border border-border px-3 py-2 text-sm"
                          >
                            <span className="size-3.5 shrink-0 rounded-full border border-border" />
                            {option}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
                {includedServices.length > 0 && (
                  <Badge variant="outline">
                    {SERVICES.find((s) => s.id === includedServices[0])?.name}
                  </Badge>
                )}
                <Badge variant="outline">
                  {excludedServices.length > 0
                    ? `${excludedServices.length} excluded`
                    : "+ exclude service"}
                </Badge>
                {tags.length > 0 && (
                  <Badge variant="outline">
                    <TagIcon data-icon="inline-start" />
                    {tags.length} tags
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setPoll(null)
                    setScreen("compose")
                  }}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Remove poll
                </button>
                <Button
                  variant="neutral-solid"
                  size="sm"
                  disabled={!canPublish}
                  onClick={publish}
                >
                  Publish
                </Button>
              </div>
            </div>
          )}

          {screen === "schedule" && (
            <div className="flex flex-col gap-4">
              <ScreenHeader title="Schedule post" onBack={() => setScreen("compose")} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">
                  Choose date and time
                </label>
                <div className="relative">
                  <ClockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(event) => setScheduledAt(event.target.value)}
                    className="w-full rounded-tm-md border border-border bg-transparent py-2 pr-3 pl-9 text-sm outline-none focus-visible:border-ring"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setScheduledAt("")
                    setScreen("compose")
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="neutral-solid"
                  className="flex-1"
                  onClick={() => setScreen("compose")}
                >
                  Done
                </Button>
              </div>
            </div>
          )}

          {screen === "settings" && (
            <div className="flex flex-col gap-4">
              <ScreenHeader
                title="Change post settings"
                onBack={() => setScreen("compose")}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">Turn off commenting</span>
                <Switch
                  checked={commentingOff}
                  onCheckedChange={setCommentingOff}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setScreen("compose")}
                >
                  Back
                </Button>
                <Button
                  variant="neutral-solid"
                  className="flex-1"
                  onClick={() => setScreen("compose")}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
