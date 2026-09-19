"use client";

import { useState, useMemo } from "react";
import {
  AlbionItem,
  GLOBAL_ALBION_ITEMS,
} from "@/data/global-items";
import { AlbionItemSelectModal } from "@/components/albion/shared/AlbionItemSelectModal";
import {
  IconX,
  IconCoins,
  IconCrown,
  IconTrendingUp,
  IconChevronDown,
  IconBuildingStore,
} from "@tabler/icons-react";

export interface SelectedTradeItem {
  instanceId: string;
  item: AlbionItem;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  transportFeePerUnit: number;
}

export default function TradeProfitCalculatorPage() {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState(false);

  // Market Settings
  const [hasPremium, setHasPremium] = useState(true);
  const [buyMethod, setBuyMethod] = useState<"order" | "instant">("order");
  const [sellMethod, setSellMethod] = useState<"order" | "instant">("order");

  // Initial Item: Expert's Broadsword
  const initialTradeItem =
    GLOBAL_ALBION_ITEMS.find((i) => i.identifier === "T5_MAIN_SWORD") ||
    GLOBAL_ALBION_ITEMS[0];

  const [tradeItems, setTradeItems] = useState<SelectedTradeItem[]>([
    {
      instanceId: "initial-trade-broadsword",
      item: initialTradeItem,
      quantity: 10,
      buyPrice: Math.round(initialTradeItem.price * 0.85), // Estimated buy order
      sellPrice: Math.round(initialTradeItem.price * 1.35), // Estimated black market sell
      transportFeePerUnit: 0,
    },
  ]);

  // Tax rates (Albion Online rules)
  // Setup Fee on order: 2.5%
  // Sales Tax: 4% with Premium, 8% without Premium
  const buySetupRate = buyMethod === "order" ? 0.025 : 0;
  const sellSetupRate = sellMethod === "order" ? 0.025 : 0;
  const salesTaxRate = hasPremium ? 0.04 : 0.08;

  // Add Item to trade queue
  const handleAddItem = (item: AlbionItem) => {
    const defaultBuy = Math.round(item.price * 0.85);
    const defaultSell = Math.round(item.price * 1.35);

    const newItem: SelectedTradeItem = {
      instanceId: `${item.id}-${Date.now()}`,
      item,
      quantity: 10,
      buyPrice: defaultBuy,
      sellPrice: defaultSell,
      transportFeePerUnit: 0,
    };
    setTradeItems((prev) => [...prev, newItem]);
  };

  // Remove item
  const handleRemoveItem = (instanceId: string) => {
    setTradeItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  // Update quantity
  const handleUpdateQuantity = (instanceId: string, newQty: number) => {
    setTradeItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, quantity: Math.max(1, newQty) }
          : item
      )
    );
  };

  // Update Buy Price
  const handleUpdateBuyPrice = (instanceId: string, newPrice: number) => {
    setTradeItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, buyPrice: Math.max(0, newPrice) }
          : item
      )
    );
  };

  // Update Sell Price
  const handleUpdateSellPrice = (instanceId: string, newPrice: number) => {
    setTradeItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, sellPrice: Math.max(0, newPrice) }
          : item
      )
    );
  };

  // Reset to default market margins
  const handlePullMarketPrices = () => {
    setTradeItems((prev) =>
      prev.map((item) => ({
        ...item,
        buyPrice: Math.round(item.item.price * 0.85),
        sellPrice: Math.round(item.item.price * 1.35),
      }))
    );
  };

  // Calculate per item metrics
  const getItemMetrics = (ti: SelectedTradeItem) => {
    const grossBuy = ti.buyPrice * ti.quantity;
    const buySetupFee = Math.round(grossBuy * buySetupRate);
    const totalBuyCapital = grossBuy + buySetupFee + ti.transportFeePerUnit * ti.quantity;

    const grossSell = ti.sellPrice * ti.quantity;
    const sellSetupFee = Math.round(grossSell * sellSetupRate);
    const sellSalesTax = Math.round(grossSell * salesTaxRate);
    const totalSellDeductions = sellSetupFee + sellSalesTax;
    const netSellReturn = grossSell - totalSellDeductions;

    const netItemProfit = netSellReturn - totalBuyCapital;
    const itemRoi = totalBuyCapital > 0 ? (netItemProfit / totalBuyCapital) * 100 : 0;

    return {
      grossBuy,
      buySetupFee,
      totalBuyCapital,
      grossSell,
      sellSetupFee,
      sellSalesTax,
      totalSellDeductions,
      totalFeesAndTaxes: buySetupFee + totalSellDeductions,
      netSellReturn,
      netItemProfit,
      itemRoi,
    };
  };

  // Aggregate Total Metrics
  const summary = useMemo(() => {
    let totalGrossBuy = 0;
    let totalBuySetupFees = 0;
    let totalCapital = 0; // Total Buying Cost
    let totalGrossSell = 0;
    let totalSellSetupFees = 0;
    let totalSellSalesTaxes = 0;
    let totalSellDeductions = 0;
    let totalNetSellReturn = 0; // Total Selling Proceeds/Return
    let totalNetProfit = 0;
    let totalUnits = 0;

    tradeItems.forEach((ti) => {
      const m = getItemMetrics(ti);
      totalGrossBuy += m.grossBuy;
      totalBuySetupFees += m.buySetupFee;
      totalCapital += m.totalBuyCapital;
      totalGrossSell += m.grossSell;
      totalSellSetupFees += m.sellSetupFee;
      totalSellSalesTaxes += m.sellSalesTax;
      totalSellDeductions += (m.sellSetupFee + m.sellSalesTax);
      totalNetSellReturn += m.netSellReturn;
      totalNetProfit += m.netItemProfit;
      totalUnits += ti.quantity;
    });

    const overallRoi = totalCapital > 0 ? (totalNetProfit / totalCapital) * 100 : 0;

    return {
      totalGrossBuy,
      totalBuySetupFees,
      totalCapital,
      totalGrossSell,
      totalSellSetupFees,
      totalSellSalesTaxes,
      totalSellDeductions,
      totalNetSellReturn,
      totalNetProfit,
      totalUnits,
      overallRoi,
    };
  }, [tradeItems, buyMethod, sellMethod, hasPremium]);

  // Enchantment border helper
  const getEnchantBorder = (enchant: number) => {
    switch (enchant) {
      case 1:
        return "border-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.25)]";
      case 2:
        return "border-sky-500/70 shadow-[0_0_8px_rgba(14,165,233,0.25)]";
      case 3:
        return "border-purple-500/70 shadow-[0_0_8px_rgba(168,85,247,0.25)]";
      case 4:
        return "border-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.3)]";
      default:
        return "border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 lg:p-8 font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            <span>Buy / Sell Profit Calculator</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Market order setup fees, sales tax deductions, capital costs, and net profit margins
          </p>
        </div>
        <a
          href="#"
          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Albion Market Engine
        </a>
      </div>

      {/* Action Bar (Identical clean layout as Crafting & Refining) */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        {/* Add Item Button */}
        <button
          onClick={() => setIsAddItemOpen(true)}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs tracking-wide rounded-none transition-colors shadow-xs cursor-pointer"
        >
          Add Item
        </button>

        {/* Pull Market Prices Button */}
        <button
          onClick={handlePullMarketPrices}
          className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-xs tracking-wide rounded-none transition-colors shadow-xs cursor-pointer border border-border"
        >
          Pull Market Prices
        </button>

        {/* Recent Items Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRecentDropdownOpen(!isRecentDropdownOpen)}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium px-4 py-2 pr-8 rounded-none border border-border flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Recent Items</span>
            <IconChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </button>

          {isRecentDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-60 bg-popover text-popover-foreground border border-border rounded-md shadow-2xl z-40 py-1 max-h-64 overflow-y-auto">
              {GLOBAL_ALBION_ITEMS.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleAddItem(item);
                    setIsRecentDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-foreground hover:bg-accent flex items-center gap-2.5 cursor-pointer"
                >
                  <span className="w-5 h-5 flex items-center justify-center bg-muted text-[10px] font-bold text-amber-500 font-mono rounded-xs border border-border">
                    {item.tierRoman}
                  </span>
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>



        {/* Buy Order Mode Toggle */}
        <button
          onClick={() => setBuyMethod(buyMethod === "order" ? "instant" : "order")}
          className={`px-3 py-2 text-xs font-medium rounded-none border transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
            buyMethod === "order"
              ? "bg-primary/10 border-primary text-primary font-semibold"
              : "bg-secondary border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <IconBuildingStore size={14} />
          <span>Buy: {buyMethod === "order" ? "Buy Order (2.5% Fee)" : "Instant Buy"}</span>
        </button>

        {/* Sell Order Mode Toggle */}
        <button
          onClick={() => setSellMethod(sellMethod === "order" ? "instant" : "order")}
          className={`px-3 py-2 text-xs font-medium rounded-none border transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
            sellMethod === "order"
              ? "bg-primary/10 border-primary text-primary font-semibold"
              : "bg-secondary border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <IconBuildingStore size={14} />
          <span>Sell: {sellMethod === "order" ? "Sell Order (2.5% Fee)" : "Instant Sell"}</span>
        </button>

        {/* Premium Toggle */}
        <button
          onClick={() => setHasPremium(!hasPremium)}
          className={`px-4 py-2 text-xs font-medium rounded-none border transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
            hasPremium
              ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-semibold"
              : "bg-secondary border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <IconCrown size={14} className={hasPremium ? "text-amber-400 fill-amber-400/20" : ""} />
          <span>{hasPremium ? "Premium (4% Tax)" : "No Premium (8% Tax)"}</span>
        </button>
      </div>

      {/* 3 Top KPI Cards: Capital, Total Selling Return, and Net Profit % */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Capital (Total Buying Cost) */}
        <div className="bg-card border border-border p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Capital (Total Buying Cost)
            </span>
            <IconCoins size={16} className="text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-foreground flex items-center gap-1.5">
            <span>{summary.totalCapital.toLocaleString()}</span>
            <span className="text-xs font-medium text-muted-foreground">Silver</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>Gross Buy: {summary.totalGrossBuy.toLocaleString()}</span>
            <span>Fee ({buyMethod === "order" ? "2.5%" : "0%"}): +{summary.totalBuySetupFees.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 2: Total Selling Return */}
        <div className="bg-card border border-border p-4 shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Selling Return
            </span>
            <IconBuildingStore size={16} className="text-primary" />
          </div>
          <div className="text-xl font-bold font-mono text-foreground flex items-center gap-1.5">
            <span>{summary.totalNetSellReturn.toLocaleString()}</span>
            <span className="text-xs font-medium text-muted-foreground">Silver</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>Gross Sell: {summary.totalGrossSell.toLocaleString()}</span>
            <span>Taxes: -{summary.totalSellDeductions.toLocaleString()} ({sellMethod === "order" ? "2.5% + " : ""}{hasPremium ? "4%" : "8%"})</span>
          </div>
        </div>

        {/* Card 3: Net Profit / Loss & Percentage */}
        <div className={`border p-4 shadow-xs ${
          summary.totalNetProfit >= 0
            ? "bg-emerald-500/5 border-emerald-500/30"
            : "bg-destructive/5 border-destructive/30"
        }`}>
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {summary.totalNetProfit >= 0 ? "Net Trade Profit" : "Net Trade Loss"}
            </span>
            <span
              className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                summary.overallRoi >= 0
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : "bg-destructive/15 text-destructive border border-destructive/30"
              }`}
            >
              {summary.overallRoi >= 0 ? "+" : ""}
              {summary.overallRoi.toFixed(1)}% {summary.totalNetProfit >= 0 ? "PROFIT" : "LOSS"}
            </span>
          </div>
          <div className={`text-xl font-bold font-mono flex items-center gap-1.5 ${
            summary.totalNetProfit >= 0
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-destructive"
          }`}>
            <IconTrendingUp size={18} />
            <span>
              {summary.totalNetProfit > 0 ? "+" : ""}
              {summary.totalNetProfit.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-muted-foreground">Silver</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1 flex items-center justify-between">
            <span>Margin on {summary.totalUnits} {summary.totalUnits === 1 ? "unit" : "units"}</span>
            <span>ROI on Capital: {summary.overallRoi.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Items to trade / transport */}
      <div className="bg-card rounded-none border border-border p-4 lg:p-6 mb-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Items to Trade / Transport (Buy & Sell Setup)
          </h2>
          <span className="text-[11px] text-muted-foreground">
            {tradeItems.length} {tradeItems.length === 1 ? "item" : "items"} in trade route
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-muted/30">
              <tr className="border-b border-border text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                <th className="w-10 py-2.5 px-3"></th>
                <th className="w-16 py-2.5 px-3 font-medium">Item</th>
                <th className="py-2.5 px-3 font-medium">Name</th>
                <th className="w-32 py-2.5 px-3 font-medium">Quantity</th>
                <th className="w-36 py-2.5 px-3 font-medium">Unit Buy Price</th>
                <th className="w-36 py-2.5 px-3 font-medium">Unit Sell Price</th>
                <th className="w-36 py-2.5 px-3 font-medium text-right">Total Buy Cost (Capital)</th>
                <th className="w-36 py-2.5 px-3 font-medium text-right">Total Sell Return</th>
                <th className="w-36 py-2.5 px-3 font-medium text-right pr-4">Net Profit (ROI %)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tradeItems.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-muted-foreground text-xs">
                    No items in trade route. Click{" "}
                    <strong className="text-primary font-semibold">Add Item</strong> above.
                  </td>
                </tr>
              ) : (
                tradeItems.map((ti) => {
                  const m = getItemMetrics(ti);

                  return (
                    <tr key={ti.instanceId} className="group hover:bg-muted/40 transition-colors">
                      {/* Delete button */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleRemoveItem(ti.instanceId)}
                          className="w-5 h-5 bg-muted hover:bg-destructive hover:text-destructive-foreground text-muted-foreground flex items-center justify-center rounded transition-colors cursor-pointer border border-border"
                          title="Remove item"
                        >
                          <IconX size={12} />
                        </button>
                      </td>

                      {/* Item Icon with Roman Numeral Tier Badge */}
                      <td className="py-3 px-3">
                        <div
                          className={`relative w-11 h-11 bg-background border rounded overflow-hidden flex items-center justify-center ${getEnchantBorder(
                            ti.item.enchantment
                          )}`}
                        >
                          <img
                            src={ti.item.icon}
                            alt={ti.item.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute top-0.5 left-0.5 px-1 py-0.2 bg-rose-900 text-white text-[9px] font-bold font-mono rounded-xs shadow">
                            {ti.item.tierRoman}
                          </div>
                        </div>
                      </td>

                      {/* Name & Quality */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-primary hover:underline font-semibold cursor-pointer">
                            {ti.item.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            ({ti.item.quality})
                          </span>
                        </div>
                      </td>

                      {/* Quantity input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={ti.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(ti.instanceId, parseInt(e.target.value) || 0)
                          }
                          className="w-full max-w-[120px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                      </td>

                      {/* Buy Price input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={ti.buyPrice}
                          onChange={(e) =>
                            handleUpdateBuyPrice(ti.instanceId, parseInt(e.target.value) || 0)
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                        <div className="text-[10px] text-muted-foreground font-mono mt-1">
                          {buyMethod === "order" ? `Order (+2.5%): +${m.buySetupFee.toLocaleString()}` : "Instant Buy (0% Fee)"}
                        </div>
                      </td>

                      {/* Sell Price input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={ti.sellPrice}
                          onChange={(e) =>
                            handleUpdateSellPrice(ti.instanceId, parseInt(e.target.value) || 0)
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                        <div className="text-[10px] text-muted-foreground font-mono mt-1">
                          Taxes: -{m.totalSellDeductions.toLocaleString()} ({sellMethod === "order" ? "2.5% + " : ""}{hasPremium ? "4%" : "8%"})
                        </div>
                      </td>

                      {/* Total Buy Cost (Capital) */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-semibold text-foreground">
                        {m.totalBuyCapital.toLocaleString()}
                      </td>

                      {/* Total Sell Return */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-semibold text-foreground">
                        {m.netSellReturn.toLocaleString()}
                      </td>

                      {/* Net Profit & ROI */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-bold">
                        <div
                          className={
                            m.netItemProfit >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-destructive"
                          }
                        >
                          {m.netItemProfit > 0 ? "+" : ""}
                          {m.netItemProfit.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          ({m.itemRoi >= 0 ? "+" : ""}{m.itemRoi.toFixed(1)}%)
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Trade Manifest & Fee Breakdown Table */}
      <div className="bg-card rounded-none border border-border p-4 lg:p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Market Tax & Fee Breakdown (Buy Cost vs Sell Return)
          </h2>
          <span className="text-[11px] text-muted-foreground">
            {tradeItems.length} {tradeItems.length === 1 ? "line" : "lines"} • Buy: {buyMethod === "order" ? "Buy Order (2.5% Setup)" : "Instant Buy (0% Fee)"} | Sell: {sellMethod === "order" ? "Sell Order (2.5% Setup)" : "Instant Sell"} + {hasPremium ? "4% Premium Tax" : "8% Standard Tax"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-muted/30">
              <tr className="border-b border-border text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                <th className="w-16 py-2.5 px-3 font-medium">Item</th>
                <th className="py-2.5 px-3 font-medium">Name</th>
                <th className="w-20 py-2.5 px-3 font-semibold text-foreground">
                  Units
                </th>
                <th className="w-28 py-2.5 px-3 font-medium">Gross Buy</th>
                <th className="w-28 py-2.5 px-3 font-medium">Buy Setup Fee</th>
                <th className="w-32 py-2.5 px-3 font-semibold text-foreground">Total Buy Cost</th>
                <th className="w-28 py-2.5 px-3 font-medium">Gross Sell</th>
                <th className="w-36 py-2.5 px-3 font-medium">Sell Taxes & Setup</th>
                <th className="w-32 py-2.5 px-3 font-semibold text-foreground">Total Sell Return</th>
                <th className="w-28 py-2.5 px-3 font-medium text-right">Net Profit</th>
                <th className="w-28 py-2.5 px-3 font-medium text-right pr-4">Profit / Loss %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {tradeItems.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-muted-foreground text-xs">
                    No items in trade manifest.
                  </td>
                </tr>
              ) : (
                tradeItems.map((ti) => {
                  const m = getItemMetrics(ti);

                  return (
                    <tr key={ti.instanceId} className="group hover:bg-muted/40 transition-colors">
                      {/* Item Icon */}
                      <td className="py-3 px-3">
                        <div
                          className={`relative w-11 h-11 bg-background border rounded overflow-hidden flex items-center justify-center ${getEnchantBorder(
                            ti.item.enchantment
                          )}`}
                        >
                          <img
                            src={ti.item.icon}
                            alt={ti.item.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute top-0.5 left-0.5 px-1 py-0.2 bg-rose-900 text-white text-[9px] font-bold font-mono rounded-xs shadow">
                            {ti.item.tierRoman}
                          </div>
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3">
                        <span className="text-primary hover:underline font-semibold cursor-pointer">
                          {ti.item.name}
                        </span>
                      </td>

                      {/* Units */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded font-mono font-bold text-xs bg-muted text-foreground border border-border shadow-2xs tabular-nums">
                          {ti.quantity.toLocaleString()}
                        </span>
                      </td>

                      {/* Gross Buy */}
                      <td className="py-3 px-3 font-mono text-foreground">
                        {m.grossBuy.toLocaleString()}
                      </td>

                      {/* Buy Setup Fee */}
                      <td className="py-3 px-3 font-mono text-muted-foreground">
                        {buyMethod === "order" ? `+${m.buySetupFee.toLocaleString()} (2.5%)` : "0 (0%)"}
                      </td>

                      {/* Total Buy Cost */}
                      <td className="py-3 px-3 font-mono font-bold text-foreground">
                        <span className="bg-muted/70 px-2 py-1 rounded border border-border inline-block">
                          {m.totalBuyCapital.toLocaleString()}
                        </span>
                      </td>

                      {/* Gross Sell */}
                      <td className="py-3 px-3 font-mono text-foreground">
                        {m.grossSell.toLocaleString()}
                      </td>

                      {/* Sell Taxes & Setup */}
                      <td className="py-3 px-3 font-mono text-muted-foreground">
                        -{m.totalSellDeductions.toLocaleString()} ({sellMethod === "order" ? "2.5% + " : ""}{hasPremium ? "4%" : "8%"})
                      </td>

                      {/* Total Sell Return */}
                      <td className="py-3 px-3 font-mono font-bold text-foreground">
                        <span className="bg-muted/70 px-2 py-1 rounded border border-border inline-block">
                          {m.netSellReturn.toLocaleString()}
                        </span>
                      </td>

                      {/* Net Profit */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-bold">
                        <span
                          className={
                            m.netItemProfit >= 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-destructive"
                          }
                        >
                          {m.netItemProfit > 0 ? "+" : ""}
                          {m.netItemProfit.toLocaleString()}
                        </span>
                      </td>

                      {/* Profit / Loss % */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-bold">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-xs ${
                            m.itemRoi >= 0
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-destructive/15 text-destructive border border-destructive/30"
                          }`}
                        >
                          {m.itemRoi >= 0 ? "+" : ""}
                          {m.itemRoi.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM TOTALS / TRADE PROFIT SUMMARY */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col items-end space-y-4 pr-2">
          {/* Row 1: Capital (Total Buying Cost) */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground block">Capital (Total Buying Cost)</span>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Gross Buy: {summary.totalGrossBuy.toLocaleString()} Silver • Buy Setup Fee ({buyMethod === "order" ? "2.5%" : "0%"}): +{summary.totalBuySetupFees.toLocaleString()} Silver
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-muted/80 border border-border rounded font-mono font-bold text-lg sm:text-xl text-foreground shadow-2xs">
                <IconCoins size={18} className="text-amber-400 shrink-0" />
                <span>{summary.totalCapital.toLocaleString()} Silver</span>
              </div>
            </div>
          </div>

          {/* Row 2: Total Selling Cost / Return */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground block">Total Selling Return (After Tax)</span>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Gross Sell: {summary.totalGrossSell.toLocaleString()} Silver • Market Taxes & Fees: -{summary.totalSellDeductions.toLocaleString()} Silver ({sellMethod === "order" ? "2.5% Setup + " : ""}{hasPremium ? "4%" : "8%"} Tax)
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-muted/80 border border-border rounded font-mono font-bold text-lg sm:text-xl text-foreground shadow-2xs">
                <IconCoins size={18} className="text-amber-400 shrink-0" />
                <span>{summary.totalNetSellReturn.toLocaleString()} Silver</span>
              </div>
            </div>
          </div>

          {/* Row 3: Profit with percentage (Profit / Loss) */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <div className="text-right">
              <span className="text-sm font-semibold text-foreground block">
                {summary.totalNetProfit >= 0 ? "Net Profit" : "Net Loss"}
              </span>
              <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center justify-end gap-2">
                <span>Profit / Loss Percentage:</span>
                <span
                  className={`px-1.5 py-0.5 rounded font-mono font-bold text-[11px] ${
                    summary.overallRoi >= 0
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-destructive/15 text-destructive border border-destructive/30"
                  }`}
                >
                  {summary.overallRoi >= 0 ? "+" : ""}
                  {summary.overallRoi.toFixed(1)}% {summary.totalNetProfit >= 0 ? "PROFIT" : "LOSS"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 border rounded font-mono font-bold text-lg sm:text-xl shadow-2xs ${
                  summary.totalNetProfit >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-destructive/10 text-destructive border-destructive/30"
                }`}
              >
                <IconTrendingUp size={18} />
                <span>
                  {summary.totalNetProfit > 0 ? "+" : ""}
                  {summary.totalNetProfit.toLocaleString()} Silver
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL MARKETPLACE ITEM SELECT MODAL */}
      {/* ========================================================================= */}
      <AlbionItemSelectModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onSelectItem={handleAddItem}
        title="Marketplace"
        actionLabel="Select"
      />
    </div>
  );
}
