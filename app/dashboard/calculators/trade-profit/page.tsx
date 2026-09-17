'use client';

import { useState } from 'react';
import {
  IconArrowsExchange,
  IconCoin,
  IconTrendingUp,
  IconPercentage,
  IconCrown,
  IconBuildingStore,
  IconRotate,
  IconCheck,
  IconAlertTriangle,
  IconSparkles,
  IconCopy,
  IconShield,
  IconTruck,
  IconAdjustmentsHorizontal,
  IconReceipt2,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

// Formats numbers to k, m, b with max 2 digits after dot (e.g. 10.55m, 1k, 1m)
function formatSilver(val: number): string {
  const abs = Math.abs(val);
  const sign = val < 0 ? '-' : '';

  if (abs >= 1_000_000_000) {
    const num = abs / 1_000_000_000;
    const formatted = num.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}b`;
  }
  if (abs >= 1_000_000) {
    const num = abs / 1_000_000;
    const formatted = num.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}m`;
  }
  if (abs >= 1_000) {
    const num = abs / 1_000;
    const formatted = num.toFixed(2).replace(/\.?0+$/, '');
    return `${sign}${formatted}k`;
  }
  return `${sign}${abs.toLocaleString()}`;
}

// Interactive Number component: shows short notation (10.55m, 1k) and full digits on hover
function SilverValue({
  val,
  showSign = false,
  suffix = 'Silver',
  className = '',
}: {
  val: number;
  showSign?: boolean;
  suffix?: string;
  className?: string;
}) {
  const sign = showSign && val > 0 ? '+' : '';
  const shortText = formatSilver(val);
  const fullText = `${val > 0 && showSign ? '+' : ''}${val.toLocaleString()}${suffix ? ' ' + suffix : ''}`;

  return (
    <span
      title={fullText}
      className={`cursor-help transition-opacity hover:opacity-85 underline decoration-dotted decoration-white/25 underline-offset-3 inline-flex items-baseline ${className}`}
    >
      <span>
        {sign}
        {shortText}
      </span>
      {suffix && <span className="ml-1 text-[0.8em] font-bold opacity-80">{suffix}</span>}
    </span>
  );
}

