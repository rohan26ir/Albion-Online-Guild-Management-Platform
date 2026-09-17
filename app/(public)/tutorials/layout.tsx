import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video & Written Tutorials',
  description: 'Step-by-step Albion Online guides and walkthroughs for new players, silver farming, and guild warfare.',
};

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
