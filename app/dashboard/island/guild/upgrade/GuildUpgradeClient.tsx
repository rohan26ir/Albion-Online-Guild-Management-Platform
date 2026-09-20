"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconCoin,
  IconUsersGroup,
  IconBuildingStore,
  IconInfoCircle,
  IconCalculator,
  IconShield,
  IconUsers
} from "@tabler/icons-react";

interface GuildIslandTierData {
  tier: number;
  tierLabel: string;
  multipurposePlots: number;
  smallMultipurposePlots: number;
  silverCost: number;
  totalSilverCost: number;
  notes: string;
}

const GUILD_ISLAND_DATA: GuildIslandTierData[] = [
  {
    tier: 1,
    tierLabel: "Tier 1 (Creation)",
    multipurposePlots: 4,
    smallMultipurposePlots: 0,
    silverCost: 5000000,
    totalSilverCost: 5000000,
    notes: "Initial Guild Island purchase. Unlocks central Guild Hall spot + 4 Building plots.",
  },
  {
    tier: 2,
    tierLabel: "Tier 2",
    multipurposePlots: 7,
    smallMultipurposePlots: 2,
    silverCost: 3750000,
    totalSilverCost: 8750000,
    notes: "+3 Multipurpose building plots, +2 Small plots unlocked for crafting/smelters.",
  },
  {
    tier: 3,
    tierLabel: "Tier 3",
    multipurposePlots: 10,
    smallMultipurposePlots: 2,
    silverCost: 4000000,
    totalSilverCost: 12750000,
    notes: "+3 Multipurpose building plots. Expands laborer house and guild workshop capacity.",
  },
  {
    tier: 4,
    tierLabel: "Tier 4",
    multipurposePlots: 13,
    smallMultipurposePlots: 2,
    silverCost: 5000000,
    totalSilverCost: 17750000,
    notes: "+3 Multipurpose building plots. Ideal capacity for medium-sized active guilds.",
  },
  {
    tier: 5,
    tierLabel: "Tier 5",
    multipurposePlots: 16,
    smallMultipurposePlots: 2,
    silverCost: 6000000,
    totalSilverCost: 23750000,
    notes: "+3 Multipurpose building plots. Enables extensive T8 crafting station setups.",
  },
  {
    tier: 6,
    tierLabel: "Tier 6 (Max)",
    multipurposePlots: 19,
    smallMultipurposePlots: 2,
    silverCost: 8000000,
    totalSilverCost: 31750000,
    notes: "+3 Multipurpose building plots. Maximum Guild Island size (19 Building + 2 Small + Guild Hall).",
  },
];

