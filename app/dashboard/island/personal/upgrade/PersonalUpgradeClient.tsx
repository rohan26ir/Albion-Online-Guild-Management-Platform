"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IconCoin,
  IconPlant,
  IconBuildingStore,
  IconCheck,
  IconInfoCircle,
  IconSparkles,
  IconCalculator
} from "@tabler/icons-react";

interface IslandTierData {
  tier: number;
  tierLabel: string;
  multipurposePlots: number;
  smallMultipurposePlots: number;
  firstTimeSilverCost: number;
  firstTimeTotalSilverCost: number;
  standardSilverCost: number;
  standardTotalSilverCost: number;
  notes: string;
}

const PERSONAL_ISLAND_DATA: IslandTierData[] = [
  {
    tier: 1,
    tierLabel: "Tier 1 (Purchase)",
    multipurposePlots: 1,
    smallMultipurposePlots: 0,
    firstTimeSilverCost: 20000,
    firstTimeTotalSilverCost: 20000,
    standardSilverCost: 1000000,
    standardTotalSilverCost: 1000000,
    notes: "Initial island purchase. Unlocks 1 multipurpose plot (Farm or Building).",
  },
  {
    tier: 2,
    tierLabel: "Tier 2",
    multipurposePlots: 3,
    smallMultipurposePlots: 2,
    firstTimeSilverCost: 500000,
    firstTimeTotalSilverCost: 520000,
    standardSilverCost: 2500000,
    standardTotalSilverCost: 3500000,
    notes: "+2 Multipurpose plots, +2 Small plots unlocked (ideal for smelter/forge).",
  },
  {
    tier: 3,
    tierLabel: "Tier 3",
    multipurposePlots: 6,
    smallMultipurposePlots: 2,
    firstTimeSilverCost: 1125000,
    firstTimeTotalSilverCost: 1645000,
    standardSilverCost: 4000000,
    standardTotalSilverCost: 7500000,
    notes: "+3 Multipurpose plots. Great early milestone for herb and crop rotation.",
  },
  {
    tier: 4,
    tierLabel: "Tier 4",
    multipurposePlots: 9,
    smallMultipurposePlots: 2,
    firstTimeSilverCost: 1312500,
    firstTimeTotalSilverCost: 2957500,
    standardSilverCost: 5000000,
    standardTotalSilverCost: 12500000,
    notes: "+3 Multipurpose plots. Popular for 3-farm crop/animal layouts.",
  },
  {
    tier: 5,
    tierLabel: "Tier 5",
    multipurposePlots: 12,
    smallMultipurposePlots: 2,
    firstTimeSilverCost: 1500000,
    firstTimeTotalSilverCost: 4457500,
    standardSilverCost: 6000000,
    standardTotalSilverCost: 18500000,
    notes: "+3 Multipurpose plots. Efficient for high-tier laborer house clusters.",
  },
  {
    tier: 6,
    tierLabel: "Tier 6 (Max)",
    multipurposePlots: 16,
    smallMultipurposePlots: 2,
    firstTimeSilverCost: 2000000,
    firstTimeTotalSilverCost: 6457500,
    standardSilverCost: 8000000,
    standardTotalSilverCost: 26500000,
    notes: "+4 Multipurpose plots. Maximum island size (16 Large + 2 Small).",
  },
];

