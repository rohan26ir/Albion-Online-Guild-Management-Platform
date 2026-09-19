"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  IconSearch,
  IconX,
  IconRotate,
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
  IconCoins,
  IconArrowsSort,
} from "@tabler/icons-react";
import {
  AlbionItem,
  ItemCategory,
  ItemQuality,
  GLOBAL_ALBION_ITEMS,
} from "@/data/global-items";

interface AlbionItemSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: AlbionItem) => void;
  title?: string;
  actionLabel?: string; // e.g. "Buy" or "Select"
  initialCategory?: ItemCategory | "All";
}

const CATEGORIES: { label: string; value: ItemCategory | "All" }[] = [
  { label: "Category", value: "All" },
  { label: "Melee", value: "Melee" },
  { label: "Ranged", value: "Ranged" },
  { label: "Magic", value: "Magic" },
  { label: "Armor", value: "Armor" },
  { label: "Refining", value: "Refining" },
  { label: "Accessories", value: "Accessories" },
  { label: "Consumables", value: "Consumables" },
];

const TIERS = [
  { label: "Tier", value: 0 },
  { label: "Tier 1", value: 1 },
  { label: "Tier 2", value: 2 },
  { label: "Tier 3", value: 3 },
  { label: "Tier 4", value: 4 },
  { label: "Tier 5", value: 5 },
  { label: "Tier 6", value: 6 },
  { label: "Tier 7", value: 7 },
  { label: "Tier 8", value: 8 },
];

const ENCHANTMENTS = [
  { label: "Enchantment", value: -1 },
  { label: ".0 (None)", value: 0 },
  { label: ".1 (Uncommon)", value: 1 },
  { label: ".2 (Rare)", value: 2 },
  { label: ".3 (Exceptional)", value: 3 },
  { label: ".4 (Pristine)", value: 4 },
];

const QUALITIES: { label: string; value: ItemQuality | "All" }[] = [
  { label: "Quality", value: "All" },
  { label: "Normal", value: "Normal" },
  { label: "Good", value: "Good" },
  { label: "Outstanding", value: "Outstanding" },
  { label: "Excellent", value: "Excellent" },
  { label: "Masterpiece", value: "Masterpiece" },
];

export type SortOptionKey =
  | "price-asc"
  | "price-desc"
  | "tier-desc"
  | "tier-asc"
  | "name-asc"
  | "name-desc";

