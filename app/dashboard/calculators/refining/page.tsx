'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconScissors,
  IconFlame,
  IconPercentage,
  IconCoin,
  IconMapPin,
  IconCrown,
  IconCheck,
  IconInfoCircle,
  IconSparkles,
  IconRotate,
  IconTrendingUp,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface ResourceType {
  id: string;
  name: string;
  rawName: string;
  refinedName: string;
  bonusCity: string;
}

const RESOURCES: ResourceType[] = [
  { id: 'ore', name: 'Ore / Bar', rawName: 'Ore', refinedName: 'Metal Bar', bonusCity: 'Thetford' },
  { id: 'wood', name: 'Wood / Plank', rawName: 'Logs', refinedName: 'Planks', bonusCity: 'Fort Sterling' },
  { id: 'fiber', name: 'Fiber / Cloth', rawName: 'Fiber', refinedName: 'Cloth', bonusCity: 'Lymhurst' },
  { id: 'hide', name: 'Hide / Leather', rawName: 'Hide', refinedName: 'Leather', bonusCity: 'Martlock' },
  { id: 'stone', name: 'Stone / Block', rawName: 'Stone', refinedName: 'Stone Block', bonusCity: 'Bridgewatch' },
];

const TIERS = [
  { tier: 'T4', lowerTierName: 'T3', rawPerCraft: 2 },
  { tier: 'T5', lowerTierName: 'T4', rawPerCraft: 3 },
  { tier: 'T6', lowerTierName: 'T5', rawPerCraft: 4 },
  { tier: 'T7', lowerTierName: 'T6', rawPerCraft: 5 },
  { tier: 'T8', lowerTierName: 'T7', rawPerCraft: 5 },
];

const ENCHANTMENTS = ['.0', '.1', '.2', '.3', '.4'] as const;

