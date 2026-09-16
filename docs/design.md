# Albion Game - Marketplace, Guild and Others
## Design System & UI Specifications

This document defines the visual, interaction, and architectural direction for **Albion Game - Marketplace, Guild and Others**, rooted in the design tokens of `app/globals.css` and the comprehensive product scope outlined in `docs/project.md`.

---

## 1. Design Vision & Philosophy

Create a high-performance, polished, immersive interface tailored for Albion Online players, guild leaders, traders, and crafters. The interface balances high-density information with visual clarity:

- **Game-Inspired Elegance**: Dark neutral palette with crisp gold, amber, cyan, and emerald accents reminiscent of Albion's fantasy economic setting.
- **High Data Density & Scannability**: Fast comparison of market prices, recipe yields, farm timers, and guild rosters without visual clutter.
- **Responsive & Ergonomic**: Frictionless interaction across ultra-wide desktop monitors, laptops, and mobile devices.
- **Structured Surfaces**: Strict adherence to the sharp corner system (`--radius: 0`), defined border boundaries, and clean elevation.

---

## 2. Theme Foundation & Color Tokens

All components must source their colors directly from the CSS variables in `app/globals.css`:

### Core Tokens
- `--background`: Main app background (deep dark surface in dark mode).
- `--foreground`: Primary high-contrast typography.
- `--card` / `--card-foreground`: Content cards, panels, and data widgets.
- `--primary` / `--primary-foreground`: Primary action buttons, active tabs, and key metrics.
- `--secondary` / `--secondary-foreground`: Secondary buttons, badges, and inactive state tags.
- `--muted` / `--muted-foreground`: Secondary text, metadata labels, and disabled states.
- `--accent` / `--accent-foreground`: Hover states, highlight chips, and interactive table rows.
- `--border`: Fine boundary lines for cards, tables, inputs, and dividers.
- `--destructive`: Danger alerts, lethal zone indicators, and critical warning actions.

### Economic & Status Semantic Accents
- **Profit / Green**: Emerald accents (`#10b981` / `text-emerald-500`) for positive profit margins, buy order surges, and safe Blue Zones.
- **Loss / Red**: Crimson accents (`#ef4444` / `text-destructive`) for negative margins, market drops, and Red/Black lethal zones.
- **Warning / Yellow**: Amber accents (`#f59e0b` / `text-amber-500`) for Yellow Zones, moderate station taxes, and pending applications.
- **Focus / Magic Cyan**: Cyan/Sky accents (`#0ea5e9` / `text-sky-400`) for Focus points and Avalonian Roads.
- **Gold / Royal**: Warm gold accents (`#eab308`) for Black Market, prestige rankings, and guild leader badges.

---

## 3. Visual Style Rules

### Typography
- Primary UI text: Clean sans-serif system with defined font weights (`font-medium` for body, `font-semibold` / `font-bold` for headings).
- Numerical Data & Timers: Tabular figures (`tabular-nums`) to prevent jitter in price charts, countdowns, and financial tables.
- Text Hierarchy: Clear distinctions between section titles (`text-2xl font-bold tracking-tight`), card titles (`text-base font-semibold`), and data labels (`text-xs font-medium text-muted-foreground uppercase`).

### Layout & Surface Architecture
- **Edges**: Sharp, square edges (`rounded-none` / `--radius: 0`) delivering an authentic, structured tabletop tool feel.
- **Card Containers**: Subdued background with distinct `border border-border` outlines and subtle hover transitions.
- **Grid Systems**: Responsive 12-column layouts adaptable from 1-column mobile views to multi-column desktop dashboards.

---

## 4. Dashboard Architecture & UI Direction

The dashboard is structured into 6 primary operational pillars plus player-demanded tools:

### Title: Market Price
- **Visual Design**: High-density interactive data tables with real-time price tick indicators.
- **Key UI Modules**:
  - **Live Price Checker**: Multi-city comparison selector with quick tabs for Martlock, Bridgewatch, Lymhurst, Fort Sterling, Thetford, Caerleon, and Brecilien.
  - **Price Charts**: Interactive line and candlestick charts with time-range selectors (24H, 7D, 30D, 1Y).
  - **Black Market Radar**: Side-by-side comparison cards showing Royal City buy prices versus Caerleon Black Market purchase offers, with net margin badges.
  - **Spread & Volume Indicators**: Visual bar indicators illustrating buy-order vs sell-order depth.

### Title: Crafting
- **Visual Design**: Recipe trees and modular card stacks displaying input resources and output valuations.
- **Key UI Modules**:
  - **Resource Return Rate (RRR) Visualizer**: Interactive slider or toggle switching between Base City RRR (15.2%), Local Bonus RRR (24.8%), Focus RRR (43.5% - 53.9%), and Daily Event bonuses.
  - **Recipe Breakdown**: Visual item slot previews displaying refined material quantities, artifact slots, and required tier.
  - **Station Tax Calculator**: User input for crafting station usage fee per 100 nutrition, with instant calculation of silver deductions.
  - **Labourer Journal Analyzer**: House tier requirements, happiness meter gauge, and estimated return yield tables.

