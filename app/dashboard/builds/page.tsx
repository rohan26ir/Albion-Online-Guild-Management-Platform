"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CharacterBuild, 
  BuildRole, 
  BuildLocation,
  BuildZone,
  BuildGroupSize,
  BuildActivity 
} from "@/lib/admin/types";
import { getStoredBuilds, saveStoredBuild, fetchBuildsFromDb } from "@/lib/admin/adminStore";
import { 
  IconSwords, 
  IconShield, 
  IconSearch, 
  IconSparkles, 
  IconCoin, 
  IconPlus, 
  IconFlame,
  IconX,
  IconMapPin,
  IconUsers,
  IconArrowsSort,
  IconHeart,
  IconHeartFilled
} from "@tabler/icons-react";
import AlbionGamePaperdoll from "@/components/admin/AlbionGamePaperdoll";

const LOCATIONS: (BuildLocation | "All")[] = [
  "All",
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

const ROLES: (BuildRole | "All")[] = [
  "All",
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

const ZONES: (BuildZone | "All")[] = [
  "All",
  "Black Zone (Outlands)",
  "Red Zone",
  "Yellow Zone",
  "Blue Zone",
  "Roads of Avalon",
  "Brecilien / Mists",
];

const GROUP_SIZES: (BuildGroupSize | "All")[] = [
  "All",
  "Solo (1)",
  "Duo (2)",
  "Small Group (3-5)",
  "Party (5-10)",
  "ZvZ / Large Scale (10-20+)",
  "Mass ZvZ (50+)",
];

const ACTIVITIES: (BuildActivity | "All")[] = [
  "All",
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

export default function DashboardBuildsPage() {
  const [builds, setBuilds] = useState<CharacterBuild[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<BuildLocation | "All">("All");
  const [selectedRole, setSelectedRole] = useState<BuildRole | "All">("All");
  const [selectedZone, setSelectedZone] = useState<BuildZone | "All">("All");
  const [selectedGroupSize, setSelectedGroupSize] = useState<BuildGroupSize | "All">("All");
  const [selectedActivity, setSelectedActivity] = useState<BuildActivity | "All">("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeBuild, setActiveBuild] = useState<CharacterBuild | null>(null);
  const [likedBuildIds, setLikedBuildIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const local = getStoredBuilds();
    setBuilds(local.filter((b) => b.isPublished));

    // Load liked state from localStorage
    try {
      const storedLikes = localStorage.getItem("albion_liked_builds");
      if (storedLikes) setLikedBuildIds(JSON.parse(storedLikes));
    } catch {}

    fetchBuildsFromDb().then((dbBuilds) => {
      setBuilds(dbBuilds.filter((b) => b.isPublished));
    });
  }, []);

  const handleToggleLike = (build: CharacterBuild) => {
    const isLiked = !!likedBuildIds[build.id];
    const newLiked = !isLiked;
    const currentLikes = build.likes ?? 120;
    const updatedLikes = newLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

    const updatedBuild = { ...build, likes: updatedLikes };
    saveStoredBuild(updatedBuild);

    const newLikedMap = { ...likedBuildIds, [build.id]: newLiked };
    setLikedBuildIds(newLikedMap);
    try {
      localStorage.setItem("albion_liked_builds", JSON.stringify(newLikedMap));
    } catch {}

    setBuilds((prev) => prev.map((b) => (b.id === build.id ? updatedBuild : b)));
  };

  // Filter & Sort
  const filteredBuilds = builds
    .filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = selectedLocation === "All" || b.location === selectedLocation;
      const matchesRole = selectedRole === "All" || b.role === selectedRole;
      const matchesZone = selectedZone === "All" || b.zone === selectedZone;
      const matchesGroupSize = selectedGroupSize === "All" || b.groupSize === selectedGroupSize;
      const matchesActivity = selectedActivity === "All" || b.activity === selectedActivity;

      return matchesSearch && matchesLocation && matchesRole && matchesZone && matchesGroupSize && matchesActivity;
    })
    .sort((a, b) => {
      if (sortBy === "popularity") return (b.likes || 0) - (a.likes || 0);
      if (sortBy === "ip-desc") return (b.totalItemPower || 0) - (a.totalItemPower || 0);
      if (sortBy === "ip-asc") return (a.totalItemPower || 0) - (b.totalItemPower || 0);
      if (sortBy === "cost-desc") return (b.estimatedCost || 0) - (a.estimatedCost || 0);
      if (sortBy === "cost-asc") return (a.estimatedCost || 0) - (b.estimatedCost || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    });

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Hero matching dashboard layout */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-muted/20 p-6 sm:p-10 shadow-sm">
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
              <IconSwords className="w-3.5 h-3.5" />
              Meta Builds Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Albion Character Builds
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore battle-tested PvP, ZvZ, Hellgate, and PvE setups. Inspect Item EMV prices and stats on hover with authentic Albion in-game paperdoll cards.
            </p>
          </div>

          <Link
            href="/dashboard/admin/builds"
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center gap-2 shadow-sm transition shrink-0"
          >
            <IconPlus className="w-4 h-4" /> Admin: Craft Build (Game UI)
          </Link>
        </div>
      </div>

      {/* Filters & Sorting Toolbar */}
      <div className="p-5 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
        {/* Search & Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <IconSearch className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search builds by title, weapon, author, or keyword..."
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <IconArrowsSort className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="newest">Sort: Newest</option>
              <option value="popularity">Sort: Popularity (Most Hearts)</option>
              <option value="ip-desc">Sort: Highest Avg IP (Desc)</option>
              <option value="ip-asc">Sort: Lowest Avg IP (Asc)</option>
              <option value="cost-desc">Sort: Highest EMV (Desc)</option>
              <option value="cost-asc">Sort: Lowest EMV (Asc)</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* 5 Targeted Dropdown Filters: Location, Role, Zone, Group Size, Activity */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-border">
          {/* Location */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
              <IconMapPin className="w-3 h-3 text-primary" /> Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc === "All" ? "All Locations" : loc}</option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
              <IconShield className="w-3 h-3 text-primary" /> Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>
              ))}
            </select>
          </div>

          {/* Zone */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
              <IconFlame className="w-3 h-3 text-rose-400" /> Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>{z === "All" ? "All Zones" : z}</option>
              ))}
            </select>
          </div>

          {/* Group Size */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
              <IconUsers className="w-3 h-3 text-blue-400" /> Group Size
            </label>
            <select
              value={selectedGroupSize}
              onChange={(e) => setSelectedGroupSize(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {GROUP_SIZES.map((gs) => (
                <option key={gs} value={gs}>{gs === "All" ? "All Sizes" : gs}</option>
              ))}
            </select>
          </div>

          {/* Activity */}
          <div>
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
              <IconSwords className="w-3 h-3 text-amber-400" /> Activity
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
            >
              {ACTIVITIES.map((act) => (
                <option key={act} value={act}>{act === "All" ? "All Activities" : act}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Builds Cards Grid: SHOW CARD WITH HOVER TOOLTIPS, EMV:, Avg IP:, AND HEART POPULARITY */}
      {filteredBuilds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredBuilds.map((build) => {
            const isLiked = !!likedBuildIds[build.id];
            const likesCount = build.likes ?? 142;

            return (
              <div
                key={build.id}
                className="rounded-3xl bg-card border border-border hover:border-primary/50 shadow-sm flex flex-col justify-between transition-all overflow-hidden group"
              >
                {/* Build Card Top Header */}
                {/* Build Header: Clean title, author, meta badge, and Heart popularity */}
                <div className="p-4 pb-3 border-b border-border/80 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      {build.isFeatured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1 shrink-0">
                          <IconSparkles className="w-3 h-3" /> Meta
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition line-clamp-1">
                      {build.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      By <strong className="text-foreground">{build.author}</strong>
                    </p>
                  </div>

                  {/* HEART POPULARITY */}
                  <button
                    type="button"
                    onClick={() => handleToggleLike(build)}
                    title="Upvote / Popularity Heart"
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold transition shrink-0 ${
                      isLiked
                        ? "bg-rose-500/15 border-rose-500/40 text-rose-400 scale-105"
                        : "bg-muted/40 border-border text-muted-foreground hover:text-rose-400 hover:border-rose-500/30"
                    }`}
                  >
                    {isLiked ? (
                      <IconHeartFilled className="w-3.5 h-3.5 text-rose-500" />
                    ) : (
                      <IconHeart className="w-3.5 h-3.5" />
                    )}
                    <span className="text-xs font-mono">{likesCount}</span>
                  </button>
                </div>

                {/* THE CORE ALBION IN-GAME PAPERDOLL CARD (HOVER FOR COMPACT TOOLTIP) */}
                <div className="p-4 bg-muted/15 flex justify-center">
                  <div className="max-w-[320px] w-full">
                    <AlbionGamePaperdoll
                      equipment={build.equipment}
                      interactive={false}
                    />
                  </div>
                </div>

                {/* Build Meta Footer: EMV & AVG IP beside each other */}
                <div className="p-4 pt-3 border-t border-border/80 space-y-3 bg-card">
                  <div className="flex items-center justify-between text-xs">
                    {/* EMV */}
                    <div className="flex items-center gap-1.5">
                      <IconCoin className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-foreground">EMV:</span>
                      <span className="font-extrabold text-amber-400 font-mono">
                        {build.estimatedCost ? `${build.estimatedCost.toLocaleString()} Silver` : "N/A"}
                      </span>
                    </div>

                    {/* AVG IP beside EMV */}
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted/60 border border-border text-xs font-black text-primary font-mono shadow-sm">
                      <span className="text-muted-foreground font-sans font-bold text-[11px]">Avg IP:</span>
                      <span>{build.totalItemPower}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveBuild(build)}
                    className="w-full py-2 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <IconSparkles className="w-4 h-4" /> View Combo & Rotation Guide
                  </button>
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
          <h3 className="text-lg font-bold text-foreground">No Builds Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No builds match the selected Location, Role, Zone, or Activity filters. Try selecting &ldquo;All&rdquo;.
          </p>
        </div>
      )}

      {/* Detailed Game UI & Strategy Modal */}
      {activeBuild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                    {activeBuild.role}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {activeBuild.location}
                  </span>
                  {activeBuild.zone && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {activeBuild.zone}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-foreground mt-1.5">{activeBuild.title}</h2>
                <p className="text-xs text-muted-foreground">
                  Authored by <strong className="text-foreground">{activeBuild.author}</strong> • Avg IP: {activeBuild.totalItemPower}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveBuild(null)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Paperdoll */}
            <div className="flex justify-center p-4 bg-muted/20 rounded-2xl border border-border">
              <AlbionGamePaperdoll
                equipment={activeBuild.equipment}
                inventoryItems={activeBuild.inventoryItems}
                interactive={false}
              />
            </div>

            {/* Ability Combo and Strategy */}
            {activeBuild.comboGuide && (
              <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <IconFlame className="w-4 h-4" /> Combat Combo & Cooldown Sequence
                </h4>
                <p className="text-xs text-foreground font-mono whitespace-pre-line leading-relaxed">
                  {activeBuild.comboGuide}
                </p>
              </div>
            )}

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeBuild.pros.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <h5 className="text-xs font-bold uppercase text-emerald-400">Strengths</h5>
                  {activeBuild.pros.map((p, i) => (
                    <p key={i} className="text-xs text-emerald-300">+ {p}</p>
                  ))}
                </div>
              )}
              {activeBuild.cons.length > 0 && (
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 space-y-1.5">
                  <h5 className="text-xs font-bold uppercase text-destructive">Weaknesses</h5>
                  {activeBuild.cons.map((c, i) => (
                    <p key={i} className="text-xs text-destructive">- {c}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                EMV: <strong className="text-foreground">{activeBuild.estimatedCost.toLocaleString()} Silver</strong>
              </span>
              <button
                type="button"
                onClick={() => setActiveBuild(null)}
                className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
