import fs from 'fs';
import path from 'path';
import { AdminItem, CharacterBuild } from '@/lib/admin/types';
import { DEFAULT_ITEMS, DEFAULT_BUILDS } from '@/lib/admin/adminStore';

const DATA_DIR = path.join(process.cwd(), 'data');
const ITEMS_FILE = path.join(DATA_DIR, 'items.json');
const BUILDS_FILE = path.join(DATA_DIR, 'builds.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ================= ITEMS REPOSITORY =================
export function readItemsFromDb(): AdminItem[] {
  ensureDataDir();
  if (!fs.existsSync(ITEMS_FILE)) {
    fs.writeFileSync(ITEMS_FILE, JSON.stringify(DEFAULT_ITEMS, null, 2), 'utf-8');
    return DEFAULT_ITEMS;
  }
  try {
    const content = fs.readFileSync(ITEMS_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ITEMS;
  } catch (err) {
    console.error('Error reading items database:', err);
    return DEFAULT_ITEMS;
  }
}

export function writeItemsToDb(items: AdminItem[]): void {
  ensureDataDir();
  fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export function upsertItemInDb(item: AdminItem): AdminItem {
  const items = readItemsFromDb();
  const index = items.findIndex((i) => i.id === item.id);
  const now = new Date().toISOString();

  let savedItem: AdminItem;
  if (index >= 0) {
    savedItem = { ...item, updatedAt: now };
    items[index] = savedItem;
  } else {
    savedItem = {
      ...item,
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: item.createdAt || now,
      updatedAt: now,
    };
    items.unshift(savedItem);
  }

  writeItemsToDb(items);
  return savedItem;
}

export function deleteItemFromDb(id: string): boolean {
  const items = readItemsFromDb();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length !== items.length) {
    writeItemsToDb(filtered);
    return true;
  }
  return false;
}

// ================= BUILDS REPOSITORY =================
export function readBuildsFromDb(): CharacterBuild[] {
  ensureDataDir();
  if (!fs.existsSync(BUILDS_FILE)) {
    fs.writeFileSync(BUILDS_FILE, JSON.stringify(DEFAULT_BUILDS, null, 2), 'utf-8');
    return DEFAULT_BUILDS;
  }
  try {
    const content = fs.readFileSync(BUILDS_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_BUILDS;
  } catch (err) {
    console.error('Error reading builds database:', err);
    return DEFAULT_BUILDS;
  }
}

export function writeBuildsToDb(builds: CharacterBuild[]): void {
  ensureDataDir();
  fs.writeFileSync(BUILDS_FILE, JSON.stringify(builds, null, 2), 'utf-8');
}

export function upsertBuildInDb(build: CharacterBuild): CharacterBuild {
  const builds = readBuildsFromDb();
  const index = builds.findIndex((b) => b.id === build.id);
  const now = new Date().toISOString();

  let savedBuild: CharacterBuild;
  if (index >= 0) {
    savedBuild = { ...build, updatedAt: now };
    builds[index] = savedBuild;
  } else {
    savedBuild = {
      ...build,
      id: build.id || `build-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: build.createdAt || now,
      updatedAt: now,
    };
    builds.unshift(savedBuild);
  }

  writeBuildsToDb(builds);
  return savedBuild;
}

export function deleteBuildFromDb(id: string): boolean {
  const builds = readBuildsFromDb();
  const filtered = builds.filter((b) => b.id !== id);
  if (filtered.length !== builds.length) {
    writeBuildsToDb(filtered);
    return true;
  }
  return false;
}
