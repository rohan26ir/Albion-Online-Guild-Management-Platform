"use client";

import React, { useState } from "react";
import { BuildEquipment, EquipmentSlotKey, AdminItem, BuildSlotItem } from "@/lib/admin/types";
import { 
  IconX,
  IconPlus,
  IconCoin,
  IconShield,
  IconSparkles,
  IconFlame
} from "@tabler/icons-react";
import { 
  GiVisoredHelm, 
  GiChestArmor, 
  GiBoots, 
  GiBroadsword, 
  GiRoundShield, 
  GiBackpack, 
  GiCape, 
  GiHorseHead, 
  GiMeat, 
  GiPotionBall,
  GiSwordsEmblem,
  GiSprint,
  GiShieldReflect,
  GiSpinningBlades,
  GiMagicSwirl,
  GiLightningBow
} from "react-icons/gi";

interface AlbionGamePaperdollProps {
  equipment: BuildEquipment;
  inventoryItems?: (AdminItem | null)[];
  activeSlot?: EquipmentSlotKey | null;
  onSelectSlot?: (slot: EquipmentSlotKey) => void;
  onClearSlot?: (slot: EquipmentSlotKey) => void;
  interactive?: boolean;
}

const ROMAN_TIERS: Record<string, string> = {
  T1: "I",
  T2: "II",
  T3: "III",
  T4: "IV",
  T5: "V",
  T6: "VI",
  T7: "VII",
  T8: "VIII",
};

const ENCHANTMENT_STYLES: Record<number, { border: string; glow: string; dotCount: number }> = {
  0: {
    border: "border-[#4a4f56]",
    glow: "",
    dotCount: 0,
  },
  1: {
    border: "border-[#22c55e]",
    glow: "shadow-[0_0_8px_rgba(34,197,94,0.6)]",
    dotCount: 1,
  },
  2: {
    border: "border-[#a855f7]",
    glow: "shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    dotCount: 2,
  },
  3: {
    border: "border-[#06b6d4]",
    glow: "shadow-[0_0_8px_rgba(6,182,212,0.6)]",
    dotCount: 3,
  },
  4: {
    border: "border-[#eab308]",
    glow: "shadow-[0_0_10px_rgba(234,179,8,0.7)]",
    dotCount: 4,
  },
};

