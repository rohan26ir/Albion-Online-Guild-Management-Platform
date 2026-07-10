// app/dashboard/members/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { 
  IoSearch, IoFilter, IoChevronDown, IoChevronUp,
  IoPersonAdd, IoDownload, IoShield, 
  IoPeople, IoPerson, IoMail, IoCalendar,
  IoFlash, IoSettings, IoBan, IoCloseCircle,
  IoCheckmarkCircle, IoGrid, IoList
} from 'react-icons/io5'
import { 
  FaUsers, FaUserCheck, FaUserCog, FaUserTimes, 
  FaCrown,
  FaAward
} from 'react-icons/fa'
import { 
  MdOutlineLocalActivity, MdOutlineShield 
} from 'react-icons/md'


import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Types
interface Member {
  id: string
  name: string
  photoURL: string
  accountType: 'user' | 'premium' | 'vip'
  guildName: string
  guildRole: 'Guild Master' | 'Officer' | 'Member' | 'Recruit' | 'Veteran'
  rank: number
  joinedDate: string
  lastActive: string
  status: 'online' | 'offline' | 'away' | 'busy'
  level: number
  fame: number
  kills: number
  deaths: number
  activities: {
    pvp: number
    pve: number
    gathering: number
    crafting: number
  }
  email: string
  discord: string
  notes: string
  achievements: string[]
  isBanned: boolean
}

