export interface Item {
  id: number;
  name: string;
  tier: string;
  item_power: number;
  identifier: string;
  icon: string;
  category: {
    id: number;
    name: string;
    type: string;
  };
  subcategory?: {
    id: number;
    name: string;
    type: string;
  };
  popularity?: number;
  price?: number;
  enchantment?: number;
  quality?: string;
  stats?: {
    attackDamage?: number;
    defense?: number;
    health?: number;
    mana?: number;
    attackSpeed?: number;
    movementSpeed?: number;
    castSpeed?: number;
  };
  description?: string;
  requirements?: {
    level?: number;
    tier?: string;
    fame?: number;
  };
  marketData?: {
    averagePrice?: number;
    lowestPrice?: number;
    highestPrice?: number;
    supply?: number;
    demand?: number;
  };
  media?: {
    images?: string[];
    gif?: string;
    video?: string;
  };
}

export interface EnrichedItem extends Item {
  popularity: number;
  price: number;
  enchantment: number;
  quality: string;
  stats: {
    attackDamage?: number;
    defense?: number;
    health: number;
    mana: number;
    attackSpeed?: number;
    movementSpeed?: number;
    castSpeed?: number;
  };
  description: string;
  requirements: {
    level: number;
    tier: string;
    fame: number;
  };
  marketData: {
    averagePrice: number;
    lowestPrice: number;
    highestPrice: number;
    supply: number;
    demand: number;
  };
}

export type ViewMode = 'grid' | 'list' | 'compact';
export type SortField = 'name' | 'tier' | 'item_power' | 'popularity' | 'price';
export type SortOrder = 'asc' | 'desc';
