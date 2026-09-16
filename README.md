# Albion Game - Marketplace, Guild and Others

A modern, high-performance web platform for the Albion Online community. Built with Next.js 16, React 19, and Tailwind CSS, this platform unites real-time market tracking, in-depth crafting and farming tools, interactive maps, guild and alliance operations, precision economic calculators, and player-demanded utilities into one unified experience.

![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn-ui-111827)

---

## 🌐 Live Demo & Repository

- **Website**: [https://albiongame.netlify.app/](https://albiongame.netlify.app/)
- **Repository**: [https://github.com/rohan26ir/Albion-Online-Guild-Management-Platform](https://github.com/rohan26ir/Albion-Online-Guild-Management-Platform)

---

## 🚀 What This Platform Offers

Originally founded as a guild coordination portal, the platform has evolved into an all-in-one ecosystem catering to every aspect of Albion Online gameplay:

- **Market Price**: Live price checks across Royal Cities, Caerleon, Brecilien, and Black Market arbitrage finder.
- **Crafting**: Resource Return Rate (RRR) analyzer, recipe breakdowns, focus cost curves, and labourer profitability.
- **Farming**: Island plot layout planners, crop/herb harvest timers, livestock feed tracking, and daily margin calculators.
- **Maps**: Interactive world maps, zone tiers, danger level filters, resource node density, and Avalonian Road connections.
- **Guild**: Member rosters, role permissions, recruitment application workflows, CTA event attendance, and treasury tracking.
- **Calculation**: Precision calculators for refining, crafting, fame/specialization progress, market taxes, and transport runs.
- **Others (Player Demands)**: Character build creators, PvP killboard trackers, gathering route logs, guides, and feature voting.

---

## 🧭 Dashboard Architecture

The dashboard is structured around 6 core operational pillars plus player-requested utilities:

### 1. 📈 Title: Market Price
- **Market Overview**: Top volume items, market movers, and trending equipment.
- **Live Price Checker**: Multi-city comparison across Martlock, Bridgewatch, Lymhurst, Fort Sterling, Thetford, Caerleon, and Brecilien.
- **Black Market Arbitrage**: Instant identification of profitable trade routes between royal craft hubs and Caerleon.
- **Price History & Trends**: 24h, 7d, 30d candlestick and line charts tracking item price cycles.
- **Order Spread & Depth**: Buy vs sell order margins and volume velocity indicators.
- **Watchlist & Alerts**: Custom alerts for market dips and high-yield opportunities.

### 2. 🔨 Title: Crafting
- **Crafting Dashboard**: Station fee trackers and city production bonus overviews.
- **Resource Return Rate (RRR) Analyzer**: Dynamic calculations including base city return (15.2%), local bonuses (24.8%), Focus boosts (43.5%–53.9%), and daily events.
- **Recipe & Tier Explorer**: Detailed material requirements, refined resource counts, and artifact costs.
- **Focus Efficiency**: Specialization curve analysis to minimize focus points per craft.
- **Labourers & Journals**: House tiers, happiness calculations, and daily resource returns.
- **Transmutation & Enchanting**: Profitability analyzer for upgrading raw resources and enchanting gear.

### 3. 🌾 Title: Farming
- **Farming Dashboard & Island Overview**: Multi-island plot tracking for Personal and Guild islands.
- **Crop & Herb Planner**: Growth timers, watering requirements, seed returns, and harvest estimates.
- **Livestock & Pastures**: Baby animal growth stages, daily nutrition feed costs, and meat/produce yields.
- **Island Layout Optimizer**: Interactive 3x3 plot visualizer for optimal farm/building layouts.
- **Consumable Pipelines**: Input material calculators for high-demand food (Beef Stew, Pork Roast) and potions.
- **Daily Net Margin**: Accurate daily silver-per-day projections after factoring in seed and feed expenses.

### 4. 🗺️ Title: Maps
- **Interactive Global Map**: Zoomable map covering the Royal Continent, Deep Outlands, Avalonian Roads, and the Mists.
- **Zone Danger & Tier Filtering**: Filter zones by Tier (T3 to T8) and danger rating (Blue, Yellow, Red, Black lethal zones).
- **Resource Distribution Heatmaps**: Node density overlays for Wood, Ore, Fiber, Hide, and Stone.
- **Avalonian Roads Mapper**: Portal connection timers, portal tier classifications, and green/blue/golden chest locations.
- **World Timers**: Live countdowns for Energy Vortexes, Power Cores, Castle Outposts, and World Boss spawns.

### 5. 🛡️ Title: Guild
- **Roster & Member Directory**: Comprehensive member list with roles, online status, join date, and total fame.
- **Role & Permission Management**: Granular permission assignments for leaders, officers, and members.
- **Recruitment Review Queue**: Streamlined applicant review process with Discord verification, gear screenshots, and status tags (Pending, Approved, Rejected).
- **Call To Arms (CTA) Coordinator**: Event creation, mandatory gear requirements, party compositions, and automated attendance logs.
- **Guild Statistics**: Season point tracker, weekly fame leaderboards, and territory control logs.
- **Alliance Hub & Treasury**: Multi-guild announcements, shared intel, and guild bank/coffer auditing.

### 6. 🧮 Title: Calculation
- **Crafting Profit Calculator**: Real-time margin estimation with material costs, RRR, nutrition fees, and market taxes.
- **Refining Calculator**: Step-by-step raw to refined material conversion profitability across all tiers and enchantments.
- **Fame & Specialization Calculator**: Calculates exact tomes of insight, mob fame, or crafting actions needed to reach 100/120 spec.
- **Market Tax & Setup Fee Calculator**: Side-by-side net return calculation for Premium (4%) vs Non-Premium (8%) tax rates and 2.5% setup fees.
- **Transport Arbitrage Calculator**: Models transport runs across cities, factoring in mount carry weight, ox speed, and risk factors.
- **Focus Efficiency Optimizer**: Daily 10,000 focus point allocator calculating highest silver-per-focus-point return.

### 7. ⚔️ Title: Others (Player Demand Features)
- **Character Build Library**: Interactive loadout creator (Head, Chest, Boots, Main Hand, Off Hand, Cape, Food, Potion, Mount) with spell selectors and role categories (PvP, PvE, ZvZ, Gathering).
- **PvP Tracker & Killboard**: Battle reports, K/D analysis, gear loot values, and player kill fame trackers.
- **Gathering Log & Route Planner**: Node respawn trackers and gathering silver-per-hour benchmarks.
- **Guides & Strategy**: Structured meta guides, weapon tier lists, and economy strategies.
- **Player Profiles**: Personal character gear showcase, guild history, and achievement highlights.
- **Community Feature Voting**: Community voting board where players propose and vote on future tool additions.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Components**: React 19, Tailwind CSS v4, shadcn/ui, Radix UI primitives
- **Icons & Visuals**: Tabler Icons React, Lucide Icons, Lottie React, Framer Motion
- **Data & Charts**: Chart.js, react-chartjs-2
- **State Management**: Zustand
- **Backend & Database**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Themes**: `next-themes` (Dark/Light mode support with crisp `--radius: 0` aesthetic)

---

## 📁 Project Structure

```bash
app/                        # Next.js App Router
├── (public)/               # Public pages (Landing, About, Contact, Legal)
├── dashboard/              # Authenticated user & management dashboard
docs/                       # All project documentation & module specifications
components/                 # Reusable UI & dashboard components
hooks/                      # Custom React hooks
lib/                        # Utility functions, Supabase client
public/                     # Static assets, game logos, and icons
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rohan26ir/Albion-Online-Guild-Management-Platform.git
cd Albion-Online-Guild-Management-Platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Run linting
```bash
npm run lint
```

---

## 👥 Author

Developed by **Mahedul Islam Rohan**
- **Portfolio**: [https://meetrohan.netlify.app/](https://meetrohan.netlify.app/)
- **GitHub**: [rohan26ir](https://github.com/rohan26ir)

---

## 📜 License

This project is licensed under the MIT License.
Albion Online is a registered trademark of Sandbox Interactive GmbH. This platform is a fan-created community project.
