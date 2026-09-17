import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Player Profile',
  description: 'Manage personal player profile, character stats, guild role, and account settings.',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
