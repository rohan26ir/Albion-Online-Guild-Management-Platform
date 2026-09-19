"use client";

import { useState, useMemo } from "react";
import {
  AlbionItem,
  GLOBAL_ALBION_ITEMS,
  CraftingIngredient,
} from "@/data/global-items";
import { AlbionItemSelectModal } from "@/components/albion/shared/AlbionItemSelectModal";
import {
  IconX,
  IconChevronUp,
  IconChevronDown,
  IconCoins,
} from "@tabler/icons-react";

export interface SelectedCraftItem {
  instanceId: string;
  item: AlbionItem;
  count: number;
  usageFee: number;
}

export function CraftCalculator() {
  const [selectedCity, setSelectedCity] = useState("Bridgewatch");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isRecentDropdownOpen, setIsRecentDropdownOpen] = useState(false);

  // Canonical key helper to ensure identical ingredients across recipes are aggregated together
  const getIngredientCanonicalKey = (ing: CraftingIngredient) => {
    return `${ing.identifier}@${ing.enchantment || 0}`;
  };

  // Preload with Expert's Broadsword or Cedar Planks as initial item
  const initialItem =
    GLOBAL_ALBION_ITEMS.find((i) => i.identifier === "T5_MAIN_SWORD") ||
    GLOBAL_ALBION_ITEMS[0];

  const [craftItems, setCraftItems] = useState<SelectedCraftItem[]>([
    {
      instanceId: "initial-broadsword",
      item: initialItem,
      count: 10,
      usageFee: initialItem.defaultUsageFee,
    },
  ]);

  // Track "Have" inputs and "Cost" inputs by ingredient ID
  const [haveAmounts, setHaveAmounts] = useState<Record<string, number>>({});
  const [unitCosts, setUnitCosts] = useState<Record<string, number>>({
    [getIngredientCanonicalKey(initialItem.ingredients[0])]:
      initialItem.ingredients[0].baseCost,
    [getIngredientCanonicalKey(initialItem.ingredients[1])]:
      initialItem.ingredients[1].baseCost,
  });

  // Cities list matching Albion
  const cities = [
    "Bridgewatch",
    "Fort Sterling",
    "Lymhurst",
    "Martlock",
    "Thetford",
    "Caerleon",
    "Brecilien",
  ];

  // Handle adding an item from the global marketplace modal
  const handleAddItem = (item: AlbionItem) => {
    const newItem: SelectedCraftItem = {
      instanceId: `${item.id}-${Date.now()}`,
      item,
      count: item.category === "Refining" ? 100 : 10,
      usageFee: item.defaultUsageFee,
    };
    setCraftItems((prev) => [...prev, newItem]);

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

  // Remove item from crafting list
  const handleRemoveItem = (instanceId: string) => {
    setCraftItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  // Update item count
  const handleUpdateCount = (instanceId: string, newCount: number) => {
    setCraftItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, count: Math.max(0, newCount) }
          : item
      )
    );
  };

  // Update usage fee
  const handleUpdateUsageFee = (instanceId: string, newFee: number) => {
    setCraftItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId
          ? { ...item, usageFee: Math.max(0, newFee) }
          : item
      )
    );
  };

  // Pull Market Prices (simulate updating unitCosts based on default baseCost)
  const handlePullMarketPrices = () => {
    const updatedCosts: Record<string, number> = { ...unitCosts };
    craftItems.forEach((ci) => {
      ci.item.ingredients.forEach((ing) => {
        const key = getIngredientCanonicalKey(ing);
        updatedCosts[key] = ing.baseCost;
      });
    });
    setUnitCosts(updatedCosts);
  };

  // Calculate Fee per craft row
  const calculateItemFee = (ci: SelectedCraftItem) => {
    return Math.round((ci.count * ci.item.nutritionPerCraft * ci.usageFee) / 100);
  };

  // Total Usage Fee across all items
  const totalFeeCost = useMemo(() => {
    return craftItems.reduce((sum, ci) => sum + calculateItemFee(ci), 0);
  }, [craftItems]);

  // Aggregate ingredients across all craft items (Merges identical items into one row with total quantity)
  const aggregatedIngredients = useMemo(() => {
    const map = new Map<
      string,
      {
        ingredient: CraftingIngredient;
        totalRequired: number;
      }
    >();

    craftItems.forEach((ci) => {
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
              id: key, // Use canonical key so haveAmounts and unitCosts match seamlessly
            },
            totalRequired: required,
          });
        }
      });
    });

    return Array.from(map.values());
  }, [craftItems]);

  // Total Material Cost
  const totalMaterialCost = useMemo(() => {
    return aggregatedIngredients.reduce((sum, ing) => {
      const have = haveAmounts[ing.ingredient.id] || 0;
      const needed = Math.max(0, ing.totalRequired - have);
      const cost = unitCosts[ing.ingredient.id] || 0;
      return sum + needed * cost;
    }, 0);
  }, [aggregatedIngredients, haveAmounts, unitCosts]);

  const totalCost = totalFeeCost + totalMaterialCost;

  // Fame Metrics
  const fameMetrics = useMemo(() => {
    let mainFame = 0;
    let subFame = 0;

    craftItems.forEach((ci) => {
      mainFame += ci.count * ci.item.famePerCraft;
      subFame += ci.count * ci.item.subFamePerCraft;
    });

    return {
      mainFame,
      subFame,
      total: mainFame + subFame,
    };
  }, [craftItems]);

  // Enchantment styling helper
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
        <h1 className="text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
          Craft Calculator
        </h1>
        <a
          href="#"
          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Albion Crafting Engine
        </a>
      </div>

      {/* Action Bar */}
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

        {/* City Dropdown */}
        <div className="relative">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="appearance-none bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium px-4 py-2 pr-8 rounded-none border border-border focus:outline-none transition-colors cursor-pointer"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

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
      </div>

      {/* SECTION 1: Items to craft */}
      <div className="bg-card rounded-none border border-border p-4 lg:p-6 mb-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Items to craft
          </h2>
          <span className="text-[11px] text-muted-foreground">
            {craftItems.length} {craftItems.length === 1 ? "recipe" : "recipes"} active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-muted/30">
              <tr className="border-b border-border text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
                <th className="w-10 py-2.5 px-3"></th>
                <th className="w-16 py-2.5 px-3 font-medium">Item</th>
                <th className="py-2.5 px-3 font-medium">Name</th>
                <th className="w-44 py-2.5 px-3 font-medium">Count</th>
                <th className="w-44 py-2.5 px-3 font-medium">Usage Fee</th>
                <th className="w-28 py-2.5 px-3 font-medium text-right pr-4">Σ Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {craftItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground text-xs">
                    No items in crafting queue. Click{" "}
                    <strong className="text-primary font-semibold">Add Item</strong> above.
                  </td>
                </tr>
              ) : (
                craftItems.map((ci) => {
                  const fee = calculateItemFee(ci);

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
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <div className="absolute top-0.5 left-0.5 px-1 py-0.2 bg-rose-900 text-white text-[9px] font-bold font-mono rounded-xs shadow">
                            {ci.item.tierRoman}
                          </div>
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-primary hover:underline font-semibold cursor-pointer">
                            {ci.item.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            ({ci.item.category})
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
                          className="w-full max-w-[170px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
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
                          className="w-full max-w-[170px] bg-background border border-border text-foreground font-mono font-medium text-xs px-3 py-1.5 rounded-none focus:outline-none focus:border-primary"
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

      {/* SECTION 2: Shopping list (HIGH CONTRAST & CLEAR VISIBILITY FOR REQUIRED OPTION DATA) */}
      <div className="bg-card rounded-none border border-border p-4 lg:p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Shopping list
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
                {/* REQUIRED COLUMN (Highlighted header) */}
                <th className="w-28 py-2.5 px-3 font-semibold text-foreground">
                  Required
                </th>
                <th className="w-36 py-2.5 px-3 font-medium">Have</th>
                {/* Σ REQUIRED COLUMN */}
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
                    Shopping list is empty. Add items to craft queue.
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
                              e.currentTarget.style.display = "none";
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

                      {/* ======================================================= */}
                      {/* REQUIRED OPTION DATA (NOW CRYSTAL CLEAR, HIGH CONTRAST) */}
                      {/* ======================================================= */}
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

                      {/* ======================================================= */}
                      {/* Σ REQUIRED (NOW CRYSTAL CLEAR WITH DYNAMIC STATUS TINT) */}
                      {/* ======================================================= */}
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

        {/* BOTTOM TOTALS / SUMMARY */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col items-end space-y-4 pr-2">
          {/* Σ Costs (with background container as requested) */}
          <div className="flex items-center justify-end gap-8 sm:gap-16">
            <span className="text-sm font-semibold text-foreground">Σ Costs</span>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-muted/80 border border-border rounded font-mono font-bold text-lg sm:text-xl text-foreground shadow-2xs">
                <IconCoins size={18} className="text-amber-400 shrink-0" />
                <span>{totalCost.toLocaleString()} Silver</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Fee costs included ({totalFeeCost.toLocaleString()})
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
      {/* GLOBAL MARKETPLACE ITEM SELECT MODAL (MATCHING USER SCREENSHOT) */}
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
