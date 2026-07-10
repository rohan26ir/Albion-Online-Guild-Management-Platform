'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  IoClose, IoShare, IoBookmark, IoInformationCircle,
  IoStatsChart, IoDiamond, IoStar, IoFlash,
  IoLink, IoPeople, IoPricetag, IoTime,
  IoCheckmarkCircle, IoAlertCircle, IoArrowUp, IoArrowDown
} from 'react-icons/io5';
import type { EnrichedItem } from '@/lib/types';

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

const qualityColors: Record<string, string> = {
  'Normal': 'border-gray-400 text-gray-400',
  'Good': 'border-green-400 text-green-400',
  'Outstanding': 'border-blue-400 text-blue-400',
  'Excellent': 'border-purple-400 text-purple-400',
  'Masterpiece': 'border-yellow-400 text-yellow-400',
};

const getTierBadgeColor = (tier: string): string => {
  return tierColors[tier] || 'bg-gray-400';
};

const getQualityColor = (quality?: string): string => {
  return quality ? qualityColors[quality]?.split(' ')[1] || 'text-gray-400' : 'text-gray-400';
};

const getQualityBorder = (quality?: string): string => {
  return quality ? qualityColors[quality]?.split(' ')[0] || 'border-gray-400' : 'border-gray-400';
};

interface ItemDetailDrawerProps {
  item: EnrichedItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemDetailDrawer({ item, isOpen, onClose }: ItemDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'stats' | 'market'>('details');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!item) return null;