export default function TradeProfitCalculatorPage() {
  // 1. User Inputs
  const [itemName, setItemName] = useState('T6 Bloodletter');
  const [buyPrice, setBuyPrice] = useState<number>(120000);
  const [sellPrice, setSellPrice] = useState<number>(165000);
  const [quantity, setQuantity] = useState<number>(10);
  const [buyMethod, setBuyMethod] = useState<'order' | 'instant'>('order');
  const [sellMethod, setSellMethod] = useState<'order' | 'instant'>('order');

  // 2. System Settings (Taxes: Free vs Premium toggle + extra fees)
  const [hasPremium, setHasPremium] = useState<boolean>(true);
  const [transportCost, setTransportCost] = useState<number>(0);
  const [relistCount, setRelistCount] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  // Albion Online Market Rules:
  // - Setup fee on orders (Buy Order or Sell Order): 2.5%
  // - Sales Tax on market transaction completion:
  //     * Premium account: 4%
  //     * Free / Non-Premium account: 8%
  // - Relist fee: 2.5% per price modification
  const buySetupRate = buyMethod === 'order' ? 0.025 : 0;
  const sellSetupRate = sellMethod === 'order' ? 0.025 : 0;
  const salesTaxRate = hasPremium ? 0.04 : 0.08;
  const nonPremiumTaxRate = 0.08;
  const relistFeeRate = relistCount * 0.025;

  // Calculations
  const totalBuyBase = buyPrice * quantity;
  const buySetupFee = Math.round(totalBuyBase * buySetupRate);
  const totalCost = totalBuyBase + buySetupFee + transportCost;

  const totalGrossRevenue = sellPrice * quantity;
  const sellSetupFee = Math.round(totalGrossRevenue * sellSetupRate);
  const marketTaxFee = Math.round(totalGrossRevenue * salesTaxRate);
  const nonPremTaxFee = Math.round(totalGrossRevenue * nonPremiumTaxRate);
  const premiumSavings = hasPremium ? nonPremTaxFee - marketTaxFee : 0;
  const relistFee = Math.round(totalGrossRevenue * relistFeeRate);
  const totalFees = buySetupFee + sellSetupFee + marketTaxFee + relistFee;

  const netRevenue = totalGrossRevenue - (sellSetupFee + marketTaxFee + relistFee);
  const netProfit = netRevenue - totalCost;
  const profitPerItem = quantity > 0 ? Math.round(netProfit / quantity) : 0;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const margin = totalGrossRevenue > 0 ? (netProfit / totalGrossRevenue) * 100 : 0;

  // Break-even sell price (per unit)
  const sellDeductionRatio = 1 - (sellSetupRate + salesTaxRate + relistFeeRate);
  const breakEvenSellPrice =
    sellDeductionRatio > 0 && quantity > 0
      ? Math.ceil(totalCost / (quantity * sellDeductionRatio))
      : 0;

  const handleReset = () => {
    setItemName('');
    setBuyPrice(100000);
    setSellPrice(140000);
    setQuantity(10);
    setBuyMethod('order');
    setSellMethod('order');
    setHasPremium(true);
    setTransportCost(0);
    setRelistCount(0);
  };

  const handleCopySummary = () => {
    const summary = `--- Albion Online Trade Profit ---
Item: ${itemName || 'Custom Trade'} (Qty: ${quantity.toLocaleString()})
Buy: ${buyPrice.toLocaleString()} Silver (${buyMethod === 'order' ? 'Buy Order' : 'Instant Buy'})
Sell: ${sellPrice.toLocaleString()} Silver (${sellMethod === 'order' ? 'Sell Order' : 'Instant Sell'})
Account: ${hasPremium ? 'Premium (4% Tax)' : 'Free (8% Tax)'}
Total Investment: ${totalCost.toLocaleString()} Silver
Gross Sales: ${totalGrossRevenue.toLocaleString()} Silver
Taxes & Fees: -${totalFees.toLocaleString()} Silver
Net Profit: ${netProfit > 0 ? '+' : ''}${netProfit.toLocaleString()} Silver (${roi.toFixed(1)}% ROI)
Break-even: ${breakEvenSellPrice.toLocaleString()} Silver/unit`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-6 sm:p-7 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Albion Market Economy
            </span>
            <span className="text-xs text-white/60">Silver & Profit Calculator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <IconArrowsExchange className="size-8 text-blue-400" />
            Buy / Sell Profit Calculator
          </h1>
          <p className="text-sm text-white/70 mt-1 max-w-2xl leading-relaxed">
            Calculate accurate net profit returns in <strong className="text-blue-400 font-bold">Silver</strong> with order setup fees (2.5%), sales taxes (4% vs 8%), and break-even flip prices.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-9 gap-1.5 text-xs font-semibold cursor-pointer border-white/15 hover:border-blue-400 bg-zinc-800 text-white"
          >
            {copied ? <IconCheck className="size-4 text-blue-400" /> : <IconCopy className="size-4" />}
            {copied ? 'Summary Copied!' : 'Copy Trade'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 text-xs gap-1.5 text-white/70 hover:text-white cursor-pointer"
          >
            <IconRotate className="size-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* SYSTEM TAX SETTING: Free vs Premium TOGGLE SWITCH (Position-Locked) */}
      <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-4 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side Info: Fixed layout that does not resize */}
        <div className="space-y-1 min-w-[240px]">
          <div className="flex items-center gap-2">
            <IconCrown className="size-4.5 text-blue-400" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Account Status & Tax Rate
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span>Marketplace Tax:</span>
            <span className={`font-bold ${hasPremium ? 'text-blue-400' : 'text-red-400'}`}>
              {hasPremium ? '4% (Premium Rate)' : '8% (Free Standard)'}
            </span>
            {hasPremium && premiumSavings > 0 && (
              <span className="text-blue-300 font-semibold bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded-md">
                Saves {formatSilver(premiumSavings)} Silver
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Position-Locked Fixed-Width Toggle Container */}
        <div className="shrink-0 self-start md:self-auto">
          <div className="inline-flex items-center bg-zinc-950 border border-white/15 p-1 rounded-xl shadow-inner select-none">
            {/* Free Button (Fixed Width) */}
            <button
              type="button"
              onClick={() => setHasPremium(false)}
              className={`w-28 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                !hasPremium
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <IconShield className="size-3.5" />
              Free (8%)
            </button>

            {/* Slider Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={hasPremium}
              onClick={() => setHasPremium(!hasPremium)}
              className="mx-1 relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-zinc-800 border border-white/20 transition-colors cursor-pointer"
            >
              <span
                className={`inline-block size-4 transform rounded-full transition-transform ${
                  hasPremium ? 'translate-x-6 bg-blue-400' : 'translate-x-1 bg-red-400'
                }`}
              />
            </button>

            {/* Premium Button (Fixed Width) */}
            <button
              type="button"
              onClick={() => setHasPremium(true)}
              className={`w-28 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                hasPremium
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <IconCrown className="size-3.5" />
              Premium (4%)
            </button>
          </div>
        </div>
      </div>

      {/* Main Workbench Grid: Inputs (Left) vs Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: USER INPUTS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/90 p-5 sm:p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <IconBuildingStore className="size-4.5 text-blue-400" />
                User Trade Inputs
              </h2>
              <span className="text-xs text-white/60">Price & Quantity Controls</span>
            </div>

            {/* Item Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                Item Description (Optional)
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. T6 Bloodletter, T8 Armor..."
                className="w-full rounded-xl border border-white/15 bg-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            {/* Item Quantity with Quick Quantity buttons right beside it */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Item Quantity
                </label>
                <span className="text-[11px] text-blue-400 font-bold">
                  {quantity.toLocaleString()} units
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-28 sm:w-32 rounded-xl border border-white/15 bg-zinc-800 px-3.5 py-2 text-sm font-bold text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />

                {/* Quick Quantity Buttons beside input */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[1, 5, 10, 25, 50, 100, 999].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setQuantity(amt)}
                      className={`px-2.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        quantity === amt
                          ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                          : 'bg-zinc-800 border-white/10 hover:border-blue-400/40 text-white/70 hover:text-white'
                      }`}
                    >
                      {amt === 999 ? '999 (Max)' : amt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 1. BUY ORDER / BUY PRICE */}
            <div className="p-4 sm:p-5 rounded-2xl border border-blue-500/30 bg-zinc-800/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
                    Buy Price & Method
                  </span>
                  <span className="text-[11px] text-white/60">
                    {buyMethod === 'order'
                      ? 'Buy Order incurs 2.5% market setup fee upfront'
                      : 'Instant Buy fills existing sell orders directly (0% fee)'}
                  </span>
                </div>

                {/* Buy Method Toggle */}
                <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/15 text-xs self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setBuyMethod('order')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      buyMethod === 'order'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Buy Order (2.5%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyMethod('instant')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      buyMethod === 'instant'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Instant Buy (0%)
                  </button>
                </div>
              </div>

              {/* Buy Price Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70 flex justify-between">
                  <span>Buy Price (Silver Per Item)</span>
                  <SilverValue val={buyPrice} className="text-blue-400 font-bold" />
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-sm font-bold">
                    Silver
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-blue-500/40 bg-zinc-900 py-3 pl-18 pr-4 text-lg font-black text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Buy Subtotal Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10 text-white/70">
                <div>
                  Base Buy ({quantity}x):{' '}
                  <SilverValue val={totalBuyBase} className="font-bold text-white" />
                </div>
                <div className="text-right">
                  Setup Fee ({buySetupRate * 100}%):{' '}
                  <SilverValue val={buySetupFee} showSign suffix="" className="font-bold text-red-400" /> Silver
                </div>
              </div>
            </div>

            {/* 2. SELL ORDER / SELL PRICE */}
            <div className="p-4 sm:p-5 rounded-2xl border border-white/15 bg-zinc-800/60 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-white animate-pulse" />
                    Target Sell Price & Method
                  </span>
                  <span className="text-[11px] text-white/60">
                    {sellMethod === 'order'
                      ? 'Sell Order charges 2.5% market setup fee + sales tax'
                      : 'Instant Sell fills existing buy orders (0% setup fee)'}
                  </span>
                </div>

                {/* Sell Method Toggle */}
                <div className="flex bg-zinc-900 p-1 rounded-xl border border-white/15 text-xs self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setSellMethod('order')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      sellMethod === 'order'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Sell Order (2.5%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSellMethod('instant')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      sellMethod === 'instant'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Instant Sell (0%)
                  </button>
                </div>
              </div>

              {/* Sell Price Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70 flex justify-between">
                  <span>Target Sell Price (Silver Per Item)</span>
                  <SilverValue val={sellPrice} className="text-white font-bold" />
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-sm font-bold">
                    Silver
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-white/20 bg-zinc-900 py-3 pl-18 pr-4 text-lg font-black text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                  />
                </div>
              </div>

              {/* Sell Subtotal Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/10 text-white/70">
                <div>
                  Gross Revenue ({quantity}x):{' '}
                  <SilverValue val={totalGrossRevenue} className="font-bold text-white" />
                </div>
                <div className="text-right">
                  Sales Tax ({salesTaxRate * 100}%):{' '}
                  <SilverValue val={-marketTaxFee} suffix="" className="font-bold text-red-400" /> Silver
                </div>
              </div>
            </div>

            {/* 3. EXTRA SYSTEM EXPENSES */}
            <div className="rounded-xl border border-white/10 bg-zinc-800/40 p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                  <IconAdjustmentsHorizontal className="size-4 text-blue-400" />
                  Additional System Fees & Costs
                </span>
                <span className="text-[11px] text-white/50">Relist & Transport</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Relist Adjustments */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 flex items-center gap-1">
                    <IconRotate className="size-3.5 text-blue-400" />
                    Market Relist / Edits (2.5% each)
                  </label>
                  <select
                    value={relistCount}
                    onChange={(e) => setRelistCount(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-white/15 bg-zinc-800 px-3.5 py-2 text-sm text-white focus:border-blue-400 focus:outline-none cursor-pointer"
                  >
                    <option value={0}>0 - No price adjustments (0%)</option>
                    <option value={1}>1 relist adjustment (+2.5%)</option>
                    <option value={2}>2 relist adjustments (+5.0%)</option>
                    <option value={3}>3 relist adjustments (+7.5%)</option>
                  </select>
                </div>

                {/* Transport / Hauling Fee */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white/70 flex items-center gap-1">
                    <IconTruck className="size-3.5 text-blue-400" />
                    Transport / Carriage Cost (Silver)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={transportCost}
                    onChange={(e) => setTransportCost(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                    className="w-full rounded-xl border border-white/15 bg-zinc-800 px-3.5 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: OUTPUT - PROFIT PRICE (SILVER) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Profit Outcome Card (Flat Zinc/Slate, White, Red, Blue - No Gradient) */}
          <div
            className={`rounded-2xl border-2 p-6 bg-zinc-900 shadow-xl relative transition-all ${
              netProfit >= 0 ? 'border-blue-500' : 'border-red-500'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                <IconCoin className="size-4.5 text-blue-400" />
                OUTPUT: PROFIT (SILVER)
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border ${
                  netProfit > 0
                    ? 'bg-blue-600 text-white border-blue-400'
                    : netProfit === 0
                    ? 'bg-zinc-800 text-white border-white/40'
                    : 'bg-red-600 text-white border-red-400'
                }`}
              >
                {netProfit >= 0 ? <IconCheck className="size-3.5 stroke-[3]" /> : <IconAlertTriangle className="size-3.5 stroke-[3]" />}
                {netProfit > 0 ? 'Profitable Trade' : netProfit === 0 ? 'Break-Even' : 'Loss Warning'}
              </span>
            </div>

            {/* Total Net Profit Silver Hero */}
            <div className="mb-5">
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Total Net Profit ({quantity.toLocaleString()} units)
              </p>
              <div className="mt-1.5">
                <SilverValue
                  val={netProfit}
                  showSign={true}
                  suffix="Silver"
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                    netProfit > 0 ? 'text-blue-400' : netProfit === 0 ? 'text-white' : 'text-red-500'
                  }`}
                />
              </div>
              <p className="text-[11px] text-white/50 mt-1">
                (Hover over values to reveal exact full numbers)
              </p>
            </div>

            {/* ROI & Margin Badges (Flat with Blue / Red accents) */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/15">
              <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-white/15">
                <div className="flex items-center gap-1 text-[11px] font-bold text-white/70 uppercase">
                  <IconPercentage className="size-3.5 text-blue-400" /> Return on Investment
                </div>
                <div
                  className={`text-xl font-black mt-1 ${
                    roi >= 0 ? 'text-blue-400' : 'text-red-500'
                  }`}
                >
                  {roi > 0 ? '+' : ''}
                  {roi.toFixed(2)}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-white/15">
                <div className="flex items-center gap-1 text-[11px] font-bold text-white/70 uppercase">
                  <IconTrendingUp className="size-3.5 text-blue-400" /> Profit Margin
                </div>
                <div
                  className={`text-xl font-black mt-1 ${
                    margin >= 0 ? 'text-blue-400' : 'text-red-500'
                  }`}
                >
                  {margin > 0 ? '+' : ''}
                  {margin.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Net Profit Per Item */}
            <div className="mt-3.5 p-3.5 rounded-xl bg-zinc-800/80 border border-white/15 flex justify-between items-center text-xs">
              <span className="font-bold text-white/70 uppercase">Net Profit Per Item:</span>
              <SilverValue
                val={profitPerItem}
                showSign={true}
                className={`text-sm font-black ${
                  profitPerItem > 0 ? 'text-blue-400' : profitPerItem === 0 ? 'text-white' : 'text-red-500'
                }`}
              />
            </div>

            {/* Break-Even Target Sell Price */}
            <div className="mt-3.5 p-3.5 rounded-xl bg-zinc-800/80 border border-blue-500/60 flex justify-between items-center text-xs">
              <span className="text-white font-bold flex items-center gap-1.5 uppercase">
                <IconSparkles className="size-4 text-blue-400" />
                Break-even Sell Price:
              </span>
              <SilverValue
                val={breakEvenSellPrice}
                className="text-sm font-black text-blue-400"
              />
            </div>
          </div>

          {/* Itemized Financial Ledger Breakdown (Flat Zinc & White with Red/Blue) */}
          <div className="rounded-2xl border border-white/15 bg-zinc-900 p-5 space-y-3.5 text-xs shadow-md">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <IconReceipt2 className="size-4 text-blue-400" />
                Financial Breakdown Ledger
              </h3>
              <span className="text-[11px] text-blue-400 font-bold">Albion Silver</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-0.5 text-white/70">
                <span>Base Buy Cost ({quantity} × {formatSilver(buyPrice)})</span>
                <SilverValue val={totalBuyBase} className="text-white font-bold" />
              </div>

              {buySetupFee > 0 && (
                <div className="flex justify-between py-0.5 text-white/70">
                  <span>Buy Order Setup Fee ({buySetupRate * 100}%)</span>
                  <SilverValue val={-buySetupFee} className="text-red-500 font-bold" />
                </div>
              )}

              {transportCost > 0 && (
                <div className="flex justify-between py-0.5 text-white/70">
                  <span>Transport / Carriage Cost</span>
                  <SilverValue val={-transportCost} className="text-red-500 font-bold" />
                </div>
              )}

              <div className="flex justify-between py-1.5 border-t border-white/10 font-bold text-white">
                <span>Total Capital Invested</span>
                <SilverValue val={totalCost} className="text-blue-400" />
              </div>

              <div className="flex justify-between py-0.5 text-white/70 pt-1">
                <span>Gross Sales ({quantity} × {formatSilver(sellPrice)})</span>
                <SilverValue val={totalGrossRevenue} className="text-white font-bold" />
              </div>

              {sellSetupFee > 0 && (
                <div className="flex justify-between py-0.5 text-white/70">
                  <span>Sell Order Setup Fee ({sellSetupRate * 100}%)</span>
                  <SilverValue val={-sellSetupFee} className="text-red-500 font-bold" />
                </div>
              )}

              <div className="flex justify-between py-0.5 text-white/70">
                <span>Market Sales Tax ({hasPremium ? '4% Premium' : '8% Free'})</span>
                <SilverValue val={-marketTaxFee} className="text-red-500 font-bold" />
              </div>

              {relistFee > 0 && (
                <div className="flex justify-between py-0.5 text-white/70">
                  <span>Order Relist Adjustment ({relistCount}x)</span>
                  <SilverValue val={-relistFee} className="text-red-500 font-bold" />
                </div>
              )}

              <div className="flex justify-between py-1.5 text-white border-t border-white/10 font-bold">
                <span>Total Taxes & Deductions</span>
                <SilverValue val={-totalFees} className="text-red-500" />
              </div>

              <div className="pt-2.5 border-t-2 border-white/20 flex justify-between font-black text-sm">
                <span className="text-white">Net Payout Profit</span>
                <SilverValue
                  val={netProfit}
                  showSign={true}
                  className={netProfit >= 0 ? 'text-blue-400 font-black' : 'text-red-500 font-black'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
