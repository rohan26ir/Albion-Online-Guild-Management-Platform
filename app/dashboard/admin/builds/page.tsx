"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CharacterBuild, 
  BuildRole, 
  BuildLocation,
  BuildZone,
  BuildGroupSize,
  BuildActivity,
  AdminItem 
} from "@/lib/admin/types";
import { 
  getStoredBuilds, 
  saveStoredBuild, 
  deleteStoredBuild, 
  getStoredItems,
  fetchBuildsFromDb,
  fetchItemsFromDb
} from "@/lib/admin/adminStore";
import { 
  IconPlus, 
  IconSearch, 
  IconEdit, 
  IconTrash, 
  IconCopy, 
  IconShield, 
  IconCoin, 
  IconArrowLeft,
  IconSparkles,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconServer,
  IconMapPin,
  IconUsers,
  IconSwords,
  IconFlame,
  IconArrowsSort,
  IconHeart,
  IconHeartFilled
} from "@tabler/icons-react";
import BuildFormModal from "@/components/admin/BuildFormModal";
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

export default function AdminBuildsPage() {
  const [builds, setBuilds] = useState<CharacterBuild[]>([]);
  const [items, setItems] = useState<AdminItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<BuildLocation | "All">("All");
  const [selectedRole, setSelectedRole] = useState<BuildRole | "All">("All");
  const [selectedZone, setSelectedZone] = useState<BuildZone | "All">("All");
  const [selectedGroupSize, setSelectedGroupSize] = useState<BuildGroupSize | "All">("All");
  const [selectedActivity, setSelectedActivity] = useState<BuildActivity | "All">("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBuild, setEditingBuild] = useState<CharacterBuild | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [likedBuildIds, setLikedBuildIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setBuilds(getStoredBuilds());
    setItems(getStoredItems());

    // Load liked builds from localStorage
    try {
      const storedLikes = localStorage.getItem("albion_liked_builds");
      if (storedLikes) setLikedBuildIds(JSON.parse(storedLikes));
    } catch {}

    Promise.all([fetchBuildsFromDb(), fetchItemsFromDb()]).then(([dbBuilds, dbItems]) => {
      setBuilds(dbBuilds);
      setItems(dbItems);
    });
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

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

  const handleCreateNew = () => {
    setEditingBuild(null);
    setIsModalOpen(true);
  };

  const handleEdit = (build: CharacterBuild) => {
    setEditingBuild(build);
    setIsModalOpen(true);
  };

  const handleDuplicate = (build: CharacterBuild) => {
    const duplicated: CharacterBuild = {
      ...build,
      id: `build-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      title: `${build.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveStoredBuild(duplicated);
    setBuilds(getStoredBuilds());
    showNotification(`Duplicated build: "${duplicated.title}"`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete build "${title}" from your internal database?`)) {
      deleteStoredBuild(id);
      setBuilds(getStoredBuilds());
      showNotification(`Build "${title}" removed from internal database.`);
    }
  };

  const handleSave = (savedBuild: CharacterBuild) => {
    saveStoredBuild(savedBuild);
    setBuilds(getStoredBuilds());
    showNotification(
      editingBuild
        ? `Successfully updated build "${savedBuild.title}"!`
        : `Successfully saved new build "${savedBuild.title}"!`
    );
  };

  const togglePublish = (build: CharacterBuild) => {
    const updated = { ...build, isPublished: !build.isPublished };
    saveStoredBuild(updated);
    setBuilds(getStoredBuilds());
    showNotification(`Build "${build.title}" is now ${updated.isPublished ? "Published" : "Hidden"}.`);
  };

  // Filter & Sort builds
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
            <IconShield className="w-8 h-8 text-primary" />
            Character Builds Manager
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Sort by Location, Role, Zone, Group Size, and Activity. Inspect item EMV and stats on hover.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold flex items-center gap-2 shadow-sm transition shrink-0"
        >
          <IconPlus className="w-4 h-4" /> Craft New Build
        </button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
          <IconCheck className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="p-5 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
        {/* Search and Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <IconSearch className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search builds by title, author, or keywords..."
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
              <option value="newest">Sort: Newest Updated</option>
              <option value="popularity">Sort: Popularity (Most Hearts)</option>
              <option value="ip-desc">Sort: Highest Avg IP (Desc)</option>
              <option value="ip-asc">Sort: Lowest Avg IP (Asc)</option>
              <option value="cost-desc">Sort: Highest EMV (Desc)</option>
              <option value="cost-asc">Sort: Lowest EMV (Asc)</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* 5 Targeted Dropdowns */}
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

        {/* Toolbar Footer summary */}
        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
          <span>Showing <strong className="text-foreground">{filteredBuilds.length}</strong> matching builds</span>
          <span className="text-[11px] text-primary flex items-center gap-1 font-semibold">
            <IconServer className="w-3.5 h-3.5" /> Internal Database (<code className="font-mono">data/builds.json</code>)
          </span>
        </div>
      </div>

      {/* Builds Grid: SHOW CARD WITH HOVER TOOLTIPS, EMV:, Avg IP:, AND HEART POPULARITY */}
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

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <button
                      type="button"
                      onClick={() => togglePublish(build)}
                      className={`text-xs flex items-center gap-1 font-semibold ${
                        build.isPublished ? "text-emerald-400 hover:text-emerald-300" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {build.isPublished ? (
                        <>
                          <IconEye className="w-3.5 h-3.5" /> Published
                        </>
                      ) : (
                        <>
                          <IconEyeOff className="w-3.5 h-3.5" /> Hidden
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicate(build)}
                        title="Duplicate build"
                        className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition"
                      >
                        <IconCopy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(build)}
                        title="Edit build in Game UI"
                        className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition"
                      >
                        <IconEdit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(build.id, build.title)}
                        title="Delete build"
                        className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground transition"
                      >
                        <IconTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-card border border-border rounded-3xl space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <IconShield className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No Character Builds Found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No builds match your filters. Clear or adjust your Location, Role, Zone, Group Size, or Activity filters.
          </p>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-xl transition"
          >
            Craft New Build Now
          </button>
        </div>
      )}

      {/* Build Creator / Editor Modal with Game UI Paperdoll */}
      <BuildFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialBuild={editingBuild}
        availableItems={items}
      />

    </div>
  );
}
