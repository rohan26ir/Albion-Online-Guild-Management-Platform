'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconHammer,
  IconFlame,
  IconPercentage,
  IconCoin,
  IconBook,
  IconBuildingStore,
  IconCrown,
  IconCheck,
  IconSparkles,
  IconInfoCircle,
  IconRotate,
  IconChevronRight,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface RrrPreset {
  name: string;
  nonFocus: number;
  focus: number;
  description: string;
}

const RRR_PRESETS: RrrPreset[] = [
  { name: 'City Bonus (e.g. Fort Sterling Hammers)', nonFocus: 24.8, focus: 47.9, description: 'Best city with daily crafting bonus' },
  { name: 'Standard Royal City (No local bonus)', nonFocus: 15.2, focus: 43.5, description: 'Default city station without item bonus' },
  { name: 'Player Island / Guild Hall', nonFocus: 0.0, focus: 37.1, description: 'Island craft station without city return bonus' },
  { name: 'Black Zone Hideout (L3 Zone)', nonFocus: 28.5, focus: 53.9, description: 'Deep outlands hideout with high power level' },
];

const TIERS = ['T4', 'T5', 'T6', 'T7', 'T8'] as const;
const ENCHANTMENTS = ['.0', '.1', '.2', '.3', '.4'] as const;

