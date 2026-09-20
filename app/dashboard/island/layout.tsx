import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Island Planner',
  description: 'Manage your personal and guild islands, upgrade costs, farming, and building layouts in Albion Online.',
};

export default function IslandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
