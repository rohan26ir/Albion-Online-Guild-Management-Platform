export type ItemTier = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8';
export type ItemEnchantment = 0 | 1 | 2 | 3 | 4;
export type ItemQuality = 'Normal' | 'Good' | 'Outstanding' | 'Excellent' | 'Masterpiece';

export type ItemCategory = 
  | 'Weapon' 
  | 'Armor' 
  | 'Off-Hand' 
  | 'Accessory' 
  | 'Consumable' 
  | 'Mount' 
  | 'Resource' 
  | 'Other';

export interface ItemStats {
  attackDamage?: number;
  magicDamage?: number;
  armor?: number;
  magicResist?: number;
  maxHealth?: number;
  maxEnergy?: number;
  energyRegen?: number;
  attackSpeed?: number;
  castSpeed?: number;
  cooldownReduction?: number;
  movementSpeed?: number;
  ccDuration?: number;
}

export interface ItemRequirements {
  reaverLevel?: number;
  masteryLevel?: number;
  tierRequired?: string;
  fameRequired?: number;
}

export interface ItemMarketData {
  estimatedPrice: number;
  lowestPrice?: number;
  highestPrice?: number;
  dailyVolume?: number;
}

export interface AdminItem {
  id: string;
  name: string;
  identifier: string; // e.g., T8_MAIN_DAGGER
  tier: ItemTier;
  enchantment: ItemEnchantment;
  quality: ItemQuality;
  category: ItemCategory;
  subcategory: string; // e.g., Dagger, Sword, Cloth Armor, Plate Shoes
  itemPower: number; // Base or total IP
  description: string;
  icon: string; // Direct image URL or ImgBB hosted URL
  twoHanded?: boolean;
  stats: ItemStats;
  requirements?: ItemRequirements;
  marketData: ItemMarketData;
  createdAt: string;
  updatedAt: string;
}

// ================= CHARACTER BUILD TYPES =================
export type BuildRole = 
  | 'Tank'
  | 'Healer'
  | 'Melee DPS'
  | 'Ranged DPS'
  | 'Support / Buffer'
  | 'Ganker'
  | 'Solo Farmer'
  | 'ZvZ Bruiser'
  | 'Gatherer / Escape';

export type BuildLocation = 
  | 'Open World'
  | 'Static Dungeon'
  | 'Avalonian'
  | 'Solo Dungeon Depths'
  | 'Hellgate'
  | 'Corrupted Dungeon'
  | 'Mists'
  | 'Knightfall'
  | 'Arena'
  | 'Other';

export type BuildZone = 
  | 'Blue Zone'
  | 'Yellow Zone'
  | 'Red Zone'
  | 'Black Zone (Outlands)'
  | 'Roads of Avalon'
  | 'Brecilien / Mists';

export type BuildGroupSize = 
  | 'Solo (1)'
  | 'Duo (2)'
  | 'Small Group (3-5)'
  | 'Party (5-10)'
  | 'ZvZ / Large Scale (10-20+)'
  | 'Mass ZvZ (50+)';

export type BuildActivity = 
  | 'PvP'
  | 'PvE'
  | 'Ganking'
  | 'ZvZ'
  | 'Faction Warfare'
  | 'Dungeon Crawling'
  | 'HCE'
  | 'Gathering'
  | 'Escorting / Transport';

export type EquipmentSlotKey = 
  | 'bag'
  | 'head'
  | 'cape'
  | 'mainHand'
  | 'armor'
  | 'offHand'
  | 'potion'
  | 'shoes'
  | 'food'
  | 'mount';

export interface BuildSlotItem {
  item: AdminItem | null;
  tier?: ItemTier;
  enchantment?: ItemEnchantment;
  quantity?: number; // e.g. 10 for potion, 6 for food
  spellQ?: string;
  spellW?: string;
  spellE?: string;
  spellD?: string;
  spellR?: string;
  spellF?: string;
  passive?: string;
  trigger?: string;
}

export interface BuildEquipment {
  bag: BuildSlotItem;
  head: BuildSlotItem;
  cape: BuildSlotItem;
  mainHand: BuildSlotItem;
  armor: BuildSlotItem;
  offHand: BuildSlotItem;
  potion: BuildSlotItem;
  shoes: BuildSlotItem;
  food: BuildSlotItem;
  mount: BuildSlotItem;
}

export interface CharacterBuild {
  id: string;
  title: string;
  author: string;
  role: BuildRole;
  location?: BuildLocation;
  zone?: BuildZone;
  groupSize?: BuildGroupSize;
  activity?: BuildActivity;
  description: string;
  comboGuide?: string;
  pros: string[];
  cons: string[];
  equipment: BuildEquipment;
  inventoryItems?: (AdminItem | null)[];
  totalItemPower: number;
  estimatedCost: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  likes?: number;
  isFeatured?: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
