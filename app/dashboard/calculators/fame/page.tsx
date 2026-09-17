'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconFlame,
  IconBook,
  IconSword,
  IconShield,
  IconCoin,
  IconSparkles,
  IconArrowUpRight,
  IconInfoCircle,
  IconTrophy,
  IconPercentage,
} from '@tabler/icons-react';

export default function FameCalculatorPage() {
  const [calcType, setCalcType] = useState<'weapon_spec' | 'armor_spec' | 'mastery'>('weapon_spec');
  const [startLevel, setStartLevel] = useState<number>(1);
  const [targetLevel, setTargetLevel] = useState<number>(100);
  const [tomePrice, setTomePrice] = useState<number>(23000);
  const [hasSatchel, setHasSatchel] = useState<boolean>(false);
  const [satchelBonusPercent, setSatchelBonusPercent] = useState<number>(50); // +50% extra fame

  // Albion Spec Fame Curve Formulas (Approximation grounded in Destiny Board):
  // 0 to 100 Weapon Specialization requires approx 16,928,000 Fame (or 33,856,000 for non-artifact / artifact).
  // Standard weapon spec 0-100: ~16.9M Fame.
  // Level 101-120 Elite spec: requires ~40.5M additional Fame & significant silver.
  // Armor spec 0-100: ~8.4M Fame.
  // Mastery 0-100: ~3.4M Fame.

  const getFameForLevel = (lvl: number, type: 'weapon_spec' | 'armor_spec' | 'mastery'): number => {
    if (lvl <= 0) return 0;
    const baseMultiplier = type === 'weapon_spec' ? 169280 : type === 'armor_spec' ? 84640 : 34000;
    
    if (lvl <= 100) {
      // Exponential curve from 1 to 100
      return Math.round(baseMultiplier * Math.pow(lvl / 100, 2.8) * 100);
    } else {
      // Elite levels 101 to 120 (requires Combat Fame Credits or pure fame)
      const base100 = baseMultiplier * 100;
      const eliteLevels = lvl - 100;
      return Math.round(base100 + eliteLevels * 2000000);
    }
  };

  const totalFameRequired = Math.max(
    0,
    getFameForLevel(targetLevel, calcType) - getFameForLevel(startLevel, calcType)
  );

  // Tomes of Insight (Each tome = 10,000 fame)
  const tomesNeeded = Math.ceil(totalFameRequired / 10000);
  const totalTomeCost = tomesNeeded * tomePrice;

  // Combat Fame Credits (CFC):
  // Converting Fame to Credits: Weapons grant 80% fame as credits with auto-respec, Armor grants 20%.
  // Auto-respec cost: 0.9 silver per credit generated.
  const creditFactor = calcType === 'weapon_spec' ? 0.8 : 0.4;
  const creditsNeeded = Math.round(totalFameRequired * creditFactor);
  const autoRespecSilverCost = Math.round(creditsNeeded * 0.9);

  // Satchel of insight extra fame and silver drain
  // 1 satchel bonus fame costs roughly 1.3 silver
  const satchelExtraFame = hasSatchel ? Math.round(totalFameRequired * (satchelBonusPercent / 100)) : 0;
  const satchelSilverDrain = hasSatchel ? Math.round(satchelExtraFame * 1.3) : 0;

  // Item Power (IP) gained:
  // Spec 1-100 grants:
  // +2 IP per level to the specific item (total +200 IP)
  // +0.2 IP per level to all other items in the same line (+20 IP)
  // Elite 101-120 grants:
  // +1 IP to specific item per level (+20 IP)
  const calculateIpGain = () => {
    let mainIp = 0;
    let crossIp = 0;
    const levelsToGain = Math.max(0, targetLevel - startLevel);

    if (calcType === 'weapon_spec' || calcType === 'armor_spec') {
      const normalLevels = Math.min(100, targetLevel) - Math.min(100, startLevel);
      const eliteLevels = Math.max(0, targetLevel - Math.max(100, startLevel));

      if (normalLevels > 0) {
        mainIp += normalLevels * 2;
        crossIp += normalLevels * 0.2;
      }
      if (eliteLevels > 0) {
        mainIp += eliteLevels * 1;
        crossIp += eliteLevels * 0.1;
      }
    } else {
      // Mastery
      mainIp = levelsToGain * 0.2;
    }
    return { mainIp: Math.round(mainIp * 10) / 10, crossIp: Math.round(crossIp * 10) / 10 };
  };

  const ipGain = calculateIpGain();

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Destiny Board & Mastery
            </span>
            <span className="text-xs text-muted-foreground">Progression Tool</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <IconFlame className="size-7 text-primary" />
            Fame & Specialization (Spec) Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Plan your Destiny Board progression, calculate Tome of Insight costs, Combat Fame Credits (CFC), and passive Item Power (IP) gains.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Spec Type Selection */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <IconSparkles className="size-4 text-primary" />
              Destiny Board Node Type
            </h2>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setCalcType('weapon_spec')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  calcType === 'weapon_spec'
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-bold'
                    : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                }`}
              >
                <IconSword className="size-5 mx-auto mb-1" />
                <p className="text-xs">Weapon Spec</p>
                <span className="text-[9px] text-muted-foreground">+2 IP / level</span>
              </button>

              <button
                type="button"
                onClick={() => setCalcType('armor_spec')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  calcType === 'armor_spec'
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-bold'
                    : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                }`}
              >
                <IconShield className="size-5 mx-auto mb-1" />
                <p className="text-xs">Armor Spec</p>
                <span className="text-[9px] text-muted-foreground">+2 IP / level</span>
              </button>

              <button
                type="button"
                onClick={() => setCalcType('mastery')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  calcType === 'mastery'
                    ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/40 font-bold'
                    : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                }`}
              >
                <IconTrophy className="size-5 mx-auto mb-1" />
                <p className="text-xs">Mastery Node</p>
                <span className="text-[9px] text-muted-foreground">T4-T8 Gear unlock</span>
              </button>
            </div>

            {/* Levels Range Sliders & Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 p-3.5 rounded-xl bg-background/50 border border-border">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-foreground">Starting Level</label>
                  <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                    Lvl {startLevel}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="119"
                  value={startLevel}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setStartLevel(val);
                    if (val >= targetLevel) setTargetLevel(val + 1);
                  }}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div className="space-y-2 p-3.5 rounded-xl bg-background/50 border border-border">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-foreground">Target Level (up to 120)</label>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10">
                    Lvl {targetLevel}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={targetLevel}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setTargetLevel(val);
                    if (val <= startLevel) setStartLevel(val - 1);
                  }}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Level Preset Buttons */}
            <div className="flex gap-2 pt-1">
              {[
                { label: '0 → 50', s: 0, t: 50 },
                { label: '0 → 100 (Max Spec)', s: 0, t: 100 },
                { label: '100 → 120 (Elite)', s: 100, t: 120 },
                { label: '80 → 100', s: 80, t: 100 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setStartLevel(p.s);
                    setTargetLevel(p.t);
                  }}
                  className="px-2.5 py-1 text-xs rounded-lg border border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tome of Insight & Satchel Settings */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <IconBook className="size-4 text-primary" />
              Tome of Insight & Satchel Costs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 p-3 rounded-xl bg-background/50 border border-border">
                <label className="text-xs font-semibold text-foreground">
                  Tome of Insight Market Price
                </label>
                <p className="text-[10px] text-muted-foreground">Each tome grants 10,000 fame</p>
                <input
                  type="number"
                  step="500"
                  value={tomePrice}
                  onChange={(e) => setTomePrice(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm text-foreground font-semibold"
                />
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-background/50 border border-border">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-foreground">Satchel of Insight</label>
                  <input
                    type="checkbox"
                    checked={hasSatchel}
                    onChange={(e) => setHasSatchel(e.target.checked)}
                    className="size-4 rounded border-border text-primary cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">Burns silver for bonus combat fame</p>
                {hasSatchel && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="number"
                      value={satchelBonusPercent}
                      onChange={(e) => setSatchelBonusPercent(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 rounded-lg border border-border bg-muted/30 px-2.5 py-1 text-xs text-foreground font-bold"
                    />
                    <span className="text-xs text-muted-foreground">% Extra Fame</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Output Results */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Fame Target Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/20 via-card to-background p-6 backdrop-blur-md shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Progression Target: Lvl {startLevel} → Lvl {targetLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {targetLevel >= 101 ? 'Elite Leveling' : 'Mastery Path'}
              </span>
            </div>

            {/* Big Total Fame Number */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground">Total Fame Required</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-purple-300 tracking-tight">
                  {totalFameRequired.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-muted-foreground">Fame</span>
              </div>
            </div>

            {/* IP Gain Display */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/70">
              <div className="p-3 rounded-xl bg-background/50 border border-border">
                <span className="text-[11px] text-muted-foreground block flex items-center gap-1">
                  <IconArrowUpRight className="size-3 text-emerald-400" /> Item Power (Direct)
                </span>
                <span className="text-xl font-bold text-emerald-400 mt-0.5 block">
                  +{ipGain.mainIp} IP
                </span>
                <span className="text-[10px] text-muted-foreground">To this specific gear</span>
              </div>

              <div className="p-3 rounded-xl bg-background/50 border border-border">
                <span className="text-[11px] text-muted-foreground block flex items-center gap-1">
                  <IconArrowUpRight className="size-3 text-amber-400" /> Cross-Spec IP Bonus
                </span>
                <span className="text-xl font-bold text-amber-400 mt-0.5 block">
                  +{ipGain.crossIp} IP
                </span>
                <span className="text-[10px] text-muted-foreground">To all gear in same tree</span>
              </div>
            </div>
          </motion.div>

          {/* Tome Cost Card */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border flex items-center justify-between">
              <span>Investment via Tomes of Insight</span>
              <IconBook className="size-4 text-purple-400" />
            </h3>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Tomes of Insight Needed (10,000 fame each)</span>
              <span className="text-foreground font-semibold">{tomesNeeded.toLocaleString()} Tomes</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Market Price per Tome</span>
              <span className="text-foreground font-semibold">{tomePrice.toLocaleString()} Silver</span>
            </div>

            <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
              <span className="text-foreground">Total Silver Cost (Tomes)</span>
              <span className="text-purple-400">{totalTomeCost.toLocaleString()} Silver</span>
            </div>
          </div>

          {/* Auto-Respec & Satchel Costs */}
          <div className="rounded-2xl border border-border bg-card/60 p-5 space-y-3 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border flex items-center justify-between">
              <span>Combat Fame Credits & Satchel Drain</span>
              <IconCoin className="size-4 text-amber-400" />
            </h3>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Equivalent Combat Fame Credits (CFC)</span>
              <span className="text-foreground font-semibold">{creditsNeeded.toLocaleString()} Credits</span>
            </div>

            <div className="flex justify-between py-1 text-muted-foreground">
              <span>Auto-Respec Silver Cost (0.9 Sil/Credit)</span>
              <span className="text-amber-400 font-semibold">{autoRespecSilverCost.toLocaleString()} Silver</span>
            </div>

            {hasSatchel && (
              <div className="flex justify-between py-1 text-muted-foreground">
                <span>Satchel Silver Drain (+{satchelBonusPercent}% fame)</span>
                <span className="text-red-400 font-semibold">~{satchelSilverDrain.toLocaleString()} Silver</span>
              </div>
            )}
          </div>

          {/* Pro Tips Box */}
          <div className="rounded-2xl border border-border bg-muted/20 p-4 text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <IconInfoCircle className="size-4 text-primary" />
              Destiny Board Tips
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li>Maxing all 7 specs in a weapon line grants up to +340 total Item Power to your favorite artifact weapon!</li>
              <li>Levels 101 to 120 (Elite spec) are silver-intensive; save them until your primary 7 weapons are already at 100 spec.</li>
              <li>Running Mists (Brecilien) or Static Dungeons with Satchels is the fastest fame-per-hour method.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}