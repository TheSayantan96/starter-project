"use client"

import {
  CalendarIcon,
  ChartNoAxesColumnIcon,
  ChevronRightIcon,
  CodeIcon,
  GiftIcon,
  LayersIcon,
  MonitorIcon,
  ReceiptIcon,
  RepeatIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  TrendingUpIcon,
  TrophyIcon,
  UserIcon,
  UserPlusIcon,
  VideoIcon,
  WandSparklesIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type NavItem = {
  label: string
  icon: LucideIcon
  items?: { label: string; icon: LucideIcon }[]
}

const navItems: NavItem[] = [
  { label: "Mango AI", icon: SparklesIcon },
  { label: "Mango Studio", icon: WandSparklesIcon },
  { label: "Analytics", icon: ChartNoAxesColumnIcon },
  { label: "Services", icon: LayersIcon },
  {
    label: "Products",
    icon: ShoppingCartIcon,
    items: [
      { label: "Workshops", icon: VideoIcon },
      { label: "1-1 Consultation", icon: CalendarIcon },
    ],
  },
  { label: "Sales", icon: RepeatIcon },
  { label: "Page Builder", icon: MonitorIcon },
  { label: "Customers", icon: UserIcon },
  { label: "Marketing", icon: TrendingUpIcon },
  { label: "Automation", icon: SlidersHorizontalIcon },
  { label: "Partnerships", icon: UserPlusIcon },
  { label: "Gamification", icon: TrophyIcon },
  { label: "Settings", icon: SettingsIcon },
  { label: "Billing & Plans", icon: ReceiptIcon },
  { label: "Developer Tools", icon: CodeIcon },
]

export function AppSidebar({
  activeLabel = "Mango AI",
}: {
  activeLabel?: string
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between px-3 py-3">
        <span className="px-1 text-sm font-semibold group-data-[collapsible=icon]:hidden">
          Dashboard
        </span>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.label}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.label}</span>
                            <ChevronRightIcon className="ml-auto transition-transform group-data-open/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        }
                      />
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((sub) => (
                            <SidebarMenuSubItem key={sub.label}>
                              <SidebarMenuSubButton>
                                <sub.icon />
                                <span>{sub.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.label === activeLabel}
                      tooltip={item.label}
                      className={cn(
                        item.label === activeLabel &&
                          "data-active:bg-selected-surface! data-active:text-selected-foreground! data-active:hover:bg-selected-surface!"
                      )}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Refer and Earn">
              <GiftIcon />
              <span>Refer and Earn</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
