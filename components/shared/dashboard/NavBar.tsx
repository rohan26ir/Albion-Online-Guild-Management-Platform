"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconBuildingStore,
  IconCalculator,
  IconCalendarEvent,
  IconLayoutDashboard,
  IconSettings,
  IconShield,
  IconSword,
  IconUsers,
  IconChevronUp,
  IconChevronDown,
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
  IconChevronRight,
  IconHome2,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/public/assets/logo/favicon.ico";
import Image from "next/image";
import SearchBar from "@/components/theme/SearchBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Notification from "./Notification";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ── Types ──────────────────────────────────────────────────────────────────

type CreateAction = { label: string; href: string };

type NavPage = {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  create?: CreateAction[];
  children?: Omit<NavPage, "children">[];
};




// ── Component ──────────────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
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

  const toggleExpand = (href: string) => {
    setExpanded((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const isExpanded = (page: NavPage) =>
    expanded[page.href] ?? page.children?.some((c) => isActive(c.href)) ?? false;

  return (
    <div className="flex w-[98%] h-full flex-col bg-background">

      {/* ── Brand ── */}
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-4">

        {/* home */}
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/" className="group flex items-center gap-2.5 shrink-0 cursor-pointer">
              <IconHome2 stroke={2} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go Home</p>
          </TooltipContent>
        </Tooltip> */}


        <SidebarTrigger className="shrink-0 md:hidden" />

        <div className="flex flex-col leading-none">
          {/* Search */}
          <SearchBar type="dashboard" />
          {/* or "dashboard"/"default" */}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />
          <Notification />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
                <Avatar className="size-8 border border-border hover:opacity-90 transition-opacity">
                  {currentUser.avatarUrl ? (
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                    {currentUser.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="border-b border-border px-3 py-2 flex items-center gap-2.5">
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
                <Link href="/dashboard/profile" className="flex items-center gap-2 text-xs cursor-pointer">
                  <IconUser size={14} /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 text-xs cursor-pointer">
                  <IconSettings size={14} /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/logout" className="flex items-center gap-2 text-xs text-destructive focus:text-destructive cursor-pointer">
                  <IconLogout size={14} /> Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>


    </div>
  );
}