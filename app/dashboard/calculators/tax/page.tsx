'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconCoin,
  IconShield,
  IconBuildingStore,
  IconUsers,
  IconPercentage,
  IconCrown,
  IconCheck,
  IconInfoCircle,
  IconSparkles,
} from '@tabler/icons-react';

export default function TaxCalculatorPage() {
  const [activeTab, setActiveTab] = useState<'market' | 'guild' | 'split'>('market');

  // --- Tab 1: Marketplace Tax ---
  const [marketValue, setMarketValue] = useState<number>(500000);
  const [hasPremium, setHasPremium] = useState<boolean>(true);
  const [isSellOrder, setIsSellOrder] = useState<boolean>(true);
  const [relistCount, setRelistCount] = useState<number>(0);

  const marketSetupRate = isSellOrder ? 0.025 : 0;
  const marketTaxRate = hasPremium ? 0.04 : 0.08;
  const relistFeeRate = relistCount * 0.025;

  const marketSetupFee = Math.round(marketValue * marketSetupRate);
  const marketSalesTax = Math.round(marketValue * marketTaxRate);
  const marketRelistFee = Math.round(marketValue * relistFeeRate);
  const totalMarketDeductions = marketSetupFee + marketSalesTax + marketRelistFee;
  const marketNetReceived = marketValue - totalMarketDeductions;

  // --- Tab 2: Guild Mob Tax ---
  const [rawSilverPickups, setRawSilverPickups] = useState<number>(1000000); // e.g. 1M silver picked up
  const [guildTaxRate, setGuildTaxRate] = useState<number>(15); // 15% guild tax

  const guildTaxDeduction = Math.round(rawSilverPickups * (guildTaxRate / 100));
  const playerSilverEarned = rawSilverPickups - guildTaxDeduction;

  // --- Tab 3: Group Loot Split ---
  const [totalLootValue, setTotalLootValue] = useState<number>(15000000); // 15M silver
  const [partySize, setPartySize] = useState<number>(7);
  const [guildTreasuryCutPercent, setGuildTreasuryCutPercent] = useState<number>(10); // 10%
  const [regearRepairsDeduction, setRegearRepairsDeduction] = useState<number>(1500000); // 1.5M

  const guildTreasuryCut = Math.round(totalLootValue * (guildTreasuryCutPercent / 100));
  const distributablePool = Math.max(0, totalLootValue - guildTreasuryCut - regearRepairsDeduction);
  const payoutPerPlayer = partySize > 0 ? Math.floor(distributablePool / partySize) : 0;

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Taxation & Treasury
            </span>
            <span className="text-xs text-muted-foreground">Financial Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <IconCoin className="size-7 text-primary" />
            Tax, Fee & Loot Split Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Calculate accurate Albion Marketplace taxes, Guild Silver Drop deductions, and fair party loot splits.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-muted/40 p-1 rounded-xl border border-border">
          <button
            type="button"
            onClick={() => setActiveTab('market')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'market' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <IconBuildingStore className="size-3.5" />
            Marketplace
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guild')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'guild' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <IconShield className="size-3.5" />
            Guild Tax
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'split' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <IconUsers className="size-3.5" />
            Loot Split
          </button>
        </div>
      </div>

      {/* ================= TAB 1: MARKETPLACE TAX ================= */}
      {activeTab === 'market' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <IconBuildingStore className="size-4 text-primary" />
                Marketplace Sales Value
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Total Item Selling Price</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-semibold">
                    Silver
                  </div>
                  <input
                    type="number"
                    step="1000"
                    value={marketValue}
                    onChange={(e) => setMarketValue(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-muted/30 py-2.5 pl-18 pr-4 text-base font-bold text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-background/50 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground block">Albion Premium</span>
                    <span className="text-[10px] text-muted-foreground">4% tax vs 8% non-prem</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasPremium(!hasPremium)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
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

                <div className="p-3.5 rounded-xl bg-background/50 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-foreground">Sell Order (+2.5%)</span>
                    <span className="text-[10px] text-muted-foreground">Order vs direct fill</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSellOrder(!isSellOrder)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      isSellOrder ? 'bg-amber-500' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                        isSellOrder ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Price Adjustments (2.5% fee per edit)</label>
                <select
                  value={relistCount}
                  onChange={(e) => setRelistCount(parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value={0}>0 (First listing)</option>
                  <option value={1}>1 modification (+2.5%)</option>
                  <option value={2}>2 modifications (+5.0%)</option>
                  <option value={3}>3 modifications (+7.5%)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Net Silver Received
              </span>
              <div>
                <p className="text-xs text-muted-foreground">After All Taxes & Fees</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                    {marketNetReceived.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">Silver</span>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-border/70 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Gross Sales</span>
                  <span className="text-foreground font-semibold">{marketValue.toLocaleString()} Silver</span>
                </div>
                {isSellOrder && (
                  <div className="flex justify-between text-red-400">
                    <span>Order Setup Fee (2.5%)</span>
                    <span>-{marketSetupFee.toLocaleString()} Silver</span>
                  </div>
                )}
                <div className="flex justify-between text-red-400">
                  <span>Market Sales Tax ({marketTaxRate * 100}%)</span>
                  <span>-{marketSalesTax.toLocaleString()} Silver</span>
                </div>
                {relistCount > 0 && (
                  <div className="flex justify-between text-red-400">
                    <span>Relist Adjustments ({relistCount * 2.5}%)</span>
                    <span>-{marketRelistFee.toLocaleString()} Silver</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
                  <span>Total Deductions</span>
                  <span className="text-red-400">-{totalMarketDeductions.toLocaleString()} Silver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: GUILD MOB TAX ================= */}
      {activeTab === 'guild' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <IconShield className="size-4 text-primary" />
                Guild Tax Settings
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Estimated Mob Silver Drops Picked Up</label>
                <input
                  type="number"
                  step="50000"
                  value={rawSilverPickups}
                  onChange={(e) => setRawSilverPickups(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2.5 text-base font-bold text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-2 p-3.5 rounded-xl bg-background/50 border border-border">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-foreground">Guild Tax Rate (%)</label>
                  <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                    {guildTaxRate}% Tax
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={guildTaxRate}
                  onChange={(e) => setGuildTaxRate(parseInt(e.target.value) || 0)}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>0% (No tax)</span>
                  <span>10% - 20% (Standard)</span>
                  <span>100% (Full tax)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Distribution Result
              </span>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-xs text-emerald-300">Player Direct Silver</p>
                <p className="text-3xl font-extrabold text-emerald-400 mt-0.5">
                  {playerSilverEarned.toLocaleString()} Silver
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <p className="text-xs text-amber-300">Guild Treasury Deposit ({guildTaxRate}%)</p>
                <p className="text-2xl font-bold text-amber-400 mt-0.5">
                  {guildTaxDeduction.toLocaleString()} Silver
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: LOOT SPLIT ================= */}
      {activeTab === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <IconUsers className="size-4 text-primary" />
                Party Loot Split Configuration
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Total Loot Estimated Value</label>
                  <input
                    type="number"
                    step="100000"
                    value={totalLootValue}
                    onChange={(e) => setTotalLootValue(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Party Members Count</label>
                  <input
                    type="number"
                    min="1"
                    value={partySize}
                    onChange={(e) => setPartySize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Guild Cut / Tax (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={guildTreasuryCutPercent}
                    onChange={(e) => setGuildTreasuryCutPercent(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Regear / Repair Pool (Silver)</label>
                  <input
                    type="number"
                    step="10000"
                    value={regearRepairsDeduction}
                    onChange={(e) => setRegearRepairsDeduction(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-border bg-muted/30 px-3.5 py-2 text-sm text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md shadow-xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Per-Player Payout
              </span>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <p className="text-xs text-emerald-300">Each Player Receives ({partySize} members)</p>
                <p className="text-3xl font-extrabold text-emerald-400 mt-0.5">
                  {payoutPerPlayer.toLocaleString()} Silver
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Guild Cut ({guildTreasuryCutPercent}%)</span>
                  <span className="text-amber-400 font-semibold">{guildTreasuryCut.toLocaleString()} Silver</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Regear / Repair Pool</span>
                  <span className="text-foreground font-semibold">{regearRepairsDeduction.toLocaleString()} Silver</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Distributable Pool</span>
                  <span className="text-emerald-400 font-semibold">{distributablePool.toLocaleString()} Silver</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}