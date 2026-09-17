import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Items & Equipment Database',
  description: 'Explore the complete Albion Online item encyclopedia: weapons, armor, mounts, stats, and recipes.',
};

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
