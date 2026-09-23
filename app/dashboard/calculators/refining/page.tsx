"use client";

import { useState, useMemo } from "react";
import {
  AlbionItem,
  GLOBAL_ALBION_ITEMS,
  CraftingIngredient,
  getRemoteItemIcon,
} from "@/data/global-items";
import { AlbionItemSelectModal } from "@/components/albion/shared/AlbionItemSelectModal";
import {
  IconX,
  IconChevronUp,
  IconChevronDown,
  IconCoins,
  IconFlame,
  IconCrown,
  IconTrendingUp,
  IconSparkles,
} from "@tabler/icons-react";

export interface SelectedRefineItem {
  instanceId: string;
  item: AlbionItem;
  count: number;
  usageFee: number;
  sellPrice: number;
}

// City bonuses in Albion Online for refining
const REFINING_CITIES = [
  { name: "Thetford", bonusResource: "Metal Bars", bonusNote: "+Ore (36.7% RRR)" },
  { name: "Fort Sterling", bonusResource: "Planks", bonusNote: "+Wood (36.7% RRR)" },
  { name: "Lymhurst", bonusResource: "Cloth", bonusNote: "+Fiber (36.7% RRR)" },
  { name: "Martlock", bonusResource: "Leather", bonusNote: "+Hide (36.7% RRR)" },
  { name: "Bridgewatch", bonusResource: "Stone Blocks", bonusNote: "+Stone (36.7% RRR)" },
  { name: "Caerleon", bonusResource: "None", bonusNote: "Royal / Island (15.2% RRR)" },
  { name: "Brecilien", bonusResource: "None", bonusNote: "Mists (15.2% RRR)" },
];

