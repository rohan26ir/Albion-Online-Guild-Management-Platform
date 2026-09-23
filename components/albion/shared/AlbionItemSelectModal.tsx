"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  IconSearch,
  IconX,
  IconRotate,
  IconChevronLeft,
  IconChevronRight,
  IconCoins,
  IconSword,
  IconShield,
  IconSparkles,
  IconBuildingStore,
  IconPick,
  IconCarrot,
  IconBed,
  IconBackpack,
  IconFlask,
  IconTrophy,
  IconBox,
  IconShirt,
  IconCheck,
} from "@tabler/icons-react";
import {
  AlbionItem,
  ItemCategory,
  ItemQuality,
  GLOBAL_ALBION_ITEMS,
  ALBION_CATEGORIES,
  StandardCategory,
  normalizeCategory,
  getRemoteItemIcon,
} from "@/data/global-items";

interface AlbionItemSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: AlbionItem) => void;
  title?: string;
  actionLabel?: string; // e.g. "Buy" or "Select"
  initialCategory?: ItemCategory | "All";
}

const TIERS = [
  { label: "All Tiers", value: 0 },
  { label: "T1", value: 1 },
  { label: "T2", value: 2 },
  { label: "T3", value: 3 },
  { label: "T4", value: 4 },
  { label: "T5", value: 5 },
  { label: "T6", value: 6 },
  { label: "T7", value: 7 },
  { label: "T8", value: 8 },
];

const ENCHANTMENTS = [
  { label: "All Enchant", value: -1 },
  { label: ".0 (Flat)", value: 0 },
  { label: ".1 (Uncommon)", value: 1 },
  { label: ".2 (Rare)", value: 2 },
  { label: ".3 (Exceptional)", value: 3 },
  { label: ".4 (Pristine)", value: 4 },
];

