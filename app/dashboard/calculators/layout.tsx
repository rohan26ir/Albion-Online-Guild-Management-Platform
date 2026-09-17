import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculators Hub',
  description: 'Albion Online economic suite for marketplace trading, crafting, refining, fame spec, and guild taxation.',
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
