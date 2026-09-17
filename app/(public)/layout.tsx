import type { Metadata } from 'next';
import PublicLayoutClient from "@/components/shared/PublicLayoutClient";

export const metadata: Metadata = {
  title: 'The All-in-One Gaming Platform',
  description: 'The All-in-One Gaming Platform for Albion Online players. Marketplace prices, crafting calculators, PvP/PvE builds, guild management, interactive maps, and community tools.',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayoutClient>{children}</PublicLayoutClient>;
}