import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guild Analytics & Activity',
  description: 'Analyze guild performance metrics, member activity, attendance rates, and economic statistics.',
};

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
