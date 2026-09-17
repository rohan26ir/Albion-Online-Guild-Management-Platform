"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  CharacterBuild, 
  BuildEquipment, 
  EquipmentSlotKey, 
  AdminItem, 
  BuildRole,
  BuildLocation,
  BuildZone,
  BuildGroupSize,
  BuildActivity
} from "@/lib/admin/types";
import { 
  IconX, 
  IconDeviceFloppy, 
  IconSwords, 
  IconCoin, 
  IconTrash, 
  IconSearch,
  IconCheck
} from "@tabler/icons-react";
import AlbionGamePaperdoll from "./AlbionGamePaperdoll";

interface BuildFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (build: CharacterBuild) => void;
  initialBuild?: CharacterBuild | null;
  availableItems: AdminItem[];
}

const ROLES: BuildRole[] = [
  "Tank",
  "Healer",
  "Melee DPS",
  "Ranged DPS",
  "Support / Buffer",
  "Ganker",
  "Solo Farmer",
  "ZvZ Bruiser",
  "Gatherer / Escape",
];

const LOCATIONS: BuildLocation[] = [
  "Open World",
  "Static Dungeon",
  "Avalonian",
  "Solo Dungeon Depths",
  "Hellgate",
  "Corrupted Dungeon",
  "Mists",
  "Knightfall",
  "Arena",
  "Other",
];

const ZONES: BuildZone[] = [
  "Black Zone (Outlands)",
  "Red Zone",
  "Yellow Zone",
  "Blue Zone",
  "Roads of Avalon",
  "Brecilien / Mists",
];

const GROUP_SIZES: BuildGroupSize[] = [
  "Solo (1)",
  "Duo (2)",
  "Small Group (3-5)",
  "Party (5-10)",
  "ZvZ / Large Scale (10-20+)",
  "Mass ZvZ (50+)",
];

const ACTIVITIES: BuildActivity[] = [
  "PvP",
  "PvE",
  "Ganking",
  "ZvZ",
  "Faction Warfare",
  "Dungeon Crawling",
  "HCE",
  "Gathering",
  "Escorting / Transport",
];

const EMPTY_EQUIPMENT: BuildEquipment = {
  bag: { item: null },
  head: { item: null },
  cape: { item: null },
  mainHand: { item: null },
  armor: { item: null },
  offHand: { item: null },
  potion: { item: null, quantity: 10 },
  shoes: { item: null },
  food: { item: null, quantity: 6 },
  mount: { item: null },
};