### Title: Farming
- **Visual Design**: Visual plot grid representations simulating Albion personal and guild islands.
- **Key UI Modules**:
  - **Plot Manager**: 3x3 interactive plot layout supporting Farm, Herb Garden, and Pasture assignments.
  - **Harvest Timers**: Real-time circular countdown timers indicating hours remaining until crop harvest or animal maturity.
  - **Nutrition & Food Input Panel**: Daily feed requirements (carrots, turnips, etc.) vs baby animal yield percentages and mount maturation.
  - **Farming Profit Summary**: Daily net revenue cards calculating seed purchase costs, focus watering savings, and market sale estimates.

### Title: Maps
- **Visual Design**: Expansive full-width interactive map viewport with smooth pan and zoom controls.
- **Key UI Modules**:
  - **Interactive Map Canvas**: Layered rendering of the Royal Continent, Outlands, Avalonian Roads, and the Mists.
  - **Filter Control Bar**: Quick toggle buttons for Zone Tiers (T3-T8), Danger Status (Safe Blue, Flagged Yellow, Full-Loot Red, Black Zone), and Biomes.
  - **Resource Heatmap Overlays**: Toggleable color-coded node overlays highlighting Wood, Ore, Fiber, Hide, and Stone clusters.
  - **Portal & Timer Drawer**: Slide-over drawer detailing portal connection statuses, chest respawns, castle timers, and world boss schedules.

### Title: Guild
- **Visual Design**: Command center layout prioritizing member statuses, management actions, and event coordination.
- **Key UI Modules**:
  - **Roster Table**: Searchable, sortable table featuring member avatars, character names, guild rank badges, activity statuses, and fame metrics.
  - **Recruitment Review Queue**: Card deck featuring pending applicants with Discord tags, gear screenshots, approve/reject buttons, and comment logs.
  - **Call To Arms (CTA) Dispatcher**: Event creation modal with mandatory flags, build requirements, voice channel links, and one-click attendance tracking.
  - **Guild Statistics**: Visual bar and doughnut charts displaying weekly PvE/PvP fame gains, season point progression, and treasury balances.

### Title: Calculation
- **Visual Design**: Dual-pane calculator interface with input controls on the left and live responsive output cards on the right.
- **Key UI Modules**:
  - **Crafting & Refining Profit Form**: Tier, enchantment, raw material price inputs with instant profit margin percentage badges.
  - **Fame & Mastery Simulator**: Experience curve sliders showing exact tome/action requirements to progress from level 1 to 100/120.
  - **Tax & Fee Calculator**: Side-by-side comparison of Premium vs Non-Premium market taxes (4% vs 8%) and setup fees (2.5%).
  - **Transport Run Margin Estimator**: Gross payload weight vs mount capacity meter, factoring in city price differentials and route risk ratings.

### Title: Others (Player Demand Features)
- **Visual Design**: Modular card grids and community-driven interactive tools.
- **Key UI Modules**:
  - **Character Build Creator**: Visual equipment paper doll layout (Head, Armor, Boots, Weapon, Off-Hand, Cape, Food, Potion, Mount) with spell tooltip popovers.
  - **PvP & Killboard Feed**: Recent battle cards displaying killer/victim gear, location, kill fame, and party size breakdown.
  - **Strategy Guides & Meta Articles**: Clean, readable documentation layouts with code blocks, markdown text, and item icon badges.
  - **Feature Request Voting Board**: Upvote and comment system allowing players to request and rank upcoming utilities.

---

## 5. Reusable Component Guidelines

### Data Tables
- Sticky headers with sortable column indicators (`IconChevronDown` / `IconChevronUp`).
- Zebra striping on alternating rows with `--accent` hover feedback.
- Compact cell paddings to maximize information density on desktop screens.

### Stat Cards & Metric Badges
- Primary metric in large bold typography (`text-2xl font-bold`).
- Contextual comparison tag (e.g., `+12.4% vs Caerleon` with green arrow).
- Minimalist icon container with subtle primary/accent tint.

### Buttons & Action Controls
- Primary actions: Solid `bg-primary text-primary-foreground` with sharp corners.
- Secondary actions: `variant="outline"` with crisp 1px border.
- Destructive actions: `bg-destructive text-destructive-foreground` reserved for irreversible operations.

### Modals & Drawers
- Framed overlay with backdrop blur (`backdrop-blur-sm`).
- Unambiguous close button and designated primary action CTA.

---

## 6. Accessibility & Responsiveness

- **High Contrast**: Ensure text adheres to WCAG AA standards in both dark and light modes.
- **Keyboard Navigation**: All interactive elements, dropdowns, and map layers must be navigable via Tab, Enter, and arrow keys.
- **Responsive Breakpoints**:
  - Mobile (<768px): Single-column cards, collapsible navigation drawer, swipeable tabs.
  - Tablet (768px - 1024px): 2-column grids with collapsible sidebar.
  - Desktop (>1024px): Full multi-column dashboard with persistent sidebar and expanded tables.
