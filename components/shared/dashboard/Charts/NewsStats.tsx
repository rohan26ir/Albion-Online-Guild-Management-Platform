// components/dashboard/NewsStats.tsx
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
  Filler,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaNewspaper } from 'react-icons/fa6'
import { motion } from 'framer-motion'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement, Filler)

interface NewsData {
  total: number
  published: number
  draft: number
  views: number[]
  labels: string[]
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  categories: {
    name: string
    count: number
  }[]
}

interface NewsStatsProps {
  data: NewsData
}

export const NewsStats = ({ data }: NewsStatsProps) => {
  const barData = {
    labels: data.categories?.map(c => c.name) || ['Updates', 'Guides', 'Events', 'Patch Notes', 'Community'],
    datasets: [
      {
        label: 'Articles',
        data: data.categories?.map(c => c.count) || [12, 8, 15, 6, 9],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderRadius: 4,
      },
    ],
  }

  const lineData = {
    labels: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: data.views || [120, 150, 130, 180, 160, 200, 220],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ y: -5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">News & Updates</CardTitle>
          <FaNewspaper className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-blue-600">{data.total || 50}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-green-600">{data.published || 35}</p>
              <p className="text-[10px] text-muted-foreground">Published</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-yellow-600">{data.draft || 15}</p>
              <p className="text-[10px] text-muted-foreground">Draft</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-red-600">{data.engagement?.likes || 245}</p>
              <p className="text-[10px] text-muted-foreground">Likes</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-purple-600">{data.engagement?.shares || 89}</p>
              <p className="text-[10px] text-muted-foreground">Shares</p>
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