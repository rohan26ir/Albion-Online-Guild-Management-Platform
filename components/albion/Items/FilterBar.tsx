// components/customComp/FilterBar.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { IoSearch, IoClose, IoFilter } from 'react-icons/io5';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

// Constants
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

const qualityOptions = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Good', label: 'Good' },
  { value: 'Outstanding', label: 'Outstanding' },
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Masterpiece', label: 'Masterpiece' },
];

const itemTypes = [
  { value: 'weapon', label: 'Weapons' },
  { value: 'armor', label: 'Armors' },
  { value: 'accessory', label: 'Accessories' },
  { value: 'consumable', label: 'Consumables' },
];

const enchantmentLevels = [
  { value: 0, label: 'Any Enchantment' },
  { value: 1, label: '⭐ Level 1' },
  { value: 2, label: '⭐⭐ Level 2' },
  { value: 3, label: '⭐⭐⭐ Level 3' },
  { value: 4, label: '⭐⭐⭐⭐ Level 4' },
];

const getTierBadgeColor = (tier: string): string => {
  return tierColors[tier] || 'bg-gray-400';
};

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedTier: string;
  onTierChange: (value: string) => void;
  selectedQuality?: string;
  onQualityChange?: (value: string) => void;
  selectedType?: string;
  onTypeChange?: (value: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (value: [number, number]) => void;
  selectedEnchantment?: number;
  onEnchantmentChange?: (value: number) => void;
  uniqueSubcategories: string[];
  uniqueTiers: string[];
  onClearFilters: () => void;
  showAdvanced?: boolean;
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTier,
  onTierChange,
  selectedQuality = 'all',
  onQualityChange = () => {},
  selectedType = 'all',
  onTypeChange = () => {},
  priceRange = [0, 1000000],
  onPriceRangeChange = () => {},
  selectedEnchantment = 0,
  onEnchantmentChange = () => {},
  uniqueSubcategories,
  uniqueTiers,
  onClearFilters,
  showAdvanced = false,
}: FilterBarProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvanced);

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== '' ||
      selectedCategory !== 'all' ||
      selectedTier !== 'all' ||
      selectedQuality !== 'all' ||
      selectedType !== 'all' ||
      selectedEnchantment > 0 ||
      priceRange[0] > 0 ||
      priceRange[1] < 1000000
    );
  }, [searchTerm, selectedCategory, selectedTier, selectedQuality, selectedType, selectedEnchantment, priceRange]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedTier !== 'all') count++;
    if (selectedQuality !== 'all') count++;
    if (selectedType !== 'all') count++;
    if (selectedEnchantment > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 1000000) count++;
    return count;
  }, [searchTerm, selectedCategory, selectedTier, selectedQuality, selectedType, selectedEnchantment, priceRange]);

  const handleClearAll = () => {
    onSearchChange('');
    onCategoryChange('all');
    onTierChange('all');
    onQualityChange('all');
    onTypeChange('all');
    onEnchantmentChange(0);
    onPriceRangeChange([0, 1000000]);
    onClearFilters();
  };

  return (
    <Card className="border-primary/10 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <IoFilter className="h-5 w-5 text-primary" />
            Filters & Search
            {hasActiveFilters && (
              <Badge variant="default" className="ml-2">
                {activeFilterCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="text-xs"
            >
              {isAdvancedOpen ? 'Hide Advanced' : 'Show Advanced'}
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <IoClose className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Basic Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <IoSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items by name, ID, or category..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-10 bg-muted/30"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  <IoClose className="h-4 w-4" />
                </button>
              )}
            </div>

            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full md:w-56 bg-muted/30">
                <SelectValue placeholder="Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                {uniqueSubcategories.map(sub => (
                  <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTier} onValueChange={onTierChange}>
              <SelectTrigger className="w-full md:w-44 bg-muted/30">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                {uniqueTiers.map(tier => (
                  <SelectItem key={tier} value={tier}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTierBadgeColor(tier)}`} />
                      Tier {tier} - {tierLabels[tier] || 'Unknown'}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters */}
          {isAdvancedOpen && (
            <div className="pt-4 border-t border-border space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Quality Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quality</Label>
                  <Select value={selectedQuality} onValueChange={onQualityChange}>
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Select Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Qualities</SelectItem>
                      {qualityOptions.map(quality => (
                        <SelectItem key={quality.value} value={quality.value}>
                          {quality.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Item Type Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Item Type</Label>
                  <Select value={selectedType} onValueChange={onTypeChange}>
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {itemTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Enchantment Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Enchantment Level</Label>
                  <Select 
                    value={selectedEnchantment?.toString() || '0'} 
                    onValueChange={(value) => onEnchantmentChange(parseInt(value))}
                  >
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Select Enchantment" />
                    </SelectTrigger>
                    <SelectContent>
                      {enchantmentLevels.map(level => (
                        <SelectItem key={level.value} value={level.value.toString()}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Price Range (Silver)</Label>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()}</span>
                    <span>-</span>
                    <span>{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                <Slider
                  min={0}
                  max={1000000}
                  step={1000}
                  value={priceRange}
                  onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>500k</span>
                  <span>1M</span>
                </div>
              </div>

              {/* Quick Filter Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs text-muted-foreground mr-2">Quick filters:</span>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    onTierChange('4');
                    onQualityChange('Excellent');
                  }}
                >
                  Tier 4 Excellent
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    onTierChange('6');
                    onQualityChange('Masterpiece');
                  }}
                >
                  Tier 6 Masterpiece
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    onEnchantmentChange(3);
                    onPriceRangeChange([50000, 500000]);
                  }}
                >
                  Enchanted ⭐⭐⭐
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    onTypeChange('weapon');
                    onPriceRangeChange([100000, 1000000]);
                  }}
                >
                  High-end Weapons
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    onPriceRangeChange([0, 100000]);
                    onQualityChange?.('Normal');
                  }}
                >
                  Budget Items
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}