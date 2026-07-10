'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoShield, IoDiamond, IoBag, IoApps } from 'react-icons/io5';
import { RiSwordFill } from 'react-icons/ri';

const categories = [
  { key: 'all', label: 'All', icon: IoApps },
  { key: 'weapons', label: 'Weapons', icon: RiSwordFill },
  { key: 'armors', label: 'Armors', icon: IoShield },
  { key: 'accessories', label: 'Accessories', icon: IoDiamond },
  { key: 'consumables', label: 'Consumables', icon: IoBag },
];

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 mb-8 p-1 bg-muted/50 rounded-xl">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <TabsTrigger key={cat.key} value={cat.key} className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-md">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{cat.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}