// Mock Data
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'ShadowStrike',
    photoURL: 'https://i.pravatar.cc/150?img=1',
    accountType: 'premium',
    guildName: 'Dark Legion',
    guildRole: 'Guild Master',
    rank: 1,
    joinedDate: '2024-01-15',
    lastActive: '2024-12-20T14:30:00',
    status: 'online',
    level: 120,
    fame: 450000,
    kills: 2500,
    deaths: 1200,
    activities: {
      pvp: 1500,
      pve: 800,
      gathering: 400,
      crafting: 300
    },
    email: 'shadow@email.com',
    discord: 'Shadow#1234',
    notes: 'Founder and leader of Dark Legion',
    achievements: ['Conqueror', 'Legendary', 'Master Tactician'],
    isBanned: false
  },
  {
    id: '2',
    name: 'IronWolf',
    photoURL: 'https://i.pravatar.cc/150?img=2',
    accountType: 'user',
    guildName: 'Dark Legion',
    guildRole: 'Officer',
    rank: 2,
    joinedDate: '2024-02-20',
    lastActive: '2024-12-19T22:15:00',
    status: 'online',
    level: 98,
    fame: 320000,
    kills: 1800,
    deaths: 950,
    activities: {
      pvp: 1000,
      pve: 700,
      gathering: 300,
      crafting: 200
    },
    email: 'ironwolf@email.com',
    discord: 'IronWolf#5678',
    notes: 'Lead PvP officer',
    achievements: ['PvP Master', 'Veteran'],
    isBanned: false
  },
  {
    id: '3',
    name: 'Moonlight',
    photoURL: 'https://i.pravatar.cc/150?img=3',
    accountType: 'vip',
    guildName: 'Dark Legion',
    guildRole: 'Officer',
    rank: 3,
    joinedDate: '2024-03-10',
    lastActive: '2024-12-20T10:00:00',
    status: 'offline',
    level: 105,
    fame: 380000,
    kills: 2100,
    deaths: 800,
    activities: {
      pvp: 1200,
      pve: 900,
      gathering: 200,
      crafting: 400
    },
    email: 'moonlight@email.com',
    discord: 'Moonlight#9012',
    notes: 'PvE and crafting specialist',
    achievements: ['Master Crafter', 'PvE Legend'],
    isBanned: false
  },
  {
    id: '4',
    name: 'StormRider',
    photoURL: 'https://i.pravatar.cc/150?img=4',
    accountType: 'user',
    guildName: 'Dark Legion',
    guildRole: 'Member',
    rank: 4,
    joinedDate: '2024-04-01',
    lastActive: '2024-12-18T18:45:00',
    status: 'away',
    level: 75,
    fame: 150000,
    kills: 800,
    deaths: 600,
    activities: {
      pvp: 400,
      pve: 500,
      gathering: 300,
      crafting: 100
    },
    email: 'stormrider@email.com',
    discord: 'StormRider#3456',
    notes: 'Active PvP player',
    achievements: ['Rising Star'],
    isBanned: false
  },
  {
    id: '5',
    name: 'FireMage',
    photoURL: 'https://i.pravatar.cc/150?img=5',
    accountType: 'premium',
    guildName: 'Dark Legion',
    guildRole: 'Member',
    rank: 5,
    joinedDate: '2024-05-15',
    lastActive: '2024-12-19T20:30:00',
    status: 'online',
    level: 82,
    fame: 200000,
    kills: 1100,
    deaths: 750,
    activities: {
      pvp: 600,
      pve: 700,
      gathering: 100,
      crafting: 200
    },
    email: 'firemage@email.com',
    discord: 'FireMage#7890',
    notes: 'New member, very active',
    achievements: ['Fire Lord'],
    isBanned: false
  },
  {
    id: '6',
    name: 'NightHawk',
    photoURL: 'https://i.pravatar.cc/150?img=6',
    accountType: 'user',
    guildName: 'Dark Legion',
    guildRole: 'Recruit',
    rank: 6,
    joinedDate: '2024-12-01',
    lastActive: '2024-12-20T08:00:00',
    status: 'online',
    level: 45,
    fame: 50000,
    kills: 300,
    deaths: 400,
    activities: {
      pvp: 150,
      pve: 200,
      gathering: 100,
      crafting: 50
    },
    email: 'nighthawk@email.com',
    discord: 'NightHawk#2345',
    notes: 'Recent recruit, showing promise',
    achievements: [],
    isBanned: false
  },
  {
    id: '7',
    name: 'ThunderStrike',
    photoURL: 'https://i.pravatar.cc/150?img=7',
    accountType: 'vip',
    guildName: 'Dark Legion',
    guildRole: 'Veteran',
    rank: 7,
    joinedDate: '2023-08-20',
    lastActive: '2024-12-17T15:20:00',
    status: 'offline',
    level: 115,
    fame: 500000,
    kills: 3000,
    deaths: 1500,
    activities: {
      pvp: 1800,
      pve: 600,
      gathering: 300,
      crafting: 300
    },
    email: 'thunder@email.com',
    discord: 'Thunder#6789',
    notes: 'Veteran player, retired from active duty',
    achievements: ['Legendary', 'Immortal', 'War Hero'],
    isBanned: false
  },
  {
    id: '8',
    name: 'DarkSoul',
    photoURL: 'https://i.pravatar.cc/150?img=8',
    accountType: 'user',
    guildName: 'Dark Legion',
    guildRole: 'Member',
    rank: 8,
    joinedDate: '2024-07-10',
    lastActive: '2024-12-19T12:00:00',
    status: 'busy',
    level: 92,
    fame: 280000,
    kills: 1500,
    deaths: 900,
    activities: {
      pvp: 800,
      pve: 500,
      gathering: 200,
      crafting: 400
    },
    email: 'darksoul@email.com',
    discord: 'DarkSoul#0123',
    notes: 'Crafting specialist',
    achievements: ['Master Crafter'],
    isBanned: false
  }
]

