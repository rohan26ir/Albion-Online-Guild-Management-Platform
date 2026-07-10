'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { GiCrossedSwords } from 'react-icons/gi'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
)

interface CTAData {
  upcoming: number
  recentAttendance: number
  winRate: number
  attendanceTrend: number[]
  labels: string[]
}

interface CTAStatsProps {
  data: CTAData
}

export const CTAStats = ({ data }: CTAStatsProps) => {
  const barChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Attendance',
        data: data.attendanceTrend,
        backgroundColor: 'rgba(239, 68, 68, 0.8)', // Red
        borderRadius: 4,
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
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium tracking-wide">Call To Arms</CardTitle>
          <div className="p-2 bg-red-500/20 rounded-full">
            <GiCrossedSwords className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-xl font-bold text-red-500">{data.upcoming}</p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-xl font-bold text-red-500">{data.recentAttendance}</p>
              <p className="text-xs text-muted-foreground">Avg. Attend</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-xl font-bold text-red-500">{data.winRate}%</p>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
          </div>
          
          <div className="h-[120px] mt-4">
            <Bar 
              data={barChartData} 
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
