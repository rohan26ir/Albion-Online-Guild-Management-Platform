'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IconCalculator,
  IconArrowsExchange,
  IconHammer,
  IconScissors,
  IconFlame,
  IconCoin,
  IconArrowRight,
  IconTrendingUp,
  IconCrown,
  IconCheck,
  IconSparkles,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

interface CalculatorItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  description: string;
  features: string[];
}

const CALCULATORS: CalculatorItem[] = [
  {
    title: 'Buy / Sell Profit & Flipping',
    href: '/dashboard/calculators/trade-profit',
    icon: <IconArrowsExchange className="size-6 text-amber-400" />,
    tag: 'Marketplace',
    tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description:
      'Calculate market order setup fees, 4% vs 8% sales taxes, Black Market transport margins, and break-even sell prices.',
    features: ['Instant Buy vs Buy Orders', 'City-to-City Transport arbitrage', 'Break-even price formula', 'ROI & Net Silver breakdown'],
  },
  {
    title: 'Crafting Profit & Resource Return',
    href: '/dashboard/calculators/crafting',
    icon: <IconHammer className="size-6 text-blue-400" />,
    tag: 'Workshop',
    tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description:
      'Compute accurate crafting profits factoring in City local bonuses (up to 53.9% RRR), Crafting Focus value, and Laborer Journals.',
    features: ['City Return Bonus presets', 'Silver per Focus calculation', 'Laborer Journal profit yield', 'Station nutrition fee support'],
  },
  {
    title: 'Refining Profit & Cascading Return',
    href: '/dashboard/calculators/refining',
    icon: <IconScissors className="size-6 text-orange-400" />,
    tag: 'Smelting',
    tagColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    description:
      'Refine Ore, Logs, Fiber, Hide, and Stone with authentic City Bonuses (36.7% / 53.9% RRR) and lower-tier component returns.',
    features: ['5 Royal Cities bonus mapping', 'Cascading resource returns', 'Silver/Focus efficiency score', 'Batch output projection'],
  },
  {
    title: 'Fame & Specialization (Spec)',
    href: '/dashboard/calculators/fame',
    icon: <IconFlame className="size-6 text-purple-400" />,
    tag: 'Progression',
    tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    description:
      'Plan Destiny Board mastery from level 1 to 120 (Elite Spec). Estimate Tome of Insight costs, CFC credits, and passive Item Power.',
    features: ['Levels 1-100 & 101-120 Elite', 'Passive Item Power (IP) gains', 'Tome of Insight silver costs', 'Satchel of Insight silver drain'],
  },
  {
    title: 'Tax, Station Fees & Loot Split',
    href: '/dashboard/calculators/tax',
    icon: <IconCoin className="size-6 text-emerald-400" />,
    tag: 'Treasury',
    tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    description:
      'Determine Marketplace taxes, Guild mob silver cut deposits, and fair group dungeon / roaming party loot distributions.',
    features: ['Market order modification fee', 'Guild tax silver deduction', 'Group party loot splits', 'Regear & repair cost deductions'],
  },
];

export default function DashboardCalculatorsPage() {
  return (
    <div className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card via-background to-muted/20 p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/20 text-primary border border-primary/30">
              Albion Economic Suite
            </span>
            <span className="text-xs text-muted-foreground">Version 2.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <IconCalculator className="size-9 text-primary" />
            Albion Online Calculators
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Essential economic tools designed specifically for Albion Online players, crafters, refiners, and guild officers.
            Max out your silver profits, optimize focus point usage, and plan your Destiny Board with precision.
          </p>
        </div>
      </div>

      {/* Grid of Calculator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULATORS.map((calc, index) => (
          <motion.div
            key={calc.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="group h-full flex flex-col justify-between rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted/30 group-hover:scale-105 transition-transform">
                    {calc.icon}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${calc.tagColor}`}>
                    {calc.tag}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {calc.title}
                </h2>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {calc.description}
                </p>

                {/* Features List */}
                <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
                  {calc.features.map((feat) => (
                    <li key={feat} className="text-[11px] text-muted-foreground flex items-center gap-2">
                      <IconCheck className="size-3 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link href={calc.href} className="block">
                  <Button className="w-full justify-between group/btn text-xs font-semibold py-2">
                    <span>Open Calculator</span>
                    <IconArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