export default function GuildUpgradeClient() {
  const [startTier, setStartTier] = useState<number>(0);
  const [targetTier, setTargetTier] = useState<number>(6);

  const calculateCost = () => {
    if (targetTier <= startTier) return 0;
    let total = 0;
    for (let t = startTier + 1; t <= targetTier; t++) {
      const tierItem = GUILD_ISLAND_DATA.find((item) => item.tier === t);
      if (tierItem) {
        total += tierItem.silverCost;
      }
    }
    return total;
  };

  const calculatedSilver = calculateCost();

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Guild Island Upgrade Cost</h1>
            <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-400 font-semibold">
              Guild Tier 1 - 6
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Complete cost matrix, building plot expansion, and upgrade planning for Guild Islands in Albion Online.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold">
            <IconShield size={14} className="mr-1 text-primary" /> Guild Infrastructure
          </Badge>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Upgrade (Max T6)
            </CardTitle>
            <IconCoin className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              31,750,000 <span className="text-xs text-muted-foreground font-normal">Silver</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Cumulative cost from Tier 0 to Tier 6
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Max Building Plots
            </CardTitle>
            <IconBuildingStore className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">19 Plots + Hall</div>
            <p className="text-xs text-muted-foreground mt-1">
              For Guild Houses, Laborers & Crafting Stations
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Small Building Plots
            </CardTitle>
            <IconBuildingStore className="h-4 w-4 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-400">2 Plots</div>
            <p className="text-xs text-muted-foreground mt-1">
              Unlocked at Tier 2 for auxiliary buildings
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Guild Laborer Capacity
            </CardTitle>
            <IconUsers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Up to 72+ Laborers</div>
            <p className="text-xs text-muted-foreground mt-1">
              Via high-tier Guild Hall and Laborer Houses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Primary Upgrade Cost Table */}
      <Card className="border-border/80 shadow-md">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <IconCoin className="size-5 text-amber-500" />
                Buy & Upgrade Guild Island Cost Table
              </CardTitle>
              <CardDescription>
                Tier-by-tier multipurpose building plots, small plots, upgrade silver cost, and cumulative total silver.
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit text-xs font-medium border-border">
              Guild Island Structure
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-b border-border text-xs uppercase text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Tier</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-center">Multipurpose Plots</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-center">Small Multipurpose Plots</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Silver Cost</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-right">Total Silver Cost</th>
                  <th scope="col" className="px-4 py-3 font-semibold hidden md:table-cell">Key Unlocks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {GUILD_ISLAND_DATA.map((row) => (
                  <tr key={row.tier} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 font-bold text-xs border border-blue-500/20">
                          T{row.tier}
                        </span>
                        <span className="font-semibold text-foreground">{row.tierLabel}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {row.multipurposePlots} Building Plots
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {row.smallMultipurposePlots} Plots
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right font-mono font-semibold text-foreground whitespace-nowrap">
                      {row.silverCost.toLocaleString()} <span className="text-amber-500 font-bold">Silver</span>
                    </td>

                    <td className="px-4 py-3.5 text-right font-mono font-bold text-amber-500 whitespace-nowrap">
                      {row.totalSilverCost.toLocaleString()} <span className="text-amber-500/80">Silver</span>
                    </td>

                    <td className="px-4 py-3.5 text-xs text-muted-foreground hidden md:table-cell">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/40 font-bold border-t-2 border-border text-sm">
                <tr>
                  <td className="px-4 py-3">Total (Tier 6 Max)</td>
                  <td className="px-4 py-3 text-center text-emerald-500">19 Building Plots</td>
                  <td className="px-4 py-3 text-center text-sky-400">2 Small Plots</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">—</td>
                  <td className="px-4 py-3 text-right font-mono text-amber-500">
                    31,750,000 Silver
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">Full Guild Island Capacity</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Upgrade Step Calculator */}
      <Card className="border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <IconCalculator className="size-4 text-primary" />
            Interactive Guild Island Upgrade Calculator
          </CardTitle>
          <CardDescription>
            Select your guild island current tier and target tier to calculate required guild bank silver.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 items-center">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Current Guild Island Status</label>
              <select
                value={startTier}
                onChange={(e) => setStartTier(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value={0}>Not Owned (Tier 0 - Need Buy)</option>
                <option value={1}>Tier 1 (Created)</option>
                <option value={2}>Tier 2</option>
                <option value={3}>Tier 3</option>
                <option value={4}>Tier 4</option>
                <option value={5}>Tier 5</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Target Upgrade Tier</label>
              <select
                value={targetTier}
                onChange={(e) => setTargetTier(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value={1}>Tier 1</option>
                <option value={2}>Tier 2</option>
                <option value={3}>Tier 3</option>
                <option value={4}>Tier 4</option>
                <option value={5}>Tier 5</option>
                <option value={6}>Tier 6 (Maxed)</option>
              </select>
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col justify-center">
              <span className="text-xs uppercase font-semibold text-amber-500">Guild Silver Required</span>
              <div className="text-2xl font-extrabold text-amber-500 mt-1 font-mono">
                {calculatedSilver.toLocaleString()} <span className="text-sm font-normal">Silver</span>
              </div>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                {targetTier > startTier
                  ? `Upgrading Guild Island from T${startTier} → T${targetTier}`
                  : "Target must be higher than current tier"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guild vs Personal Differences & Strategy */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <IconInfoCircle className="size-4 text-sky-400" />
              Guild Island Features & Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              • <strong>No Farming Plots:</strong> Guild islands strictly support Building Plots and Small Plots. Farming, Herb gardens, and Pastures cannot be placed on Guild islands.
            </p>
            <p>
              • <strong>Central Guild Hall:</strong> Every Guild Island features a massive central plot designated specifically for building a Guild Hall to house dozens of laborers and guild chests.
            </p>
            <p>
              • <strong>Access Management:</strong> Island access rights, building permissions, and chest permissions can be configured by Guild rank or individual player permissions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <IconUsersGroup className="size-4 text-blue-400" />
              Guild Island Optimization Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              • <strong>Laborer Empire:</strong> Building T8 Guild Houses and a T8 Guild Hall allows your guild to run journals (Blacksmith, Fletcher, Imbuer, Tinker) with maximum happiness and returns.
            </p>
            <p>
              • <strong>Private Crafting Hub:</strong> Avoid high city crafting station taxes by establishing guild-owned crafting stations fueled with associate food.
            </p>
            <p>
              • <strong>Funding Upgrades:</strong> Utilize Guild Tax (set on silver drops) and donations to fund the 31.75M Silver required to max out Tier 6.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
