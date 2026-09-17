"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  AdminItem, 
  ItemCategory, 
  ItemTier 
} from "@/lib/admin/types";
import { 
  getStoredItems, 
  saveStoredItem, 
  deleteStoredItem, 
  fetchItemsFromDb 
} from "@/lib/admin/adminStore";
import { 
  IconPlus, 
  IconSearch, 
  IconEdit, 
  IconTrash, 
  IconCopy, 
  IconSwords, 
  IconCoin, 
  IconArrowLeft,
  IconCheck, 
  IconServer
} from "@tabler/icons-react";
import ItemFormModal from "@/components/admin/ItemFormModal";

const TIERS: (ItemTier | "All")[] = ["All", "T4", "T5", "T6", "T7", "T8"];
const CATEGORIES: (ItemCategory | "All")[] = [
  "All",
  "Weapon",
  "Armor",
  "Off-Hand",
  "Accessory",
  "Consumable",
  "Mount",
];

const TIER_BADGE_COLORS: Record<string, string> = {
  T1: "bg-muted text-muted-foreground border-border",
  T2: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  T3: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  T4: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  T5: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  T6: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  T7: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  T8: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

export default function AdminItemsPage() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState<ItemTier | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | "All">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Initial read from cache
    setItems(getStoredItems());

    // Fetch from internal database
    fetchItemsFromDb().then((dbItems) => {
      setItems(dbItems);
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNew = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: AdminItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDuplicate = (item: AdminItem) => {
    const duplicated: AdminItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: `${item.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveStoredItem(duplicated);
    setItems(getStoredItems());
    showNotification(`Duplicated item: "${duplicated.name}" to internal database`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove item "${name}" from your internal database?`)) {
      deleteStoredItem(id);
      setItems(getStoredItems());
      showNotification(`Item "${name}" removed from internal database.`);
    }
  };

  const handleSave = (savedItem: AdminItem) => {
    saveStoredItem(savedItem);
    setItems(getStoredItems());
    showNotification(
      editingItem
        ? `Successfully updated item "${savedItem.name}" in internal database!`
        : `Successfully saved new item "${savedItem.name}" to internal database!`
    );
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.identifier.toLowerCase().includes(search.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(search.toLowerCase());
    const matchesTier = selectedTier === "All" || item.tier === selectedTier;
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesTier && matchesCategory;
  });

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition mb-1"
          >
            <IconArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <IconSwords className="w-8 h-8 text-primary" />
            Albion Items Manager
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Internal database management with ImgBB artwork hosting, combat stats, and market values.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold flex items-center gap-2 shadow-sm transition shrink-0"
        >
          <IconPlus className="w-4 h-4" /> Add New Item
        </button>
      </div>

      {/* Notification banner */}
      {notification && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
          <IconCheck className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="p-5 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-6 relative">
            <IconSearch className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items by name, tier, or identifier..."
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>
          </div>

          {/* Tier filter */}
          <div className="md:col-span-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-primary font-bold focus:outline-none focus:border-primary"
            >
              {TIERS.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All Tiers (T1-T8)" : `Tier ${t}`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
          <span>Showing <strong className="text-foreground">{filteredItems.length}</strong> items</span>
          <span className="text-[11px] text-primary flex items-center gap-1">
            <IconServer className="w-3.5 h-3.5" />
            Internal Database (<code className="font-mono">data/items.json</code>)
          </span>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const tierBadge = TIER_BADGE_COLORS[item.tier] || "bg-muted text-muted-foreground border-border";

            return (
              <div
                key={item.id}
                className="rounded-3xl bg-card border border-border hover:border-primary/50 p-5 shadow-sm flex flex-col justify-between transition-all group"
              >
                <div className="space-y-4">
                  {/* Item Card Header */}
                  <div className="flex items-start gap-3">
                    {/* Item Icon Thumbnail */}
                    <div className="relative w-16 h-16 rounded-2xl bg-muted/40 border border-border p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.icon || "/assets/placeholder-item.png"}
                        alt={item.name}
                        className="w-full h-full object-contain drop-shadow"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <span className={`absolute top-1 left-1 border px-1 py-0.2 rounded text-[9px] font-black ${tierBadge}`}>
                        {item.tier}{item.enchantment > 0 ? `.${item.enchantment}` : ""}
                      </span>
                    </div>

                    {/* Name & Basic info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-sm font-bold text-foreground truncate">
                          {item.name}
                        </h3>
                        <span className="text-xs font-black text-primary shrink-0">
                          {item.itemPower} IP
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.category} • {item.subcategory || "Standard"}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-foreground border border-border font-medium">
                          {item.quality}
                        </span>
                        {item.twoHanded && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                            2-Handed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description preview */}
                  {item.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 italic">
                      &ldquo;{item.description}&rdquo;
                    </p>
                  )}

                  {/* Key Combat Stats */}
                  <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-muted/30 border border-border text-[11px]">
                    {item.stats.attackDamage ? (
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Damage</span>
                        <span className="font-bold text-foreground">{item.stats.attackDamage}</span>
                      </div>
                    ) : null}
                    {item.stats.armor ? (
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Armor</span>
                        <span className="font-bold text-foreground">{item.stats.armor}</span>
                      </div>
                    ) : null}
                    {item.stats.magicResist ? (
                      <div>
                        <span className="text-muted-foreground block text-[10px]">M.Resist</span>
                        <span className="font-bold text-foreground">{item.stats.magicResist}</span>
                      </div>
                    ) : null}
                    {item.stats.maxHealth ? (
                      <div>
                        <span className="text-muted-foreground block text-[10px]">Health</span>
                        <span className="font-bold text-emerald-400">+{item.stats.maxHealth}</span>
                      </div>
                    ) : null}
                    {item.stats.cooldownReduction ? (
                      <div>
                        <span className="text-muted-foreground block text-[10px]">CDR</span>
                        <span className="font-bold text-foreground">{item.stats.cooldownReduction}%</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Market price estimate */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <IconCoin className="w-3.5 h-3.5 text-primary" />
                      Estimated Price:
                    </span>
                    <span className="font-bold text-foreground">
                      {item.marketData?.estimatedPrice
                        ? `${item.marketData.estimatedPrice.toLocaleString()} Silver`
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Actions footer */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.identifier || "ITEM_ID"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicate(item)}
                      title="Duplicate item"
                      className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition"
                    >
                      <IconCopy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      title="Edit item"
                      className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition"
                    >
                      <IconEdit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      title="Delete item"
                      className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground transition"
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-border rounded-3xl space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <IconSwords className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Items Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No items match your search filter. Clear the search bar or create a brand new item.
          </p>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl transition"
          >
            Add New Item Now
          </button>
        </div>
      )}

      {/* Create / Edit Item Modal */}
      <ItemFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialItem={editingItem}
      />

    </div>
  );
}
