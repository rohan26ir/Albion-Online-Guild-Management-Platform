'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardSkeleton } from '@/components/shared/DashboardSkeleton'
import { UserJoiningStats } from '@/components/shared/dashboard/Charts/UserJoiningStats'
import { ApplicationStats } from '@/components/shared/dashboard/Charts/ApplicationStats'
import { GuildMemberStats } from '@/components/shared/dashboard/Charts/GuildMemberStats'
import { EventStats } from '@/components/shared/dashboard/Charts/EventStats'
import { MarketplaceStats } from '@/components/shared/dashboard/Charts/MarketplaceStats'
import { BuildStats } from '@/components/shared/dashboard/Charts/BuildStats'
import { NewsStats } from '@/components/shared/dashboard/Charts/NewsStats'
import { TreasuryStats } from '@/components/shared/dashboard/Charts/TreasuryStats'
import { CTAStats } from '@/components/shared/dashboard/Charts/CTAStats'
import { AllianceStats } from '@/components/shared/dashboard/Charts/AllianceStats'
import { CalculatorStats } from '@/components/shared/dashboard/Charts/CalculatorStats'
import { useDashboardData } from '../hooks/useDashboardData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('weekly')
  const { data, loading, error } = useDashboardData(timeRange)

  if (loading) return <DashboardSkeleton />

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">Failed to load dashboard data.</p>
      </div>
    )
  }

  if (!data) {
    return <DashboardSkeleton />
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
          <p className="text-muted-foreground">Monitor your guild, alliance, and economy metrics.</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="timeRange" className="text-sm font-medium text-muted-foreground">Period:</label>
          <select
            id="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-background/40 backdrop-blur-md border border-border/50 text-foreground text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none shadow-sm transition-colors"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
        <TreasuryStats data={data.treasury} />
        <CTAStats data={data.cta} />
        <AllianceStats data={data.alliance} />
        <CalculatorStats data={data.calculators} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
        <GuildMemberStats data={data.guildMembers} />
        <UserJoiningStats data={data.userJoining} />
        <ApplicationStats data={data.applications} />
        <EventStats data={data.events} />
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <MarketplaceStats data={data.marketplace} />
        <BuildStats data={data.builds} />
        <NewsStats data={data.news} />
      </div>
    </motion.div>
  )
}