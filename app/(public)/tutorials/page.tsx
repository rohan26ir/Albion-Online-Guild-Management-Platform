'use client';

import FilterBar from '@/components/customComp/FilterBar';
import TimeCounter from '@/components/customComp/TimeCounter';
import UnderDevelopment from '@/components/shared/UnderDevelopment';
import TutorialCard from '@/components/uiCustom/TutorialCard';
import { useState, useMemo } from 'react';

export interface Author {
  name: string;
  email: string;
  photoURL: string;
}

export interface Tutorial {
  id: string;
  title: string;
  urlYoutube: string;
  thumbnail?: string;
  category: 'Character' | 'Guild' | 'Marketplace' | 'PvP' | 
            "News" | 'Economy' | 'Other';
  author: Author;
  vote: number;
  duration?: string;
  views?: number;
}

const tutorialsData: Tutorial[] = [
  {
    id: "1",
    title: "Xbox & Controller Improvements",
    urlYoutube: "https://www.youtube.com/watch?v=SvemPdf20iM",
    category: "News",
    author: {
      name: "Abstrack",
      email: "rohan26ir@gmail.com",
      photoURL: "https://i.pravatar.cc/150?u=abstrack",
    },
    vote: 245,
  },
  {
    id: "2",
    title: "Realm Divided Introduction",
    urlYoutube: "https://youtu.be/rWv-nCZ9FSY?si=tQwoJTmeVcnIvx7d",
    category: "Guild",
    author: {
      name: "AlbionKing",
      email: "king@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=king",
    },
    vote: 189,
  },
  {
    id: "3",
    title: "A Complete Beginner's Guide - How to get Started in Albion Online",
    urlYoutube: "https://youtu.be/Sak1Aa45FcY?si=14vGVCIq4uYjeKFc",
    category:   "Character",
    author: {
      name: "Habonis",
      email: "habonis@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=habonis",
    },
    vote: 523,
  },
  {
    id: "4",
    title: "The Only Gathering Guide You'll Ever Need | Albion Online Beginner's Guide",
    urlYoutube: "https://www.youtube.com/watch?v=D2pWUzLtJEQ",
    category: "Economy",
    author: {
      name: "SwoleBenji",
      email: "benji@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=benji",
    },
    vote: 412,
  },
  {
    id: "5",
    title: "Personal Island Set Up for PASSIVE INCOME 250K + Per/Day - Albion Online",
    urlYoutube: "https://www.youtube.com/watch?v=4hiRYFVx_cg",
    category: "Economy",
    author: {
      name: "Leyvi",
      email: "leyvi@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=leyvi",
    },
    vote: 678,
  },
  {
    id: "6",
    title: "HOW TO Enchant Items and REROLL Quality - Albion Online",
    urlYoutube: "https://www.youtube.com/watch?v=MbF4w2fqL7g",
    category: "Character",
    author: {
      name: "BigLipsMcGee",
      email: "biglips@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=biglips",
    },
    vote: 334,
  },
  {
    id: "7",
    title: "TOP 3 Weapons for SOLO Roaming in Black Zone/Ava Roads - Albion Online",
    urlYoutube: "https://www.youtube.com/watch?v=QcTMNqqRiyA",
    category: "PvP",
    author: {
      name: "Nausk",
      email: "nausk@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=nausk",
    },
    vote: 891,
  },
  {
    id: "8",
    title: "BEST MOUNTS for Open World BZ, Mists, & Roads - Albion Online",
    urlYoutube: "https://www.youtube.com/watch?v=xlPqesVTjGw",
    category: "Character",
    author: {
      name: "Victorek",
      email: "victorek@albion.com",
      photoURL: "https://i.pravatar.cc/150?u=victorek",
    },
    vote: 567,
  },
];

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"vote" | "newest">("vote");

  const filteredAndSortedTutorials = useMemo(() => {
    
    let result = [...tutorialsData];

    if (searchQuery.trim()) {
      result = result.filter(tut =>
        tut.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(tut => tut.category === selectedCategory);
    }

    if (sortBy === "vote") {
      result.sort((a, b) => b.vote - a.vote);
    } else {
      result.sort((a, b) => b.vote - a.vote); // Replace with date sorting later
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 w-[96%]">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter">Tutorials</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
            Master Albion Online with guides from the best players in the realm.
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="mt-8 mb-6 text-sm text-muted-foreground">
          Showing {filteredAndSortedTutorials.length} tutorials
        </div>

        {filteredAndSortedTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredAndSortedTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">No matching tutorials found.</p>
          </div>
        )}
      </div>

      <div className='max-w-7xl w-[95%] mx-auto mt-20'>
        <UnderDevelopment 
         progress={55}
         ></UnderDevelopment>
      </div>

    </div>
  );
}