import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Builds Management',
  description: 'Review, approve, and curate guild community combat builds.',
};

export default function AdminBuildsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
