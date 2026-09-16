# Title: Crafting

The **Crafting** module empowers dedicated crafters, refiners, and production tycoons with precise math on return rates, focus costs, station taxes, and profit margins.

---

## Key Pages & Sub-modules

### 1. Crafting Dashboard (`/dashboard/crafting`)
- **Station Fee Monitor**: Current associate and public usage fees across player-owned stations in all Royal Cities.
- **Daily Production Bonus Tracker**: Highlights which items enjoy the active daily +10% or +20% production bonus.

### 2. Resource Return Rate (RRR) Analyzer (`/dashboard/crafting/rrr`)
- **RRR Breakdown**:
  - Base City Return: 15.2%
  - City Crafting Bonus Return: 24.8% (specific item categories per city)
  - With Focus: 43.5% (base) or 47.9% - 53.9% (with local/daily bonuses)
  - Island Return: 0% base, ~37% with focus
- **Return Savings Calculator**: Visual simulation showing how many raw/refined materials are preserved per 100 crafts.

### 3. Crafting Recipes & Material Requirements (`/dashboard/crafting/recipes`)
- **Interactive Recipe Tree**: Visual component breakdown for weapons, armors, accessories, and tools.
- **Artifact & Relic Slots**: Accurately accounts for Rune, Soul, Relic, and Avalonian Shard costs.
- **Quality Chance Probability**: Shows odds of rolling Normal, Good, Outstanding, Excellent, or Masterpiece gear based on character crafting mastery.

### 4. Focus Efficiency & Specialization (`/dashboard/crafting/focus`)
- **Spec Progression Curves**: Calculates focus cost reduction based on Mastery (0-100) and Specialization (0-120).
- **Silver-per-Focus Ratio**: Evaluates which items produce the highest silver value per 10,000 daily focus points.

### 5. Labourer & Journal Profitability (`/dashboard/crafting/labourers`)
- **Journal Filling Rates**: Shows how many items need to be crafted to fill Blacksmith, Fletcher, Imbuer, or Tinker journals.
- **Labourer Yield Matrix**: Calculates silver returns from empty journals, full journals, and materials returned by laborers at 100%-150% happiness.
- **House & Furniture Guide**: Required house tier, beds, tables, and trophies to reach maximum efficiency.

### 6. Transmutation & Enchanting (`/dashboard/crafting/enchanting`)
- **Transmutation Profitability**: Compares raw resource transmutation costs against market price differences across tiers.
- **Enchantment Optimizer**: Calculates whether buying flat (.0) items and upgrading them with Runes (.1), Souls (.2), or Relics (.3) produces higher net profit than crafting directly.
