import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guild Members Roster',
  description: 'Manage guild members, permissions, active roles, character statistics, and roster records.',
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
