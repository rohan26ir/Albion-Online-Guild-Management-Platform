'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconTrophy,
  IconSearch,
  IconFilter,
  IconSwords,
  IconUsers,
  IconFlame,
  IconShield,
  IconExternalLink,
  IconCrown,
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GuildRank {
  rank: number;
  name: string;
  tag: string;
  alliance: string;
  seasonPoints: string;
  members: string;
  killFame: string;
  server: 'Americas' | 'Europe' | 'Asia';
}

const mockGuilds: GuildRank[] = [
  { rank: 1, name: 'Escalation', tag: 'ESC', alliance: 'SURF', seasonPoints: '1,420,500', members: '298/300', killFame: '18.4B', server: 'Americas' },
  { rank: 2, name: 'Vortex Legion', tag: 'VOR', alliance: 'OOPS', seasonPoints: '1,280,200', members: '300/300', killFame: '15.9B', server: 'Americas' },
  { rank: 3, name: 'Black Order', tag: 'BLO', alliance: 'SQUAD', seasonPoints: '1,150,000', members: '285/300', killFame: '14.2B', server: 'Europe' },
  { rank: 4, name: 'Crimson Dawn', tag: 'CRD', alliance: 'POEH', seasonPoints: '994,100', members: '290/300', killFame: '12.8B', server: 'Europe' },
  { rank: 5, name: 'Sun', tag: 'SUN', alliance: 'ALONE', seasonPoints: '890,400', members: '275/300', killFame: '11.3B', server: 'Asia' },
  { rank: 6, name: 'Blue Army Reborn', tag: 'BA', alliance: 'SQUAD', seasonPoints: '820,000', members: '295/300', killFame: '10.7B', server: 'Americas' },
  { rank: 7, name: 'The Lonely Men', tag: 'TLM', alliance: 'SURF', seasonPoints: '795,300', members: '260/300', killFame: '9.8B', server: 'Europe' },
  { rank: 8, name: 'Take Care', tag: 'TC', alliance: 'ARMOR', seasonPoints: '740,200', members: '280/300', killFame: '9.2B', server: 'Americas' },
  { rank: 9, name: 'Valhalla Outlaws', tag: 'VHL', alliance: 'OOPS', seasonPoints: '690,000', members: '292/300', killFame: '8.7B', server: 'Asia' },
  { rank: 10, name: 'Gank Empire', tag: 'GANK', alliance: 'DEAD', seasonPoints: '650,500', members: '300/300', killFame: '8.4B', server: 'Europe' },
  { rank: 11, name: 'Iron Wolves', tag: 'IW', alliance: 'NORTH', seasonPoints: '610,000', members: '270/300', killFame: '7.9B', server: 'Americas' },
  { rank: 12, name: 'Silver Syndicate', tag: 'SS', alliance: 'MERCS', seasonPoints: '580,200', members: '265/300', killFame: '7.5B', server: 'Asia' },
  { rank: 13, name: 'Shadow Syndicate', tag: 'SHD', alliance: 'VOID', seasonPoints: '540,800', members: '288/300', killFame: '7.1B', server: 'Europe' },
  { rank: 14, name: 'Avalonian Knights', tag: 'AVK', alliance: 'MISTS', seasonPoints: '510,000', members: '255/300', killFame: '6.8B', server: 'Americas' },
  { rank: 15, name: 'Hellgate Harvesters', tag: 'HGH', alliance: 'FIRE', seasonPoints: '490,300', members: '240/300', killFame: '6.4B', server: 'Europe' },
];

export default function Top100GuildsPage() {
  const [search, setSearch] = useState('');
  const [serverFilter, setServerFilter] = useState<'All' | 'Americas' | 'Europe' | 'Asia'>('All');

  const filtered = mockGuilds.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.alliance.toLowerCase().includes(search.toLowerCase()) ||
      g.tag.toLowerCase().includes(search.toLowerCase());
    const matchesServer = serverFilter === 'All' || g.server === serverFilter;
    return matchesSearch && matchesServer;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <IconTrophy className="size-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Top 100 Guilds Leaderboard</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Global season point standings, alliance affiliations, and kill fame statistics across Albion Online servers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/applications/public-url">
            <Button variant="outline" className="gap-2 text-xs">
              Generate Public Application Link
            </Button>
          </Link>
          <Link href="/dashboard/guild/create">
            <Button className="gap-2 text-xs">
              Create New Guild
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-md">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by guild name, tag, or alliance..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['All', 'Americas', 'Europe', 'Asia'] as const).map((srv) => (
            <Button
              key={srv}
              size="sm"
              variant={serverFilter === srv ? 'default' : 'outline'}
              onClick={() => setServerFilter(srv)}
              className="text-xs"
            >
              {srv}
            </Button>
          ))}
        </div>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockGuilds.slice(0, 3).map((g, idx) => (
          <Card
            key={g.rank}
            className={`border-border bg-card relative overflow-hidden ${
              idx === 0 ? 'ring-1 ring-amber-500/40' : ''
            }`}
          >
            <div className="absolute top-3 right-3 text-2xl font-extrabold opacity-20">
              #{g.rank}
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                    idx === 0
                      ? 'bg-amber-500 text-black'
                      : idx === 1
                      ? 'bg-slate-300 text-black'
                      : 'bg-amber-700 text-white'
                  }`}
                >
                  {g.rank}
                </span>
                <CardTitle className="text-base font-bold truncate text-foreground">{g.name}</CardTitle>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  [{g.alliance}]
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Season Points:</span>
                <span className="font-bold text-amber-500">{g.seasonPoints}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Roster:</span>
                <span className="text-foreground">{g.members}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Kill Fame:</span>
                <span className="text-emerald-500 font-medium">{g.killFame}</span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-border">
                <span className="text-muted-foreground">Server:</span>
                <span className="text-foreground font-medium">{g.server}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-center w-14">Rank</th>
                <th className="px-4 py-3">Guild</th>
                <th className="px-4 py-3">Alliance</th>
                <th className="px-4 py-3">Server</th>
                <th className="px-4 py-3">Members</th>
                <th className="px-4 py-3 text-right">Season Points</th>
                <th className="px-4 py-3 text-right">PvP Kill Fame</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((guild) => (
                <tr key={guild.rank} className="hover:bg-accent/40 transition-colors">
                  <td className="px-4 py-3 text-center font-bold">
                    {guild.rank === 1 ? (
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-500 text-black font-bold text-xs">
                        1
                      </span>
                    ) : guild.rank === 2 ? (
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-slate-300 text-black font-bold text-xs">
                        2
                      </span>
                    ) : guild.rank === 3 ? (
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-700 text-white font-bold text-xs">
                        3
                      </span>
                    ) : (
                      <span className="text-muted-foreground">#{guild.rank}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground flex items-center gap-2">
                    <IconShield className="size-4 text-primary shrink-0" />
                    <span>{guild.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">({guild.tag})</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-muted/60 text-xs font-mono font-medium">
                      [{guild.alliance}]
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{guild.server}</td>
                  <td className="px-4 py-3 text-xs">{guild.members}</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-500 tabular-nums">
                    {guild.seasonPoints}
                  </td>
                  <td className="px-4 py-3 text-right text-emerald-500 font-medium tabular-nums">
                    {guild.killFame}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/dashboard/applications?guild=${encodeURIComponent(guild.name)}`}>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1">
                        View <IconExternalLink className="size-3" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
