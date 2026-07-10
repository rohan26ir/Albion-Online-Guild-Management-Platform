'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoStatsChart, IoFlash, IoRefresh, IoStar, IoGrid,
  IoSearch, IoClose, IoFilter, IoShield, IoDiamond, IoBag
} from 'react-icons/io5';
import { RiSwordFill } from "react-icons/ri";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CategoryTabs from '@/components/albion/Items/CategoryTabs';
import FilterBar from '@/components/customComp/FilterBar';
import ItemGrid from '@/components/albion/Items/ItemGrid';
import PaginationControls from '@/components/albion/Items/PaginationControls';
import ItemDetailDrawer from '@/components/albion/Items/ItemDetailDrawer';
import type { EnrichedItem, SortField, SortOrder, ViewMode } from '@/lib/types';

// ==================== CONSTANTS ====================
const API_BASE = 'https://api.openalbion.com/api/v3';

// Category endpoints - all individual category endpoints
const categoryEndpoints = [
  { key: 'weapons', endpoint: '/weapons' },
  { key: 'armors', endpoint: '/armors' },
  { key: 'accessories', endpoint: '/accessories' },
  { key: 'consumables', endpoint: '/consumables' },
];

const ITEMS_PER_PAGE = 12;

const tierColors: Record<string, string> = {
  '1': 'bg-gray-400',
  '2': 'bg-green-400',
  '3': 'bg-blue-400',
  '4': 'bg-purple-400',
  '5': 'bg-orange-400',
  '6': 'bg-red-400',
  '7': 'bg-pink-400',
  '8': 'bg-yellow-400',
};

const tierLabels: Record<string, string> = {
  '1': 'Common',
  '2': 'Uncommon',
  '3': 'Rare',
  '4': 'Epic',
  '5': 'Legendary',
  '6': 'Mythic',
  '7': 'Divine',
  '8': 'Ascended',
};

const qualityColors: Record<string, string> = {
  'Normal': 'border-gray-400 text-gray-400',
  'Good': 'border-green-400 text-green-400',
  'Outstanding': 'border-blue-400 text-blue-400',
  'Excellent': 'border-purple-400 text-purple-400',
  'Masterpiece': 'border-yellow-400 text-yellow-400',
};

// ==================== UTILITIES ====================
const getTierBadgeColor = (tier: string): string => {
  return tierColors[tier] || 'bg-gray-400';
};

const getQualityColor = (quality?: string): string => {
  return quality ? qualityColors[quality]?.split(' ')[1] || 'text-gray-400' : 'text-gray-400';
};

const getQualityBorder = (quality?: string): string => {
  return quality ? qualityColors[quality]?.split(' ')[0] || 'border-gray-400' : 'border-gray-400';
};