export default function RefiningCalculatorPage() {
  const [selectedCity, setSelectedCity] = useState("Fort Sterling");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState(false);

  // Refining modifiers
  const [useFocus, setUseFocus] = useState(true);
  const [hasPremium, setHasPremium] = useState(true);

  // Helper to canonicalize ingredient key to merge duplicates
  const getIngredientCanonicalKey = (ing: CraftingIngredient) => {
    return `${ing.identifier}@${ing.enchantment || 0}`;
  };

  // Preload initial refining item: Cedar Planks (Tier 5)
  const initialRefineItem =
    GLOBAL_ALBION_ITEMS.find(
      (i) => (i.category === "Crafting" || (i.category as string) === "Refining") && i.identifier === "T5_PLANKS" && i.enchantment === 0
    ) ||
    GLOBAL_ALBION_ITEMS.find((i) => i.category === "Crafting" || (i.category as string) === "Refining") ||
    GLOBAL_ALBION_ITEMS[0];

  const [refineItems, setRefineItems] = useState<SelectedRefineItem[]>([
    {
      instanceId: "initial-cedar-planks",
      item: initialRefineItem,
      count: 100,
      usageFee: 1000,
      sellPrice: initialRefineItem.price || 620,
    },
  ]);

  // Track "Have" inputs and "Cost" inputs by canonical ingredient key
  const [haveAmounts, setHaveAmounts] = useState<Record<string, number>>({});
  const [unitCosts, setUnitCosts] = useState<Record<string, number>>({
    [getIngredientCanonicalKey(initialRefineItem.ingredients[0])]:
      initialRefineItem.ingredients[0].baseCost,
    [getIngredientCanonicalKey(initialRefineItem.ingredients[1])]:
      initialRefineItem.ingredients[1].baseCost,
  });

  // Calculate Resource Return Rate (RRR) based on city bonus & focus
  const activeCityData =
    REFINING_CITIES.find((c) => c.name === selectedCity) || REFINING_CITIES[0];

  // Check if active items match city bonus
  const isCityBonusActive = (item: AlbionItem) => {
    if (activeCityData.bonusResource === "Metal Bars" && item.subcategory === "Metal Bars") return true;
    if (activeCityData.bonusResource === "Planks" && item.subcategory === "Planks") return true;
    if (activeCityData.bonusResource === "Cloth" && item.subcategory === "Cloth") return true;
    if (activeCityData.bonusResource === "Leather" && item.subcategory === "Leather") return true;
    if (activeCityData.bonusResource === "Stone Blocks" && item.subcategory === "Stone Blocks") return true;
    return false;
  };

  // Return rate calculation per item (standard Albion formulas)
  const getItemRRR = (item: AlbionItem) => {
    const hasBonus = isCityBonusActive(item);
    if (hasBonus) {
      return useFocus ? 0.539 : 0.367; // 53.9% with focus, 36.7% without
    }
    return useFocus ? 0.435 : 0.152; // 43.5% with focus, 15.2% without
  };

  // Add item from modal
  const handleAddItem = (item: AlbionItem) => {
    const newItem: SelectedRefineItem = {
      instanceId: `${item.id}-${Date.now()}`,
      item,
      count: 100,
      usageFee: item.defaultUsageFee,
      sellPrice: item.price || 620,
    };
    setRefineItems((prev) => [...prev, newItem]);

    // Pre-populate unit costs from ingredient baseCost if not already set
    item.ingredients.forEach((ing) => {
      const key = getIngredientCanonicalKey(ing);
      setUnitCosts((prev) => {
        if (prev[key] === undefined) {
          return { ...prev, [key]: ing.baseCost };
        }
        return prev;
      });
    });
  };

  // Remove item
  const handleRemoveItem = (instanceId: string) => {
    setRefineItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  // Update item count
  const handleUpdateCount = (instanceId: string, newCount: number) => {
    setRefineItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, count: Math.max(0, newCount) }
          : item
      )
    );
  };

  // Update usage fee
  const handleUpdateUsageFee = (instanceId: string, newFee: number) => {
    setRefineItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, usageFee: Math.max(0, newFee) }
          : item
      )
    );
  };

  // Update sell price
  const handleUpdateSellPrice = (instanceId: string, newPrice: number) => {
    setRefineItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, sellPrice: Math.max(0, newPrice) }
          : item
      )
    );
  };

  // Pull Market Prices
  const handlePullMarketPrices = () => {
    const updatedCosts: Record<string, number> = { ...unitCosts };
    refineItems.forEach((ci) => {
      ci.item.ingredients.forEach((ing) => {
        const key = getIngredientCanonicalKey(ing);
        updatedCosts[key] = ing.baseCost;
      });
    });
    setUnitCosts(updatedCosts);
  };

  // Calculate Fee per refine row
  const calculateItemFee = (ci: SelectedRefineItem) => {
    return Math.round((ci.count * ci.item.nutritionPerCraft * ci.usageFee) / 100);
  };

  // Total Usage Fee across all items
  const totalFeeCost = useMemo(() => {
    return refineItems.reduce((sum, ci) => sum + calculateItemFee(ci), 0);
  }, [refineItems]);

  // Aggregate ingredients across all refining items (Merges identical items into one row)
  const aggregatedIngredients = useMemo(() => {
    const map = new Map<
      string,
      {
        ingredient: CraftingIngredient;
        totalRequired: number;
      }
    >();

    refineItems.forEach((ci) => {
      ci.item.ingredients.forEach((ing) => {
        const required = ing.requiredPerCraft * ci.count;
        const key = getIngredientCanonicalKey(ing);
        if (map.has(key)) {
          const existing = map.get(key)!;
          existing.totalRequired += required;
        } else {
          map.set(key, {
            ingredient: {
              ...ing,
              id: key,
            },
            totalRequired: required,
          });
        }
      });
    });

    return Array.from(map.values());
  }, [refineItems]);

  // Total Gross Material Cost
  const grossMaterialCost = useMemo(() => {
    return aggregatedIngredients.reduce((sum, ing) => {
      const have = haveAmounts[ing.ingredient.id] || 0;
      const needed = Math.max(0, ing.totalRequired - have);
      const cost = unitCosts[ing.ingredient.id] || 0;
      return sum + needed * cost;
    }, 0);
  }, [aggregatedIngredients, haveAmounts, unitCosts]);

  // Calculate Returned Materials Value from RRR
  const returnedMaterialsValue = useMemo(() => {
    let totalReturnVal = 0;
    refineItems.forEach((ci) => {
      const rrr = getItemRRR(ci.item);
      const itemGrossCost = ci.item.ingredients.reduce((acc, ing) => {
        const key = getIngredientCanonicalKey(ing);
        const cost = unitCosts[key] || ing.baseCost;
        return acc + ing.requiredPerCraft * ci.count * cost;
      }, 0);
      totalReturnVal += Math.round(itemGrossCost * rrr);
    });
    return totalReturnVal;
  }, [refineItems, unitCosts, useFocus, selectedCity]);

  // Net Refining Cost = Gross Costs - Returned Material Value + Usage Fees
  const totalCost = Math.max(0, grossMaterialCost - returnedMaterialsValue + totalFeeCost);

  // Gross Revenue from selling refined items
  const grossRevenue = useMemo(() => {
    return refineItems.reduce((sum, ci) => sum + ci.count * ci.sellPrice, 0);
  }, [refineItems]);

  // Market Taxes (4% Premium / 8% Non-Premium + 2.5% Setup order)
  const taxRate = hasPremium ? 0.04 : 0.08;
  const totalMarketTax = Math.round(grossRevenue * (taxRate + 0.025));
  const netRevenue = grossRevenue - totalMarketTax;

  // Net Profit
  const netProfit = netRevenue - totalCost;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  // Fame Metrics
  const fameMetrics = useMemo(() => {
    let mainFame = 0;
    let subFame = 0;

    refineItems.forEach((ci) => {
      mainFame += ci.count * ci.item.famePerCraft;
      subFame += ci.count * ci.item.subFamePerCraft;
    });

    return {
      mainFame,
      subFame,
      total: mainFame + subFame,
    };
  }, [refineItems]);

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
            <span>Refining Calculator</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Resource Return Rate (RRR), material aggregation, and net profit analysis
          </p>
        </div>
        <a
          href="#"
          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Albion Refining Engine
        </a>
      </div>

      {/* Action Bar (Identical clean layout as Crafting Calculator) */}
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

        {/* City Dropdown with Bonus indicator */}
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="appearance-none bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium px-4 py-2 pr-8 rounded-none border border-border focus:outline-none transition-colors cursor-pointer"
          >
            {REFINING_CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name} - {city.bonusNote}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

        {/* Focus Toggle */}
        <button
          onClick={() => setUseFocus(!useFocus)}
          className={`px-4 py-2 text-xs font-medium rounded-none border transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
            useFocus
              ? "bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-semibold"
              : "bg-secondary border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <IconFlame size={14} className={useFocus ? "text-amber-500 fill-amber-500/30" : ""} />
          <span>{useFocus ? "Focus: Active (53.9% RRR)" : "Focus: Off (36.7% RRR)"}</span>
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

        {/* Recent Items Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsRecentDropdownOpen(!isRecentDropdownOpen)}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium px-4 py-2 pr-8 rounded-none border border-border flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Recent Resources</span>
            <IconChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </button>

          {isRecentDropdownOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-64 bg-popover text-popover-foreground border border-border rounded-md shadow-2xl z-40 py-1 max-h-64 overflow-y-auto">
              {GLOBAL_ALBION_ITEMS.filter((i) => i.category === "Crafting" || (i.category as string) === "Refining")
                .slice(0, 8)
                .map((item) => (
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
      </div>

      {/* SECTION 1: Items to refine */}
      <div className="bg-card rounded-none border border-border p-4 lg:p-6 mb-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Items to refine
          </h2>
          <span className="text-[11px] text-muted-foreground">
            {refineItems.length} {refineItems.length === 1 ? "resource" : "resources"} in queue
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-muted/30">
              <tr className="border-b border-border text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                <th className="w-10 py-2.5 px-3"></th>
                <th className="w-16 py-2.5 px-3 font-medium">Item</th>
                <th className="py-2.5 px-3 font-medium">Name</th>
                <th className="w-36 py-2.5 px-3 font-medium">Batch Output</th>
                <th className="w-36 py-2.5 px-3 font-medium">Sell Price</th>
                <th className="w-36 py-2.5 px-3 font-medium">Usage Fee</th>
                <th className="w-28 py-2.5 px-3 font-medium text-right pr-4">Σ Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {refineItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                    No items in refining queue. Click{" "}
                    <strong className="text-primary font-semibold">Add Item</strong> above.
                  </td>
                </tr>
              ) : (
                refineItems.map((ci) => {
                  const fee = calculateItemFee(ci);
                  const rrrPercent = (getItemRRR(ci.item) * 100).toFixed(1);
                  const isBonus = isCityBonusActive(ci.item);

                  return (
                    <tr key={ci.instanceId} className="group hover:bg-muted/40 transition-colors">
                      {/* Delete button */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleRemoveItem(ci.instanceId)}
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
                            ci.item.enchantment
                          )}`}
                        >
                          <img
                            src={ci.item.icon}
                            alt={ci.item.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              const remoteUrl = getRemoteItemIcon(ci.item.identifier, ci.item.enchantment);
                              if (e.currentTarget.src !== remoteUrl) {
                                e.currentTarget.src = remoteUrl;
                              }
                            }}
                          />
                          <div className="absolute top-0.5 left-0.5 px-1 py-0.2 bg-rose-900 text-white text-[9px] font-bold font-mono rounded-xs shadow">
                            {ci.item.tierRoman}
                          </div>
                        </div>
                      </td>

                      {/* Name & RRR Status */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-primary hover:underline font-semibold cursor-pointer">
                            {ci.item.name}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded border font-mono font-semibold ${
                              isBonus
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {rrrPercent}% RRR {isBonus ? "(City Bonus)" : ""}
                          </span>
                        </div>
                      </td>

                      {/* Count input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={ci.count}
                          onChange={(e) =>
                            handleUpdateCount(ci.instanceId, parseInt(e.target.value) || 0)
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                      </td>

                      {/* Sell Price input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={ci.sellPrice}
                          onChange={(e) =>
                            handleUpdateSellPrice(ci.instanceId, parseInt(e.target.value) || 0)
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                      </td>

                      {/* Usage Fee input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={ci.usageFee}
                          onChange={(e) =>
                            handleUpdateUsageFee(ci.instanceId, parseInt(e.target.value) || 0)
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                      </td>

                      {/* Σ Fee */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-semibold text-foreground">
                        {fee.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Shopping list / Raw Materials Required (MERGED AS REQUESTED) */}
      <div className="bg-card rounded-none border border-border p-4 lg:p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Shopping list (Raw Materials Required)
          </h2>
          <span className="text-[11px] text-muted-foreground">
            {aggregatedIngredients.length} required {aggregatedIngredients.length === 1 ? "ingredient" : "ingredients"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-muted/30">
              <tr className="border-b border-border text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                <th className="w-12 py-2.5 px-3 font-medium">Craft</th>
                <th className="w-16 py-2.5 px-3 font-medium">Item</th>
                <th className="py-2.5 px-3 font-medium">Name</th>
                <th className="w-28 py-2.5 px-3 font-semibold text-foreground">
                  Required
                </th>
                <th className="w-36 py-2.5 px-3 font-medium">Have</th>
                <th className="w-32 py-2.5 px-3 font-semibold text-foreground">
                  Σ Required
                </th>
                <th className="w-36 py-2.5 px-3 font-medium">Cost (Silver)</th>
                <th className="w-28 py-2.5 px-3 font-medium text-right pr-4">Σ Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {aggregatedIngredients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground text-xs">
                    Shopping list is empty. Add resources to refining queue.
                  </td>
                </tr>
              ) : (
                aggregatedIngredients.map((itemRow) => {
                  const ing = itemRow.ingredient;
                  const have = haveAmounts[ing.id] || 0;
                  const sigmaRequired = Math.max(0, itemRow.totalRequired - have);
                  const unitCost = unitCosts[ing.id] || 0;
                  const sigmaCost = sigmaRequired * unitCost;

                  return (
                    <tr key={ing.id} className="group hover:bg-muted/40 transition-colors">
                      {/* Craft Sub-recipe Button */}
                      <td className="py-3 px-3">
                        <button
                          title="Craft sub-item"
                          className="w-6 h-6 bg-muted hover:bg-accent text-foreground border border-border flex items-center justify-center rounded transition-colors cursor-pointer"
                        >
                          <IconChevronUp size={14} />
                        </button>
                      </td>

                      {/* Item Icon with Roman Numeral Tier Badge */}
                      <td className="py-3 px-3">
                        <div
                          className={`relative w-11 h-11 bg-background border rounded overflow-hidden flex items-center justify-center ${getEnchantBorder(
                            ing.enchantment || 0
                          )}`}
                        >
                          <img
                            src={ing.icon}
                            alt={ing.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              const remoteUrl = getRemoteItemIcon(ing.identifier, ing.enchantment || 0);
                              if (e.currentTarget.src !== remoteUrl) {
                                e.currentTarget.src = remoteUrl;
                              }
                            }}
                          />
                          <div
                            className={`absolute top-0.5 left-0.5 px-1 py-0.2 text-white text-[9px] font-bold font-mono rounded-xs shadow ${
                              ing.tier >= 5 ? "bg-rose-900" : "bg-blue-900"
                            }`}
                          >
                            {ing.tierRoman}
                          </div>
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3">
                        <span className="text-primary hover:underline font-semibold cursor-pointer">
                          {ing.name}
                        </span>
                      </td>

                      {/* Required (Merged Total) */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded font-mono font-bold text-xs bg-muted text-foreground border border-border shadow-2xs tabular-nums">
                          {itemRow.totalRequired.toLocaleString()}
                        </span>
                      </td>

                      {/* Have input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={haveAmounts[ing.id] ?? 0}
                          onChange={(e) =>
                            setHaveAmounts((prev) => ({
                              ...prev,
                              [ing.id]: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                      </td>

                      {/* Σ Required */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded font-mono font-bold text-xs tabular-nums ${
                            sigmaRequired > 0
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {sigmaRequired.toLocaleString()}
                        </span>
                      </td>

                      {/* Cost input */}
                      <td className="py-3 px-3 pr-4">
                        <input
                          type="number"
                          value={unitCosts[ing.id] ?? 0}
                          onChange={(e) =>
                            setUnitCosts((prev) => ({
                              ...prev,
                              [ing.id]: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-full max-w-[130px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
                        />
                      </td>

                      {/* Σ Cost */}
                      <td className="py-3 px-3 pr-4 text-right font-mono font-semibold text-foreground">
                        {sigmaCost.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* BOTTOM TOTALS / REFINING PROFIT SUMMARY */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col items-end space-y-4 pr-2">
          {/* RRR Returned Materials Discount */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <span className="text-xs text-muted-foreground">RRR Material Recovery Value</span>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-500">
                - {returnedMaterialsValue.toLocaleString()} Silver (Recovered)
              </span>
            </div>
          </div>

          {/* Σ Costs (with background container like crafting) */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <span className="text-sm font-semibold text-foreground">Σ Net Cost</span>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-muted/80 border border-border rounded font-mono font-bold text-lg sm:text-xl text-foreground shadow-2xs">
                <IconCoins size={18} className="text-amber-400 shrink-0" />
                <span>{totalCost.toLocaleString()} Silver</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Gross: {grossMaterialCost.toLocaleString()} | Fee: {totalFeeCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Net Profit Banner */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <span className="text-sm font-semibold text-foreground">Net Refining Profit</span>
            <div className="text-right">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 border rounded font-mono font-bold text-lg sm:text-xl shadow-2xs ${
                  netProfit >= 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                    : "bg-destructive/10 text-destructive border-destructive/30"
                }`}
              >
                <IconTrendingUp size={18} />
                <span>{netProfit > 0 ? "+" : ""}{netProfit.toLocaleString()} Silver</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Net Revenue: {netRevenue.toLocaleString()} | ROI: <span className="font-semibold text-foreground">{roi.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Σ Fame */}
          <div className="flex items-baseline justify-end gap-16">
            <span className="text-sm font-semibold text-foreground">Σ Fame</span>
            <div className="text-right">
              <span className="text-xl font-bold text-foreground font-mono">
                {fameMetrics.total.toLocaleString()}
              </span>
              <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">
                ({fameMetrics.mainFame.toLocaleString()} + {fameMetrics.subFame.toLocaleString()})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL MARKETPLACE RESOURCE SELECT MODAL */}
      {/* ========================================================================= */}
      <AlbionItemSelectModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onSelectItem={handleAddItem}
        title="Refining Resource Catalog"
        actionLabel="Select"
        initialCategory="Crafting"
      />
    </div>
  );
}