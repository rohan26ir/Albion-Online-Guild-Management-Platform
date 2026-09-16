# Title: Calculation

The **Calculation** module provides precision economic models, progress estimators, and margin calculators designed to optimize every silver expenditure and time investment in Albion Online.

---

## Key Pages & Sub-modules

### 1. Crafting Profit Calculator (`/dashboard/calculators/crafting`)
- **Real-Time Net Profit Estimator**:
  - Raw/refined ingredient costs across cities.
  - Resource Return Rate (RRR) selection (15.2% base, 24.8% local bonus, 43.5%-53.9% with focus).
  - Station usage fee per 100 nutrition deduction.
  - Journal filling value recovery (empty vs filled journal sale price).
  - Market tax (4% premium / 8% standard) and 2.5% order fee deduction.
- **Output**: Net silver per craft, profit margin percentage, and total silver generated per batch.

### 2. Refining Profit Calculator (`/dashboard/calculators/refining`)
- **Step-by-Step Raw Processing**:
  - Calculates tier-by-tier refining costs from Tier 2 up to Tier 8.4 (Wood to Planks, Ore to Bars, Fiber to Cloth, Hide to Leather, Stone to Blocks).
  - Evaluates city refining bonuses (e.g., Martlock for Hide, Fort Sterling for Wood, Thetford for Ore, Lymhurst for Fiber, Bridgewatch for Stone).
  - Focus points per unit vs silver saved calculation.

### 3. Fame & Specialization Progress Calculator (`/dashboard/calculators/fame`)
- **Mastery (0-100) & Specialization (0-120)**:
  - Exact total fame required for any weapon, armor, or tool node.
  - Tomes of Insight needed (Standard 10k fame, Adept 50k fame, Grandmaster 200k fame, etc.).
  - Combat Fame Credits conversion calculator (silver cost per fame credit spent).

### 4. Market Tax & Setup Fee Calculator (`/dashboard/calculators/tax`)
- **Tax Breakdown**:
  - Premium status toggle (4% market tax vs 8% non-premium tax).
  - Order creation fee (2.5%).
  - Direct trade tax evaluation.
  - Break-even minimum sell price formula.

### 5. Transport Run & Arbitrage Calculator (`/dashboard/calculators/transport`)
- **Inter-City Route Modeling**:
  - Price differential between origin city (e.g., Lymhurst) and destination city (e.g., Caerleon or Black Market).
  - Mount carry weight vs total cargo weight constraints (Transport Ox, Mammoth, Grizzly Bear, Spectral Direboar).
  - Silver-per-kilogram metric to optimize highest value-density cargo.
  - Estimated travel time, route danger risk rating, and net profit per hour.

### 6. Focus Efficiency Optimizer (`/dashboard/calculators/focus`)
- **Daily Focus Allocation Advisor**:
  - Computes the silver yield per 1 Focus Point across refining, crafting, and crop watering.
  - Recommends optimal allocation for daily 10,000 Focus point generation.
