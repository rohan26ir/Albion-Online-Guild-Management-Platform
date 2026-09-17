"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  IconShield, 
  IconSwords, 
  IconPlus, 
  IconDatabase, 
  IconCloudUpload, 
  IconPhoto, 
  IconRefresh, 
  IconDownload, 
  IconCheck, 
  IconArrowRight,
  IconServer
} from "@tabler/icons-react";
import { 
  fetchItemsFromDb, 
  fetchBuildsFromDb, 
  resetItemsToDefault, 
  resetBuildsToDefault,
  getStoredItems,
  getStoredBuilds
} from "@/lib/admin/adminStore";

export default function AdminOverviewPage() {
  const [itemsCount, setItemsCount] = useState(0);
  const [buildsCount, setBuildsCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // Initial local read
    setItemsCount(getStoredItems().length);
    setBuildsCount(getStoredBuilds().length);

    // Fetch from internal database
    Promise.all([fetchItemsFromDb(), fetchBuildsFromDb()]).then(([items, builds]) => {
      setItemsCount(items.length);
      setBuildsCount(builds.length);
    });
  }, []);

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all Items and Builds in your internal database to default seed data?")) {
      resetItemsToDefault();
      resetBuildsToDefault();
      setTimeout(() => {
        setItemsCount(getStoredItems().length);
        setBuildsCount(getStoredBuilds().length);
        setStatusMessage("Internal database successfully reset to default Albion Online seed data!");
        setTimeout(() => setStatusMessage(null), 3500);
      }, 300);
    }
  };

  const handleExportData = () => {
    const exportData = {
      items: getStoredItems(),
      builds: getStoredBuilds(),
      exportedAt: new Date().toISOString(),
      platform: "Albion Game Management Platform - Internal DB",
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `albion_internal_db_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Hero matching other dashboard pages */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-muted/20 p-6 sm:p-10 shadow-sm">
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest">
              <IconShield className="w-3.5 h-3.5" />
              Administrative Control Panel
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Albion Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Centralized management hub powered by your self-hosted internal database (no third-party database needed). Add, update, and remove items and character builds with authentic in-game inventory paperdoll layouts.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/admin/items"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold flex items-center gap-2 shadow-sm transition"
            >
              <IconPlus className="w-4 h-4" />
              Manage Items
            </Link>
            <Link
              href="/dashboard/admin/builds"
              className="px-5 py-2.5 rounded-xl bg-card hover:bg-muted border border-border text-foreground text-xs font-bold flex items-center gap-2 transition"
            >
              <IconSwords className="w-4 h-4 text-primary" />
              Character Builds (Game UI)
            </Link>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
          <IconCheck className="w-5 h-5 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Stats Grid matching card theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Items Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Total Items</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <IconSwords className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground mt-4">{itemsCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Weapons, armors, accessories & gear</p>
          <Link
            href="/dashboard/admin/items"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline transition"
          >
            Open items directory <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Builds Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Active Builds</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <IconShield className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-foreground mt-4">{buildsCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Configured with Albion Paperdoll Game UI</p>
          <Link
            href="/dashboard/admin/builds"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline transition"
          >
            Open builds manager <IconArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ImgBB Status Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">ImgBB Integration</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <IconPhoto className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xl font-bold text-foreground">Active</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Direct artwork upload to ImgBB</p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs text-emerald-400">
            <IconCheck className="w-3.5 h-3.5" /> Direct image hosting ready
          </span>
        </div>

        {/* Internal Database Engine Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Internal Database</span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <IconServer className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground mt-4">Self-Hosted</p>
          <p className="text-xs text-muted-foreground mt-1">100% Owned • No 3rd Party DB</p>
          <button
            onClick={handleExportData}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline transition"
          >
            Export JSON Backup <IconDownload className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Feature Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Items Management */}
        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <IconSwords className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
              Module 01
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">Albion Items & Gear Database</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Add new weapons, armors, and consumables. Direct file upload to ImgBB with instant image rendering, Item Power calculation, and market price tracking.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/dashboard/admin/items"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl transition shadow-sm"
            >
              Go to Items Manager
            </Link>
          </div>
        </div>

        {/* Module 2: Character Builds with Game UI */}
        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <IconShield className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full">
              Module 02
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground">Character Builds (Game UI Paperdoll)</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Craft official character builds using the iconic Albion Online inventory wheel. Configure Head, Chest, Shoes, Cape, Weapon, and Off-Hand with custom spell keybinds (Q, W, E, D, R, F).
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/dashboard/admin/builds"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-sm"
            >
              Go to Builds Manager
            </Link>
          </div>
        </div>
      </div>

      {/* Internal DB Maintenance Box */}
      <div className="p-6 rounded-3xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
            <IconDatabase className="w-4 h-4 text-primary" />
            Internal Database Management
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Data is stored directly in your internal repository (<code className="text-xs font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">data/items.json</code> and <code className="text-xs font-mono text-foreground bg-muted px-1.5 py-0.5 rounded">data/builds.json</code>).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground flex items-center gap-1.5 transition"
          >
            <IconDownload className="w-4 h-4" /> Export Backup
          </button>
          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl border border-destructive/40 bg-destructive/10 hover:bg-destructive/20 text-xs font-semibold text-destructive flex items-center gap-1.5 transition"
          >
            <IconRefresh className="w-4 h-4" /> Reset to Defaults
          </button>
        </div>
      </div>

    </div>
  );
}
