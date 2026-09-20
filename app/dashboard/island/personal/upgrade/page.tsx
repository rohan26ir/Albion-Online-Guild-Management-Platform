import type { Metadata } from 'next';
import PersonalUpgradeClient from './PersonalUpgradeClient';

export const metadata: Metadata = {
  title: 'Personal Island Upgrade Cost | Albion Game',
  description: 'Complete upgrade cost table for Personal Islands in Albion Online. View Tier 1 to 6 multipurpose plots, small plots, first-time buyer discount, and cumulative total silver costs.',
};

export default function PersonalUpgradeCostPage() {
  return <PersonalUpgradeClient />;
}
