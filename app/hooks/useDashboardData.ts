import { useEffect, useRef } from 'react'
import { create } from 'zustand'

export interface DashboardData {
  userJoining: {
    totalUsers: number
    newUsers: number
    activeUsers: number
    joiningTrend: number[]
    labels: string[]
    userSegments: {
      new: number
      returning: number
      active: number
    }
  }
  applications: {
    total: number
    pending: number
    approved: number
    rejected: number
    weeklyTrend: number[]
    labels: string[]
  }
  guildMembers: {
    total: number
    guildMaster: number
    officers: number
    members: number
    recruits: number
    roles: { name: string; count: number }[]
    activity: { label: string; value: number }[]
  }
  events: {
    total: number
    upcoming: number
    ongoing: number
    completed: number
    attendance: number[]
    labels: string[]
    types: { name: string; count: number }[]
  }
  marketplace: {
    totalListings: number
    activeListings: number
    totalSales: number
    revenue: number
    categories: { name: string; count: number }[]
    priceTrend: number[]
    labels: string[]
  }
  builds: {
    total: number
    pvp: number
    pve: number
    gathering: number
    crafting: number
    ratings: number[]
    labels: string[]
    popularity: { name: string; value: number }[]
  }
  news: {
    total: number
    published: number
    draft: number
    views: number[]
    labels: string[]
    engagement: { likes: number; shares: number; comments: number }
    categories: { name: string; count: number }[]
  }
  alliance: {
    totalGuilds: number
    totalMembers: number
    activeTerritories: number
    memberGrowth: number[]
    labels: string[]
    topGuilds: { name: string; members: number }[]
  }
  treasury: {
    totalSilver: number
    taxRevenue: number
    payouts: number
    silverTrend: number[]
    labels: string[]
    expenses: { name: string; amount: number }[]
  }
  cta: {
    upcoming: number
    recentAttendance: number
    winRate: number
    attendanceTrend: number[]
    labels: string[]
  }
  calculators: {
    totalUses: number
    mostUsed: string
    usageTrend: number[]
    labels: string[]
    types: { name: string; uses: number }[]
  }
}

