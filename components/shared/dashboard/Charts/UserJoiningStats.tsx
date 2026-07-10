//Charts/UserJoiningStats.tsx
'use client'

import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IoMdTrendingUp } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

import { motion } from 'framer-motion'
import { FaUser } from 'react-icons/fa';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
)

interface UserJoiningData {
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

interface UserJoiningStatsProps {
  data: UserJoiningData
}

export const UserJoiningStats = ({ data }: UserJoiningStatsProps) => {
  const lineChartData = {
    labels: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Users',
        data: data.joiningTrend || [12, 19, 15, 22, 18, 25, 30],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const donutData = {
    labels: ['New Users', 'Returning', 'Active'],
    datasets: [
      {
        data: [
          data.userSegments?.new || 45,
          data.userSegments?.returning || 30,
          data.userSegments?.active || 25,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: ['#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 2,
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
          <CardTitle className="text-sm font-medium tracking-wide">User Joining</CardTitle>
          <div className="p-2 bg-blue-500/20 rounded-full">
            <FaUser className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{data.totalUsers || 248}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{data.newUsers || 45}</p>
              <p className="text-xs text-muted-foreground">New This Week</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{data.activeUsers || 82}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[100px]">
              <Line 
                data={lineChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
            <div className="h-[100px]">
              <Doughnut 
                data={donutData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  cutout: '70%',
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}