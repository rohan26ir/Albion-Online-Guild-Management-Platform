# Title: Market Price

The **Market Price** module is designed to give Albion Online players and economy specialists real-time visibility into market dynamics across all major economic centers.

---

## Key Pages & Sub-modules

### 1. Market Overview & Trends (`/dashboard/market`)
- **Summary Cards**: 24h market volume, top traded items, highest margin arbitrage opportunities, and most volatile commodities.
- **Top Movers**: Real-time ticker showing items with the highest percentage price surges or drops across cities.

### 2. Live Price Checker (`/dashboard/market/prices`)
- **Multi-City Comparison**: Instant price matrix comparing sell orders and buy orders across:
  - Martlock (Highlands)
  - Bridgewatch (Steppe)
  - Lymhurst (Forest)
  - Fort Sterling (Mountain)
  - Thetford (Swamp)
  - Caerleon (Royal Center / Red Zone)
  - Brecilien (Mists City)
- **Item Search & Filters**: Filter by Tier (T1-T8), Enchantment level (.0, .1, .2, .3, .4), and Quality (Normal, Good, Outstanding, Excellent, Masterpiece).

### 3. Black Market Arbitrage Tracker (`/dashboard/market/black-market`)
- **Arbitrage Radar**: Compares Royal city sell orders against Caerleon Black Market buy orders.
- **Net Margin Calculator**: Factors in 4% / 8% tax, transport risk factor, and buy order fulfillment speed.
- **High-Demand Gear List**: Filters items by Black Market consumption rate (weapons, armors, bags, capes).

### 4. Price History & Trends (`/dashboard/market/history`)
- **Candlestick & Line Charts**: Historical pricing graphs selectable by interval (24 hours, 7 days, 30 days, 1 year).
- **Volume Velocity**: Secondary volume bar charts indicating daily transaction counts.

### 5. Order Spread & Liquidity (`/dashboard/market/spread`)
- **Bid-Ask Analysis**: Visualizes the spread between the lowest sell order and highest buy order.
- **Flipping Opportunities**: Highlights items where stationery market-making generates high passive silver.

### 6. Watchlist & Custom Price Alerts (`/dashboard/market/alerts`)
- **Personal Watchlist**: Quick-access list of high-priority materials or equipment.
- **Price Threshold Alerts**: In-app notifications when an item drops below a target purchase price or spikes above a target sell price.
