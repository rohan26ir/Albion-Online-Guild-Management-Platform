'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconReportAnalytics,
  IconTrendingUp,
  IconChartBar,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  IconBuildingStore,
  IconUsers,
} from '@tabler/icons-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketplaceStats } from '@/components/shared/dashboard/Charts/MarketplaceStats';
import { TreasuryStats } from '@/components/shared/dashboard/Charts/TreasuryStats';
import { CalculatorStats } from '@/components/shared/dashboard/Charts/CalculatorStats';
import { useDashboardData } from '../../hooks/useDashboardData';
import { DashboardSkeleton } from '@/components/shared/DashboardSkeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function AnalysisPage() {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const { data, loading, error } = useDashboardData(timeRange);

  if (loading || !data) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-destructive">Failed to load analysis metrics.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <IconReportAnalytics className="size-7 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Analysis & Trends</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Deep analytical metrics covering market trends, economic velocity, and treasury health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Analysis Period:
          </span>
          <div className="flex border border-border bg-card p-0.5">
            {(['weekly', 'monthly', 'yearly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeRange(period)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase transition-colors ${
                  timeRange === period
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Market Volume
            </CardTitle>
            <IconBuildingStore className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">428.5M Silver</div>
            <p className="flex items-center gap-1 text-xs text-emerald-500 mt-1 font-medium">
              <IconArrowUpRight className="size-3.5" /> +14.2% vs previous period
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Average Profit Margin
            </CardTitle>
            <IconTrendingUp className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23.8%</div>
            <p className="flex items-center gap-1 text-xs text-emerald-500 mt-1 font-medium">
              <IconArrowUpRight className="size-3.5" /> +3.5% crafting & refining
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Treasury Inflow
            </CardTitle>
            <IconCoin className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">62.1M Silver</div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              From tax rates & member contributions
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Active Traders & Crafters
            </CardTitle>
            <IconUsers className="size-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,249</div>
            <p className="flex items-center gap-1 text-xs text-emerald-500 mt-1 font-medium">
              <IconArrowUpRight className="size-3.5" /> +8.1% community growth
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytical Charts Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketplaceStats data={data.marketplace} />
        <TreasuryStats data={data.treasury} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CalculatorStats data={data.calculators} />
      </motion.div>
    </motion.div>
  );
}
