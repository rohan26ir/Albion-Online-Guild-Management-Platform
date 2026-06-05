"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
        <Tooltip>
      <TooltipTrigger asChild>
        <Link href="/" className="group flex items-center gap-2.5 shrink-0 cursor-pointer">
          <IconHome2 stroke={2} />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>Go Home</p>
      </TooltipContent>
    </Tooltip>
        

        <SidebarTrigger className="shrink-0 md:hidden" />

        <div className="flex flex-col leading-none">
          {/* Search */}
                     <SearchBar type="dashboard" /> 
                {/* or "dashboard"/"default" */}
        </div>
        <button
          className="ml-auto flex gap-5 size-6 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Notifications"
        >
          {/* ModeToggle */}
          <ModeToggle></ModeToggle>

          {/* <IconBell size={14} /> */}
          <Notification></Notification>
        </button>
      </div>


    </div>
  );
}