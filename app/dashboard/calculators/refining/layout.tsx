import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Albion Game - Refining Calculator',
  description: 'Refine Ore, Logs, Fiber, Hide, and Stone with city return bonuses, focus efficiency, and lower-tier resource returns.',
};

export default function RefiningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
