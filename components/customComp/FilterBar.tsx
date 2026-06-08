'use client';

import { IconSearch, IconArrowsSort } from '@tabler/icons-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: 'vote' | 'newest';
  setSortBy: (value: 'vote' | 'newest') => void;
}

const categories = ["All", "Character", "Guild", "News", "Marketplace", "PvP", "Economy", "Other"];

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  // sortBy,
  // setSortBy,
}: FilterBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-card border rounded-3xl p-6 shadow-sm">
      {/* Search */}
      <div className="relative flex-1">
        <IconSearch className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tutorials by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 bg-background border border-border rounded-2xl py-4 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-background border border-border rounded-2xl px-5 py-4 focus:outline-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* <div className="flex items-center gap-2 bg-background border border-border rounded-2xl px-5">
          <IconArrowsSort className="h-5 w-5 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'vote' | 'newest')}
            className="bg-transparent py-4 focus:outline-none cursor-pointer"
          >
            <option value="vote">Highest Voted</option>
            <option value="newest">Newest</option>
          </select>
        </div> */}
      </div>
    </div>
  );
}