import type { Metadata } from 'next';
import GuildUpgradeClient from './GuildUpgradeClient';

export const metadata: Metadata = {
  title: 'Guild Island Upgrade Cost | Albion Game',
  description: 'Complete Guild Island upgrade cost table in Albion Online. View Tier 1 to 6 building plots, small plots, upgrade silver cost, and cumulative guild silver.',
};

export default function GuildUpgradeCostPage() {
  return <GuildUpgradeClient />;
}
