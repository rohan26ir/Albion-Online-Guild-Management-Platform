'use client'

import { Bar, Radar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { FaSword } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { GiBroadsword } from 'react-icons/gi'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement
)

interface BuildData {
  total: number
  pvp: number
  pve: number
  gathering: number
  crafting: number
  ratings: number[]
  labels: string[]
  popularity: {
    name: string
    value: number
  }[]
}

interface BuildStatsProps {
  data: BuildData
}

export const BuildStats = ({ data }: BuildStatsProps) => {
  const barData = {
    labels: ['PvP', 'PvE', 'Gathering', 'Crafting'],
    datasets: [
      {
        label: 'Builds',
        data: [
          data.pvp || 25,
          data.pve || 32,
          data.gathering || 15,
          data.crafting || 18,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
        ],
        borderRadius: 4,
      },
    ],
  }

  const radarData = {
    labels: data.popularity?.map(p => p.name) || ['DPS', 'Tank', 'Healer', 'Support', 'Solo'],
    datasets: [
      {
        label: 'Popularity',
        data: data.popularity?.map(p => p.value) || [90, 75, 60, 70, 85],
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#8b5cf6',
        borderWidth: 2,
        pointBackgroundColor: '#8b5cf6',
      },
    ],
  }

  const donutData = {
    labels: ['5 Star', '4 Star', '3 Star', 'Below 3'],
    datasets: [
      {
        data: data.ratings || [15, 25, 20, 10],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: ['#eab308', '#10b981', '#3b82f6', '#ef4444'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      whileHover={{ y: -5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Character Builds</CardTitle>
          <GiBroadsword className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-purple-600">{data.total || 90}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-red-600">{data.pvp || 25}</p>
              <p className="text-[10px] text-muted-foreground">PvP</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-blue-600">{data.pve || 32}</p>
              <p className="text-[10px] text-muted-foreground">PvE</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-yellow-600">⭐4.2</p>
              <p className="text-[10px] text-muted-foreground">Avg Rating</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="h-[100px] col-span-1">
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
            <div className="h-[100px] col-span-1">
              <Radar 
                data={radarData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { r: { display: false } },
                }}
              />
            </div>
            <div className="h-[100px] col-span-1">
              <Doughnut 
                data={donutData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  cutout: '60%',
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}