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
import { FaShieldAlt } from 'react-icons/fa'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

interface AllianceData {
  totalGuilds: number
  totalMembers: number
  activeTerritories: number
  memberGrowth: number[]
  labels: string[]
  topGuilds: { name: string; members: number }[]
}

interface AllianceStatsProps {
  data: AllianceData
}

export const AllianceStats = ({ data }: AllianceStatsProps) => {
  const lineChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Alliance Members',
        data: data.memberGrowth,
        borderColor: 'rgb(59, 130, 246)', // Blue
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium tracking-wide">Alliance</CardTitle>
          <div className="p-2 bg-blue-500/20 rounded-full">
            <FaShieldAlt className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
              <p className="text-xl font-bold text-blue-500">{data.totalGuilds}</p>
              <p className="text-xs text-muted-foreground">Guilds</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
              <p className="text-xl font-bold text-blue-500">{data.totalMembers}</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
              <p className="text-xl font-bold text-blue-500">{data.activeTerritories}</p>
              <p className="text-xs text-muted-foreground">Territories</p>
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
