'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  IoStar, IoStatsChart, IoRibbon, IoDiamond, IoFlash,
  IoInformationCircle
} from 'react-icons/io5';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { EnrichedItem, ViewMode } from '@/lib/types';

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

const qualityColors: Record<string, string> = {
  'Normal': 'text-gray-400',
  'Good': 'text-green-400',
  'Outstanding': 'text-blue-400',
  'Excellent': 'text-purple-400',
  'Masterpiece': 'text-yellow-400',
};

const getTierBadgeColor = (tier: string): string => {
  return tierColors[tier] || 'bg-gray-400';
};

const getQualityColor = (quality?: string): string => {
  return quality ? qualityColors[quality] || 'text-gray-400' : 'text-gray-400';
};

interface ItemGridProps {
  items: EnrichedItem[];
  viewMode: ViewMode;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onItemClick: (item: EnrichedItem) => void;
}

export default function ItemGrid({ 
  items, 
  viewMode, 
  favorites, 
  onToggleFavorite, 
  onItemClick 
}: ItemGridProps) {
  
  const renderGridItem = (item: EnrichedItem) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group relative cursor-pointer  "
        onClick={() => onItemClick(item)}
      >
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1  py-0">
          <div className="relative  ">
            <div className="relative h-58 bg-linear-to-br from-muted/50 to-background flex items-center justify-center p-4">
              <Image
                src={item.icon}
                alt={item.name}
                width={140}
                height={140}
                className="drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                unoptimized
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Badge className="bg-black/70 text-white border-0 px-4 py-2">
                  <IoInformationCircle className="h-4 w-4 mr-2" />
                  Click to view
                </Badge>
              </div>

              <div className="absolute top-3 left-3">
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getTierBadgeColor(item.tier)} text-white text-xs font-bold shadow-lg`}>
                  <IoStar className="h-3 w-3" />
                  Tier {item.tier}
                </div>
              </div>

              {item.quality && (
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg bg-background/90 backdrop-blur text-xs font-medium ${getQualityColor(item.quality)} shadow-lg`}>
                  {item.quality}
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-background/90 backdrop-blur hover:bg-background transition-colors shadow-lg"
              >
                <IoStar className={`h-5 w-5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
              </button>

              {item.enchantment > 0 && (
                <div className="absolute bottom-3 left-3 flex gap-0.5">
                  {Array.from({ length: item.enchantment }).map((_, i) => (
                    <IoFlash key={i} className="h-4 w-4 text-blue-400 animate-pulse" />
                  ))}
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="font-semibold text-lg leading-tight mb-1 line-clamp-1">
                {item.name}
              </div>
              {/* <div className="text-xs text-muted-foreground font-mono mb-2">
                {item.identifier}
              </div> */}

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <IoStatsChart className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.item_power}</span>
                  <span className="text-xs text-muted-foreground">IP</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoRibbon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.popularity}%</span>
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <IoDiamond className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">Silver</span>
                </div>
              </div>

              {item.stats && (
                <div className="mt-3 space-y-1">
                  {item.stats.attackDamage && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-12">Attack</span>
                      <Progress value={(item.stats.attackDamage / 50) * 100} className="h-1.5" />
                      <span className="text-xs font-medium">{item.stats.attackDamage}</span>
                    </div>
                  )}
                  {item.stats.defense && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-12">Defense</span>
                      <Progress value={(item.stats.defense / 30) * 100} className="h-1.5" />
                      <span className="text-xs font-medium">{item.stats.defense}</span>
                    </div>
                  )}
                </div>
              )}

              {item.subcategory && (
                <div className="mt-3 pt-2 border-t border-border">
                  <Badge variant="outline" className="text-xs">
                    {item.subcategory.name} 
                  </Badge>
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </motion.div>
    );
  };

  const renderListItem = (item: EnrichedItem) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="group cursor-pointer"
        onClick={() => onItemClick(item)}
      >
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 shrink-0 bg-muted rounded-lg p-2">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-contain"
                  unoptimized
                />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getTierBadgeColor(item.tier)} text-white text-[8px] flex items-center justify-center font-bold`}>
                  {item.tier} 
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg truncate">{item.name} </h3>
                  {item.quality && (
                    <span className={`text-xs font-medium ${getQualityColor(item.quality)}`}>
                      {item.quality} 
                    </span>
                  )}
                  <Badge variant="outline" className="text-xs">
                    IP {item.item_power}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground font-mono">{item.identifier}</div>
                <div className="flex items-center gap-4 mt-1">
                  {item.subcategory && (
                    <span className="text-xs text-muted-foreground">{item.subcategory.name}</span>
                  )}
                  <span className="text-xs flex items-center gap-1">
                    <IoDiamond className="h-3 w-3" />
                    {item.price.toLocaleString()} Silver
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <IoStar className={`h-5 w-5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                </button>
                <Badge variant="secondary" className="text-xs">
                  {item.popularity}% Popular
                </Badge>
                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                  View
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderCompactItem = (item: EnrichedItem) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group cursor-pointer"
      onClick={() => onItemClick(item)}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-3 text-center">
          <div className="relative h-16 w-16 mx-auto bg-muted rounded-lg p-2">
            <Image
              src={item.icon}
              alt={item.name}
              width={48}
              height={48}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="mt-2 text-sm font-medium truncate">{item.name}</div>
          <div className="text-xs text-muted-foreground">T{item.tier}</div>
          <div className="text-xs font-semibold">IP {item.item_power}</div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(renderGridItem)}
      </div>
    );
  }

  if (viewMode === 'list') {
    return <div className="space-y-4">{items.map(renderListItem)}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
      {items.map(renderCompactItem)}
    </div>
  );
}