  const shareItem = async () => {
    try {
      await navigator.share({
        title: `Albion Item: ${item.name}`,
        text: `Check out ${item.name} - Tier ${item.tier} item with ${item.item_power} IP`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Share cancelled or not supported');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-border shadow-2xl z-50 overflow-hidden"
          >
            <ScrollArea className="h-full">
              {/* Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur z-10 border-b border-border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-12 w-12 shrink-0">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold truncate">{item.name}</h2>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>IP {item.item_power}</span>
                        <span>•</span>
                        <span>Tier {item.tier}</span>
                        {item.quality && (
                          <>
                            <span>•</span>
                            <span className={getQualityColor(item.quality)}>{item.quality}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={shareItem} className="h-9 w-9">
                      <IoShare className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)} className="h-9 w-9">
                      <IoBookmark className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9">
                      <IoClose className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="px-4 pb-2">
                  <div className="flex gap-2">
                    {['details', 'stats', 'market'].map((tab) => (
                      <Button
                        key={tab}
                        variant={activeTab === tab ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab(tab as any)}
                        className="flex-1"
                      >
                        {tab === 'details' && <IoInformationCircle className="h-4 w-4 mr-2" />}
                        {tab === 'stats' && <IoStatsChart className="h-4 w-4 mr-2" />}
                        {tab === 'market' && <IoDiamond className="h-4 w-4 mr-2" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {activeTab === 'details' && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="relative h-64 bg-gradient-to-br from-muted/50 to-background rounded-xl flex items-center justify-center p-8 border border-border">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image src={item.icon} alt={item.name} width={200} height={200} className="object-contain drop-shadow-2xl" unoptimized />
                      </div>
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className={`${getTierBadgeColor(item.tier)} text-white border-0`}>
                          <IoStar className="h-3 w-3 mr-1" />
                          Tier {item.tier} - {tierLabels[item.tier] || 'Unknown'}
                        </Badge>
                        {item.quality && (
                          <Badge variant="outline" className={getQualityBorder(item.quality)}>
                            {item.quality}
                          </Badge>
                        )}
                      </div>
                      {item.enchantment > 0 && (
                        <div className="absolute top-4 right-4 flex gap-0.5">
                          {Array.from({ length: item.enchantment }).map((_, i) => (
                            <IoFlash key={i} className="h-6 w-6 text-blue-400 animate-pulse" />
                          ))}
                        </div>
                      )}
                    </div>

                    {item.media && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Media</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {item.media.images?.map((img, i) => (
                            <div key={i} className="relative h-24 bg-muted rounded-lg overflow-hidden">
                              <Image src={img} alt={`${item.name} preview ${i + 1}`} fill className="object-cover" unoptimized />
                            </div>
                          ))}
                          {item.media.gif && (
                            <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
                              <img src={item.media.gif} alt={`${item.name} animation`} className="w-full h-full object-cover" />
                              <Badge className="absolute bottom-1 right-1 bg-black/50 text-white text-[8px]">GIF</Badge>
                            </div>
                          )}
                          {item.media.video && (
                            <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
                              <video src={item.media.video} className="w-full h-full object-cover" muted loop playsInline />
                              <Badge className="absolute bottom-1 right-1 bg-black/50 text-white text-[8px]">Video</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {item.description && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
                      </div>
                    )}

                    {item.requirements && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Requirements</h3>
                        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                          {item.requirements.level && (
                            <div>
                              <div className="text-xs text-muted-foreground">Level</div>
                              <div className="font-semibold">{item.requirements.level}</div>
                            </div>
                          )}
                          {item.requirements.tier && (
                            <div>
                              <div className="text-xs text-muted-foreground">Minimum Tier</div>
                              <div className="font-semibold">{item.requirements.tier}</div>
                            </div>
                          )}
                          {item.requirements.fame && (
                            <div>
                              <div className="text-xs text-muted-foreground">Fame Required</div>
                              <div className="font-semibold">{item.requirements.fame.toLocaleString()}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="secondary" className="gap-1">
                        <IoLink className="h-3 w-3" />
                        {item.identifier}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <IoPeople className="h-3 w-3" />
                        {item.popularity}% Popularity
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <IoPricetag className="h-3 w-3" />
                        {item.price.toLocaleString()} Silver
                      </Badge>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'stats' && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{item.item_power}</div>
                        <div className="text-xs text-muted-foreground">Item Power</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold">{item.tier}</div>
                        <div className="text-xs text-muted-foreground">Tier</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg text-center">
                        <div className="text-2xl font-bold">{item.popularity}%</div>
                        <div className="text-xs text-muted-foreground">Popularity</div>
                      </div>
                    </div>

                    {item.stats && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Detailed Statistics</h3>
                        {item.stats.attackDamage && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Attack Damage</span>
                              <span className="font-medium">{item.stats.attackDamage}</span>
                            </div>
                            <Progress value={(item.stats.attackDamage / 50) * 100} className="h-2" />
                          </div>
                        )}
                        {item.stats.defense && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Defense</span>
                              <span className="font-medium">{item.stats.defense}</span>
                            </div>
                            <Progress value={(item.stats.defense / 30) * 100} className="h-2" />
                          </div>
                        )}
                        {item.stats.health && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Health</span>
                              <span className="font-medium">{item.stats.health}</span>
                            </div>
                            <Progress value={(item.stats.health / 100) * 100} className="h-2" />
                          </div>
                        )}
                        {item.stats.mana && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Mana</span>
                              <span className="font-medium">{item.stats.mana}</span>
                            </div>
                            <Progress value={(item.stats.mana / 50) * 100} className="h-2" />
                          </div>
                        )}
                        {item.stats.attackSpeed && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Attack Speed</span>
                              <span className="font-medium">{item.stats.attackSpeed}</span>
                            </div>
                            <Progress value={item.stats.attackSpeed} className="h-2" />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">Category</div>
                          <div className="font-medium">{item.category.name}</div>
                        </div>
                        {item.subcategory && (
                          <div>
                            <div className="text-xs text-muted-foreground">Subcategory</div>
                            <div className="font-medium">{item.subcategory.name}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'market' && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-xs text-muted-foreground">Average Price</div>
                        <div className="text-xl font-bold text-primary">{item.marketData.averagePrice.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Silver</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-xs text-muted-foreground">Popularity</div>
                        <div className="text-xl font-bold">{item.popularity}%</div>
                        <Progress value={item.popularity} className="h-1.5 mt-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Price Range</h3>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-muted/30 rounded-lg text-center">
                          <div className="text-xs text-muted-foreground">Lowest</div>
                          <div className="text-sm font-semibold text-green-400">{item.marketData.lowestPrice.toLocaleString()}</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg text-center">
                          <div className="text-xs text-muted-foreground">Average</div>
                          <div className="text-sm font-semibold text-blue-400">{item.marketData.averagePrice.toLocaleString()}</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg text-center">
                          <div className="text-xs text-muted-foreground">Highest</div>
                          <div className="text-sm font-semibold text-red-400">{item.marketData.highestPrice.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Supply & Demand</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Supply</span>
                            <IoArrowUp className="h-4 w-4 text-green-400" />
                          </div>
                          <div className="text-2xl font-bold">{item.marketData.supply}</div>
                          <Progress value={item.marketData.supply / 100 * 100} className="h-1.5 mt-1" />
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Demand</span>
                            <IoArrowDown className="h-4 w-4 text-red-400" />
                          </div>
                          <div className="text-2xl font-bold">{item.marketData.demand}</div>
                          <Progress value={item.marketData.demand / 100 * 100} className="h-1.5 mt-1" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline" className="gap-1 border-green-400/50 text-green-400">
                        <IoCheckmarkCircle className="h-3 w-3" />
                        Market Active
                      </Badge>
                      <Badge variant="outline" className="gap-1 border-blue-400/50 text-blue-400">
                        <IoTime className="h-3 w-3" />
                        Updated Recently
                      </Badge>
                      <Badge variant="outline" className="gap-1 border-yellow-400/50 text-yellow-400">
                        <IoAlertCircle className="h-3 w-3" />
                        {item.popularity > 50 ? 'High Demand' : 'Medium Demand'}
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}