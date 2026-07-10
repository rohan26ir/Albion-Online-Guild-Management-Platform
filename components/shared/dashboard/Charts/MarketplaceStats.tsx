// components/dashboard/MarketplaceStats.tsx
'use client'

import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { FaShoppingBag } from 'react-icons/fa6'
import { GiShoppingBag } from "react-icons/gi";
import { motion } from 'framer-motion'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, PointElement, LineElement)

interface MarketplaceData {
  totalListings: number
  activeListings: number
  totalSales: number
  revenue: number
  categories: {
    name: string
    count: number
  }[]
  priceTrend: number[]
  labels: string[]
}

interface MarketplaceStatsProps {
  data: MarketplaceData
}

export const MarketplaceStats = ({ data }: MarketplaceStatsProps) => {
  const barData = {
    labels: data.categories?.map(c => c.name) || ['Weapons', 'Armor', 'Potions', 'Materials', 'Mounts'],
    datasets: [
      {
        label: 'Listings',
        data: data.categories?.map(c => c.count) || [45, 32, 28, 56, 18],
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
    labels: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Price Trend',
        data: data.priceTrend || [100, 120, 115, 130, 125, 140, 135],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const donutData = {
    labels: ['Active', 'Sold', 'Expired'],
    datasets: [
      {
        data: [
          data.activeListings || 68,
          data.totalSales || 45,
          20,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: ['#3b82f6', '#10b981', '#ef4444'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      whileHover={{ y: -5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Marketplace</CardTitle>
          <GiShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-blue-600">{data.totalListings || 133}</p>
              <p className="text-[10px] text-muted-foreground">Listings</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-green-600">{data.activeListings || 68}</p>
              <p className="text-[10px] text-muted-foreground">Active</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-purple-600">{data.totalSales || 45}</p>
              <p className="text-[10px] text-muted-foreground">Sales</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded-lg text-center">
              <p className="text-lg font-bold text-yellow-600">{data.revenue || '2.4k'}</p>
              <p className="text-[10px] text-muted-foreground">Revenue</p>
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