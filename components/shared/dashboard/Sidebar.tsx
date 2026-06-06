"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBuildingStore,
  IconCalculator,
  IconCalendarEvent,
  IconLayoutDashboard,
  IconSettings,
  IconShield,
  IconSword,
  IconUsers,
  IconUser,
  IconLogout,
  IconBell,
  IconPointFilled,
  IconPlus,
  IconUsersGroup,
  IconSwords,
  IconAxe,
  IconBackpack,
  IconHammer,
  IconTag,
  IconArrowsExchange,
  IconChartLine,
  IconFlame,
  IconCoin,
  IconScissors,
  IconClock,
  IconAlertTriangle,
  IconCalendar,
  IconBook,
  IconNews,
  IconMap,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import logo from "@/public/assets/logo/favicon.ico";
import Image from "next/image";

// Types
type CreateAction = { label: string; href: string };

type NavPage = {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  create?: CreateAction[];
  children?: Omit<NavPage, "children">[];
};

type NavGroup = {
  title: string;
  pages: NavPage[];
};

// Navigation Data
const groups: NavGroup[] = [
  {
    title: "Overview",
    pages: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: "Members",
        href: "/dashboard/members",
        icon: <IconUsers size={18} />,
        create: [
          { label: "Invite Member", href: "/dashboard/members/invite" },
          { label: "Assign Role", href: "/dashboard/members/roles" },
        ],
        children: [
          { title: "All Members", href: "/dashboard/members", icon: <IconUsers size={16} /> },
          { title: "Roles & Permissions", href: "/dashboard/members/roles", icon: <IconShield size={16} /> },
        ],
      },
      {
        title: "Applications",
        href: "/dashboard/applications",
        icon: <IconShield size={18} />,
        badge: 3,
        create: [
          { label: "New Application Form", href: "/dashboard/applications/create" },
        ],
        children: [
          { title: "Pending", href: "/dashboard/applications/pending", icon: <IconClock size={16} />, badge: 3 },
          { title: "Approved", href: "/dashboard/applications/approved", icon: <IconPointFilled size={16} /> },
          { title: "Rejected", href: "/dashboard/applications/rejected", icon: <IconPointFilled size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Guild & Alliance",
    pages: [
      {
        title: "Guild",
        href: "/dashboard/guild",
        icon: <IconUsersGroup size={18} />,
        create: [
          { label: "Post Announcement", href: "/dashboard/guild/announcements/create" },
        ],
        children: [
          { title: "Overview", href: "/dashboard/guild", icon: <IconLayoutDashboard size={16} /> },
          { title: "Announcements", href: "/dashboard/guild/announcements", icon: <IconSwords size={16} /> },
          { title: "Statistics", href: "/dashboard/guild/stats", icon: <IconChartLine size={16} /> },
        ],
      },
      {
        title: "Alliance",
        href: "/dashboard/alliance",
        icon: <IconSwords size={18} />,
        create: [
          { label: "Alliance Announcement", href: "/dashboard/alliance/announcements/create" },
        ],
        children: [
          { title: "Member Guilds", href: "/dashboard/alliance/guilds", icon: <IconUsersGroup size={16} /> },
          { title: "Announcements", href: "/dashboard/alliance/announcements", icon: <IconSwords size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Community Tools",
    pages: [
      {
        title: "Builds",
        href: "/dashboard/builds",
        icon: <IconSword size={18} />,
        create: [
          { label: "New PvP Build", href: "/dashboard/builds/create?type=pvp" },
          { label: "New PvE Build", href: "/dashboard/builds/create?type=pve" },
          { label: "New Gathering Build", href: "/dashboard/builds/create?type=gathering" },
          { label: "New Crafting Build", href: "/dashboard/builds/create?type=crafting" },
        ],
        children: [
          { title: "PvP", href: "/dashboard/builds/pvp", icon: <IconSwords size={16} /> },
          { title: "PvE", href: "/dashboard/builds/pve", icon: <IconAxe size={16} /> },
          { title: "Gathering", href: "/dashboard/builds/gathering", icon: <IconBackpack size={16} /> },
          { title: "Crafting", href: "/dashboard/builds/crafting", icon: <IconHammer size={16} /> },
        ],
      },
      {
        title: "Marketplace",
        href: "/dashboard/marketplace",
        icon: <IconBuildingStore size={18} />,
        create: [
          { label: "Post Sell Listing", href: "/dashboard/marketplace/create?type=sell" },
          { label: "Post Buy Order", href: "/dashboard/marketplace/create?type=buy" },
        ],
        children: [
          { title: "Listings", href: "/dashboard/marketplace/listings", icon: <IconTag size={16} /> },
          { title: "My Trades", href: "/dashboard/marketplace/trades", icon: <IconArrowsExchange size={16} /> },
          { title: "Price History", href: "/dashboard/marketplace/prices", icon: <IconChartLine size={16} /> },
        ],
      },
      {
        title: "Calculators",
        href: "/dashboard/calculators",
        icon: <IconCalculator size={18} />,
        children: [
          { title: "Crafting Profit", href: "/dashboard/calculators/crafting", icon: <IconHammer size={16} /> },
          { title: "Fame", href: "/dashboard/calculators/fame", icon: <IconFlame size={16} /> },
          { title: "Refining", href: "/dashboard/calculators/refining", icon: <IconScissors size={16} /> },
          { title: "Tax & Profit", href: "/dashboard/calculators/tax", icon: <IconCoin size={16} /> },
        ],
      },
      {
        title: "Events",
        href: "/dashboard/events",
        icon: <IconCalendarEvent size={18} />,
        badge: 1,
        create: [
          { label: "Create Event", href: "/dashboard/events/create" },
          { label: "Create CTA", href: "/dashboard/events/cta/create" },
        ],
        children: [
          { title: "Calendar", href: "/dashboard/events/calendar", icon: <IconCalendar size={16} /> },
          { title: "CTA Management", href: "/dashboard/events/cta", icon: <IconAlertTriangle size={16} />, badge: 1 },
          { title: "Attendance", href: "/dashboard/events/attendance", icon: <IconClock size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Content",
    pages: [
      {
        title: "Guides",
        href: "/dashboard/guides",
        icon: <IconBook size={18} />,
        create: [
          { label: "Write Guide", href: "/dashboard/guides/create" },
          { label: "Write Strategy", href: "/dashboard/guides/create?type=strategy" },
        ],
        children: [
          { title: "All Guides", href: "/dashboard/guides", icon: <IconBook size={16} /> },
          { title: "Tutorials", href: "/dashboard/guides/tutorials", icon: <IconMap size={16} /> },
          { title: "Strategy", href: "/dashboard/guides/strategy", icon: <IconSwords size={16} /> },
        ],
      },
      {
        title: "News",
        href: "/dashboard/news",
        icon: <IconNews size={18} />,
        create: [
          { label: "Post Announcement", href: "/dashboard/news/create" },
        ],
      },
    ],
  },
  {
    title: "Administration",
    pages: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: <IconSettings size={18} />,
        children: [
          { title: "General", href: "/dashboard/settings", icon: <IconSettings size={16} /> },
          { title: "Roles", href: "/dashboard/settings/roles", icon: <IconShield size={16} /> },
          { title: "Integrations", href: "/dashboard/settings/integrations", icon: <IconArrowsExchange size={16} /> },
        ],
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleNavigation = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2.5 px-2 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-primary/10">
            <Image
              src={logo}
              alt="Albion Online logo"
              width={24}
              height={24}
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold uppercase tracking-widest text-foreground">
              Albion Game
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
              Guild Platform
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <TooltipProvider delayDuration={0}>
          {groups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.pages.map((page) => {
                    const active = isActive(page.href);
                    const hasChildren = !!page.children?.length;
                    const hasCreate = !!page.create?.length;

                    return (
                      <Collapsible key={page.href} defaultOpen={active} className="group/collapsible">
                        <SidebarMenuItem>
                          <div className="relative">
                            <SidebarMenuButton asChild isActive={active} tooltip={page.title}>
                              <Link href={page.href} onClick={handleNavigation}>
                                {page.icon}
                                <span>{page.title}</span>
                                {page.badge !== undefined && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                                    {page.badge}
                                  </span>
                                )}
                                {hasChildren && (
                                  <CollapsibleTrigger asChild>
                                    <div className="ml-auto">
                                      <IconChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                    </div>
                                  </CollapsibleTrigger>
                                )}
                              </Link>
                            </SidebarMenuButton>

                            {/* Create button */}
                            {hasCreate && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-8 top-1/2 size-6 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <IconPlus size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-48">
                                  <div className="border-b border-border px-2 py-1.5">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                      Create {page.title}
                                    </p>
                                  </div>
                                  {page.create!.map((action) => (
                                    <DropdownMenuItem key={action.href} asChild>
                                      <Link href={action.href} className="flex items-center gap-2 text-xs">
                                        <IconPlus size={12} className="text-muted-foreground" />
                                        {action.label}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>

                          {hasChildren && (
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {page.children!.map((child) => {
                                  const childActive = isActive(child.href);
                                  return (
                                    <SidebarMenuSubItem key={child.href}>
                                      <SidebarMenuSubButton asChild isActive={childActive}>
                                        <Link href={child.href} onClick={handleNavigation}>
                                          {child.icon}
                                          <span>{child.title}</span>
                                          {child.badge !== undefined && (
                                            <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                                              {child.badge}
                                            </span>
                                          )}
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  );
                                })}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          )}
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </TooltipProvider>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex w-full items-center justify-start gap-2.5 px-2 py-1.5 h-auto">
              <Avatar className="size-8 border border-border">
                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start min-w-0">
                <span className="truncate text-sm font-semibold text-foreground">John Doe</span>
                <span className="truncate text-[10px] text-muted-foreground">Guild Leader</span>
              </div>
              <IconChevronDown size={14} className="shrink-0 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" sideOffset={6} className="w-56">
            <div className="border-b border-border px-2 py-2">
              <p className="text-xs font-semibold text-foreground">John Doe</p>
              <p className="text-[10px] text-muted-foreground">john@albion-guild.com</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs">
                <IconUser size={14} /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2 text-xs">
                <IconSettings size={14} /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/logout" className="flex items-center gap-2 text-xs text-destructive focus:text-destructive">
                <IconLogout size={14} /> Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}