"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconMenu2,
  // IconSearch,
  IconUser,
  IconX,
  IconLayoutDashboard,
  IconShield,
  IconFileText,
  IconSettings,
  IconLogout,
  IconChevronDown,
  IconSword,
  IconBuildingStore,
  IconCalculator,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { ModeToggle } from "../theme/ModeToggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/public/assets/logo/favicon.ico";
import SearchBar from "../theme/SearchBar";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [searchOpen, setSearchOpen] = useState(false);

  const websiteName: string = "Albion Online";

  const menuItems: { name: string; href: string; icon: React.ReactNode }[] = [
    { name: "Dashboard", href: "/dashboard", icon: <IconLayoutDashboard size={16} /> },
    { name: "Marketplace", href: "/marketplace", icon: <IconBuildingStore size={16} /> },
    { name: "Builds", href: "/builds", icon: <IconSword size={16} /> },
    { name: "Calculators", href: "/calculators", icon: <IconCalculator size={16} /> },
    { name: "Events", href: "/events", icon: <IconCalendarEvent size={16} /> },
  ];

  const UserMenuItems: { name: string; href: string; icon: React.ReactNode; destructive?: boolean }[] = [
    { name: "Profile", href: "/profile", icon: <IconUser size={16} /> },
    { name: "Settings", href: "/settings", icon: <IconSettings size={16} /> },
    { name: "Logout", href: "/logout", icon: <IconLogout size={16} />, destructive: true },
  ];

  const legalItems = [
    { name: "Privacy Policy", href: "/privacy-policy", icon: <IconShield size={16} /> },
    { name: "Terms & Conditions", href: "/terms-conditions", icon: <IconFileText size={16} /> },
  ];

  const userAuthenticated: boolean = true;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0 group">
          <div className="relative size-7 overflow-hidden  group-hover:border-primary/60 transition-colors duration-200">
            <Image
              src={logo}
              alt={`${websiteName} logo`}
              fill
              className="object-contain p-0.5 
              group-hover:animate-pulse group-hover:scale-110 group-hover:grayscale-[20%] transition-all duration-300"
              priority
            />
          </div>
          <span className="hidden sm:block text-sm font-semibold tracking-widest uppercase text-foreground/90 group-hover:text-foreground transition-colors duration-200">
            {websiteName}
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden md:flex items-center gap-0.5">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 border border-transparent hover:border-border"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}

          {/* More dropdown (legal etc.) */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 border border-transparent hover:border-border outline-none">
                  More
                  <IconChevronDown size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {legalItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="flex items-center gap-2 text-xs">
                      {item.icon}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        {/* ── Right Actions ── */}
        <div className="flex items-center gap-1">
          {/* Search */}
           <SearchBar type="default" /> 
      {/* or "dashboard"/"default" */}

          <ModeToggle />

          {userAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 border border-transparent hover:border-border outline-none">
                  <IconUser size={15} />
                  <span className="hidden sm:inline">Account</span>
                  <IconChevronDown size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {UserMenuItems.map((item, i) => (
                  <>
                    {i === UserMenuItems.length - 1 && (
                      <DropdownMenuSeparator key={`sep-${i}`} />
                    )}
                    <DropdownMenuItem
                      key={item.name}
                      asChild
                      className={item.destructive ? "text-destructive focus:text-destructive" : ""}
                    >
                      <Link href={item.href} className="flex items-center gap-2 text-xs">
                        {item.icon}
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="h-8 px-3 text-xs font-semibold uppercase tracking-wider">
              Sign In
            </Button>
          )}

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden size-8 items-center justify-center border border-transparent hover:border-border hover:bg-accent text-muted-foreground hover:text-foreground transition-colors duration-150 ml-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX size={16} /> : <IconMenu2 size={16} />}
          </button>
        </div>
      </nav>

     

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="divide-y divide-border">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
            {legalItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}