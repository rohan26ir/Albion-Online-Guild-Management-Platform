import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fame & Spec Calculator',
  description: 'Plan Destiny Board mastery, combat fame credits, and passive Item Power gains up to level 120 Elite Spec.',
};

export default function FameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