const SORT_OPTIONS: { label: string; value: SortOptionKey }[] = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Tier: High to Low", value: "tier-desc" },
  { label: "Tier: Low to High", value: "tier-asc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

export const AlbionItemSelectModal: React.FC<AlbionItemSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  title = "Marketplace",
  actionLabel = "Buy",
  initialCategory = "All",
}) => {
  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "All">(
    initialCategory
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [selectedEnchantment, setSelectedEnchantment] = useState<number>(-1);
  const [selectedQuality, setSelectedQuality] = useState<ItemQuality | "All">("All");

  // User-friendly Unified Sort state (Default: Price: Low to High)
  const [sortOption, setSortOption] = useState<SortOptionKey>("price-asc");

  // Pagination: exactly 20 per page as required
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedSubcategory !== "All") count++;
    if (selectedTier !== 0) count++;
    if (selectedEnchantment !== -1) count++;
    if (selectedQuality !== "All") count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedTier,
    selectedEnchantment,
    selectedQuality,
    searchQuery,
  ]);

  // Derive available subcategories based on category
  const availableSubcategories = useMemo(() => {
    const items =
      selectedCategory === "All"
        ? GLOBAL_ALBION_ITEMS
        : GLOBAL_ALBION_ITEMS.filter((i) => i.category === selectedCategory);
    const subcats = Array.from(new Set(items.map((i) => i.subcategory)));
    return ["All", ...subcats];
  }, [selectedCategory]);

  // Reset subcategory if not present in available
  useEffect(() => {
    if (
      selectedSubcategory !== "All" &&
      !availableSubcategories.includes(selectedSubcategory)
    ) {
      setSelectedSubcategory("All");
    }
  }, [availableSubcategories, selectedSubcategory]);

  // Reset to page 1 whenever search, filters, or sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedTier,
    selectedEnchantment,
    selectedQuality,
    sortOption,
  ]);

  // Reset all filters & search
  const handleResetAll = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSubcategory("All");
    setSelectedTier(0);
    setSelectedEnchantment(-1);
    setSelectedQuality("All");
    setSortOption("price-asc");
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return GLOBAL_ALBION_ITEMS.filter((item) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSub = item.subcategory.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchId = item.identifier.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchCat && !matchId) return false;
      }

      // Category
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // Subcategory
      if (
        selectedSubcategory !== "All" &&
        item.subcategory !== selectedSubcategory
      ) {
        return false;
      }

      // Tier
      if (selectedTier !== 0 && item.tier !== selectedTier) {
        return false;
      }

      // Enchantment
      if (selectedEnchantment !== -1 && item.enchantment !== selectedEnchantment) {
        return false;
      }

      // Quality
      if (selectedQuality !== "All" && item.quality !== selectedQuality) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "tier-desc":
          return b.tier - a.tier;
        case "tier-asc":
          return a.tier - b.tier;
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "name-asc":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedTier,
    selectedEnchantment,
    selectedQuality,
    sortOption,
  ]);

  // Paginated items (20 items per page)
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  if (!isOpen) return null;

  // Quality Color Badge Helper
  const getQualityStyle = (q: ItemQuality) => {
    switch (q) {
      case "Normal":
        return "text-muted-foreground border-border bg-muted/40";
      case "Good":
        return "text-emerald-500 border-emerald-500/30 bg-emerald-500/10";
      case "Outstanding":
        return "text-sky-500 border-sky-500/30 bg-sky-500/10";
      case "Excellent":
        return "text-purple-500 border-purple-500/30 bg-purple-500/10";
      case "Masterpiece":
        return "text-amber-500 border-amber-500/40 bg-amber-500/15";
      default:
        return "text-muted-foreground border-border bg-muted/40";
    }
  };

  // Enchantment Border Helper
  const getEnchantBorder = (enchant: number) => {
    switch (enchant) {
      case 1:
        return "border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.35)]";
      case 2:
        return "border-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.35)]";
      case 3:
        return "border-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.35)]";
      case 4:
        return "border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.45)]";
      default:
        return "border-border";
    }
  };

  // Tier Badge Color
  const getTierBadgeBg = (tier: number) => {
    switch (tier) {
      case 4:
        return "bg-blue-700 text-blue-100";
      case 5:
        return "bg-rose-800 text-rose-100";
      case 6:
        return "bg-amber-700 text-amber-100";
      case 7:
        return "bg-amber-500 text-black";
      case 8:
        return "bg-slate-100 text-black border border-amber-500/50";
      default:
        return "bg-stone-700 text-stone-100";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      {/* Modal Container */}
      <div className="bg-card text-card-foreground border-2 border-border/80 rounded-xl shadow-2xl w-full max-w-5xl h-[92vh] max-h-[920px] flex flex-col overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. TOP HEADER BAR: Avatar, Title, Redesigned Search Input, Close */}
        {/* ========================================================================= */}
        <div className="bg-muted/50 border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between gap-4 select-none shrink-0">
          {/* Left: Avatar & Title with item count */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-background border-2 border-amber-500/70 p-0.5 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="https://render.albiononline.com/v1/item/T8_HEAD_PLATE_SET3.png"
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold text-foreground font-heading tracking-tight">
                {title}
              </h2>
              {/* Golden circular emblem */}
              <div className="w-4 h-4 rounded-full border border-amber-500/80 bg-amber-500/20 flex items-center justify-center text-[9px] text-amber-500 font-bold">
                ✦
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground ml-1">
                ({filteredItems.length} items)
              </span>
            </div>
          </div>

          {/* Right: Redesigned User-Friendly Search Box + Close Button */}
          <div className="flex items-center gap-3">
            <div className="relative w-52 sm:w-80 group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, tier, or type..."
                className="w-full pl-9 pr-9 py-1.5 bg-background border border-border rounded-full text-xs text-foreground placeholder:text-muted-foreground placeholder:italic focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 shadow-xs transition-all"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-focus-within:text-amber-500 transition-colors">
                <IconSearch size={15} />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  title="Clear search"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>

            {/* Window Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-background border border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive flex items-center justify-center text-muted-foreground transition-all cursor-pointer shadow-xs active:scale-95"
              title="Close window"
            >
              <IconX size={16} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. REDESIGNED USER-FRIENDLY FILTER & DEDICATED SORT TOOLBAR */}
        {/* ========================================================================= */}
        <div className="bg-muted/30 border-b border-border px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          {/* Left: Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as ItemCategory | "All")
                }
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedCategory !== "All"
                    ? "border-amber-500/80 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                    : "border-border/80"
                }`}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground pointer-events-none">
                ▼
              </span>
            </div>

            {/* Subcategory Dropdown */}
            <div className="relative">
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedSubcategory !== "All"
                    ? "border-amber-500/80 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                    : "border-border/80"
                }`}
              >
                {availableSubcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub === "All" ? "Type" : sub}
                  </option>
                ))}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground pointer-events-none">
                ▼
              </span>
            </div>

            {/* Tier Dropdown */}
            <div className="relative">
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(parseInt(e.target.value))}
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedTier !== 0
                    ? "border-amber-500/80 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                    : "border-border/80"
                }`}
              >
                {TIERS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground pointer-events-none">
                ▼
              </span>
            </div>

            {/* Enchantment Dropdown */}
            <div className="relative">
              <select
                value={selectedEnchantment}
                onChange={(e) => setSelectedEnchantment(parseInt(e.target.value))}
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedEnchantment !== -1
                    ? "border-amber-500/80 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                    : "border-border/80"
                }`}
              >
                {ENCHANTMENTS.map((enc) => (
                  <option key={enc.value} value={enc.value}>
                    {enc.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground pointer-events-none">
                ▼
              </span>
            </div>

            {/* Quality Dropdown */}
            <div className="relative">
              <select
                value={selectedQuality}
                onChange={(e) =>
                  setSelectedQuality(e.target.value as ItemQuality | "All")
                }
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedQuality !== "All"
                    ? "border-amber-500/80 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5"
                    : "border-border/80"
                }`}
              >
                {QUALITIES.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground pointer-events-none">
                ▼
              </span>
            </div>

            {/* Clear Filters Button (shown when active) */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetAll}
                title="Reset all filters and search"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold cursor-pointer shadow-xs transition-all active:scale-95"
              >
                <IconRotate size={12} />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Right: Dedicated User-Friendly Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <IconArrowsSort size={13} className="text-amber-500" />
              <span className="hidden sm:inline">Sort:</span>
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOptionKey)}
                className="appearance-none bg-background border border-border text-foreground font-semibold rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-foreground/40 shadow-xs transition-colors"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground pointer-events-none">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TABLE BODY */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-h-0 bg-background/50">
          {/* Clean Table Column Headers (No row-wise sort) */}
          <div className="px-4 sm:px-6 py-2.5 bg-muted/40 border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0 grid grid-cols-12 gap-4 items-center select-none">
            {/* Item Header */}
            <div className="col-span-6 sm:col-span-7 flex items-center">
              <span className="inline-flex items-center px-3 py-1 bg-background/80 border border-border/70 rounded-full shadow-2xs">
                Item
              </span>
            </div>

            {/* Price Header */}
            <div className="col-span-3 sm:col-span-3 text-right flex items-center justify-end">
              <span className="inline-flex items-center px-3 py-1 bg-background/80 border border-border/70 rounded-full shadow-2xs">
                Price
              </span>
            </div>

            {/* Action Header */}
            <div className="col-span-3 sm:col-span-2 text-right">
              <span className="inline-block pr-2">Action</span>
            </div>
          </div>

          {/* Item List Rows (Exactly 20 items per page) */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {currentItems.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                <IconFilter size={32} className="text-muted-foreground/50 mb-2" />
                <p className="text-sm font-medium text-foreground">No matching items found</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Try adjusting your search query, tier, enchantment, or category filters.
                </p>
                <button
                  onClick={handleResetAll}
                  className="mt-4 px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-medium cursor-pointer shadow-xs hover:bg-primary/90 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 items-center px-4 sm:px-6 py-3 hover:bg-muted/50 transition-colors group"
                >
                  {/* Item Icon & Clean Name */}
                  <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5 min-w-0">
                    {/* Item Avatar Box (w-14 h-14) */}
                    <div
                      className={`relative w-14 h-14 rounded-md bg-background border-2 flex items-center justify-center shrink-0 overflow-hidden shadow-xs ${getEnchantBorder(
                        item.enchantment
                      )}`}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      {/* Roman Numeral Tier Badge (top-left) */}
                      <div
                        className={`absolute top-0.5 left-0.5 px-1.5 py-0.5 text-[10px] font-bold font-mono rounded-xs shadow ${getTierBadgeBg(
                          item.tier
                        )}`}
                      >
                        {item.tierRoman}
                      </div>

                      {/* Enchantment Dot Indicator (bottom-right) */}
                      {item.enchantment > 0 && (
                        <div className="absolute bottom-0.5 right-0.5 flex items-center gap-0.5">
                          <span className="w-4 h-4 rounded-full bg-background/95 border border-primary flex items-center justify-center text-[10px] font-bold text-foreground">
                            .{item.enchantment}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Clean Item Name & Quality Badge */}
                    <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm sm:text-base text-foreground truncate group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      {/* Quality Badge */}
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${getQualityStyle(
                          item.quality
                        )}`}
                      >
                        {item.quality}
                      </span>
                    </div>
                  </div>

                  {/* Price with silver coin stack icon */}
                  <div className="col-span-3 sm:col-span-3 text-right">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      <IconCoins size={16} className="text-amber-400 shrink-0" />
                      <span className="font-mono font-bold text-sm sm:text-base text-foreground tabular-nums">
                        {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Button: Styled like the "Add Item" button */}
                  <div className="col-span-3 sm:col-span-2 text-right">
                    <button
                      onClick={() => {
                        onSelectItem(item);
                        onClose();
                      }}
                      className="inline-flex items-center justify-center px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs tracking-wide rounded-none transition-colors shadow-xs cursor-pointer active:scale-95"
                    >
                      {actionLabel}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ========================================================================= */}
          {/* 4. PAGINATION FOOTER: Exactly like image */}
          {/* (Center position, Left button, Number(current), Right button) */}
          {/* ========================================================================= */}
          <div className="py-3 px-4 bg-muted/30 border-t border-border flex items-center justify-center shrink-0 select-none">
            <div className="flex items-center justify-center gap-3">
              {/* Left Arrow Button */}
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 rounded-full border border-border/80 bg-background hover:bg-muted disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
                title="Previous page"
              >
                <IconChevronLeft size={15} />
              </button>

              {/* Current Page Number */}
              <span className="font-mono font-bold text-xs text-foreground min-w-[20px] text-center select-none">
                {currentPage}
              </span>

              {/* Right Arrow Button */}
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-7 h-7 rounded-full border border-border/80 bg-background hover:bg-muted disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
                title="Next page"
              >
                <IconChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
