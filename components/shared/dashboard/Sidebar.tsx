"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  IconLayoutDashboard,
  IconUsers,
  IconShield,
  IconUsersGroup,
  IconSwords,
  IconSword,
  IconBuildingStore,
  IconCalculator,
  IconCalendarEvent,
  IconSettings,
  IconUser,
  IconLogout,
  IconPointFilled,
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
  IconPlant,
  IconCompass,
  IconCarrot,
  IconReportAnalytics,
  IconTrophy,
  IconLink,
  IconFileDescription,
  IconUserCheck,
  IconUserX,
  IconPlus,
  IconEdit,
  IconTrash,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  children?: Omit<NavPage, "children">[];
};

type NavGroup = {
  title: string;
  pages: NavPage[];
};

// Navigation Data (Create actions removed)
// const groups: NavGroup[] = [
//   {
//     title: "Overview",
//     pages: [
//       {
//         title: "Dashboard",
//         href: "/dashboard",
//         icon: <IconLayoutDashboard size={18} />,
//       },
//       {
//         title: "Members",
//         href: "/dashboard/members",
//         icon: <IconUsers size={18} />,
//         children: [
//           { title: "All Members", href: "/dashboard/members", icon: <IconUsers size={16} /> },
//           { title: "Roles & Permissions", href: "/dashboard/members/roles", icon: <IconShield size={16} /> },
//         ],
//       },
//       {
//         title: "Applications",
//         href: "/dashboard/applications",
//         icon: <IconShield size={18} />,
//         badge: 3,
//         children: [
//           { title: "Pending", href: "/dashboard/applications/pending", icon: <IconClock size={16} />, badge: 3 },
//           { title: "Approved", href: "/dashboard/applications/approved", icon: <IconPointFilled size={16} /> },
//           { title: "Rejected", href: "/dashboard/applications/rejected", icon: <IconPointFilled size={16} /> },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Guild & Alliance",
//     pages: [
//       {
//         title: "Guild",
//         href: "/dashboard/guild",
//         icon: <IconUsersGroup size={18} />,
//         children: [
//           { title: "Overview", href: "/dashboard/guild", icon: <IconLayoutDashboard size={16} /> },
//           { title: "Announcements", href: "/dashboard/guild/announcements", icon: <IconSwords size={16} /> },
//           { title: "Statistics", href: "/dashboard/guild/stats", icon: <IconChartLine size={16} /> },
//         ],
//       },
//       {
//         title: "Alliance",
//         href: "/dashboard/alliance",
//         icon: <IconSwords size={18} />,
//         children: [
//           { title: "Member Guilds", href: "/dashboard/alliance/guilds", icon: <IconUsersGroup size={16} /> },
//           { title: "Announcements", href: "/dashboard/alliance/announcements", icon: <IconSwords size={16} /> },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Community Tools",
//     pages: [
//       {
//         title: "Builds",
//         href: "/dashboard/builds",
//         icon: <IconSword size={18} />,
//         children: [
//           { title: "PvP", href: "/dashboard/builds/pvp", icon: <IconSwords size={16} /> },
//           { title: "PvE", href: "/dashboard/builds/pve", icon: <IconAxe size={16} /> },
//           { title: "Gathering", href: "/dashboard/builds/gathering", icon: <IconBackpack size={16} /> },
//           { title: "Crafting", href: "/dashboard/builds/crafting", icon: <IconHammer size={16} /> },
//         ],
//       },
//       {
//         title: "Marketplace",
//         href: "/dashboard/marketplace",
//         icon: <IconBuildingStore size={18} />,
//         children: [
//           { title: "Listings", href: "/dashboard/marketplace/listings", icon: <IconTag size={16} /> },
//           { title: "My Trades", href: "/dashboard/marketplace/trades", icon: <IconArrowsExchange size={16} /> },
//           { title: "Price History", href: "/dashboard/marketplace/prices", icon: <IconChartLine size={16} /> },
//         ],
//       },
//       {
//         title: "Calculators",
//         href: "/dashboard/calculators",
//         icon: <IconCalculator size={18} />,
//         children: [
//           { title: "Crafting Profit", href: "/dashboard/calculators/crafting", icon: <IconHammer size={16} /> },
//           { title: "Fame", href: "/dashboard/calculators/fame", icon: <IconFlame size={16} /> },
//           { title: "Refining", href: "/dashboard/calculators/refining", icon: <IconScissors size={16} /> },
//           { title: "Tax & Profit", href: "/dashboard/calculators/tax", icon: <IconCoin size={16} /> },
//         ],
//       },
//       {
//         title: "Events",
//         href: "/dashboard/events",
//         icon: <IconCalendarEvent size={18} />,
//         badge: 1,
//         children: [
//           { title: "Calendar", href: "/dashboard/events/calendar", icon: <IconCalendar size={16} /> },
//           { title: "CTA Management", href: "/dashboard/events/cta", icon: <IconAlertTriangle size={16} />, badge: 1 },
//           { title: "Attendance", href: "/dashboard/events/attendance", icon: <IconClock size={16} /> },
//         ],
//       },
//     ],
//   },
//   {
//     title: "Content",
//     pages: [
//       {
//         title: "Guides",
//         href: "/dashboard/guides",
//         icon: <IconBook size={18} />,
//         children: [
//           { title: "All Guides", href: "/dashboard/guides", icon: <IconBook size={16} /> },
//           { title: "Tutorials", href: "/dashboard/guides/tutorials", icon: <IconMap size={16} /> },
//           { title: "Strategy", href: "/dashboard/guides/strategy", icon: <IconSwords size={16} /> },
//         ],
//       },
//       {
//         title: "News",
//         href: "/dashboard/news",
//         icon: <IconNews size={18} />,
//       },
//     ],
//   },
//   {
//     title: "Administration",
//     pages: [
//       {
//         title: "Settings",
//         href: "/dashboard/settings",
//         icon: <IconSettings size={18} />,
//         children: [
//           { title: "General", href: "/dashboard/settings", icon: <IconSettings size={16} /> },
//           { title: "Roles", href: "/dashboard/settings/roles", icon: <IconShield size={16} /> },
//           { title: "Integrations", href: "/dashboard/settings/integrations", icon: <IconArrowsExchange size={16} /> },
//         ],
//       },
//     ],
//   },
// ];
// Navigation Data - Albion Game - Marketplace, Guild and Others
const groups: NavGroup[] = [
  {
    title: "Dashboard",
    pages: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: "Analysis",
        href: "/dashboard/analysis",
        icon: <IconReportAnalytics size={18} />,
        children: [
          { title: "Performance Analysis", href: "/dashboard/analysis", icon: <IconChartLine size={16} /> },
          { title: "Market Trends", href: "/dashboard/marketplace/prices", icon: <IconBuildingStore size={16} /> },
          { title: "Guild Statistics", href: "/dashboard/guild/stats", icon: <IconUsersGroup size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Market Price",
    pages: [
      {
        title: "Market Overview",
        href: "/dashboard/marketplace",
        icon: <IconBuildingStore size={18} />,
        children: [
          { title: "Marketplace", href: "/dashboard/marketplace", icon: <IconBuildingStore size={16} /> },
          { title: "Item Listings", href: "/dashboard/marketplace/listings", icon: <IconTag size={16} /> },
          { title: "Price History", href: "/dashboard/marketplace/prices", icon: <IconChartLine size={16} /> },
          { title: "My Trades", href: "/dashboard/marketplace/trades", icon: <IconArrowsExchange size={16} /> },
        ],
      },
      {
        title: "Auctions",
        href: "/dashboard/auction",
        icon: <IconCoin size={18} />,
        children: [
          { title: "Active Auctions", href: "/dashboard/auction", icon: <IconCoin size={16} /> },
          { title: "Create Auction", href: "/dashboard/auction/create", icon: <IconTag size={16} /> },
          { title: "Manage Auctions", href: "/dashboard/auction/manage-auction", icon: <IconArrowsExchange size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Crafting",
    pages: [
      {
        title: "Crafting",
        href: "/dashboard/crafting",
        icon: <IconHammer size={18} />,
        children: [
          { title: "Crafting Profit", href: "/dashboard/calculators/crafting", icon: <IconHammer size={16} /> },
          { title: "Refining", href: "/dashboard/calculators/refining", icon: <IconScissors size={16} /> },
          { title: "Station Fees & RRR", href: "/dashboard/crafting", icon: <IconChartLine size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Farming",
    pages: [
      {
        title: "Farming & Island",
        href: "/dashboard/farming",
        icon: <IconPlant size={18} />,
        children: [
          { title: "Crops & Herbs", href: "/dashboard/farming", icon: <IconCarrot size={16} /> },
          { title: "Livestock & Pastures", href: "/dashboard/farming/livestock", icon: <IconAxe size={16} /> },
          { title: "Island Planner", href: "/dashboard/farming/layout", icon: <IconLayoutDashboard size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Maps",
    pages: [
      {
        title: "Interactive Maps",
        href: "/dashboard/maps",
        icon: <IconMap size={18} />,
        children: [
          { title: "World Map", href: "/dashboard/maps", icon: <IconMap size={16} /> },
          { title: "Zone Directory", href: "/dashboard/maps/zones", icon: <IconCompass size={16} /> },
          { title: "Resource Hotspots", href: "/dashboard/maps/resources", icon: <IconCompass size={16} /> },
          { title: "Avalonian Roads", href: "/dashboard/maps/roads", icon: <IconCompass size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Guild",
    pages: [
      {
        title: "Top 100 Guilds",
        href: "/dashboard/guild/top-100",
        icon: <IconTrophy size={18} />,
      },
      {
        title: "Members",
        href: "/dashboard/members",
        icon: <IconUsers size={18} />,
        children: [
          { title: "Generate Share Form", href: "/dashboard/applications/public-url", icon: <IconLink size={16} /> },
          { title: "All Applications", href: "/dashboard/applications", icon: <IconFileDescription size={16} /> },
          { title: "Pending Review", href: "/dashboard/applications?status=pending", icon: <IconClock size={16} /> },
          { title: "All Members List", href: "/dashboard/members", icon: <IconUsers size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Calculation",
    pages: [
      {
        title: "Calculators",
        href: "/dashboard/calculators",
        icon: <IconCalculator size={18} />,
        children: [
          { title: "All Calculators", href: "/dashboard/calculators", icon: <IconCalculator size={16} /> },
          { title: "Buy / Sell Profit", href: "/dashboard/calculators/trade-profit", icon: <IconArrowsExchange size={16} /> },
          { title: "Crafting Profit", href: "/dashboard/calculators/crafting", icon: <IconHammer size={16} /> },
          { title: "Refining Profit", href: "/dashboard/calculators/refining", icon: <IconScissors size={16} /> },
          { title: "Fame & Spec", href: "/dashboard/calculators/fame", icon: <IconFlame size={16} /> },
          { title: "Tax & Profit", href: "/dashboard/calculators/tax", icon: <IconCoin size={16} /> },
        ],
      },
    ],
  },
  {
    title: "Others (Player Tools)",
    pages: [
      {
        title: "Builds",
        href: "/dashboard/builds",
        icon: <IconSword size={18} />,
        children: [
          { title: "All Builds", href: "/dashboard/builds", icon: <IconSword size={16} /> },
          { title: "PvP", href: "/dashboard/builds", icon: <IconSwords size={16} /> },
          { title: "PvE", href: "/dashboard/builds", icon: <IconAxe size={16} /> },
          { title: "Gathering", href: "/dashboard/builds", icon: <IconBackpack size={16} /> },
          { title: "Crafting", href: "/dashboard/builds", icon: <IconHammer size={16} /> },
        ],
      },
      {
        title: "Guides",
        href: "/dashboard/guides",
        icon: <IconBook size={18} />,
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
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: <IconSettings size={18} />,
      },
    ],
  },
  {
    title: "Admin Portal",
    pages: [
      {
        title: "Admin Panel",
        href: "/dashboard/admin",
        icon: <IconShield size={18} />,
        children: [
          { title: "Overview", href: "/dashboard/admin", icon: <IconLayoutDashboard size={16} /> },
          { title: "Items (ImgBB)", href: "/dashboard/admin/items", icon: <IconSword size={16} /> },
          { title: "Builds (Game UI)", href: "/dashboard/admin/builds", icon: <IconSwords size={16} /> },
        ],
      },
    ],
  },
];


export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    initials: string;
    avatarUrl?: string;
  }>({
    name: "Adventurer",
    email: "player@albion.com",
    initials: "AO",
    avatarUrl: "",
  });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        const metadata = data.user.user_metadata || {};
        const name = metadata.full_name || metadata.name || metadata.username || data.user.email?.split("@")[0] || "Player";
        const email = data.user.email || "";
        const avatarUrl =
          metadata.avatar_url ||
          metadata.picture ||
          (typeof metadata.picture === "object" ? metadata.picture?.data?.url : undefined) ||
          data.user.identities?.[0]?.identity_data?.avatar_url ||
          data.user.identities?.[0]?.identity_data?.picture ||
          "";

        const initials = name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2) || "AO";
        setCurrentUser({ name, email, initials, avatarUrl });
      }
    });
  }, []);

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
        <Link href="/">
          <div className="flex items-center gap-2.5 px-2 py-1">
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
                All-in-One Gaming Platform
              </span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
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

                  return (
                    <Collapsible key={page.href} defaultOpen={active} className="group/collapsible">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild={!hasChildren}
                          isActive={active}
                          tooltip={page.title}
                          onClick={hasChildren ? undefined : handleNavigation}
                        >
                          {hasChildren ? (
                            <CollapsibleTrigger className="flex w-full items-center gap-2 ">
                              {page.icon}
                              <span>{page.title}</span>
                              {page.badge !== undefined && (
                                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                                  {page.badge}
                                </span>
                              )}
                              <div className="ml-auto">
                                <IconChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                              </div>
                            </CollapsibleTrigger>
                          ) : (
                            <Link href={page.href} onClick={handleNavigation}>
                              {page.icon}
                              <span>{page.title}</span>
                              {page.badge !== undefined && (
                                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                                  {page.badge}
                                </span>
                              )}
                            </Link>
                          )}
                        </SidebarMenuButton>

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
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex w-full items-center justify-start gap-2.5 px-2 py-1.5 h-auto">
              <Avatar className="size-8 border border-border">
                {currentUser.avatarUrl ? (
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start min-w-0">
                <span className="truncate text-sm font-semibold text-foreground">{currentUser.name}</span>
                <span className="truncate text-[10px] text-muted-foreground">{currentUser.email || "Guild Member"}</span>
              </div>
              <IconChevronDown size={14} className="shrink-0 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" sideOffset={6} className="w-56">
            <div className="border-b border-border px-2 py-2 flex items-center gap-2.5">
              <Avatar className="size-9 border border-border shrink-0">
                {currentUser.avatarUrl ? (
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{currentUser.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{currentUser.email}</p>
              </div>
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