interface DashboardState {
  data: DashboardData | null
  loading: boolean
  error: Error | null
  fetchData: (timeRange?: string) => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  loading: true,
  error: null,
  fetchData: async (timeRange = 'weekly') => {
    set({ loading: true, error: null })

    try {
      // Simulate network latency and varying data based on timeRange
      await new Promise((resolve) => setTimeout(resolve, 600))

      const multiplier = timeRange === 'monthly' ? 4 : timeRange === 'yearly' ? 52 : 1;

      const mockData: DashboardData = {
        userJoining: {
          totalUsers: 248 * multiplier,
          newUsers: 45 * multiplier,
          activeUsers: 82 * multiplier,
          joiningTrend: [12, 19, 15, 22, 18, 25, 30].map(v => v * multiplier),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          userSegments: { new: 45 * multiplier, returning: 30 * multiplier, active: 25 * multiplier },
        },
        applications: {
          total: 75 * multiplier,
          pending: 25,
          approved: 35 * multiplier,
          rejected: 15 * multiplier,
          weeklyTrend: [5, 8, 6, 12, 9, 7, 10].map(v => v * multiplier),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        guildMembers: {
          total: 66,
          guildMaster: 1,
          officers: 8,
          members: 45,
          recruits: 12,
          roles: [
            { name: 'Guild Master', count: 1 },
            { name: 'Officers', count: 8 },
            { name: 'Members', count: 45 },
            { name: 'Recruits', count: 12 },
          ],
          activity: [
            { label: 'PvP', value: 85 },
            { label: 'PvE', value: 70 },
            { label: 'Gathering', value: 60 },
            { label: 'Crafting', value: 75 },
            { label: 'Trading', value: 65 },
            { label: 'Exploring', value: 80 },
          ],
        },
        events: {
          total: 40 * multiplier,
          upcoming: 12,
          ongoing: 3,
          completed: 25 * multiplier,
          attendance: [45, 52, 48, 60].map(v => v + (multiplier * 2)),
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          types: [
            { name: 'PvP', count: 8 * multiplier },
            { name: 'PvE', count: 12 * multiplier },
            { name: 'Gathering', count: 6 * multiplier },
            { name: 'Crafting', count: 4 * multiplier },
            { name: 'Raids', count: 10 * multiplier },
          ],
        },
        marketplace: {
          totalListings: 133 * multiplier,
          activeListings: 68 * multiplier,
          totalSales: 45 * multiplier,
          revenue: 2400 * multiplier,
          categories: [
            { name: 'Weapons', count: 45 * multiplier },
            { name: 'Armor', count: 32 * multiplier },
            { name: 'Potions', count: 28 * multiplier },
            { name: 'Materials', count: 56 * multiplier },
            { name: 'Mounts', count: 18 * multiplier },
          ],
          priceTrend: [100, 120, 115, 130, 125, 140, 135].map(v => v + Math.floor(Math.random() * 20)),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        builds: {
          total: 90 * multiplier,
          pvp: 25 * multiplier,
          pve: 32 * multiplier,
          gathering: 15 * multiplier,
          crafting: 18 * multiplier,
          ratings: [15, 25, 20, 10].map(v => v * multiplier),
          labels: ['5 Star', '4 Star', '3 Star', 'Below 3'],
          popularity: [
            { name: 'DPS', value: 90 },
            { name: 'Tank', value: 75 },
            { name: 'Healer', value: 60 },
            { name: 'Support', value: 70 },
            { name: 'Solo', value: 85 },
          ],
        },
        news: {
          total: 50,
          published: 35,
          draft: 15,
          views: [120, 150, 130, 180, 160, 200, 220].map(v => v * multiplier),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          engagement: { likes: 245 * multiplier, shares: 89 * multiplier, comments: 67 * multiplier },
          categories: [
            { name: 'Updates', count: 12 },
            { name: 'Guides', count: 8 },
            { name: 'Events', count: 15 },
            { name: 'Patch Notes', count: 6 },
            { name: 'Community', count: 9 },
          ],
        },
        alliance: {
          totalGuilds: 14,
          totalMembers: 1250,
          activeTerritories: 5,
          memberGrowth: [1100, 1150, 1180, 1200, 1210, 1230, 1250].map(v => v + (multiplier * 10)),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          topGuilds: [
            { name: 'Crimson Brotherhood', members: 250 },
            { name: 'Iron Bank', members: 180 },
            { name: 'Shadow Assassins', members: 150 },
          ],
        },
        treasury: {
          totalSilver: 154000000 + (multiplier * 1000000),
          taxRevenue: 12500000 * multiplier,
          payouts: 4500000 * multiplier,
          silverTrend: [140, 142, 145, 148, 150, 152, 154].map(v => v + (multiplier * 2)),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          expenses: [
            { name: 'Regears', amount: 2500000 * multiplier },
            { name: 'Hideout Upkeep', amount: 1500000 * multiplier },
            { name: 'Crafting Stations', amount: 500000 * multiplier },
          ],
        },
        cta: {
          upcoming: 3,
          recentAttendance: 85,
          winRate: 68,
          attendanceTrend: [75, 80, 78, 85, 82, 88, 85],
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        calculators: {
          totalUses: 1542 * multiplier,
          mostUsed: 'Crafting Profit',
          usageTrend: [150, 180, 200, 250, 220, 260, 282].map(v => v * multiplier),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          types: [
            { name: 'Crafting Profit', uses: 850 * multiplier },
            { name: 'Fame', uses: 340 * multiplier },
            { name: 'Refining', uses: 210 * multiplier },
            { name: 'Resource', uses: 142 * multiplier },
          ],
        },
      }

      set({ data: mockData, loading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err : new Error('Failed to load dashboard data'),
        loading: false,
      })
    }
  },
}))

export const useDashboardData = (timeRange: string) => {
  
  const data = useDashboardStore((state) => state.data)
  const loading = useDashboardStore((state) => state.loading)
  const error = useDashboardStore((state) => state.error)
  const fetchData = useDashboardStore((state) => state.fetchData)
  const hasLoadedRef = useRef(false)
  const prevTimeRangeRef = useRef(timeRange)

  useEffect(() => {
    if (!hasLoadedRef.current || prevTimeRangeRef.current !== timeRange) {
      hasLoadedRef.current = true
      prevTimeRangeRef.current = timeRange
      fetchData(timeRange)
    }
  }, [fetchData, timeRange])

  return { data, loading, error }
}