const QUALITIES: { label: string; value: ItemQuality | "All" }[] = [
  { label: "All Qualities", value: "All" },
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

// Helper to get category icons for modern aesthetics
const getCategoryIcon = (cat: StandardCategory, isActive: boolean) => {
  switch (cat) {
    case "Weapons":
      return <IconSword size={15} className={isActive ? "text-black shrink-0" : "text-amber-500 shrink-0"} />;
    case "Chest Armor":
    case "Head Armor":
    case "Foot Armor":
      return <IconShirt size={15} className={isActive ? "text-black shrink-0" : "text-sky-400 shrink-0"} />;
    case "OFF-hands":
      return <IconShield size={15} className={isActive ? "text-black shrink-0" : "text-emerald-400 shrink-0"} />;
    case "Capes":
      return <IconSparkles size={15} className={isActive ? "text-black shrink-0" : "text-purple-400 shrink-0"} />;
    case "Bags":
      return <IconBackpack size={15} className={isActive ? "text-black shrink-0" : "text-amber-600 shrink-0"} />;
    case "Mount":
      return <span className="text-sm shrink-0">🐎</span>;
    case "Consumable":
      return <IconFlask size={15} className={isActive ? "text-black shrink-0" : "text-rose-400 shrink-0"} />;
    case "Gathering Equipment":
      return <IconPick size={15} className={isActive ? "text-black shrink-0" : "text-stone-300 shrink-0"} />;
    case "Crafting":
      return <IconBuildingStore size={15} className={isActive ? "text-black shrink-0" : "text-orange-400 shrink-0"} />;
    case "Artifact":
      return <span className="text-sm shrink-0">🔮</span>;
    case "Farming":
      return <IconCarrot size={15} className={isActive ? "text-black shrink-0" : "text-emerald-500 shrink-0"} />;
    case "Furniture":
      return <IconBed size={15} className={isActive ? "text-black shrink-0" : "text-indigo-400 shrink-0"} />;
    case "Vanity":
      return <IconTrophy size={15} className={isActive ? "text-black shrink-0" : "text-yellow-400 shrink-0"} />;
    case "Other":
      return <IconBox size={15} className={isActive ? "text-black shrink-0" : "text-stone-400 shrink-0"} />;
    case "All":
    default:
      return <span className={`text-sm shrink-0 ${isActive ? "text-black font-bold" : "text-amber-500"}`}>✦</span>;
  }
};

export const AlbionItemSelectModal: React.FC<AlbionItemSelectModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  title = "Marketplace",
  actionLabel = "Select",
  initialCategory = "All",
}) => {
  // Normalize initial category
  const normalizedInitial = useMemo(() => {
    if (!initialCategory || initialCategory === "All") return "All";
    return normalizeCategory(initialCategory);
  }, [initialCategory]);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  // Selection is strictly updated on CLICK:
  const [selectedCategory, setSelectedCategory] = useState<StandardCategory>(normalizedInitial);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [selectedEnchantment, setSelectedEnchantment] = useState<number>(-1);
  const [selectedQuality, setSelectedQuality] = useState<ItemQuality | "All">("All");

  // User-friendly Unified Sort state
  const [sortOption, setSortOption] = useState<SortOptionKey>("price-asc");

  // Pagination (20 per page)
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Sync initialCategory changes
  useEffect(() => {
    setSelectedCategory(normalizedInitial);
    setSelectedSubcategory("All");
  }, [normalizedInitial, isOpen]);

  // Available Subcategories for selectedCategory (computed on demand)
  const availableSubcategories = useMemo(() => {
    const items =
      selectedCategory === "All"
        ? GLOBAL_ALBION_ITEMS
        : GLOBAL_ALBION_ITEMS.filter((i) => normalizeCategory(i.category) === selectedCategory);
    const subcats = Array.from(new Set(items.map((i) => i.subcategory))).filter(Boolean).sort();
    return ["All", ...subcats];
  }, [selectedCategory]);

  // Count of items per category for category list badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: GLOBAL_ALBION_ITEMS.length };
    GLOBAL_ALBION_ITEMS.forEach((item) => {
      const cat = normalizeCategory(item.category);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, []);

  // Subcategory item counts for the active selected category
  const subcategoryCounts = useMemo(() => {
    const items =
      selectedCategory === "All"
        ? GLOBAL_ALBION_ITEMS
        : GLOBAL_ALBION_ITEMS.filter((i) => normalizeCategory(i.category) === selectedCategory);

    const counts: Record<string, number> = { All: items.length };
    items.forEach((item) => {
      counts[item.subcategory] = (counts[item.subcategory] || 0) + 1;
    });
    return counts;
  }, [selectedCategory]);

  // Reset page when filters change
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

  // Strictly on CLICK: Category selection
  const handleCategoryClick = (cat: StandardCategory) => {
    setSelectedCategory(cat);
    setSelectedSubcategory("All");
  };

  // Strictly on CLICK: Subcategory selection
  const handleSubcategoryClick = (subcat: string) => {
    setSelectedSubcategory(subcat);
  };

  // Reset all filters
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
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSub = item.subcategory?.toLowerCase().includes(q);
        const matchCat = item.category?.toLowerCase().includes(q);
        const matchId = item.identifier?.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchCat && !matchId) return false;
      }

      // 2. Category
      if (selectedCategory !== "All") {
        const normCat = normalizeCategory(item.category);
        if (normCat !== selectedCategory) return false;
      }

      // 3. Subcategory
      if (selectedSubcategory !== "All" && item.subcategory !== selectedSubcategory) {
        return false;
      }

      // 4. Tier
      if (selectedTier !== 0 && item.tier !== selectedTier) {
        return false;
      }

      // 5. Enchantment
      if (selectedEnchantment !== -1 && item.enchantment !== selectedEnchantment) {
        return false;
      }

      // 6. Quality
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

  // Paginated items
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
      case 1:
        return "bg-stone-600 text-stone-100";
      case 2:
        return "bg-stone-500 text-stone-100";
      case 3:
        return "bg-emerald-800 text-emerald-100";
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

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedSubcategory !== "All" ? 1 : 0) +
    (selectedTier !== 0 ? 1 : 0) +
    (selectedEnchantment !== -1 ? 1 : 0) +
    (selectedQuality !== "All" ? 1 : 0) +
    (searchQuery.trim() !== "" ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      {/* Modal Container */}
      <div className="bg-card text-card-foreground border-2 border-border/80 rounded-xl shadow-2xl w-full max-w-6xl h-[92vh] max-h-[920px] flex flex-col overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. TOP HEADER BAR: Title, Search, Close */}
        {/* ========================================================================= */}
        <div className="bg-muted/50 border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between gap-4 select-none shrink-0">
          {/* Left: Avatar & Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-background border-2 border-amber-500/70 p-0.5 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="/images/items/T8_HEAD_PLATE_SET3.png"
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getRemoteItemIcon("T8_HEAD_PLATE_SET3", 0);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold text-foreground font-heading tracking-tight">
                {title}
              </h2>
              <div className="w-4 h-4 rounded-full border border-amber-500/80 bg-amber-500/20 flex items-center justify-center text-[9px] text-amber-500 font-bold">
                ✦
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground ml-1">
                ({filteredItems.length} items)
              </span>
            </div>
          </div>

          {/* Right: Search Box + Close */}
          <div className="flex items-center gap-3">
            <div className="relative w-52 sm:w-80 group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items by name, tier, type..."
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
        {/* 2. TIER FILTER PILLS & TOOLBAR (Tier: 1, 2, 3, 4, 5, 6, 7, 8) */}
        {/* ========================================================================= */}
        <div className="bg-muted/30 border-b border-border px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 select-none">
          {/* Left: Quick Tier Selectors */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Tier:
            </span>
            {TIERS.map((tier) => (
              <button
                key={tier.value}
                onClick={() => setSelectedTier(tier.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold font-mono transition-all cursor-pointer shadow-xs ${
                  selectedTier === tier.value
                    ? "bg-amber-500 text-black border border-amber-400 font-bold scale-105"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Right: Enchantment, Quality, Sort & Reset */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            {/* Enchantment Dropdown */}
            <div className="relative">
              <select
                value={selectedEnchantment}
                onChange={(e) => setSelectedEnchantment(parseInt(e.target.value))}
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedEnchantment !== -1
                    ? "border-amber-500 text-amber-500 font-semibold"
                    : "border-border"
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
                onChange={(e) => setSelectedQuality(e.target.value as ItemQuality | "All")}
                className={`appearance-none bg-background border text-foreground font-medium rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer hover:border-foreground/40 shadow-xs transition-colors ${
                  selectedQuality !== "All"
                    ? "border-amber-500 text-amber-500 font-semibold"
                    : "border-border"
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

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOptionKey)}
                className="appearance-none bg-background border border-border text-foreground font-semibold rounded-full pl-3 pr-7 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer hover:border-foreground/40 shadow-xs transition-colors"
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

            {/* Reset Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetAll}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-amber-500 text-xs font-semibold cursor-pointer shadow-xs transition-all active:scale-95"
                title="Reset filters"
              >
                <IconRotate size={12} />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CLICK-BASED 3-PANEL BODY: Category -> Subcategory -> Items */}
        {/* ========================================================================= */}
        <div className="flex-1 flex min-h-0 divide-x divide-border bg-background">
          {/* ------------------------------------------------------------- */}
          {/* LEVEL 1: CATEGORIES LIST (Strictly on CLICK) */}
          {/* ------------------------------------------------------------- */}
          <div className="w-52 shrink-0 bg-muted/20 flex flex-col min-h-0 overflow-y-auto py-2 select-none">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Category</span>
              <span className="text-muted-foreground/60 text-[9px] font-mono">Click to view</span>
            </div>
            <div className="space-y-0.5 px-1.5">
              {ALBION_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all cursor-pointer group ${
                      isSelected
                        ? "bg-amber-500 text-black font-bold shadow-xs scale-[1.01]"
                        : "text-foreground hover:bg-muted/70 hover:text-amber-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {getCategoryIcon(cat, isSelected)}
                      <span className="truncate">{cat}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isSelected
                            ? "bg-black/20 text-black font-bold"
                            : "bg-background/80 text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {count}
                      </span>
                      {isSelected ? (
                        <IconCheck size={13} className="text-black shrink-0 font-bold" />
                      ) : (
                        <IconChevronRight
                          size={12}
                          className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LEVEL 2: SUBCATEGORIES LIST (Strictly on CLICK) */}
          {/* ------------------------------------------------------------- */}
          <div className="w-52 shrink-0 bg-muted/10 flex flex-col min-h-0 overflow-y-auto py-2 select-none border-r border-border">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Subcategory</span>
              <span className="font-mono text-amber-500 text-[10px] truncate max-w-[100px]">{selectedCategory}</span>
            </div>
            <div className="space-y-0.5 px-1.5">
              {availableSubcategories.map((subcat) => {
                const isSelected = selectedSubcategory === subcat;
                const count = subcategoryCounts[subcat] || 0;
                return (
                  <button
                    key={subcat}
                    onClick={() => handleSubcategoryClick(subcat)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-foreground hover:bg-muted/60 hover:text-primary"
                    }`}
                  >
                    <span className="truncate">{subcat === "All" ? `All ${selectedCategory}` : subcat}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-primary-foreground/20 text-primary-foreground font-bold"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LEVEL 3: ITEMS LIST & ACTION */}
          {/* ------------------------------------------------------------- */}
          <div className="flex-1 flex flex-col min-h-0 bg-background/50">
            {/* Active Path Header */}
            <div className="px-4 py-2 bg-muted/30 border-b border-border text-[11px] font-medium text-muted-foreground flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-foreground">{selectedCategory}</span>
                <span>/</span>
                <span className="text-amber-500 font-semibold">{selectedSubcategory === "All" ? "All Subcategories" : selectedSubcategory}</span>
                {selectedTier !== 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded text-[10px] font-mono font-bold">
                    Tier {selectedTier}
                  </span>
                )}
                <span className="text-muted-foreground font-mono">
                  ({filteredItems.length} matching)
                </span>
              </div>
            </div>

            {/* Items Rows */}
            <div className="flex-1 overflow-y-auto divide-y divide-border/60">
              {currentItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-3xl mb-2">🔍</span>
                  <p className="text-sm font-medium text-foreground">No matching items found</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                    Try selecting another subcategory, clearing your search query, or resetting filters.
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
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="grid grid-cols-12 gap-3 items-center px-4 sm:px-6 py-2.5 hover:bg-muted/50 transition-colors group cursor-pointer"
                  >
                    {/* Item Avatar & Details */}
                    <div className="col-span-7 sm:col-span-8 flex items-center gap-3 min-w-0">
                      {/* Avatar Box (w-12 h-12) */}
                      <div
                        className={`relative w-12 h-12 rounded-md bg-background border-2 flex items-center justify-center shrink-0 overflow-hidden shadow-xs ${getEnchantBorder(
                          item.enchantment
                        )}`}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                          onError={(e) => {
                            // Fallback to Albion Online Render API if local image is missing
                            const remoteUrl = getRemoteItemIcon(item.identifier, item.enchantment);
                            if (e.currentTarget.src !== remoteUrl) {
                              e.currentTarget.src = remoteUrl;
                            }
                          }}
                        />

                        {/* Tier Roman Badge */}
                        <div
                          className={`absolute top-0.5 left-0.5 px-1 py-0.2 text-[9px] font-bold font-mono rounded-xs shadow ${getTierBadgeBg(
                            item.tier
                          )}`}
                        >
                          {item.tierRoman}
                        </div>

                        {/* Enchantment Dot */}
                        {item.enchantment > 0 && (
                          <div className="absolute bottom-0.5 right-0.5 flex items-center gap-0.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-background border border-primary flex items-center justify-center text-[9px] font-bold text-foreground">
                              .{item.enchantment}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name, Subcategory & Quality */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-xs sm:text-sm text-foreground truncate group-hover:text-amber-500 transition-colors">
                            {item.name}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded border font-medium ${getQualityStyle(
                              item.quality
                            )}`}
                          >
                            {item.quality}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                          <span className="truncate">{item.subcategory}</span>
                          <span className="text-[9px] opacity-40">•</span>
                          <span className="font-mono text-[10px] text-muted-foreground/80 truncate">
                            {item.identifier}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price in Silver */}
                    <div className="col-span-3 sm:col-span-2 text-right">
                      <div className="inline-flex items-center gap-1 justify-end">
                        <IconCoins size={14} className="text-amber-400 shrink-0" />
                        <span className="font-mono font-bold text-xs sm:text-sm text-foreground tabular-nums">
                          {item.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="col-span-2 sm:col-span-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                          onClose();
                        }}
                        className="inline-flex items-center justify-center px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs rounded transition-all shadow-xs cursor-pointer active:scale-95 group-hover:bg-amber-500 group-hover:text-black"
                      >
                        {actionLabel}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Footer */}
            <div className="py-2.5 px-4 bg-muted/30 border-t border-border flex items-center justify-between shrink-0 select-none text-xs">
              <span className="text-muted-foreground font-mono text-[11px]">
                Showing {Math.min(filteredItems.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}-
                {Math.min(filteredItems.length, currentPage * ITEMS_PER_PAGE)} of{" "}
                {filteredItems.length} items
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Previous page"
                >
                  <IconChevronLeft size={14} />
                </button>

                <span className="font-mono font-bold text-xs text-foreground min-w-[20px] text-center">
                  {currentPage} / {totalPages}
                </span>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-7 h-7 rounded-md border border-border bg-background hover:bg-muted disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-foreground transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Next page"
                >
                  <IconChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
