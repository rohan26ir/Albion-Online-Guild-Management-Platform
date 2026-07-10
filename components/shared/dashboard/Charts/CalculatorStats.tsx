'use client'

import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { FaCalculator } from 'react-icons/fa'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip
)

interface CalculatorData {
  totalUses: number
  mostUsed: string
  usageTrend: number[]
  labels: string[]
  types: { name: string; uses: number }[]
}

interface CalculatorStatsProps {
  data: CalculatorData
}

export const CalculatorStats = ({ data }: CalculatorStatsProps) => {
  const barChartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Usage Trend',
        data: data.usageTrend,
        backgroundColor: 'rgba(139, 92, 246, 0.8)', // Violet
        borderRadius: 4,
      },
    ],
  }

  const donutData = {
    labels: data.types.map(t => t.name),
    datasets: [
      {
        data: data.types.map(t => t.uses),
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)', // Violet
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(16, 185, 129, 0.8)', // Green
          'rgba(245, 158, 11, 0.8)', // Yellow
        ],
        borderWidth: 0,
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
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium tracking-wide">Calculators Data</CardTitle>
          <div className="p-2 bg-violet-500/20 rounded-full">
            <FaCalculator className="h-4 w-4 text-violet-500" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-xl bg-background/50 border border-border/30 text-center backdrop-blur-md">
              <p className="text-xl font-bold text-violet-500">{data.totalUses}</p>
              <p className="text-xs text-muted-foreground">Total Uses</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 border border-border/30 text-center backdrop-blur-md">
              <p className="text-sm font-bold text-violet-500 truncate mt-1">{data.mostUsed}</p>
              <p className="text-xs text-muted-foreground">Most Used</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[120px]">
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
            <div className="h-[120px]">
              <Doughnut 
                data={donutData} 
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
                  cutout: '75%',
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
