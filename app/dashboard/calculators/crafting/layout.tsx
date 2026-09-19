import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Albion Game - Crafting Profit Calculator',
  description: 'Compute crafting profit margins factoring in city resource return rates, crafting focus value, and laborer journals.',
};

export default function CraftingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