export default function CraftingCalculatorPage() {
  // Config states
  const [selectedTier, setSelectedTier] = useState<string>('T6');
  const [selectedEnchant, setSelectedEnchant] = useState<string>('.1');
  const [itemName, setItemName] = useState<string>("T6.1 Battleaxe");
  const [batchQuantity, setBatchQuantity] = useState<number>(20);
  const [hasPremium, setHasPremium] = useState<boolean>(true);

  // Material inputs
  const [primaryQty, setPrimaryQty] = useState<number>(16); // e.g. 16 Planks
  const [primaryPrice, setPrimaryPrice] = useState<number>(3200);
  const [secondaryQty, setSecondaryQty] = useState<number>(8); // e.g. 8 Metal Bars
  const [secondaryPrice, setSecondaryPrice] = useState<number>(2900);
  const [artifactCost, setArtifactCost] = useState<number>(0);

  // RRR & Focus
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [useFocus, setUseFocus] = useState<boolean>(false);
  const [focusCostPerItem, setFocusCostPerItem] = useState<number>(350);

  // Station Fee & Journals
  const [stationFeePerItem, setStationFeePerItem] = useState<number>(450);
  const [includeJournals, setIncludeJournals] = useState<boolean>(true);
  const [emptyJournalCost, setEmptyJournalCost] = useState<number>(14000);
  const [filledJournalPrice, setFilledJournalPrice] = useState<number>(26000);
  const [itemsPerJournal, setItemsPerJournal] = useState<number>(4); // how many crafts to fill 1 journal

  // Output Market
  const [marketSellPrice, setMarketSellPrice] = useState<number>(95000);
  const [sellOrderMethod, setSellOrderMethod] = useState<'order' | 'instant'>('order');

  // Math Calculations
  const activePreset = RRR_PRESETS[selectedPresetIndex];
  const returnRatePercent = useFocus ? activePreset.focus : activePreset.nonFocus;
  const returnRate = returnRatePercent / 100;

  // Material cost per single item
  const rawMaterialCostPerItem = primaryQty * primaryPrice + secondaryQty * secondaryPrice + artifactCost;
  const totalRawCost = rawMaterialCostPerItem * batchQuantity;

  // Returned materials value
  // In Albion, artifacts are NOT returned, only primary and secondary resources
  const returnableMaterialCost = (primaryQty * primaryPrice + secondaryQty * secondaryPrice) * batchQuantity;
  const valueReturnedMaterials = Math.round(returnableMaterialCost * returnRate);

  // Station fees
  const totalStationFee = stationFeePerItem * batchQuantity;

  // Journal bonus profit
  const journalsFilled = includeJournals && itemsPerJournal > 0 ? Math.floor(batchQuantity / itemsPerJournal) : 0;
  const journalProfitTotal = journalsFilled * Math.max(0, filledJournalPrice - emptyJournalCost);

  // Net crafting expense
  const totalCraftingExpense = totalRawCost - valueReturnedMaterials + totalStationFee;
  const effectiveCostPerItem = batchQuantity > 0 ? Math.round(totalCraftingExpense / batchQuantity) : 0;

  // Market Taxes
  const taxRate = hasPremium ? 0.04 : 0.08;
  const setupFeeRate = sellOrderMethod === 'order' ? 0.025 : 0;
  const totalFeeRate = taxRate + setupFeeRate;

  const totalGrossSales = marketSellPrice * batchQuantity;
  const marketFeesTotal = Math.round(totalGrossSales * totalFeeRate);
  const netSalesRevenue = totalGrossSales - marketFeesTotal;

  // Net Profit
  const netProfit = netSalesRevenue + journalProfitTotal - totalCraftingExpense;
  const profitPerItem = batchQuantity > 0 ? Math.round(netProfit / batchQuantity) : 0;
  const roi = totalCraftingExpense > 0 ? (netProfit / totalCraftingExpense) * 100 : 0;
  const profitMargin = totalGrossSales > 0 ? (netProfit / totalGrossSales) * 100 : 0;

  // Silver per Focus point
  const totalFocusUsed = useFocus ? focusCostPerItem * batchQuantity : 0;
  // Focus value is difference between focus craft profit and non-focus craft profit
  // Approximate silver per focus = additional materials returned / total focus
  const nonFocusReturnVal = Math.round(returnableMaterialCost * (activePreset.nonFocus / 100));
  const focusAdditionalValue = valueReturnedMaterials - nonFocusReturnVal;
  const silverPerFocus = totalFocusUsed > 0 ? (focusAdditionalValue / totalFocusUsed).toFixed(1) : '0';

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Blacksmith & Workshop
            </span>
            <span className="text-xs text-muted-foreground">Economic Production</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <IconHammer className="size-7 text-primary" />
            Crafting Profit & Resource Return Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Calculate accurate profit margins with Albion Resource Return Rates (RRR), Focus efficiency, station nutrition fees, and journals.
          </p>
        </div>

        {/* Premium Badge & Toggle */}
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

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Item Tier, Enchantment & Batch */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <IconSparkles className="size-4 text-primary" />
              Item Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs text-muted-foreground">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Batch Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={batchQuantity}
                  onChange={(e) => setBatchQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Tier & Enchantment Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Item Tier</label>
                <div className="flex gap-1.5">
                  {TIERS.map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedTier === tier
                          ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                          : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/60'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Enchantment Level</label>
                <div className="flex gap-1.5">
                  {ENCHANTMENTS.map((enc) => (
                    <button
                      key={enc}
                      type="button"
                      onClick={() => setSelectedEnchant(enc)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedEnchant === enc
                          ? 'border-amber-500 bg-amber-500/20 text-amber-400 shadow-xs'
                          : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/60'
                      }`}
                    >
                      {enc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Materials Section */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Required Raw Materials</span>
              <span className="text-xs font-normal text-muted-foreground">per item craft</span>
            </h2>

            {/* Primary Material */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-background/50 border border-border">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Primary Resource</label>
                <input
                  type="text"
                  defaultValue="Planks / Metal"
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Quantity Needed</label>
                <input
                  type="number"
                  value={primaryQty}
                  onChange={(e) => setPrimaryQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Price Per Unit</label>
                <input
                  type="number"
                  step="100"
                  value={primaryPrice}
                  onChange={(e) => setPrimaryPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>

            {/* Secondary Material */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-background/50 border border-border">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Secondary Resource</label>
                <input
                  type="text"
                  defaultValue="Cloth / Leather"
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Quantity Needed</label>
                <input
                  type="number"
                  value={secondaryQty}
                  onChange={(e) => setSecondaryQty(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Price Per Unit</label>
                <input
                  type="number"
                  step="100"
                  value={secondaryPrice}
                  onChange={(e) => setSecondaryPrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>

            {/* Artifact / Relic / Rune Cost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-background/50 border border-border">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Artifact / Soul Cost (Optional)</label>
                <input
                  type="number"
                  value={artifactCost}
                  onChange={(e) => setArtifactCost(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="0 if non-artifact"
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Craft Station Fee (per item)</label>
                <input
                  type="number"
                  value={stationFeePerItem}
                  onChange={(e) => setStationFeePerItem(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>
          </div>

          {/* RRR & Focus Settings */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <IconPercentage className="size-4 text-primary" />
                Resource Return Rate (RRR)
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Use Crafting Focus:</span>
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
            </div>

            {/* Presets Radio / Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RRR_PRESETS.map((preset, idx) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setSelectedPresetIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPresetIndex === idx
                      ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                      : 'border-border bg-muted/20 hover:bg-muted/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-foreground">{preset.name.split('(')[0]}</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {useFocus ? `${preset.focus}% RRR` : `${preset.nonFocus}% RRR`}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{preset.description}</p>
                </button>
              ))}
            </div>

            {useFocus && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-amber-300 flex items-center gap-1.5 font-medium">
                  <IconFlame className="size-4 text-amber-400 fill-amber-400/30" />
                  Focus Cost Per Item:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={focusCostPerItem}
                    onChange={(e) => setFocusCostPerItem(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 rounded-lg border border-amber-500/40 bg-background/80 px-2.5 py-1 text-right text-xs font-bold text-amber-300"
                  />
                  <span className="text-muted-foreground">Focus</span>
                </div>
              </div>
            )}
          </div>

          {/* Journals & Market Sell Target */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <IconBook className="size-4 text-primary" />
                Crafting Journals (Extra Profit)
              </h2>
              <input
                type="checkbox"
                checked={includeJournals}
                onChange={(e) => setIncludeJournals(e.target.checked)}
                className="size-4 rounded border-border text-primary cursor-pointer"
              />
            </div>

            {includeJournals && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-background/50 border border-border text-xs">
                <div className="space-y-1">
                  <label className="text-muted-foreground">Empty Journal Buy</label>
                  <input
                    type="number"
                    value={emptyJournalCost}
                    onChange={(e) => setEmptyJournalCost(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-border bg-muted/20 px-2.5 py-1.5 text-xs text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground">Filled Journal Sell</label>
                  <input
                    type="number"
                    value={filledJournalPrice}
                    onChange={(e) => setFilledJournalPrice(parseInt(e.target.value) || 0)}
                    className="w-full rounded-lg border border-border bg-muted/20 px-2.5 py-1.5 text-xs text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground">Crafts to Fill 1 Journal</label>
                  <input
                    type="number"
                    value={itemsPerJournal}
                    onChange={(e) => setItemsPerJournal(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-lg border border-border bg-muted/20 px-2.5 py-1.5 text-xs text-foreground"
                  />
                </div>
              </div>
            )}

            {/* Target Sell Price */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-foreground">Finished Item Market Sell Price (Per Unit)</label>
                <div className="flex gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSellOrderMethod('order')}
                    className={`cursor-pointer ${sellOrderMethod === 'order' ? 'text-primary font-bold underline' : 'text-muted-foreground'}`}
                  >
                    Sell Order (+2.5%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSellOrderMethod('instant')}
                    className={`cursor-pointer ${sellOrderMethod === 'instant' ? 'text-primary font-bold underline' : 'text-muted-foreground'}`}
                  >
                    Direct Sell (0%)
                  </button>
                </div>
              </div>
              <input
                type="number"
                step="500"
                value={marketSellPrice}
                onChange={(e) => setMarketSellPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-base font-bold text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Output Stats */}
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
                Craft Batch Summary ({batchQuantity} units)
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${
                  netProfit >= 0
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                {netProfit >= 0 ? <IconCheck className="size-3.5" /> : null}
                {netProfit >= 0 ? 'Profitable Craft' : 'Loss Craft'}
              </span>
            </div>

            {/* Total Profit Display */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Net Batch Profit</p>
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

            {/* Metrics Badges */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/70">
              <div className="p-3 rounded-xl bg-background/50 border border-border">
                <span className="text-[11px] text-muted-foreground block">Profit Per Item</span>
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

            {/* Focus Value Badge */}
            {useFocus && (
              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex justify-between items-center text-xs">
                <span className="text-amber-300 font-medium flex items-center gap-1.5">
                  <IconFlame className="size-4 text-amber-400 fill-amber-400/30" />
                  Silver Per Focus Point:
                </span>
                <span className="text-sm font-bold text-amber-300">{silverPerFocus} Silver/pt</span>
              </div>
            )}
          </motion.div>

          {/* Breakdown Card */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border flex items-center justify-between">
              <span>Resource & Cash Flow Analysis</span>
              <IconCoin className="size-4 text-amber-400" />
            </h3>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Total Raw Ingredients Purchase</span>
              <span className="text-foreground font-semibold">{totalRawCost.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-emerald-400">
              <span>Materials Returned ({returnRatePercent}% RRR)</span>
              <span className="font-semibold">+{valueReturnedMaterials.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Effective Net Material Cost</span>
              <span className="text-foreground font-semibold">
                {(totalRawCost - valueReturnedMaterials).toLocaleString()} Silver
              </span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Station Nutrition Usage Fee</span>
              <span className="text-red-400 font-medium">-{totalStationFee.toLocaleString()} Silver</span>
            </div>

            {includeJournals && journalsFilled > 0 && (
              <div className="flex justify-between py-1 text-emerald-400">
                <span>Journals Yield ({journalsFilled} books filled)</span>
                <span className="font-semibold">+{journalProfitTotal.toLocaleString()} Silver</span>
              </div>
            )}

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Gross Marketplace Sales</span>
              <span className="text-foreground font-semibold">{totalGrossSales.toLocaleString()} Silver</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Market Fees ({totalFeeRate * 100}%)</span>
              <span className="text-red-400 font-medium">-{marketFeesTotal.toLocaleString()} Silver</span>
            </div>

            <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
              <span className="text-foreground">Effective Cost Per Crafted Unit</span>
              <span className="text-primary">{effectiveCostPerItem.toLocaleString()} Silver</span>
            </div>
          </div>

          {/* Albion Crafting Insight Box */}
          <div className="rounded-2xl border border-border bg-muted/20 p-4 text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <IconInfoCircle className="size-4 text-primary" />
              Master Crafter Tips
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Always craft in the city with the local item production bonus to enjoy the baseline 24.8% RRR!</li>
              <li>Always carry empty laborer journals — journal resale often provides 10% to 25% of total crafting profit.</li>
              <li>When spending focus, prioritize items with &gt;50 Silver per Focus point.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}