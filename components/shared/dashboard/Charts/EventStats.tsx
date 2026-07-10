'use client'

import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaCalendarDays } from 'react-icons/fa6'
import { motion } from 'framer-motion'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement)

interface EventData {
  total: number
  upcoming: number
  ongoing: number
  completed: number
  attendance: number[]
  labels: string[]
  types: {
    name: string
    count: number
  }[]
}

interface EventStatsProps {
  data: EventData
}

export const EventStats = ({ data }: EventStatsProps) => {
  const barData = {
    labels: data.labels || ['PvP', 'PvE', 'Gathering', 'Crafting', 'Raids'],
    datasets: [
      {
        label: 'Events',
        data: data.types?.map(t => t.count) || [8, 12, 6, 4, 10],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
        borderRadius: 4,
      },
    ],
  }

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance',
        data: data.attendance || [45, 52, 48, 60],
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      whileHover={{ y: -5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Events</CardTitle>
          <FaCalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-purple-600">{data.total || 40}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-green-600">{data.upcoming || 12}</p>
              <p className="text-[10px] text-muted-foreground">Upcoming</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-blue-600">{data.ongoing || 3}</p>
              <p className="text-[10px] text-muted-foreground">Ongoing</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-gray-600">{data.completed || 25}</p>
              <p className="text-[10px] text-muted-foreground">Completed</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[100px]">
              <Bar 
                data={barData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
            <div className="h-[100px]">
              <Line 
                data={lineData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}