export default function PersonalUpgradeClient() {
  const [pricingType, setPricingType] = useState<"first-time" | "standard">("first-time");
  const [startTier, setStartTier] = useState<number>(0);
  const [targetTier, setTargetTier] = useState<number>(6);

  const calculateCost = () => {
    if (targetTier <= startTier) return 0;
    let total = 0;
    for (let t = startTier + 1; t <= targetTier; t++) {
      const tierItem = PERSONAL_ISLAND_DATA.find((item) => item.tier === t);
      if (tierItem) {
        total += pricingType === "first-time" ? tierItem.firstTimeSilverCost : tierItem.standardSilverCost;
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
            <h1 className="text-3xl font-extrabold tracking-tight">Personal Island Upgrade Cost</h1>
            <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-500 font-semibold">
              Tier 1 - 6
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Complete cost breakdown, multipurpose plot capacity, and interactive upgrade planning for Personal Islands in Albion Online.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex items-center rounded-lg border border-border bg-card p-1 shadow-sm">
          <Button
            size="sm"
            variant={pricingType === "first-time" ? "default" : "ghost"}
            onClick={() => setPricingType("first-time")}
            className="text-xs font-semibold gap-1.5"
          >
            <IconSparkles size={14} className="text-amber-400" />
            First-Time Buyer Discount
          </Button>
          <Button
            size="sm"
            variant={pricingType === "standard" ? "default" : "ghost"}
            onClick={() => setPricingType("standard")}
            className="text-xs font-semibold"
          >
            Standard Price (Subsequent)
          </Button>
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
              {pricingType === "first-time" ? "6,457,500" : "26,500,000"} <span className="text-xs text-muted-foreground font-normal">Silver</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {pricingType === "first-time" ? "With one-time account discount" : "Standard subsequent island rate"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Max Multipurpose Plots
            </CardTitle>
            <IconPlant className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">16 Plots</div>
            <p className="text-xs text-muted-foreground mt-1">
              For Farming, Pastures, Herb Gardens, or Houses
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
              Unlocked at Tier 2 (for Smelter, Forge, or Weaver)
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Requirement
            </CardTitle>
            <IconCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">30-Day Premium</div>
            <p className="text-xs text-muted-foreground mt-1">
              Required once per account to purchase island
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
                Buy & Upgrade Island Cost Table
              </CardTitle>
              <CardDescription>
                Tier-by-tier multipurpose plots, small plots, upgrade silver cost, and cumulative total silver.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="w-fit text-xs font-medium">
              Mode: {pricingType === "first-time" ? "First-Time Buyer Rate" : "Standard Rate"}
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
                {PERSONAL_ISLAND_DATA.map((row) => {
                  const silverCost = pricingType === "first-time" ? row.firstTimeSilverCost : row.standardSilverCost;
                  const totalSilver = pricingType === "first-time" ? row.firstTimeTotalSilverCost : row.standardTotalSilverCost;

                  return (
                    <tr key={row.tier} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                            T{row.tier}
                          </span>
                          <span className="font-semibold text-foreground">{row.tierLabel}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {row.multipurposePlots} Plots
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {row.smallMultipurposePlots} Plots
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-right font-mono font-semibold text-foreground whitespace-nowrap">
                        {silverCost.toLocaleString()} <span className="text-amber-500 font-bold">Silver</span>
                      </td>

                      <td className="px-4 py-3.5 text-right font-mono font-bold text-amber-500 whitespace-nowrap">
                        {totalSilver.toLocaleString()} <span className="text-amber-500/80">Silver</span>
                      </td>

                      <td className="px-4 py-3.5 text-xs text-muted-foreground hidden md:table-cell">
                        {row.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-muted/40 font-bold border-t-2 border-border text-sm">
                <tr>
                  <td className="px-4 py-3">Total (Tier 6 Max)</td>
                  <td className="px-4 py-3 text-center text-emerald-500">16 Multipurpose</td>
                  <td className="px-4 py-3 text-center text-sky-400">2 Small</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">—</td>
                  <td className="px-4 py-3 text-right font-mono text-amber-500">
                    {(pricingType === "first-time" ? 6457500 : 26500000).toLocaleString()} Silver
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-xs text-muted-foreground">Full Island Capacity</td>
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
            Interactive Personal Island Upgrade Calculator
          </CardTitle>
          <CardDescription>
            Select your current island tier and target upgrade tier to compute exact silver required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 items-center">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground">Current Island Status</label>
              <select
                value={startTier}
                onChange={(e) => setStartTier(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value={0}>Not Owned (Tier 0 - Need Buy)</option>
                <option value={1}>Tier 1 (Purchased)</option>
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
              <span className="text-xs uppercase font-semibold text-amber-500">Required Silver</span>
              <div className="text-2xl font-extrabold text-amber-500 mt-1 font-mono">
                {calculatedSilver.toLocaleString()} <span className="text-sm font-normal">Silver</span>
              </div>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                {targetTier > startTier
                  ? `Upgrading from T${startTier} → T${targetTier} (${pricingType === "first-time" ? "First-time rate" : "Standard rate"})`
                  : "Target must be higher than current tier"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips & Strategic Notes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <IconInfoCircle className="size-4 text-sky-400" />
              Important Island Purchasing Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              • <strong>First-Time Discount:</strong> Applies once per account across your first island purchase and its upgrades. All subsequent islands will follow standard pricing.
            </p>
            <p>
              • <strong>Permanent Ownership:</strong> Once bought, your personal island remains yours forever even if your Premium subscription expires.
            </p>
            <p>
              • <strong>City Biome Bonuses:</strong> Always purchase your island in the Royal City that has production bonuses matching the crops or animals you want to cultivate.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <IconSparkles className="size-4 text-amber-400" />
              Plot Utilization Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              • <strong>Multipurpose Plots:</strong> Can be converted into Farm Plots (Carrots, Wheat, Beans), Herb Gardens, Pastures, Kennels, or Player/Laborer Houses.
            </p>
            <p>
              • <strong>Small Plots:</strong> Ideal for building personal refining/crafting stations (like a Smelter or Weaver) or guild chests without wasting a large multipurpose plot.
            </p>
            <p>
              • <strong>Optimal ROI:</strong> Reaching <strong>Tier 4 or Tier 5</strong> provides the best cost-to-production ratio for daily focus farming routines.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