export default function AlbionGamePaperdoll({
  equipment,
  inventoryItems = [],
  activeSlot,
  onSelectSlot,
  onClearSlot,
  interactive = true,
}: AlbionGamePaperdollProps) {
  // Track which slot is currently hovered
  const [hoveredSlot, setHoveredSlot] = useState<EquipmentSlotKey | null>(null);

  // Helper for rendering an authentic Albion Online Item Slot Frame
  const renderItemFrame = (
    slotKey: EquipmentSlotKey,
    slotLabel: string,
    placeholderIcon: React.ReactNode,
    defaultQuantity?: number
  ) => {
    const slotData = equipment[slotKey];
    const item = slotData?.item;
    const isSelected = activeSlot === slotKey;
    const tier = item?.tier || slotData?.tier || "T8";
    const romanTier = ROMAN_TIERS[tier] || "VIII";
    const enchantment = item?.enchantment ?? slotData?.enchantment ?? 0;
    const enchStyle = ENCHANTMENT_STYLES[enchantment] || ENCHANTMENT_STYLES[0];
    const quantity = slotData?.quantity ?? defaultQuantity;

    return (
      <div
        onClick={() => interactive && onSelectSlot?.(slotKey)}
        onMouseEnter={() => {
          if (item) setHoveredSlot(slotKey);
        }}
        onMouseLeave={() => setHoveredSlot(null)}
        className={`relative w-[68px] h-[68px] sm:w-[74px] sm:h-[74px] rounded-[10px] bg-[#1a1c20] border-[2px] ${
          item ? enchStyle.border : "border-[#373b42]"
        } ${item ? enchStyle.glow : ""} ${
          isSelected ? "ring-2 ring-amber-400 scale-105" : ""
        } flex items-center justify-center transition-all overflow-hidden ${
          interactive ? "cursor-pointer hover:border-amber-400" : "cursor-pointer hover:border-amber-400/80"
        } shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]`}
      >
        {item ? (
          <>
            {/* Top-Left Circular Tier Roman Numeral Badge */}
            <div className="absolute top-[2px] left-[2px] z-10 w-[17px] h-[17px] rounded-full bg-[#121316] border border-[#555a64] flex items-center justify-center shadow-sm pointer-events-none">
              <span className="text-[9px] font-serif font-black text-[#d1d5db] tracking-tighter leading-none">
                {romanTier}
              </span>
            </div>

            {/* Main Item Graphic */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.icon || "/assets/placeholder-item.png"}
              alt={item.name}
              className="w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />

            {/* Bottom-Left Enchantment Dots */}
            <div className="absolute bottom-[3px] left-[4px] z-10 flex items-center gap-[2px] pointer-events-none">
              {[1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={`w-[3px] h-[3px] rounded-full ${
                    dot <= enchantment ? "bg-[#22c55e] shadow-[0_0_3px_#22c55e]" : "bg-[#374151]"
                  }`}
                />
              ))}
            </div>

            {/* Bottom-Right Coin Socket or Quantity Badge */}
            {quantity !== undefined && quantity > 1 ? (
              <div className="absolute bottom-[2px] right-[2px] z-10 min-w-[17px] h-[17px] px-1 rounded-full bg-[#14161a] border border-[#555a64] flex items-center justify-center shadow pointer-events-none">
                <span className="text-[10px] font-bold text-white leading-none font-mono">
                  {quantity}
                </span>
              </div>
            ) : (
              <div className="absolute bottom-[2px] right-[2px] w-[13px] h-[13px] rounded-full bg-[#111215] border border-[#373b42]/80 opacity-60 pointer-events-none" />
            )}

            {/* Interactive Remove Button */}
            {interactive && onClearSlot && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearSlot(slotKey);
                }}
                className="absolute -top-1 -right-1 z-20 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110 transition shadow"
              >
                <IconX className="w-2.5 h-2.5" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#555a64] group-hover:text-primary transition">
            <div className="text-2xl sm:text-3xl opacity-40">
              {placeholderIcon}
            </div>
            {interactive && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 hover:bg-primary/10 rounded-[10px] transition">
                <IconPlus className="w-4 h-4 text-primary opacity-0 hover:opacity-100" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Helper for rendering glowing circular Ability Orbs underneath equipment
  const renderAbilityOrb = (
    color: "amber" | "green" | "cyan" | "blue" | "yin-yang" | "flame" | "passive",
    icon: React.ReactNode,
    tooltip?: string
  ) => {
    const colorClasses = {
      amber: "bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_6px_rgba(245,158,11,0.7)] text-slate-950",
      green: "bg-gradient-to-br from-emerald-400 to-green-600 shadow-[0_0_6px_rgba(34,197,94,0.7)] text-slate-950",
      cyan: "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_6px_rgba(6,182,212,0.7)] text-slate-950",
      blue: "bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[0_0_6px_rgba(59,130,246,0.7)] text-white",
      "yin-yang": "bg-gradient-to-br from-emerald-400 via-slate-900 to-rose-600 shadow-[0_0_6px_rgba(239,68,68,0.7)] text-white",
      flame: "bg-gradient-to-br from-orange-500 via-amber-500 to-slate-900 shadow-[0_0_6px_rgba(249,115,22,0.7)] text-white",
      passive: "bg-gradient-to-br from-amber-600 via-amber-800 to-slate-950 shadow-[0_0_5px_rgba(217,119,6,0.5)] text-amber-200",
    };

    return (
      <div
        title={tooltip}
        className={`w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] rounded-full p-[1.5px] border border-[#2b2f36] flex items-center justify-center shrink-0 cursor-default transition-transform hover:scale-125 ${colorClasses[color]}`}
      >
        <div className="w-full h-full rounded-full flex items-center justify-center text-[9px]">
          {icon}
        </div>
      </div>
    );
  };

  // Helper for rendering a slot column with its orbs and below-item compact hover tooltip
  const renderSlot = (
    slotKey: EquipmentSlotKey,
    label: string,
    placeholderIcon: React.ReactNode,
    orbs?: React.ReactNode,
    defaultQty?: number
  ) => {
    const slotData = equipment[slotKey];
    const item = slotData?.item;
    const isHovered = hoveredSlot === slotKey && item;

    // Smart horizontal alignment so tooltip never clips outside paperdoll container
    const getAlignClass = () => {
      if (slotKey === "bag" || slotKey === "mainHand" || slotKey === "potion") return "left-0";
      if (slotKey === "cape" || slotKey === "offHand" || slotKey === "food") return "right-0";
      return "left-1/2 -translate-x-1/2";
    };

    return (
      <div className="relative group flex flex-col items-center">
        <span className="text-[11px] font-semibold text-muted-foreground mb-1">{label}</span>
        {renderItemFrame(slotKey, label, placeholderIcon, defaultQty)}
        <div className="flex items-center justify-center gap-1.5 mt-1.5 h-5">
          {orbs}
        </div>

        {/* Small hover card directly below this hovered item */}
        {isHovered && item && (
          <div
            className={`absolute top-[96px] sm:top-[102px] ${getAlignClass()} z-50 w-[215px] p-2.5 rounded-xl bg-[#0c0e12]/98 border border-amber-500/70 shadow-[0_14px_32px_rgba(0,0,0,0.92),0_0_12px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/20 backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-100 text-left`}
          >
            {/* Header: Icon + Name + IP */}
            <div className="flex items-center gap-2 pb-1.5 mb-1.5 border-b border-[#222630]">
              <div className="relative w-8 h-8 rounded-lg bg-[#16181e] border border-[#373d49] p-0.5 flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon || "/assets/placeholder-item.png"}
                  alt={item.name}
                  className="w-full h-full object-contain drop-shadow"
                />
                <span className="absolute -top-1 -left-1 px-0.5 rounded bg-[#1f222a] border border-[#3c424e] text-[7px] font-black font-serif text-amber-400">
                  {ROMAN_TIERS[item.tier] || item.tier}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] font-bold text-white truncate leading-tight">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {item.itemPower > 0 && (
                    <span className="text-[8.5px] font-black px-1 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono">
                      {item.itemPower} IP
                    </span>
                  )}
                  <span className="text-[8.5px] text-slate-400 truncate">
                    {item.tier}{item.enchantment > 0 ? `.${item.enchantment}` : ""} • {item.subcategory || item.category}
                  </span>
                </div>
              </div>
            </div>

            {/* EMV (Price) Row */}
            <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-[#14161c] border border-[#222630] text-[9.5px] mb-1.5">
              <span className="text-slate-400 flex items-center gap-1 font-medium">
                <IconCoin className="w-3 h-3 text-amber-400 shrink-0" />
                EMV:
              </span>
              <span className="font-extrabold text-amber-400 font-mono">
                {item.marketData?.estimatedPrice
                  ? `${item.marketData.estimatedPrice.toLocaleString()} Silver`
                  : "N/A"}
              </span>
            </div>

            {/* Combat Stats (if any) */}
            {item.stats && Object.values(item.stats).some((v) => typeof v === "number" && v > 0) && (
              <div className="grid grid-cols-2 gap-1 text-[8.5px] pt-1 border-t border-[#1f232b]">
                {item.stats.attackDamage ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Dmg:</span>
                    <strong className="text-amber-400 font-mono">+{item.stats.attackDamage}</strong>
                  </div>
                ) : null}
                {item.stats.magicDamage ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Magic:</span>
                    <strong className="text-purple-400 font-mono">+{item.stats.magicDamage}</strong>
                  </div>
                ) : null}
                {item.stats.armor ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Armor:</span>
                    <strong className="text-blue-400 font-mono">+{item.stats.armor}</strong>
                  </div>
                ) : null}
                {item.stats.magicResist ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Resist:</span>
                    <strong className="text-indigo-400 font-mono">+{item.stats.magicResist}</strong>
                  </div>
                ) : null}
                {item.stats.maxHealth ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Health:</span>
                    <strong className="text-emerald-400 font-mono">+{item.stats.maxHealth}</strong>
                  </div>
                ) : null}
                {item.stats.maxEnergy ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Energy:</span>
                    <strong className="text-cyan-400 font-mono">+{item.stats.maxEnergy}</strong>
                  </div>
                ) : null}
                {item.stats.cooldownReduction ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">CDR:</span>
                    <strong className="text-amber-400 font-mono">+{item.stats.cooldownReduction}%</strong>
                  </div>
                ) : null}
                {item.stats.attackSpeed ? (
                  <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-[#111317] border border-[#1f2229]">
                    <span className="text-slate-400">Atk Spd:</span>
                    <strong className="text-yellow-400 font-mono">+{item.stats.attackSpeed}%</strong>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center select-none py-2 px-1 text-slate-200">
      
      {/* ================= ROW 1: BAG, HEAD, CAPE ================= */}
      <div className="grid grid-cols-3 gap-6 sm:gap-8 items-start justify-items-center">
        {renderSlot(
          "bag",
          "Bag",
          <GiBackpack />,
          renderAbilityOrb("flame", <IconFlame className="w-3 h-3 text-orange-400" />, "Carry Weight Capacity")
        )}

        {renderSlot(
          "head",
          "Head",
          <GiVisoredHelm />,
          <>
            {renderAbilityOrb("amber", <GiMagicSwirl />, equipment.head?.spellD || "D Ability")}
            {renderAbilityOrb("flame", <IconFlame className="w-3 h-3 text-orange-400" />, equipment.head?.passive || "Passive")}
          </>
        )}

        {renderSlot(
          "cape",
          "Cape",
          <GiCape />,
          renderAbilityOrb("cyan", <GiLightningBow />, equipment.cape?.trigger || "Cape Trigger")
        )}
      </div>

      {/* ================= ROW 2: MAIN HAND, ARMOR, OFF HAND ================= */}
      <div className="grid grid-cols-3 gap-6 sm:gap-8 items-start justify-items-center mt-3">
        {renderSlot(
          "mainHand",
          "Main Hand",
          <GiBroadsword />,
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-1">
              {renderAbilityOrb("green", <GiSwordsEmblem />, equipment.mainHand?.spellQ || "Q Spell")}
              {renderAbilityOrb("cyan", <GiSpinningBlades />, equipment.mainHand?.spellW || "W Spell")}
              {renderAbilityOrb("yin-yang", <GiMagicSwirl />, equipment.mainHand?.spellE || "E Signature")}
            </div>
            <div className="flex items-center justify-center h-4">
              {renderAbilityOrb("flame", <IconFlame className="w-3 h-3 text-orange-400" />, equipment.mainHand?.passive || "Passive")}
            </div>
          </div>
        )}

        {renderSlot(
          "armor",
          "Armor",
          <GiChestArmor />,
          <>
            {renderAbilityOrb("amber", <GiShieldReflect />, equipment.armor?.spellR || "R Ability")}
            {renderAbilityOrb("flame", <IconFlame className="w-3 h-3 text-orange-400" />, equipment.armor?.passive || "Passive")}
          </>
        )}

        {renderSlot(
          "offHand",
          "Off Hand",
          <GiRoundShield />,
          equipment.offHand?.passive ? (
            renderAbilityOrb("passive", <IconSparkles className="w-3 h-3 text-amber-300" />, equipment.offHand.passive)
          ) : null
        )}
      </div>

      {/* ================= ROW 3: POTION, SHOES, FOOD ================= */}
      <div className="grid grid-cols-3 gap-6 sm:gap-8 items-start justify-items-center mt-3">
        {renderSlot("potion", "Potion", <GiPotionBall />, null, 10)}

        {renderSlot(
          "shoes",
          "Shoes",
          <GiBoots />,
          <>
            {renderAbilityOrb("blue", <GiSprint />, equipment.shoes?.spellF || "F Sprint")}
            {renderAbilityOrb("flame", <IconFlame className="w-3 h-3 text-orange-400" />, equipment.shoes?.passive || "Passive")}
          </>
        )}

        {renderSlot("food", "Food", <GiMeat />, null, 6)}
      </div>

      {/* ================= ROW 4: MOUNT ================= */}
      <div className="flex flex-col items-center mt-2">
        {renderSlot(
          "mount",
          "Mount",
          <GiHorseHead />,
          renderAbilityOrb("flame", <GiSprint />, "Gallop & Passive Speed")
        )}
      </div>

    </div>
  );
}
