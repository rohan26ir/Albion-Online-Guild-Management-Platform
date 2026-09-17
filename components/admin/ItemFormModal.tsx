"use client";

import React, { useState, useEffect } from "react";
import { 
  AdminItem, 
  ItemCategory, 
  ItemTier, 
  ItemEnchantment, 
  ItemQuality 
} from "@/lib/admin/types";
import { 
  IconX, 
  IconDeviceFloppy, 
  IconSparkles, 
  IconShield, 
  IconSwords, 
  IconCoin
} from "@tabler/icons-react";
import ImgBBUploader from "./ImgBBUploader";

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: AdminItem) => void;
  initialItem?: AdminItem | null;
}

const CATEGORIES: ItemCategory[] = [
  "Weapon",
  "Armor",
  "Off-Hand",
  "Accessory",
  "Consumable",
  "Mount",
  "Resource",
  "Other",
];

const TIERS: ItemTier[] = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"];
const ENCHANTMENTS: ItemEnchantment[] = [0, 1, 2, 3, 4];
const QUALITIES: ItemQuality[] = ["Normal", "Good", "Outstanding", "Excellent", "Masterpiece"];

const BLANK_ITEM: Omit<AdminItem, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  identifier: "",
  tier: "T8",
  enchantment: 0,
  quality: "Outstanding",
  category: "Weapon",
  subcategory: "Dagger",
  itemPower: 1300,
  description: "",
  icon: "",
  twoHanded: false,
  stats: {
    attackDamage: 0,
    magicDamage: 0,
    armor: 0,
    magicResist: 0,
    maxHealth: 0,
    maxEnergy: 0,
    energyRegen: 0,
    attackSpeed: 0,
    movementSpeed: 0,
    cooldownReduction: 0,
  },
  requirements: {
    reaverLevel: 8,
    masteryLevel: 1,
  },
  marketData: {
    estimatedPrice: 100000,
    lowestPrice: 90000,
    highestPrice: 120000,
    dailyVolume: 50,
  },
};

