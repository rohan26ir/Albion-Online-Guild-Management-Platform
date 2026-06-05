// app/dashboard/layout.tsx
"use client";

import Footer from "@/components/shared/dashboard/Footer";
import { AppSidebar } from "@/components/shared/dashboard/Sidebar";
import NavBar from "@/components/shared/dashboard/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
// import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="w-full flex flex-col">
          <div className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
            <NavBar />
          </div>
          <div className="flex-1 overflow-y-auto bg-background">
            {children}
          </div>
          <Footer></Footer>
        </main>
      </div>
    </SidebarProvider>
  );
}