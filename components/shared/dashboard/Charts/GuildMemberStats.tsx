'use client'
 
import { Pie, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaUsers, FaCrown, FaShieldHalved } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { GiBroadsword } from 'react-icons/gi'

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler)

interface GuildMemberData {
  total: number
  guildMaster: number
  officers: number
  members: number
  recruits: number
  roles: {
    name: string
    count: number
  }[]
  activity: {
    label: string
    value: number
  }[]
}

interface GuildMemberStatsProps {
  data: GuildMemberData
}

export const GuildMemberStats = ({ data }: GuildMemberStatsProps) => {
  const pieData = {
    labels: ['Guild Master', 'Officers', 'Members', 'Recruits'],
    datasets: [
      {
        data: [
          data.guildMaster || 1,
          data.officers || 8,
          data.members || 45,
          data.recruits || 12,
        ],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: ['#eab308', '#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 2,
      },
    ],
  }

  const radarData = {
    labels: data.activity?.map(a => a.label) || ['PvP', 'PvE', 'Gathering', 'Crafting', 'Trading', 'Exploring'],
    datasets: [
      {
        label: 'Activity Level',
        data: data.activity?.map(a => a.value) || [85, 70, 60, 75, 65, 80],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{ y: -5 }}
      className="col-span-1"
    >
      <Card className="h-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden relative group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Guild Members</CardTitle>
          <FaUsers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FaCrown className="h-3 w-3 text-yellow-500" />
                <span className="text-xs">{data.guildMaster || 1}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaShieldHalved className="h-3 w-3 text-blue-500" />
                <span className="text-xs">{data.officers || 8}</span>
              </div>
              <div className="flex items-center gap-1">
                <GiBroadsword className="h-3 w-3 text-green-500" />
                <span className="text-xs">{data.members || 45}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{data.total || 66}</p>
              <p className="text-[10px] text-muted-foreground">Total Members</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[100px]">
              <Pie 
                data={pieData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
            <div className="h-[100px]">
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}