export default function ItemFormModal({
  isOpen,
  onClose,
  onSave,
  initialItem,
}: ItemFormModalProps) {
  const [formData, setFormData] = useState<Omit<AdminItem, "id" | "createdAt" | "updatedAt">>(BLANK_ITEM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialItem) {
      setFormData({
        name: initialItem.name || "",
        identifier: initialItem.identifier || "",
        tier: initialItem.tier || "T8",
        enchantment: initialItem.enchantment ?? 0,
        quality: initialItem.quality || "Outstanding",
        category: initialItem.category || "Weapon",
        subcategory: initialItem.subcategory || "",
        itemPower: initialItem.itemPower || 1300,
        description: initialItem.description || "",
        icon: initialItem.icon || "",
        twoHanded: !!initialItem.twoHanded,
        stats: { ...initialItem.stats },
        requirements: { ...initialItem.requirements },
        marketData: { ...initialItem.marketData },
      });
    } else {
      setFormData(BLANK_ITEM);
    }
    setErrors({});
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Item name is required.";
    if (!formData.category) errs.category = "Category is required.";
    if (!formData.tier) errs.tier = "Tier is required.";
    if (formData.itemPower <= 0) errs.itemPower = "Item Power must be greater than 0.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const itemToSave: AdminItem = {
      id: initialItem?.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...formData,
      createdAt: initialItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(itemToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-card via-background to-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <IconSwords className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {initialItem ? "Update Albion Item" : "Create New Albion Item"}
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure item properties, stats, marketplace data, and ImgBB image.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top Section: Basic Info & ImgBB Upload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Item Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Bloodletter, Demon Cape, Scholar Robe"
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                    className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g., Dagger, Sword, Cloth"
                    className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Tier *
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as ItemTier })}
                    className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-primary font-bold focus:outline-none focus:border-primary"
                  >
                    {TIERS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Enchantment
                  </label>
                  <select
                    value={formData.enchantment}
                    onChange={(e) => setFormData({ ...formData, enchantment: Number(e.target.value) as ItemEnchantment })}
                    className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-emerald-400 font-bold focus:outline-none focus:border-primary"
                  >
                    {ENCHANTMENTS.map((en) => (
                      <option key={en} value={en}>.{en}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Quality
                  </label>
                  <select
                    value={formData.quality}
                    onChange={(e) => setFormData({ ...formData, quality: e.target.value as ItemQuality })}
                    className="w-full mt-1 bg-background border border-border rounded-xl px-2.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                  >
                    {QUALITIES.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Item Power (IP) *
                  </label>
                  <input
                    type="number"
                    value={formData.itemPower || ""}
                    onChange={(e) => setFormData({ ...formData, itemPower: Number(e.target.value) })}
                    placeholder="1300"
                    className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-primary font-bold focus:outline-none focus:border-primary"
                  />
                  {errors.itemPower && <p className="text-xs text-destructive mt-1">{errors.itemPower}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Unique Identifier
                  </label>
                  <input
                    type="text"
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    placeholder="e.g., T8_MAIN_DAGGER"
                    className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground font-mono text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {formData.category === "Weapon" && (
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={formData.twoHanded}
                    onChange={(e) => setFormData({ ...formData, twoHanded: e.target.checked })}
                    className="w-4 h-4 rounded text-primary bg-background border-border focus:ring-0"
                  />
                  <span className="text-xs text-foreground font-medium">Two-Handed Weapon (Disables Off-Hand Slot)</span>
                </label>
              )}
            </div>

            {/* Right: ImgBB Upload & In-Game Card Preview */}
            <div className="space-y-4">
              <ImgBBUploader
                value={formData.icon}
                onChange={(url) => setFormData({ ...formData, icon: url })}
                label="Item Icon Artwork (ImgBB)"
                helperText="Upload via ImgBB for direct hosting or paste an existing Albion render URL."
              />

              {/* In-Game Albion Card Preview */}
              <div className="p-4 rounded-2xl bg-muted/20 border border-border shadow-sm">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1">
                    <IconSparkles className="w-3 h-3" /> Live Albion In-Game Card
                  </span>
                  <span className="text-[11px] font-bold text-primary">
                    {formData.itemPower} IP
                  </span>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="relative w-16 h-16 rounded-xl bg-card border-2 border-primary/60 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.icon || "/assets/placeholder-item.png"}
                      alt="Preview"
                      className="w-full h-full object-contain drop-shadow"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute top-1 left-1 bg-background/90 border border-border px-1 py-0.2 rounded text-[9px] font-black text-primary">
                      {formData.tier}{formData.enchantment > 0 ? `.${formData.enchantment}` : ""}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {formData.name || "Item Name"}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formData.tier} • {formData.category} ({formData.subcategory || "General"})
                    </p>
                    <p className="text-[11px] text-primary/90 font-medium">
                      Quality: {formData.quality}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3 italic line-clamp-2">
                  &ldquo;{formData.description || "No description specified yet."}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Description & Lore */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Description & Ability Lore
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., A lethal one-handed assassination dagger with Execute, dealing massive damage against low health targets."
              className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Combat Stats Section */}
          <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <IconShield className="w-4 h-4" /> Item Combat Stats
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-muted-foreground">Attack Damage</label>
                <input
                  type="number"
                  value={formData.stats.attackDamage || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, attackDamage: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Armor / Defense</label>
                <input
                  type="number"
                  value={formData.stats.armor || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, armor: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Magic Resist</label>
                <input
                  type="number"
                  value={formData.stats.magicResist || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, magicResist: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Max Health</label>
                <input
                  type="number"
                  value={formData.stats.maxHealth || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, maxHealth: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Max Energy</label>
                <input
                  type="number"
                  value={formData.stats.maxEnergy || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, maxEnergy: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Attack Speed (hits/s)</label>
                <input
                  type="number"
                  step="0.05"
                  value={formData.stats.attackSpeed || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, attackSpeed: Number(e.target.value) }
                  })}
                  placeholder="1.0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Cooldown Red. (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.stats.cooldownReduction || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, cooldownReduction: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Movement Speed (%)</label>
                <input
                  type="number"
                  value={formData.stats.movementSpeed || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, movementSpeed: Number(e.target.value) }
                  })}
                  placeholder="0"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Market Data */}
          <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <IconCoin className="w-4 h-4" /> Market Data (Silver)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-muted-foreground">Estimated Market Price (Silver)</label>
                <input
                  type="number"
                  value={formData.marketData.estimatedPrice || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    marketData: { ...formData.marketData, estimatedPrice: Number(e.target.value) }
                  })}
                  placeholder="500000"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-xs text-primary font-bold"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Lowest 24h Price</label>
                <input
                  type="number"
                  value={formData.marketData.lowestPrice || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    marketData: { ...formData.marketData, lowestPrice: Number(e.target.value) }
                  })}
                  placeholder="470000"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">Highest 24h Price</label>
                <input
                  type="number"
                  value={formData.marketData.highestPrice || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    marketData: { ...formData.marketData, highestPrice: Number(e.target.value) }
                  })}
                  placeholder="530000"
                  className="w-full mt-1 bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold flex items-center gap-2 shadow-sm transition"
            >
              <IconDeviceFloppy className="w-4 h-4" />
              {initialItem ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