// ==================== COMPONENT ====================
function AlbionItemsBrowserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL State - Basic Filters
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('category');
    // Default to 'all' if no valid tab is found
    return tab && ['all', 'weapons', 'armors', 'accessories', 'consumables'].includes(tab) 
      ? tab 
      : 'all';
  });

  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<SortField>(() => {
    const sort = searchParams.get('sortBy') as SortField;
    return sort && ['name', 'tier', 'item_power', 'popularity', 'price'].includes(sort) ? sort : 'item_power';
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    const order = searchParams.get('sortOrder') as SortOrder;
    return order && ['asc', 'desc'].includes(order) ? order : 'desc';
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(searchParams.get('page') || '1');
    return page > 0 ? page : 1;
  });
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('subcategory') || 'all');
  const [selectedTier, setSelectedTier] = useState(() => searchParams.get('tier') || 'all');
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const mode = searchParams.get('view') as ViewMode;
    return mode && ['grid', 'list', 'compact'].includes(mode) ? mode : 'grid';
  });

  // URL State - Advanced Filters
  const [selectedQuality, setSelectedQuality] = useState(() => searchParams.get('quality') || 'all');
  const [selectedType, setSelectedType] = useState(() => searchParams.get('type') || 'all');
  const [selectedEnchantment, setSelectedEnchantment] = useState(() => {
    const enchant = parseInt(searchParams.get('enchantment') || '0');
    return enchant > 0 ? enchant : 0;
  });
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = parseInt(searchParams.get('priceMin') || '0');
    const max = parseInt(searchParams.get('priceMax') || '1000000');
    return [min, max];
  });

  // Local State
  const [items, setItems] = useState<EnrichedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [categoryStats, setCategoryStats] = useState<{ name: string; count: number }[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [selectedItem, setSelectedItem] = useState<EnrichedItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [allItemsCache, setAllItemsCache] = useState<EnrichedItem[]>([]);

  // Update URL with all filters
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    
    // Basic filters
    if (activeTab !== 'all') params.set('category', activeTab);
    if (searchTerm) params.set('search', searchTerm);
    if (sortBy !== 'item_power') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (selectedCategory !== 'all') params.set('subcategory', selectedCategory);
    if (selectedTier !== 'all') params.set('tier', selectedTier);
    if (viewMode !== 'grid') params.set('view', viewMode);
    
    // Advanced filters
    if (selectedQuality !== 'all') params.set('quality', selectedQuality);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (selectedEnchantment > 0) params.set('enchantment', selectedEnchantment.toString());
    if (priceRange[0] > 0) params.set('priceMin', priceRange[0].toString());
    if (priceRange[1] < 1000000) params.set('priceMax', priceRange[1].toString());

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : window.location.pathname;
    router.push(url, { scroll: false });
  }, [
    activeTab, searchTerm, sortBy, sortOrder, currentPage, 
    selectedCategory, selectedTier, viewMode,
    selectedQuality, selectedType, selectedEnchantment, priceRange,
    router
  ]);

  // Enrich items with additional data
  const enrichItems = useCallback((items: any[]): EnrichedItem[] => {
    return items.map((item: any) => ({
      ...item,
      popularity: Math.floor(Math.random() * 100) + 1,
      price: Math.floor(Math.random() * 1000000) + 1000,
      enchantment: Math.floor(Math.random() * 4),
      quality: ['Normal', 'Good', 'Outstanding', 'Excellent', 'Masterpiece'][Math.floor(Math.random() * 5)],
      stats: {
        attackDamage: item.category?.type === 'weapon' ? Math.floor(Math.random() * 50) + 10 : undefined,
        defense: item.category?.type === 'armor' ? Math.floor(Math.random() * 30) + 5 : undefined,
        health: Math.floor(Math.random() * 100) + 50,
        mana: Math.floor(Math.random() * 50) + 10,
        attackSpeed: Math.floor(Math.random() * 20) + 1,
        movementSpeed: Math.floor(Math.random() * 15) + 1,
        castSpeed: Math.floor(Math.random() * 15) + 1,
      },
      description: `A powerful ${item.category?.name?.toLowerCase() || 'item'} with exceptional qualities.`,
      requirements: {
        level: Math.floor(Math.random() * 40) + 10,
        tier: item.tier || '1',
        fame: Math.floor(Math.random() * 50000) + 5000,
      },
      marketData: {
        averagePrice: Math.floor(Math.random() * 1000000) + 10000,
        lowestPrice: Math.floor(Math.random() * 500000) + 5000,
        highestPrice: Math.floor(Math.random() * 1500000) + 15000,
        supply: Math.floor(Math.random() * 100) + 1,
        demand: Math.floor(Math.random() * 100) + 1,
      },
      media: {
        images: [item.icon, item.icon, item.icon],
        gif: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',
        video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      }
    }));
  }, []);

  // Fetch items from a single endpoint
  const fetchCategoryItems = useCallback(async (endpoint: string) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await res.json();
      return data.data || [];
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  }, []);

  // Fetch all items from all categories
  const fetchAllItems = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch from all category endpoints in parallel
      const fetchPromises = categoryEndpoints.map(({ endpoint }) => 
        fetchCategoryItems(endpoint)
      );
      
      const results = await Promise.all(fetchPromises);
      
      // Combine all items
      const allItems = results.flat();
      
      // Enrich items
      const enrichedItems = enrichItems(allItems);
      
      // Remove duplicates based on id
      const uniqueItems = enrichedItems.filter((item, index, self) => 
        index === self.findIndex((t) => t.id === item.id)
      );
      
      setAllItemsCache(uniqueItems);
      setItems(uniqueItems);
      setTotalItems(uniqueItems.length);

      // Calculate category stats
      const stats = uniqueItems.reduce((acc: any, item: any) => {
        const name = item.category?.name || 'Unknown';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

      setCategoryStats(Object.entries(stats).map(([name, count]) => ({ name, count: count as number })));
    } catch (error) {
      console.error('Error fetching all items:', error);
      setItems([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [fetchCategoryItems, enrichItems]);

  // Fetch single category items
  const fetchSingleCategory = useCallback(async (endpoint: string, categoryKey: string) => {
    setLoading(true);
    try {
      const items = await fetchCategoryItems(endpoint);
      const enrichedItems = enrichItems(items);
      
      setItems(enrichedItems);
      setTotalItems(enrichedItems.length);

      // Calculate category stats
      const stats = enrichedItems.reduce((acc: any, item: any) => {
        const name = item.category?.name || 'Unknown';
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

      setCategoryStats(Object.entries(stats).map(([name, count]) => ({ name, count: count as number })));
    } catch (error) {
      console.error('Error fetching category items:', error);
      setItems([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [fetchCategoryItems, enrichItems]);

  // Fetch items based on selected tab
  const fetchItemsByTab = useCallback(async (tab: string) => {
    if (tab === 'all') {
      await fetchAllItems();
    } else {
      const category = categoryEndpoints.find(c => c.key === tab);
      if (category) {
        await fetchSingleCategory(category.endpoint, tab);
      }
    }
  }, [fetchAllItems, fetchSingleCategory]);

  // Handle tab change
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
    setSelectedCategory('all');
    setSelectedTier('all');
    setSelectedQuality('all');
    setSelectedType('all');
    setSelectedEnchantment(0);
    setPriceRange([0, 1000000]);
    setSearchTerm('');
    
    fetchItemsByTab(value);
  }, [fetchItemsByTab]);

  // Effects
  useEffect(() => {
    if (isInitialRender) {
      fetchItemsByTab(activeTab);
      setIsInitialRender(false);
    }
  }, [activeTab, fetchItemsByTab, isInitialRender]);

  useEffect(() => {
    if (!isInitialRender) {
      updateURL();
    }
  }, [
    activeTab, searchTerm, sortBy, sortOrder, currentPage, 
    selectedCategory, selectedTier, viewMode,
    selectedQuality, selectedType, selectedEnchantment, priceRange,
    updateURL, isInitialRender
  ]);

  // Filter and sort logic with all filters
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.identifier.toLowerCase().includes(term) ||
        item.category.name.toLowerCase().includes(term) ||
        (item.subcategory?.name.toLowerCase().includes(term) || false)
      );
    }

    // Subcategory filter
    if (selectedCategory !== 'all') {
      result = result.filter(item =>
        item.subcategory?.name.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Tier filter
    if (selectedTier !== 'all') {
      result = result.filter(item => item.tier === selectedTier);
    }

    // Quality filter
    if (selectedQuality !== 'all') {
      result = result.filter(item => item.quality === selectedQuality);
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter(item => item.category.type === selectedType);
    }

    // Enchantment filter
    if (selectedEnchantment > 0) {
      result = result.filter(item => item.enchantment === selectedEnchantment);
    }

    // Price range filter
    result = result.filter(item => {
      const price = item.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    result.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      switch (sortBy) {
        case 'name':
          valA = a.name;
          valB = b.name;
          return sortOrder === 'asc'
            ? valA.localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        case 'tier':
          valA = parseFloat(a.tier);
          valB = parseFloat(b.tier);
          break;
        case 'popularity':
          valA = a.popularity || 0;
          valB = b.popularity || 0;
          break;
        case 'price':
          valA = a.price || 0;
          valB = b.price || 0;
          break;
        default:
          valA = a.item_power;
          valB = b.item_power;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });

    return result;
  }, [
    items, searchTerm, sortBy, sortOrder, 
    selectedCategory, selectedTier, selectedQuality, 
    selectedType, selectedEnchantment, priceRange
  ]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);

  const uniqueSubcategories = useMemo(() => {
    const subs = new Set(items.map(item => item.subcategory?.name).filter((name): name is string => Boolean(name)));
    return Array.from(subs);
  }, [items]);

  const uniqueTiers = useMemo(() => {
    const tiers = new Set(items.map(item => item.tier));
    return Array.from(tiers).sort();
  }, [items]);

  // Handlers
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'item_power' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleItemClick = (item: EnrichedItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTier('all');
    setSelectedQuality('all');
    setSelectedType('all');
    setSelectedEnchantment(0);
    setPriceRange([0, 1000000]);
    setSortBy('item_power');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Albion Items
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <IoStatsChart className="h-4 w-4" />
              {totalItems} items available • {categoryStats.length} categories
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* <Badge variant="outline" className="px-4 py-2 bg-primary/5 border-primary/20">
              <IoFlash className="h-4 w-4 mr-2 text-primary" />
              OpenAlbion API v3
            </Badge> */}
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <IoRefresh className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryStats.slice(0, 6).map((stat) => (
            <Badge key={stat.name} variant="secondary" className="px-3 py-1">
              {stat.name}: {stat.count}
            </Badge>
          ))}
          {categoryStats.length > 6 && (
            <Badge variant="outline" className="px-3 py-1">
              +{categoryStats.length - 6} more
            </Badge>
          )}
        </div>

        {/* Filters */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
          selectedTier={selectedTier}
          onTierChange={(value) => {
            setSelectedTier(value);
            setCurrentPage(1);
          }}
          selectedQuality={selectedQuality}
          onQualityChange={(value) => {
            setSelectedQuality(value);
            setCurrentPage(1);
          }}
          selectedType={selectedType}
          onTypeChange={(value) => {
            setSelectedType(value);
            setCurrentPage(1);
          }}
          priceRange={priceRange}
          onPriceRangeChange={(value) => {
            setPriceRange(value);
            setCurrentPage(1);
          }}
          selectedEnchantment={selectedEnchantment}
          onEnchantmentChange={(value) => {
            setSelectedEnchantment(value);
            setCurrentPage(1);
          }}
          uniqueSubcategories={uniqueSubcategories}
          uniqueTiers={uniqueTiers}
          onClearFilters={clearFilters}
          showAdvanced={true}
        />

        {/* Results Info & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{paginatedItems.length}</span> of{' '}
              <span className="font-medium text-foreground">{filteredAndSortedItems.length}</span> items
            </p>
            {favorites.length > 0 && (
              <Badge variant="outline" className="border-yellow-400/50 text-yellow-600">
                <IoStar className="h-3 w-3 mr-1 fill-yellow-400" />
                {favorites.length} favorites
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 mr-2 border-r border-border pr-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <IoGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <IoStatsChart className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'compact' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('compact')}
                className="h-8 w-8 p-0"
              >
                <IoGrid className="h-4 w-4" />
              </Button>
            </div>

            <span className="text-xs text-muted-foreground mr-1">Sort:</span>
            {['item_power', 'tier', 'name', 'popularity', 'price'].map((field) => (
              <Button
                key={field}
                variant="outline"
                size="sm"
                onClick={() => handleSort(field as SortField)}
                className={sortBy === field ? 'bg-accent' : ''}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {sortBy === field && (
                  sortOrder === 'asc' ? ' ↑' : ' ↓'
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <ItemGrid
              items={paginatedItems}
              viewMode={viewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onItemClick={handleItemClick}
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAndSortedItems.length === 0 && (
          <Card className="p-12 text-center bg-muted/30 border-dashed mt-6">
            <div className="flex flex-col items-center gap-4">
              <IoSearch className="h-16 w-16 text-muted-foreground/50" />
              <h3 className="text-2xl font-semibold">No items found</h3>
              <p className="text-muted-foreground max-w-md">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                <IoRefresh className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Item Detail Drawer */}
        <ItemDetailDrawer
          item={selectedItem}
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedItem(null);
          }}
        />
      </div>
    </div>
  );
}

export default function AlbionItemsBrowser() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background py-12"><div className="max-w-7xl mx-auto px-4 w-[96%]">Loading...</div></div>}>
      <AlbionItemsBrowserContent />
    </Suspense>
  );
}