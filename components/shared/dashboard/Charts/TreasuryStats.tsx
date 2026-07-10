'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FaCoins } from 'react-icons/fa'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

interface TreasuryData {
  totalSilver: number
  taxRevenue: number
  payouts: number
  silverTrend: number[]
  labels: string[]
  expenses: { name: string; amount: number }[]
}

interface TreasuryStatsProps {
  data: TreasuryData
}

export const TreasuryStats = ({ data }: TreasuryStatsProps) => {
  const lineChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Silver (Millions)',
        data: data.silverTrend,
        borderColor: 'rgb(234, 179, 8)', // Yellow/Gold
        backgroundColor: 'rgba(234, 179, 8, 0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const formatSilver = (amount: number) => {
    return (amount / 1000000).toFixed(1) + 'M'
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/60 backdrop-blur-md border-white/10 dark:border-white/5 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium tracking-wide">Treasury</CardTitle>
          <div className="p-2 bg-yellow-500/20 rounded-full">
            <FaCoins className="h-4 w-4 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-2xl font-bold text-yellow-500">{formatSilver(data.totalSilver)}</p>
              <p className="text-xs text-muted-foreground">Total Silver</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-2xl font-bold text-green-500">+{formatSilver(data.taxRevenue)}</p>
              <p className="text-xs text-muted-foreground">Tax Revenue</p>
            </div>
          </div>
          
          <div className="h-[120px] mt-4">
            <Line 
              data={lineChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 10,
                    cornerRadius: 8,
                  }
                },
                scales: { 
                  x: { display: false }, 
                  y: { display: false } 
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
