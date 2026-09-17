import { AdminItem, CharacterBuild } from './types';

const ITEMS_STORAGE_KEY = 'albion_admin_items_v1';
const BUILDS_STORAGE_KEY = 'albion_admin_builds_v1';

// ================= SEED ITEMS =================
export const DEFAULT_ITEMS: AdminItem[] = [
  {
    id: 'item-bloodletter-t8',
    name: 'Bloodletter',
    identifier: 'T8_MAIN_DAGGER',
    tier: 'T8',
    enchantment: 1,
    quality: 'Excellent',
    category: 'Weapon',
    subcategory: 'Dagger',
    itemPower: 1420,
    description: 'A lethal one-handed assassination dagger with Execute, dealing colossal damage against foes below 40% health.',
    icon: 'https://render.albiononline.com/v1/item/T8_MAIN_DAGGER@1.png',
    twoHanded: false,
    stats: {
      attackDamage: 114,
      attackSpeed: 1.25,
      cooldownReduction: 0,
      movementSpeed: 0,
      maxEnergy: 180,
    },
    requirements: {
      reaverLevel: 8,
      masteryLevel: 70,
      tierRequired: 'T8',
    },
    marketData: {
      estimatedPrice: 685000,
      lowestPrice: 650000,
      highestPrice: 720000,
      dailyVolume: 42,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-mistcaller-t8',
    name: 'Mistcaller',
    identifier: 'T8_OFF_HORN_KEEPER',
    tier: 'T8',
    enchantment: 0,
    quality: 'Masterpiece',
    category: 'Off-Hand',
    subcategory: 'Horn',
    itemPower: 1350,
    description: 'An ancient keeper horn granting immense cooldown reduction for rapid spell rotation and mobility.',
    icon: 'https://render.albiononline.com/v1/item/T8_OFF_HORN_KEEPER.png',
    twoHanded: false,
    stats: {
      cooldownReduction: 18.5,
      maxEnergy: 95,
      energyRegen: 2.2,
    },
    requirements: {
      reaverLevel: 8,
      masteryLevel: 50,
      tierRequired: 'T8',
    },
    marketData: {
      estimatedPrice: 320000,
      lowestPrice: 295000,
      highestPrice: 345000,
      dailyVolume: 28,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-mage-cowl-t8',
    name: 'Mage Cowl',
    identifier: 'T8_HEAD_CLOTH_SET1',
    tier: 'T8',
    enchantment: 1,
    quality: 'Outstanding',
    category: 'Armor',
    subcategory: 'Cloth Cowl',
    itemPower: 1400,
    description: 'Provides Firebreath to ignite opponents for heavy continuous damage or Force Field for disengagement.',
    icon: 'https://render.albiononline.com/v1/item/T8_HEAD_CLOTH_SET1@1.png',
    stats: {
      magicResist: 78,
      armor: 42,
      maxHealth: 160,
      maxEnergy: 140,
    },
    requirements: {
      reaverLevel: 8,
      masteryLevel: 60,
    },
    marketData: {
      estimatedPrice: 190000,
      lowestPrice: 175000,
      highestPrice: 210000,
      dailyVolume: 65,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-assassin-jacket-t8',
    name: 'Assassin Jacket',
    identifier: 'T8_ARMOR_LEATHER_SET3',
    tier: 'T8',
    enchantment: 1,
    quality: 'Outstanding',
    category: 'Armor',
    subcategory: 'Leather Jacket',
    itemPower: 1410,
    description: 'Features Ambush for stealth, ambush damage amplification, and evading enemy hunters.',
    icon: 'https://render.albiononline.com/v1/item/T8_ARMOR_LEATHER_SET3@1.png',
    stats: {
      armor: 110,
      magicResist: 110,
      maxHealth: 480,
      maxEnergy: 110,
      attackDamage: 25,
    },
    requirements: {
      reaverLevel: 8,
      masteryLevel: 80,
    },
    marketData: {
      estimatedPrice: 420000,
      lowestPrice: 395000,
      highestPrice: 450000,
      dailyVolume: 80,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-soldier-boots-t8',
    name: 'Soldier Boots',
    identifier: 'T8_SHOES_PLATE_SET1',
    tier: 'T8',
    enchantment: 0,
    quality: 'Good',
    category: 'Armor',
    subcategory: 'Plate Boots',
    itemPower: 1300,
    description: 'Features Wanderlust for extreme progressive movement speed across long open-world chases.',
    icon: 'https://render.albiononline.com/v1/item/T8_SHOES_PLATE_SET1.png',
    stats: {
      armor: 72,
      magicResist: 45,
      maxHealth: 210,
      movementSpeed: 10,
    },
    requirements: {
      reaverLevel: 8,
      masteryLevel: 40,
    },
    marketData: {
      estimatedPrice: 160000,
      lowestPrice: 148000,
      highestPrice: 175000,
      dailyVolume: 110,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-thetford-cape-t8',
    name: 'Thetford Cape',
    identifier: 'T8_CAPEITEM_FW_THETFORD',
    tier: 'T8',
    enchantment: 0,
    quality: 'Outstanding',
    category: 'Accessory',
    subcategory: 'Faction Cape',
    itemPower: 1300,
    description: 'Unleashes a devastating chain lightning strike upon auto-attacking enemies, hitting up to 4 targets.',
    icon: 'https://render.albiononline.com/v1/item/T8_CAPEITEM_FW_THETFORD.png',
    stats: {
      magicDamage: 140,
      maxEnergy: 80,
    },
    marketData: {
      estimatedPrice: 380000,
      lowestPrice: 350000,
      highestPrice: 410000,
      dailyVolume: 50,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-carving-sword-t8',
    name: 'Carving Sword',
    identifier: 'T8_2H_CLEAVER_HELL',
    tier: 'T8',
    enchantment: 2,
    quality: 'Masterpiece',
    category: 'Weapon',
    subcategory: 'Sword',
    itemPower: 1540,
    description: 'Two-handed artifact sword with Fearless Strike, dashing forward and shredding enemy armor by up to 50%.',
    icon: 'https://render.albiononline.com/v1/item/T8_2H_CLEAVER_HELL@2.png',
    twoHanded: true,
    stats: {
      attackDamage: 148,
      attackSpeed: 1.1,
      maxHealth: 150,
      maxEnergy: 210,
    },
    requirements: {
      reaverLevel: 8,
      masteryLevel: 100,
    },
    marketData: {
      estimatedPrice: 1250000,
      lowestPrice: 1190000,
      highestPrice: 1350000,
      dailyVolume: 35,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-swiftclaw-t5',
    name: 'Swiftclaw',
    identifier: 'T5_MOUNT_COUGAR_KEEPER',
    tier: 'T5',
    enchantment: 0,
    quality: 'Normal',
    category: 'Mount',
    subcategory: 'Fast Mount',
    itemPower: 800,
    description: 'High-speed predator mount suited for agile navigation, scouting, and open-world hunting.',
    icon: 'https://render.albiononline.com/v1/item/T5_MOUNT_COUGAR_KEEPER.png',
    stats: {
      movementSpeed: 80,
      maxHealth: 900,
    },
    marketData: {
      estimatedPrice: 145000,
      lowestPrice: 139000,
      highestPrice: 155000,
      dailyVolume: 220,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-beef-stew-t7',
    name: 'Deadwater Eel Stew',
    identifier: 'T7_MEAL_ROAST_FISH',
    tier: 'T7',
    enchantment: 1,
    quality: 'Normal',
    category: 'Consumable',
    subcategory: 'Food',
    itemPower: 1100,
    description: 'Gourmet meal enhancing physical and magical damage output while reducing cooldown times.',
    icon: 'https://render.albiononline.com/v1/item/T7_MEAL_ROAST_FISH@1.png',
    stats: {
      attackDamage: 13.5,
      cooldownReduction: 4.8,
    },
    marketData: {
      estimatedPrice: 42000,
      lowestPrice: 38000,
      highestPrice: 46000,
      dailyVolume: 400,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-healing-potion-t7',
    name: 'Major Healing Potion',
    identifier: 'T7_POTION_HEAL',
    tier: 'T7',
    enchantment: 1,
    quality: 'Normal',
    category: 'Consumable',
    subcategory: 'Potion',
    itemPower: 1050,
    description: 'Restores a significant portion of maximum health over 9 seconds in the heat of combat.',
    icon: 'https://render.albiononline.com/v1/item/T7_POTION_HEAL@1.png',
    stats: {
      maxHealth: 350,
    },
    marketData: {
      estimatedPrice: 18000,
      lowestPrice: 16500,
      highestPrice: 20500,
      dailyVolume: 850,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ================= SEED BUILDS =================
export const DEFAULT_BUILDS: CharacterBuild[] = [
  {
    id: 'build-bloodletter-gank',
    title: 'Bloodletter Open World Gank & Escape',
    author: 'Commander Vane',
    role: 'Ganker',
    location: 'Open World',
    zone: 'Black Zone (Outlands)',
    groupSize: 'Solo (1)',
    activity: 'Ganking',
    description: 'The premier open-world roaming and solo ganking setup. Combines unmatched mobility with Execute burst.',
    comboGuide: '1. Stalk target with Wanderlust and Mount dismount.\n2. Engage with Dash (W), pop Assassin Ambush for damage stack.\n3. Land Shadow Edge / Q bleed, followed by Execute (E) when target drops below 40% health.',
    pros: [
      'Near impossible to catch or kill when played well',
      'Huge kill pressure below 40% health threshold',
      'Dual dash abilities provide supreme horizontal movement',
    ],
    cons: [
      'Weaker sustained DPS against tanks and high-sustain bruisers',
      'Requires precise spacing and cooldown management',
    ],
    equipment: {
      mainHand: {
        item: DEFAULT_ITEMS[0], // Bloodletter
        spellQ: 'Deadly Swipe',
        spellW: 'Shadow Edge',
        spellE: 'Execute',
        passive: 'Deep Cuts',
      },
      offHand: {
        item: DEFAULT_ITEMS[1], // Mistcaller
        passive: 'Cooldown Reduction',
      },
      head: {
        item: DEFAULT_ITEMS[2], // Mage Cowl
        spellD: 'Firebreath',
        passive: 'Aggressive Caster',
      },
      armor: {
        item: DEFAULT_ITEMS[3], // Assassin Jacket
        spellR: 'Ambush',
        passive: 'Quick Thinker',
      },
      shoes: {
        item: DEFAULT_ITEMS[4], // Soldier Boots
        spellF: 'Wanderlust',
        passive: 'Toughness',
      },
      cape: {
        item: DEFAULT_ITEMS[5], // Thetford Cape
      },
      bag: {
        item: {
          id: 'item-bag-t8',
          name: 'Adept Bag',
          identifier: 'T8_BAG',
          tier: 'T8',
          enchantment: 0,
          quality: 'Outstanding',
          category: 'Accessory',
          subcategory: 'Bag',
          itemPower: 1300,
          description: 'High capacity adventurer bag.',
          icon: 'https://render.albiononline.com/v1/item/T8_BAG.png',
          stats: { movementSpeed: 0 },
          marketData: { estimatedPrice: 120000 },
          createdAt: '',
          updatedAt: '',
        },
      },
      mount: {
        item: DEFAULT_ITEMS[7], // Swiftclaw
      },
      food: {
        item: DEFAULT_ITEMS[8], // Eel Stew
      },
      potion: {
        item: DEFAULT_ITEMS[9], // Healing Potion
      },
    },
    totalItemPower: 1385,
    estimatedCost: 2280000,
    difficulty: 'Intermediate',
    isFeatured: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'build-carving-sword-zvz',
    title: 'Carving Sword Armor-Pierce Specialist',
    author: 'Ironclad Guild',
    role: 'ZvZ Bruiser',
    location: 'Open World',
    zone: 'Black Zone (Outlands)',
    groupSize: 'ZvZ / Large Scale (10-20+)',
    activity: 'ZvZ',
    description: 'Indispensable frontline bruiser and pierce setup for large scale castle sieges and ZvZ clap engagements.',
    comboGuide: '1. Stack 3 Heroic Charges via Heroic Strike (Q).\n2. Coordinate with shotcaller on clump callout.\n3. Cast Fearless Strike (E) through the frontline clump to instantly apply -50% armor shred.\n4. Follow up with Royal Hood or Hellion Jacket for massive sustain.',
    pros: [
      'Essential armor debuff enables team-wiping claps',
      'Solid personal survivability and immunity frames during E',
      'Extremely high demand in all competitive ZvZ guilds',
    ],
    cons: [
      'Expensive artifact weapons (especially 8.3/8.4)',
      'Punished heavily if misplaced without defensive support',
    ],
    equipment: {
      mainHand: {
        item: DEFAULT_ITEMS[6], // Carving Sword
        spellQ: 'Heroic Strike',
        spellW: 'Iron Will',
        spellE: 'Fearless Strike',
        passive: 'Heroic Fighting',
      },
      offHand: {
        item: null, // 2-Handed
      },
      head: {
        item: DEFAULT_ITEMS[2],
        spellD: 'Energy Regain',
        passive: 'Balanced Mind',
      },
      armor: {
        item: DEFAULT_ITEMS[3],
        spellR: 'Ambush',
        passive: 'Quick Thinker',
      },
      shoes: {
        item: DEFAULT_ITEMS[4],
        spellF: 'Wanderlust',
        passive: 'Toughness',
      },
      cape: {
        item: DEFAULT_ITEMS[5],
      },
      bag: {
        item: null,
      },
      mount: {
        item: DEFAULT_ITEMS[7],
      },
      food: {
        item: DEFAULT_ITEMS[8],
      },
      potion: {
        item: DEFAULT_ITEMS[9],
      },
    },
    totalItemPower: 1460,
    estimatedCost: 2850000,
    difficulty: 'Expert',
    isFeatured: true,
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ================= STORAGE HELPER =================
function isClient(): boolean {
  return typeof window !== 'undefined';
}

// Items CRUD
export function getStoredItems(): AdminItem[] {
  if (!isClient()) return DEFAULT_ITEMS;
  try {
    const raw = localStorage.getItem(ITEMS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
      return DEFAULT_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ITEMS;
  } catch {
    return DEFAULT_ITEMS;
  }
}

export async function fetchItemsFromDb(): Promise<AdminItem[]> {
  try {
    const res = await fetch('/api/items');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        if (isClient()) {
          localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(data.data));
        }
        return data.data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch from internal items API, falling back to local cache:', err);
  }
  return getStoredItems();
}

export function saveStoredItem(item: AdminItem): AdminItem {
  if (!isClient()) return item;
  const items = getStoredItems();
  const existingIndex = items.findIndex((i) => i.id === item.id);
  const now = new Date().toISOString();

  let updatedList: AdminItem[];
  let finalItem: AdminItem;

  if (existingIndex >= 0) {
    finalItem = { ...item, updatedAt: now };
    items[existingIndex] = finalItem;
    updatedList = [...items];
  } else {
    finalItem = {
      ...item,
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    updatedList = [finalItem, ...items];
  }

  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedList));

  // Sync to internal database asynchronously
  fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalItem),
  }).catch((e) => console.error('Internal DB items sync error:', e));

  return finalItem;
}

export function deleteStoredItem(id: string): boolean {
  if (!isClient()) return false;
  const items = getStoredItems();
  const filtered = items.filter((i) => i.id !== id);
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(filtered));

  // Sync delete to internal database
  fetch(`/api/items?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  }).catch((e) => console.error('Internal DB delete item error:', e));

  return true;
}

export function resetItemsToDefault(): AdminItem[] {
  if (isClient()) {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    }).catch((e) => console.error('Reset internal items DB error:', e));
  }
  return DEFAULT_ITEMS;
}

// Builds CRUD
export function getStoredBuilds(): CharacterBuild[] {
  if (!isClient()) return DEFAULT_BUILDS;
  try {
    const raw = localStorage.getItem(BUILDS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BUILDS_STORAGE_KEY, JSON.stringify(DEFAULT_BUILDS));
      return DEFAULT_BUILDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_BUILDS;
  } catch {
    return DEFAULT_BUILDS;
  }
}

export async function fetchBuildsFromDb(): Promise<CharacterBuild[]> {
  try {
    const res = await fetch('/api/builds');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        if (isClient()) {
          localStorage.setItem(BUILDS_STORAGE_KEY, JSON.stringify(data.data));
        }
        return data.data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch from internal builds API, falling back to local cache:', err);
  }
  return getStoredBuilds();
}

export function saveStoredBuild(build: CharacterBuild): CharacterBuild {
  if (!isClient()) return build;
  const builds = getStoredBuilds();
  const existingIndex = builds.findIndex((b) => b.id === build.id);
  const now = new Date().toISOString();

  let updatedList: CharacterBuild[];
  let finalBuild: CharacterBuild;

  if (existingIndex >= 0) {
    finalBuild = { ...build, updatedAt: now };
    builds[existingIndex] = finalBuild;
    updatedList = [...builds];
  } else {
    finalBuild = {
      ...build,
      id: build.id || `build-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
    };
    updatedList = [finalBuild, ...builds];
  }

  localStorage.setItem(BUILDS_STORAGE_KEY, JSON.stringify(updatedList));

  // Sync to internal database asynchronously
  fetch('/api/builds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalBuild),
  }).catch((e) => console.error('Internal DB builds sync error:', e));

  return finalBuild;
}

export function deleteStoredBuild(id: string): boolean {
  if (!isClient()) return false;
  const builds = getStoredBuilds();
  const filtered = builds.filter((b) => b.id !== id);
  localStorage.setItem(BUILDS_STORAGE_KEY, JSON.stringify(filtered));

  // Sync delete to internal database
  fetch(`/api/builds?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  }).catch((e) => console.error('Internal DB delete build error:', e));

  return true;
}

export function resetBuildsToDefault(): CharacterBuild[] {
  if (isClient()) {
    localStorage.setItem(BUILDS_STORAGE_KEY, JSON.stringify(DEFAULT_BUILDS));
    fetch('/api/builds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    }).catch((e) => console.error('Reset internal builds DB error:', e));
  }
  return DEFAULT_BUILDS;
}
