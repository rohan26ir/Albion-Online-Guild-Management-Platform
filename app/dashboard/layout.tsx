import type { Metadata } from "next";
import DashboardLayoutClient from "@/components/shared/dashboard/DashboardLayoutClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Comprehensive Albion Online guild management, economy calculators, builds, marketplace, and activity tracking.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}