// Components
const StatusBadge = ({ status }: { status: Member['status'] }) => {
  const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online' },
    offline: { color: 'bg-gray-400', text: 'Offline' },
    away: { color: 'bg-yellow-500', text: 'Away' },
    busy: { color: 'bg-red-500', text: 'Busy' }
  }
  const config = statusConfig[status]
  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${config.color}`} />
      <span className="text-sm">{config.text}</span>
    </div>
  )
}

const RoleBadge = ({ role }: { role: Member['guildRole'] }) => {
  const roleConfig = {
    'Guild Master': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: FaCrown },
    'Officer': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', icon: IoShield },
    'Veteran': { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', icon: FaAward },
    'Member': { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: IoCheckmarkCircle },
    'Recruit': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400', icon: IoPeople }
  }
  const config = roleConfig[role]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3" />
      {role}
    </span>
  )
}

const AccountTypeBadge = ({ type }: { type: Member['accountType'] }) => {
  const typeConfig = {
    vip: { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', label: 'VIP' },
    premium: { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', label: 'Premium' },
    user: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400', label: 'User' }
  }
  const config = typeConfig[type]
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

















export default function DashboardMembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<keyof Member>('rank')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  // Get current date for calculations (memoized to avoid impure function in render)
  const currentDate = useMemo(() => new Date(), [])
  const thirtyDaysAgo = useMemo(() => 
    new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000), 
    [currentDate]
  )

  // Filter and sort logic
  const filteredMembers = useMemo(() => {
    let result = members

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(member => 
        member.name.toLowerCase().includes(term) ||
        member.guildName.toLowerCase().includes(term) ||
        member.email.toLowerCase().includes(term) ||
        member.discord.toLowerCase().includes(term)
      )
    }

    // Role filter
    if (roleFilter !== 'all') {
      result = result.filter(member => member.guildRole === roleFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(member => member.status === statusFilter)
    }

    // Account type filter
    if (accountTypeFilter !== 'all') {
      result = result.filter(member => member.accountType === accountTypeFilter)
    }

    // Sorting
    result = [...result].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal as string)
          : (bVal as string).localeCompare(aVal)
      }
      
      return sortDirection === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number)
    })

    return result
  }, [members, searchTerm, roleFilter, statusFilter, accountTypeFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handlers
  const handleSort = (field: keyof Member) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === paginatedMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(paginatedMembers.map(m => m.id))
    }
  }

  const handleSelectMember = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) 
        ? prev.filter(mId => mId !== id)
        : [...prev, id]
    )
  }

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      setMembers(prev => prev.filter(m => m.id !== id))
    }
  }

  const handleBanMember = (id: string) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, isBanned: !m.isBanned } : m
    ))
  }

  const handleRoleChange = (id: string) => {
    const roles: Member['guildRole'][] = ['Guild Master', 'Officer', 'Member', 'Recruit', 'Veteran']
    const member = members.find(m => m.id === id)
    if (!member) return
    
    const currentIndex = roles.indexOf(member.guildRole)
    const nextRole = roles[(currentIndex + 1) % roles.length]
    
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, guildRole: nextRole } : m
    ))
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setStatusFilter('all')
    setAccountTypeFilter('all')
    setCurrentPage(1)
  }

  // Get unique values for filters
  const uniqueRoles = [...new Set(members.map(m => m.guildRole))]
  const uniqueStatuses = [...new Set(members.map(m => m.status))]
  const uniqueAccountTypes = [...new Set(members.map(m => m.accountType))]

  // Export data
  const exportData = () => {
    const headers = ['Name', 'Role', 'Status', 'Level', 'Fame', 'Kills', 'Deaths', 'Joined Date', 'Last Active']
    const csvData = filteredMembers.map(m => [
      m.name,
      m.guildRole,
      m.status,
      m.level,
      m.fame,
      m.kills,
      m.deaths,
      m.joinedDate,
      new Date(m.lastActive).toLocaleString()
    ])
    
    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `guild-members-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10 border-2 ">
        {/* Header */}
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Guild Management</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground md:text-5xl">Members</h1>
              <p className="mt-2 max-w-3xl text-base text-muted-foreground">
                Manage your guild members, track activity, and handle member administration.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <IoPeople className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <IoGrid className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <IoPersonAdd className="h-4 w-4" />
                Add Member
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Members</span>
              <IoPeople className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold">{members.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Online Now</span>
              <IoFlash className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold text-green-500">
              {members.filter(m => m.status === 'online').length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Officers</span>
              <IoShield className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-500">
              {members.filter(m => m.guildRole === 'Officer' || m.guildRole === 'Guild Master').length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Recent Joins</span>
              <IoCalendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-500">
              {members.filter(m => new Date(m.joinedDate) > thirtyDaysAgo).length}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <IoSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members by name, email, or Discord..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent"
              >
                <IoFilter className="h-4 w-4" />
                Filters
                {(roleFilter !== 'all' || statusFilter !== 'all' || accountTypeFilter !== 'all') && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {[roleFilter, statusFilter, accountTypeFilter].filter(f => f !== 'all').length}
                  </span>
                )}
              </button>
              <button
                onClick={exportData}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent"
              >
                <IoDownload className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid gap-4 border-t border-border pt-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Role</label>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="all">All Roles</option>
                      {uniqueRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      {uniqueStatuses.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Account Type</label>
                    <select
                      value={accountTypeFilter}
                      onChange={(e) => setAccountTypeFilter(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      {uniqueAccountTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-3 flex justify-end">
                    <button
                      onClick={resetFilters}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedMembers.length === paginatedMembers.length && paginatedMembers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-border text-primary focus:ring-primary/20"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Member
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('guildRole')}
                  >
                    <div className="flex items-center gap-1">
                      Role
                      {sortField === 'guildRole' && (
                        sortDirection === 'asc' ? <IoChevronUp className="h-3 w-3" /> : <IoChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <IoChevronUp className="h-3 w-3" /> : <IoChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('level')}
                  >
                    <div className="flex items-center gap-1">
                      Level
                      {sortField === 'level' && (
                        sortDirection === 'asc' ? <IoChevronUp className="h-3 w-3" /> : <IoChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('fame')}
                  >
                    <div className="flex items-center gap-1">
                      Fame
                      {sortField === 'fame' && (
                        sortDirection === 'asc' ? <IoChevronUp className="h-3 w-3" /> : <IoChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort('joinedDate')}
                  >
                    <div className="flex items-center gap-1">
                      Joined
                      {sortField === 'joinedDate' && (
                        sortDirection === 'asc' ? <IoChevronUp className="h-3 w-3" /> : <IoChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedMembers.map((member) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => handleSelectMember(member.id)}
                        className="rounded border-border text-primary focus:ring-primary/20"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10">
                          <Image
                            src={member.photoURL}
                            alt={member.name}
                            fill
                            className="rounded-full object-cover"
                            unoptimized={member.photoURL.includes('pravatar')}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            <AccountTypeBadge type={member.accountType} />
                          </div>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <RoleBadge role={member.guildRole} />
                        {member.isBanned && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            <IoBan className="h-3 w-3" />
                            Banned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-4 py-3 font-medium">{member.level}</td>
                    <td className="px-4 py-3 font-medium">
                      {(member.fame / 1000).toFixed(1)}k
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(member.joinedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleRoleChange(member.id)}
                          className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Change Role"
                        >
                          <FaUserCog className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleBanMember(member.id)}
                          className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title={member.isBanned ? 'Unban Member' : 'Ban Member'}
                        >
                          {member.isBanned ? (
                            <IoCheckmarkCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <IoBan className="h-4 w-4 text-red-500" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="rounded-lg p-1.5 hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors"
                          title="Remove Member"
                        >
                          <FaUserTimes className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const page = i + 1
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-sm text-muted-foreground">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1.5 text-sm rounded-lg hover:bg-accent transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Selected Actions Bar */}
        {selectedMembers.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-card px-6 py-3 shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {selectedMembers.length} members selected
              </span>
              <div className="h-6 w-px bg-border" />
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                <FaUserCog className="inline h-4 w-4 mr-1" />
                Change Role
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                <IoMail className="inline h-4 w-4 mr-1" />
                Message
              </button>
              <button className="text-sm text-red-500 hover:text-red-600 transition-colors">
                <FaUserTimes className="inline h-4 w-4 mr-1" />
                Remove
              </button>
              <button
                onClick={() => setSelectedMembers([])}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </main>
  )
}