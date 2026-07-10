'use client'
 
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaFileLines } from 'react-icons/fa6'
import { motion } from 'framer-motion'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement)

interface ApplicationData {
  total: number
  pending: number
  approved: number
  rejected: number
  weeklyTrend: number[]
  labels: string[]
}

interface ApplicationStatsProps {
  data: ApplicationData
}

export const ApplicationStats = ({ data }: ApplicationStatsProps) => {
  const barData = {
    labels: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Applications',
        data: data.weeklyTrend || [5, 8, 6, 12, 9, 7, 10],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const donutData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [
          data.approved || 35,
          data.pending || 25,
          data.rejected || 15,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileHover={{ y: -5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Applications</CardTitle>
          <FaFileLines className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-green-600">{data.approved || 35}</p>
              <p className="text-[10px] text-muted-foreground">Approved</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-yellow-600">{data.pending || 25}</p>
              <p className="text-[10px] text-muted-foreground">Pending</p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-red-600">{data.rejected || 15}</p>
              <p className="text-[10px] text-muted-foreground">Rejected</p>
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