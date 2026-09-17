import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Items Management',
  description: 'Manage game item databases, tiers, enchantments, and category definitions.',
};

export default function AdminItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
