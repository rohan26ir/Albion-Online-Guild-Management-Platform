import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax & Loot Split Calculator',
  description: 'Calculate Albion Online marketplace taxes, crafting station user nutrition fees, and party dungeon loot distributions.',
};

export default function TaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