export default function BuildFormModal({
  isOpen,
  onClose,
  onSave,
  initialBuild,
  availableItems,
}: BuildFormModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Guild Officer");
  const [role, setRole] = useState<BuildRole>("Ganker");
  const [location, setLocation] = useState<BuildLocation>("Open World");
  const [zone, setZone] = useState<BuildZone>("Black Zone (Outlands)");
  const [groupSize, setGroupSize] = useState<BuildGroupSize>("Solo (1)");
  const [activity, setActivity] = useState<BuildActivity>("Ganking");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Expert">("Intermediate");
  const [description, setDescription] = useState("");
  const [comboGuide, setComboGuide] = useState("");
  const [pros, setPros] = useState<string[]>(["High mobility", "Massive burst damage"]);
  const [cons, setCons] = useState<string[]>(["Requires good cooldown timing"]);
  const [proInput, setProInput] = useState("");
  const [conInput, setConInput] = useState("");
  const [equipment, setEquipment] = useState<BuildEquipment>(EMPTY_EQUIPMENT);
  const [activeSlot, setActiveSlot] = useState<EquipmentSlotKey | null>("mainHand");
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [itemSearch, setItemSearch] = useState("");

  useEffect(() => {
    if (initialBuild) {
      setTitle(initialBuild.title || "");
      setAuthor(initialBuild.author || "Guild Officer");
      setRole(initialBuild.role || "Ganker");
      setLocation(initialBuild.location || "Open World");
      setZone(initialBuild.zone || "Black Zone (Outlands)");
      setGroupSize(initialBuild.groupSize || "Solo (1)");
      setActivity(initialBuild.activity || "Ganking");
      setDifficulty(initialBuild.difficulty || "Intermediate");
      setDescription(initialBuild.description || "");
      setComboGuide(initialBuild.comboGuide || "");
      setPros(initialBuild.pros || []);
      setCons(initialBuild.cons || []);
      setEquipment(JSON.parse(JSON.stringify(initialBuild.equipment || EMPTY_EQUIPMENT)));
      setIsPublished(initialBuild.isPublished ?? true);
      setIsFeatured(initialBuild.isFeatured ?? false);
    } else {
      setTitle("");
      setAuthor("Guild Officer");
      setRole("Ganker");
      setLocation("Open World");
      setZone("Black Zone (Outlands)");
      setGroupSize("Solo (1)");
      setActivity("Ganking");
      setDifficulty("Intermediate");
      setDescription("");
      setComboGuide("");
      setPros(["High mobility in open world", "Burst damage against squishies"]);
      setCons(["Vulnerable to crowd control"]);
      setEquipment(EMPTY_EQUIPMENT);
      setIsPublished(true);
      setIsFeatured(false);
    }
    setActiveSlot("mainHand");
    setItemSearch("");
  }, [initialBuild, isOpen]);

  // Dynamic calculations for Total IP and Estimated Cost
  const { calculatedIP, calculatedCost } = useMemo(() => {
    let totalIp = 0;
    let totalCost = 0;
    let equippedCount = 0;

    const slotKeys = Object.keys(equipment) as EquipmentSlotKey[];
    for (const key of slotKeys) {
      const item = equipment[key]?.item;
      if (item) {
        if (["mainHand", "offHand", "head", "armor", "shoes", "cape"].includes(key)) {
          totalIp += item.itemPower || 1000;
          equippedCount++;
        }
        const qty = equipment[key]?.quantity || 1;
        totalCost += (item.marketData?.estimatedPrice || 0) * qty;
      }
    }

    const avgIp = equippedCount > 0 ? Math.round(totalIp / equippedCount) : 0;
    return { calculatedIP: avgIp, calculatedCost: totalCost };
  }, [equipment]);

  if (!isOpen) return null;

  // Filter items appropriate for the active slot
  const slotFilteredItems = availableItems.filter((it) => {
    if (!activeSlot) return true;
    const matchesSearch = it.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      it.subcategory.toLowerCase().includes(itemSearch.toLowerCase());
    if (!matchesSearch) return false;

    if (activeSlot === "mainHand") return it.category === "Weapon";
    if (activeSlot === "offHand") return it.category === "Off-Hand" || (it.category === "Armor" && it.subcategory.toLowerCase().includes("shield"));
    if (activeSlot === "head") return it.category === "Armor" && (it.subcategory.toLowerCase().includes("cowl") || it.subcategory.toLowerCase().includes("hood") || it.subcategory.toLowerCase().includes("helmet"));
    if (activeSlot === "armor") return it.category === "Armor" && (it.subcategory.toLowerCase().includes("robe") || it.subcategory.toLowerCase().includes("jacket") || it.subcategory.toLowerCase().includes("armor"));
    if (activeSlot === "shoes") return it.category === "Armor" && (it.subcategory.toLowerCase().includes("shoes") || it.subcategory.toLowerCase().includes("boots") || it.subcategory.toLowerCase().includes("sandals"));
    if (activeSlot === "cape") return it.category === "Accessory" && it.subcategory.toLowerCase().includes("cape");
    if (activeSlot === "bag") return it.category === "Accessory" && it.subcategory.toLowerCase().includes("bag");
    if (activeSlot === "mount") return it.category === "Mount";
    if (activeSlot === "food") return it.category === "Consumable" && (it.subcategory.toLowerCase().includes("food") || it.subcategory.toLowerCase().includes("meal"));
    if (activeSlot === "potion") return it.category === "Consumable" && it.subcategory.toLowerCase().includes("potion");

    return true;
  });

  const handleEquipItem = (item: AdminItem) => {
    if (!activeSlot) return;

    setEquipment((prev) => {
      const updated = { ...prev };
      const currentSlotData = updated[activeSlot] || { item: null };

      if (activeSlot === "mainHand" && item.twoHanded) {
        updated.offHand = { item: null };
      }

      updated[activeSlot] = {
        ...currentSlotData,
        item,
        tier: item.tier,
        enchantment: item.enchantment,
        quantity: activeSlot === "potion" ? (currentSlotData.quantity || 10) : activeSlot === "food" ? (currentSlotData.quantity || 6) : undefined,
      };

      return updated;
    });
  };

  const handleClearSlot = (slotKey: EquipmentSlotKey) => {
    setEquipment((prev) => ({
      ...prev,
      [slotKey]: { item: null },
    }));
  };

  const handleSlotChange = (field: string, value: any) => {
    if (!activeSlot) return;
    setEquipment((prev) => ({
      ...prev,
      [activeSlot]: {
        ...prev[activeSlot],
        [field]: value,
      },
    }));
  };

  const addPro = () => {
    if (!proInput.trim()) return;
    setPros([...pros, proInput.trim()]);
    setProInput("");
  };

  const removePro = (idx: number) => {
    setPros(pros.filter((_, i) => i !== idx));
  };

  const addCon = () => {
    if (!conInput.trim()) return;
    setCons([...cons, conInput.trim()]);
    setConInput("");
  };

  const removeCon = (idx: number) => {
    setCons(cons.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please specify a build title.");
      return;
    }

    const buildToSave: CharacterBuild = {
      id: initialBuild?.id || `build-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: title.trim(),
      author: author.trim() || "Guild Master",
      role,
      location,
      zone,
      groupSize,
      activity,
      description: description.trim(),
      comboGuide: comboGuide.trim(),
      pros,
      cons,
      equipment,
      totalItemPower: calculatedIP,
      estimatedCost: calculatedCost,
      difficulty,
      isFeatured,
      isPublished,
      createdAt: initialBuild?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(buildToSave);
    onClose();
  };

  const activeSlotData = activeSlot ? equipment[activeSlot] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden my-4">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-card via-background to-card">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <IconSwords className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                {initialBuild ? "Update Character Build" : "Create Character Build (Game UI)"}
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {role} • {location}
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure build metadata, location, zone, group size, activity, and paperdoll gear.
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Top Classification Fields: Title, Location, Role, Zone, Group Size, Activity */}
          <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-8">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Build Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Bloodletter Open World Solo Gank & Escape"
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Combat Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as BuildRole)}
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-primary font-bold focus:outline-none focus:border-primary"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4 Classification Dropdowns: Location, Zone, Group Size, Activity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1 border-t border-border/50">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Location *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value as BuildLocation)}
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Zone Danger *
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as BuildZone)}
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                >
                  {ZONES.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Group Size *
                </label>
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value as BuildGroupSize)}
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                >
                  {GROUP_SIZES.map((gs) => (
                    <option key={gs} value={gs}>{gs}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Activity *
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as BuildActivity)}
                  className="w-full mt-1 bg-background border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                >
                  {ACTIVITIES.map((act) => (
                    <option key={act} value={act}>{act}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* MAIN INTERACTIVE SECTION: GAME UI PAPERDOLL + SLOT INSPECTOR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: The Albion Online Game UI Paperdoll (matching screenshot) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-3xl bg-muted/10 border border-border">
                <AlbionGamePaperdoll
                  equipment={equipment}
                  activeSlot={activeSlot}
                  onSelectSlot={(slot) => setActiveSlot(slot)}
                  onClearSlot={handleClearSlot}
                  interactive={true}
                />
              </div>

              {/* Calculated Stats Banner */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-muted/30 border border-border">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                    Average Item Power
                  </p>
                  <p className="text-xl font-black text-primary">
                    {calculatedIP} <span className="text-xs font-medium text-muted-foreground">IP</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                    Estimated Set Cost
                  </p>
                  <p className="text-xl font-black text-foreground flex items-center justify-center gap-1">
                    <IconCoin className="w-5 h-5 text-primary inline" />
                    {calculatedCost.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">Silver</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Active Slot Item Chooser & Spells */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    Slot Configuration: <span className="uppercase text-primary">{activeSlot || "Select a slot"}</span>
                  </h3>
                  {activeSlotData?.item && (
                    <button
                      type="button"
                      onClick={() => activeSlot && handleClearSlot(activeSlot)}
                      className="text-xs text-destructive hover:underline flex items-center gap-1"
                    >
                      <IconTrash className="w-3.5 h-3.5" /> Unequip
                    </button>
                  )}
                </div>

                {/* Stack Quantity for Consumables (Potion & Food) */}
                {(activeSlot === "potion" || activeSlot === "food") && (
                  <div className="p-3 rounded-xl bg-muted/20 border border-border flex items-center justify-between">
                    <label className="text-xs text-foreground font-medium">Stack Quantity (Badge in corner)</label>
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={activeSlotData?.quantity || (activeSlot === "potion" ? 10 : 6)}
                      onChange={(e) => handleSlotChange("quantity", Number(e.target.value))}
                      className="w-20 bg-background border border-border rounded-lg px-2 py-1 text-xs text-foreground font-mono text-center"
                    />
                  </div>
                )}

                {/* Spell & Keybind Selection for Equipped Gear */}
                {activeSlot === "mainHand" && (
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border space-y-2">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Weapon Spells (Orbs below slot)
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">Q Spell</label>
                        <input
                          type="text"
                          value={activeSlotData?.spellQ || ""}
                          onChange={(e) => handleSlotChange("spellQ", e.target.value)}
                          placeholder="e.g. Deadly Swipe"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">W Spell</label>
                        <input
                          type="text"
                          value={activeSlotData?.spellW || ""}
                          onChange={(e) => handleSlotChange("spellW", e.target.value)}
                          placeholder="e.g. Shadow Edge"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">E Signature</label>
                        <input
                          type="text"
                          value={activeSlotData?.spellE || ""}
                          onChange={(e) => handleSlotChange("spellE", e.target.value)}
                          placeholder="e.g. Execute"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">Passive</label>
                        <input
                          type="text"
                          value={activeSlotData?.passive || ""}
                          onChange={(e) => handleSlotChange("passive", e.target.value)}
                          placeholder="e.g. Deep Cuts"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSlot === "head" && (
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border space-y-2">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Head Spell (Key: D) & Passive
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">D Ability</label>
                        <input
                          type="text"
                          value={activeSlotData?.spellD || ""}
                          onChange={(e) => handleSlotChange("spellD", e.target.value)}
                          placeholder="e.g. Firebreath"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">Passive</label>
                        <input
                          type="text"
                          value={activeSlotData?.passive || ""}
                          onChange={(e) => handleSlotChange("passive", e.target.value)}
                          placeholder="e.g. Aggressive Caster"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSlot === "armor" && (
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border space-y-2">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Chest Armor Spell (Key: R) & Passive
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">R Ability</label>
                        <input
                          type="text"
                          value={activeSlotData?.spellR || ""}
                          onChange={(e) => handleSlotChange("spellR", e.target.value)}
                          placeholder="e.g. Ambush"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">Passive</label>
                        <input
                          type="text"
                          value={activeSlotData?.passive || ""}
                          onChange={(e) => handleSlotChange("passive", e.target.value)}
                          placeholder="e.g. Quick Thinker"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSlot === "shoes" && (
                  <div className="p-3.5 rounded-xl bg-muted/20 border border-border space-y-2">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Boots / Shoes Spell (Key: F) & Passive
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">F Ability</label>
                        <input
                          type="text"
                          value={activeSlotData?.spellF || ""}
                          onChange={(e) => handleSlotChange("spellF", e.target.value)}
                          placeholder="e.g. Wanderlust"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-muted-foreground font-mono">Passive</label>
                        <input
                          type="text"
                          value={activeSlotData?.passive || ""}
                          onChange={(e) => handleSlotChange("passive", e.target.value)}
                          placeholder="e.g. Toughness"
                          className="w-full mt-0.5 bg-background border border-border rounded-lg px-2.5 py-1 text-xs text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Item Selector List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      Choose gear for <span className="uppercase text-primary">{activeSlot}</span>:
                    </span>
                    <span className="text-[11px] text-muted-foreground">{slotFilteredItems.length} matching items</span>
                  </div>

                  <div className="relative">
                    <IconSearch className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={itemSearch}
                      onChange={(e) => setItemSearch(e.target.value)}
                      placeholder="Search items by name or type..."
                      className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                    {slotFilteredItems.length > 0 ? (
                      slotFilteredItems.map((item) => {
                        const isEquipped = activeSlotData?.item?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleEquipItem(item)}
                            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition ${
                              isEquipped
                                ? "bg-primary/15 border border-primary/40 text-foreground"
                                : "bg-muted/30 hover:bg-muted border border-border text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-card border border-border p-0.5 flex items-center justify-center shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.icon || "/assets/placeholder-item.png"}
                                  alt={item.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold truncate flex items-center gap-1.5">
                                  <span>{item.name}</span>
                                  <span className="text-[10px] px-1 py-0.2 rounded bg-muted text-primary font-mono">
                                    {item.tier}{item.enchantment > 0 ? `.${item.enchantment}` : ""}
                                  </span>
                                </p>
                                <p className="text-[10px] text-muted-foreground truncate">
                                  {item.itemPower} IP • {item.marketData?.estimatedPrice ? `${(item.marketData.estimatedPrice / 1000).toFixed(0)}k silver` : "Free"}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
                                isEquipped
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted hover:bg-primary hover:text-primary-foreground text-foreground"
                              }`}
                            >
                              {isEquipped ? <IconCheck className="w-3.5 h-3.5" /> : "Equip"}
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-6 text-muted-foreground text-xs">
                        No items matching this slot. Create one in the Items manager or adjust your search filter!
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Strategy & Playstyle Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Playstyle Overview & Strategy
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what makes this build effective, engagement range, and team synergy..."
                className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Combat Combo Guide & Cooldown Order
              </label>
              <textarea
                rows={3}
                value={comboGuide}
                onChange={(e) => setComboGuide(e.target.value)}
                placeholder="1. Engage with Dash (W)... 2. Pop Ambush (R)... 3. Execute (E)..."
                className="w-full mt-1 bg-background border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Build Strengths (Pros)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={proInput}
                  onChange={(e) => setProInput(e.target.value)}
                  placeholder="Add a build strength..."
                  className="flex-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addPro();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addPro}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pros.map((p, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs"
                  >
                    + {p}
                    <button type="button" onClick={() => removePro(idx)} className="hover:text-foreground">
                      <IconX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Cons */}
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-destructive">
                Build Weaknesses (Cons)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={conInput}
                  onChange={(e) => setConInput(e.target.value)}
                  placeholder="Add a weakness/counter..."
                  className="flex-1 bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCon();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addCon}
                  className="px-3 py-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg text-xs font-bold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cons.map((c, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-destructive/10 border border-destructive/30 text-destructive text-xs"
                  >
                    - {c}
                    <button type="button" onClick={() => removeCon(idx)} className="hover:text-foreground">
                      <IconX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visibility and Featured Toggles */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-primary bg-background border-border"
                />
                <span className="text-xs font-medium text-foreground">Published (Visible on site)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-primary bg-background border-border"
                />
                <span className="text-xs font-medium text-primary">Featured Meta Build</span>
              </label>
            </div>

            <div className="text-xs text-muted-foreground">
              Author: <span className="font-semibold text-foreground">{author}</span>
            </div>
          </div>

          {/* Actions */}
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
              {initialBuild ? "Save Changes" : "Create Character Build"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