export default function RefiningCalculatorPage() {
  const [selectedResource, setSelectedResource] = useState<string>('ore');
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(2); // T6 default
  const [selectedEnchant, setSelectedEnchant] = useState<string>('.1');
  const [batchQuantity, setBatchQuantity] = useState<number>(100);
  const [hasPremium, setHasPremium] = useState<boolean>(true);

  // Prices
  const [rawUnitPrice, setRawUnitPrice] = useState<number>(750);
  const [lowerTierUnitPrice, setLowerTierUnitPrice] = useState<number>(1850);
  const [refinedSellPrice, setRefinedSellPrice] = useState<number>(5600);
  const [stationFeePerCraft, setStationFeePerCraft] = useState<number>(120);

  // Refining RRR Presets
  // In Albion, Refining in the city with the local bonus has a 36.7% return rate without focus, and 53.9% with focus!
  const [isCityBonus, setIsCityBonus] = useState<boolean>(true);
  const [useFocus, setUseFocus] = useState<boolean>(true);
  const [focusPerCraft, setFocusPerCraft] = useState<number>(180);

  const activeTier = TIERS[selectedTierIndex];
  const activeResource = RESOURCES.find((r) => r.id === selectedResource) || RESOURCES[0];

  // RRR Calculation:
  // City bonus: 36.7% no focus, 53.9% with focus
  // Non-bonus city: 15.2% no focus, 43.5% with focus
  const rrrPercent = isCityBonus ? (useFocus ? 53.9 : 36.7) : useFocus ? 43.5 : 15.2;
  const returnRate = rrrPercent / 100;

  // Costs
  // In Albion refining:
  // Lower tier refined material is returned at the same RRR rate as raw materials!
  const totalRawQty = activeTier.rawPerCraft * batchQuantity;
  const totalLowerTierQty = batchQuantity;

  const totalRawCost = totalRawQty * rawUnitPrice;
  const totalLowerTierCost = totalLowerTierQty * lowerTierUnitPrice;
  const grossIngredientCost = totalRawCost + totalLowerTierCost;

  // Value of returned materials (raw + lower tier refined)
  const returnedValue = Math.round(grossIngredientCost * returnRate);
  const totalStationFee = stationFeePerCraft * batchQuantity;

  const netRefiningCost = grossIngredientCost - returnedValue + totalStationFee;
  const costPerRefinedItem = batchQuantity > 0 ? Math.round(netRefiningCost / batchQuantity) : 0;

  // Sales & Taxes
  const taxRate = hasPremium ? 0.04 : 0.08;
  const setupFeeRate = 0.025; // Sell order
  const totalSalesTaxRate = taxRate + setupFeeRate;

  const totalGrossRevenue = refinedSellPrice * batchQuantity;
  const totalMarketFees = Math.round(totalGrossRevenue * totalSalesTaxRate);
  const netRevenue = totalGrossRevenue - totalMarketFees;

  // Net Profit
  const netProfit = netRevenue - netRefiningCost;
  const profitPerItem = batchQuantity > 0 ? Math.round(netProfit / batchQuantity) : 0;
  const roi = netRefiningCost > 0 ? (netProfit / netRefiningCost) * 100 : 0;
  const margin = totalGrossRevenue > 0 ? (netProfit / totalGrossRevenue) * 100 : 0;

  // Silver per focus
  const totalFocusSpent = useFocus ? focusPerCraft * batchQuantity : 0;
  const nonFocusReturnVal = Math.round(grossIngredientCost * ((isCityBonus ? 36.7 : 15.2) / 100));
  const focusGain = returnedValue - nonFocusReturnVal;
  const silverPerFocus = totalFocusSpent > 0 ? (focusGain / totalFocusSpent).toFixed(1) : '0';

  const handleReset = () => {
    setRawUnitPrice(750);
    setLowerTierUnitPrice(1850);
    setRefinedSellPrice(5600);
    setBatchQuantity(100);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Refining & Smelting
            </span>
            <span className="text-xs text-muted-foreground">Resource Processing</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <IconScissors className="size-7 text-primary" />
            Refining Profit & Cascading Return Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Calculate accurate margins for Planks, Bars, Cloth, Leather, and Blocks with authentic City Bonuses (36.7% / 53.9% RRR) and Focus efficiency.
          </p>
        </div>

        {/* Premium Badge */}
        <div className="flex items-center gap-3 bg-card/80 border border-border p-2 px-3.5 rounded-xl">
          <IconCrown className={`size-5 ${hasPremium ? 'text-amber-400 fill-amber-400/20' : 'text-muted-foreground'}`} />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">Albion Premium</span>
            <span className="text-[10px] text-muted-foreground">
              {hasPremium ? '4% Sales Tax' : '8% Sales Tax'}
            </span>
          </div>
          <button
            onClick={() => setHasPremium(!hasPremium)}
            className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              hasPremium ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                hasPremium ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Resource & City Selection */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Select Resource Type</span>
              <span className="text-xs font-bold text-amber-400">Bonus City: {activeResource.bonusCity}</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {RESOURCES.map((res) => (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => setSelectedResource(res.id)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedResource === res.id
                      ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-bold'
                      : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <p className="text-xs">{res.name}</p>
                  <span className="text-[9px] text-muted-foreground block mt-0.5">{res.bonusCity}</span>
                </button>
              ))}
            </div>

            {/* Tier & Enchantment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Refined Tier Target</label>
                <div className="flex gap-1">
                  {TIERS.map((t, idx) => (
                    <button
                      key={t.tier}
                      type="button"
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedTierIndex === idx
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {t.tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Enchantment</label>
                <div className="flex gap-1">
                  {ENCHANTMENTS.map((enc) => (
                    <button
                      key={enc}
                      type="button"
                      onClick={() => setSelectedEnchant(enc)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedEnchant === enc
                          ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                          : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {enc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-xs text-muted-foreground">Total Units to Refine (Batch Output)</label>
              <input
                type="number"
                min="1"
                value={batchQuantity}
                onChange={(e) => setBatchQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Pricing Inputs */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Material Prices & Market Values
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 p-3 rounded-xl bg-background/50 border border-border">
                <label className="text-xs font-semibold text-foreground">
                  Raw Material Price: {activeTier.tier} {activeResource.rawName}
                </label>
                <p className="text-[10px] text-muted-foreground">Requires {activeTier.rawPerCraft} units per craft</p>
                <input
                  type="number"
                  value={rawUnitPrice}
                  onChange={(e) => setRawUnitPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground font-semibold"
                />
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-background/50 border border-border">
                <label className="text-xs font-semibold text-foreground">
                  Lower Tier Refined: {activeTier.lowerTierName} {activeResource.refinedName}
                </label>
                <p className="text-[10px] text-muted-foreground">Requires 1 unit per craft</p>
                <input
                  type="number"
                  value={lowerTierUnitPrice}
                  onChange={(e) => setLowerTierUnitPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 p-3 rounded-xl bg-background/50 border border-border">
                <label className="text-xs font-semibold text-foreground">
                  Finished Sell Price: {activeTier.tier}{selectedEnchant} {activeResource.refinedName}
                </label>
                <p className="text-[10px] text-muted-foreground">Market sell value per unit</p>
                <input
                  type="number"
                  value={refinedSellPrice}
                  onChange={(e) => setRefinedSellPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground font-semibold"
                />
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-background/50 border border-border">
                <label className="text-xs font-semibold text-foreground">Station Usage Fee (Per Craft)</label>
                <p className="text-[10px] text-muted-foreground">Silver paid to station owner</p>
                <input
                  type="number"
                  value={stationFeePerCraft}
                  onChange={(e) => setStationFeePerCraft(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground font-semibold"
                />
              </div>
            </div>
          </div>

          {/* RRR & City Bonus Options */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Location & Focus Efficiency</span>
              <span className="text-xs font-bold text-emerald-400">{rrrPercent}% Total RRR</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsCityBonus(true)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isCityBonus ? 'border-primary bg-primary/10 ring-1 ring-primary/40' : 'border-border bg-muted/20'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold text-foreground">
                  <span>In {activeResource.bonusCity} (Bonus City)</span>
                  <span className="text-emerald-400">{useFocus ? '53.9%' : '36.7%'}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Recommended location for {activeResource.name}</p>
              </button>

              <button
                type="button"
                onClick={() => setIsCityBonus(false)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  !isCityBonus ? 'border-primary bg-primary/10 ring-1 ring-primary/40' : 'border-border bg-muted/20'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-bold text-foreground">
                  <span>Other Royal City / Island</span>
                  <span className="text-emerald-400">{useFocus ? '43.5%' : '15.2%'}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Standard return rate without local city bonus</p>
              </button>
            </div>

            {/* Focus Toggle */}
            <div className="p-3.5 rounded-xl bg-background/50 border border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconFlame className={`size-5 ${useFocus ? 'text-amber-400 fill-amber-400/20' : 'text-muted-foreground'}`} />
                <div>
                  <p className="text-xs font-semibold text-foreground">Use Refining Focus</p>
                  <p className="text-[10px] text-muted-foreground">Boosts RRR by ~17% to 28%</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUseFocus(!useFocus)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  useFocus ? 'bg-amber-500' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                    useFocus ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {useFocus && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-medium">Focus Cost per Craft:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={focusPerCraft}
                    onChange={(e) => setFocusPerCraft(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 rounded-lg border border-amber-500/40 bg-background/80 px-2.5 py-1 text-right text-xs font-bold text-amber-300"
                  />
                  <span className="text-muted-foreground">pts</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Calculations */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Profit Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl border p-6 backdrop-blur-md shadow-xl relative overflow-hidden ${
              netProfit >= 0
                ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/20 via-card to-background'
                : 'border-red-500/40 bg-gradient-to-br from-red-950/20 via-card to-background'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Batch Outcome ({batchQuantity} refined units)
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${
                  netProfit >= 0
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                {netProfit >= 0 ? <IconCheck className="size-3.5" /> : null}
                {netProfit >= 0 ? 'High Refining Profit' : 'Unprofitable'}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Total Net Profit</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                    netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {netProfit > 0 ? '+' : ''}
                  {netProfit.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-muted-foreground">Silver</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/70">
              <div className="p-3 rounded-xl bg-background/50 border border-border">
                <span className="text-[11px] text-muted-foreground block">Profit Per Unit</span>
                <span className={`text-base font-bold ${profitPerItem >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {profitPerItem.toLocaleString()} Silver
                </span>
              </div>

              <div className="p-3 rounded-xl bg-background/50 border border-border">
                <span className="text-[11px] text-muted-foreground block">Return on Investment</span>
                <span className={`text-base font-bold ${roi >= 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {roi.toFixed(1)}% ROI
                </span>
              </div>
            </div>

            {useFocus && (
              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex justify-between items-center text-xs">
                <span className="text-amber-300 font-medium flex items-center gap-1.5">
                  <IconFlame className="size-4 text-amber-400 fill-amber-400/30" />
                  Silver / Focus Point:
                </span>
                <span className="text-sm font-bold text-amber-300">{silverPerFocus} Silver/pt</span>
              </div>
            )}
          </motion.div>

          {/* Breakdown Sheet */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border flex items-center justify-between">
              <span>Refining Resource Ledger</span>
              <IconCoin className="size-4 text-amber-400" />
            </h3>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Raw Resource Inputs ({totalRawQty} raw items)</span>
              <span className="text-foreground font-semibold">{totalRawCost.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Lower Tier Materials ({totalLowerTierQty} lower tier)</span>
              <span className="text-foreground font-semibold">{totalLowerTierCost.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-emerald-400 font-medium">
              <span>Returned Resources ({rrrPercent}% RRR)</span>
              <span>+{returnedValue.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Station Refining Fees</span>
              <span className="text-red-400 font-medium">-{totalStationFee.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Gross Sales (Market)</span>
              <span className="text-foreground font-semibold">{totalGrossRevenue.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Market Fees ({totalSalesTaxRate * 100}%)</span>
              <span className="text-red-400 font-medium">-{totalMarketFees.toLocaleString()} Silver</span>
            </div>

            <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
              <span className="text-foreground">Net Cost per Refined Unit</span>
              <span className="text-primary">{costPerRefinedItem.toLocaleString()} Silver</span>
            </div>
          </div>

          {/* City Bonus Mapping Table */}
          <div className="rounded-2xl border border-border bg-muted/20 p-4 text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <IconMapPin className="size-4 text-primary" />
              City Refining Bonus Reference
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <span className="text-foreground font-medium">• Thetford: Ore → Metal Bars</span>
              <span className="text-foreground font-medium">• Fort Sterling: Logs → Planks</span>
              <span className="text-foreground font-medium">• Lymhurst: Fiber → Cloth</span>
              <span className="text-foreground font-medium">• Martlock: Hide → Leather</span>
              <span className="text-foreground font-medium sm:col-span-2">• Bridgewatch: Stone → Blocks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}