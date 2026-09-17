import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PvP & PvE Builds',
  description: 'Explore, share, and optimize Albion Online combat builds, weapon loadouts, gear sets, and spells.',
};

export default function BuildsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
