import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top 100 Guilds Leaderboard',
  description: 'Albion Online Top 100 guilds ranking, season standings, and alliance rankings.',
};

export default function Top100Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
