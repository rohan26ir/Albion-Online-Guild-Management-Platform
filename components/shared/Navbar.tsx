"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconMenu2,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/public/assets/logo/favicon.ico";
import SearchBar from "../theme/SearchBar";


interface navProps {
  name: string;
  href: string;
  icon?: React.ReactNode;
  destructive?: boolean;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const websiteName: string = "Albion Game";

  const menuItems: navProps[] = [
    // { name: "Dashboard", href: "/dashboard" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Builds", href: "/builds" },
    { name: "Calculators", href: "/calculators" },
    { name: "Events", href: "/events" },
  ];

  const UserMenuItems: navProps[] = [
    { name: "Profile", href: "/profile", icon: <IconUser size={16} /> },
    { name: "Settings", href: "/settings", icon: <IconSettings size={16} /> },
    { name: "Logout", href: "/logout", icon: <IconLogout size={16} />, destructive: true },
  ];

  const legalItems: navProps[] = [
    { name: "Privacy Policy", href: "/privacy-policy", icon: <IconShield size={16} /> },
    { name: "Terms & Conditions", href: "/terms-conditions", icon: <IconFileText size={16} /> },
  ];

  const userAuthenticated: boolean = false;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />

      <nav className="max-w-7xl w-[95%] mx-auto flex h-14 items-center justify-between ">
        {/* ── Logo ── */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <div className="relative size-7 overflow-hidden transition-colors duration-200 group-hover:border-primary/60">
            <Image
              src={logo}
              alt={`${websiteName} logo`}
              fill
              className="object-contain p-0.5 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse group-hover:grayscale-20"
              priority
            />
          </div>
          <span className="hidden text-sm font-semibold uppercase tracking-widest text-foreground/90 transition-colors duration-200 group-hover:text-foreground sm:block">
            {websiteName}
          </span>
        </Link>

        {/* ── Desktop Nav Links (no icons) ── */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent border border-transparent hover:border-border"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* More dropdown (legal etc.) */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent border border-transparent hover:border-border outline-none">
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
          <SearchBar type="default" />

          <ModeToggle />

          {userAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-accent border border-transparent hover:border-border outline-none">
                  <IconUser size={15} />
                  <span className="hidden sm:inline">Account</span>
                  <IconChevronDown size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {UserMenuItems.map((item, i) => (
                  <div key={item.name}>
                    {i === UserMenuItems.length - 1 && i !== 0 && (
                      <DropdownMenuSeparator />
                    )}
                    <DropdownMenuItem
                      asChild
                      className={item.destructive ? "text-destructive focus:text-destructive" : ""}
                    >
                      <Link href={item.href} className="flex items-center gap-2 text-xs">
                        {item.icon}
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button size="sm" className="h-8 px-3 text-xs font-semibold uppercase tracking-wider">
              Sign In
            </Button>
            </Link>
          )}

          {/* Mobile hamburger using Sheet component */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="ml-1 flex size-8 items-center justify-center border border-transparent text-muted-foreground transition-colors duration-150 hover:border-border hover:bg-accent hover:text-foreground md:hidden"
                aria-label="Toggle menu"
              >
                <IconMenu2 size={16} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-70 p-0">
              <SheetHeader className="border-b border-border p-4 text-left">
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="relative size-8 overflow-hidden">
                    <Image
                      src={logo}
                      alt={`${websiteName} logo`}
                      fill
                      className="object-contain p-0.5"
                      priority
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Albion
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                      Guild Platform
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-4">
                {/* Main Navigation */}
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Navigation
                  </p>
                  <ul className="space-y-1">
                    {menuItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Links */}
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Legal
                  </p>
                  <ul className="space-y-1">
                    {legalItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent rounded-md"
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* User Section (if not authenticated) */}
                {!userAuthenticated && (
                  <Link href="/login" >
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}