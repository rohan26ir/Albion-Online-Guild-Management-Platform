# Design Instructions

This document defines the visual and interaction direction for the Albion Online guild platform based on the current theme tokens in `app/globals.css` and the product scope in `project.md`.

---

## 1. Design Goal
Create a polished, modern, community-focused interface that feels professional, readable, and game-friendly. The design should support:

- guild and alliance management
- marketplace and trading activity
- build sharing and guides
- calculators and planning tools
- both desktop and mobile use

The overall tone should be clean, trustworthy, and efficient rather than flashy or noisy.

---

## 2. Theme Foundation
Use the existing CSS variables from `app/globals.css` as the single source of truth for styling.

### Core color system
- `--background`: main app background
- `--foreground`: primary text
- `--card` / `--card-foreground`: panel and content surfaces
- `--primary` / `--primary-foreground`: main actions and emphasis
- `--secondary` / `--secondary-foreground`: supporting UI elements
- `--muted` / `--muted-foreground`: secondary content
- `--accent` / `--accent-foreground`: highlights and interactive emphasis
- `--border`: dividers and outlines
- `--destructive`: error or warning states

### Light mode
Use the current light palette for public-facing pages and general content surfaces:
- bright background
- dark text for high readability
- soft gray cards and panels
- strong contrast for buttons and key actions

### Dark mode
The `.dark` theme should remain the preferred option for dashboard and community-heavy screens. It uses:
- dark neutral backgrounds
- lighter foreground text
- slightly elevated card surfaces
- strong contrast for readable content and controls

---

## 3. Visual Style Rules

### Typography
- Use the existing sans-serif system for regular UI text.
- Keep headings clear, direct, and structured.
- Use concise, readable body copy for dashboards, guides, and marketplace content.

### Layout
- Prefer clean spacing, clear section separation, and strong hierarchy.
- Use cards for major features such as dashboards, build lists, marketplace items, and calculators.
- Maintain a balanced page width with generous margins on desktop and compact spacing on mobile.

### Corners and surfaces
- The current theme uses a sharp radius value (`--radius: 0`), so keep edges crisp and structured.
- Use panels, cards, and buttons with consistent borders and subtle elevation rather than heavy rounded shapes.

---

## 4. Page Design Direction

### Home / Landing Page
- Strong hero section with a clear value proposition
- Short summary of guild management, marketplace, builds, and tools
- CTA buttons for joining, exploring, or viewing the dashboard
- Clean visual hierarchy with minimal clutter

### Dashboard
- Use cards for key stats, recent activity, events, applications, and announcements
- Group related data into clearly labeled sections
- Keep actions easy to find and visually consistent

### Marketplace
- Present listings in a structured card layout
- Use readable labels for item, price, seller, and status
- Support quick filtering and sorting for usability

### Build Library
- Use consistent cards for PvP, PvE, gathering, and crafting builds
- Highlight build titles, roles, and quick summaries
- Add clear search and filter support for discovery

### Calculators
- Focus on clarity and data input simplicity
- Use labeled fields, logical grouping, and readable result displays
- Keep results easy to scan and compare

---

## 5. Component Guidance

### Buttons
- Primary actions: use `primary` styling for important tasks
- Secondary actions: use `secondary` or `muted` styling for supporting actions
- Keep button text short and action-oriented

### Cards
- Use cards for grouped content, feature panels, and stat summaries
- Ensure consistent spacing, border treatment, and text hierarchy

### Navigation
- Keep navigation minimal, predictable, and easy to scan
- Support a clear distinction between public pages and member/dashboard areas

### Forms
- Use simple labels, clear spacing, and visible validation states
- Follow the existing theme tokens for fields, borders, and focus rings

---

## 6. Accessibility and Usability
- Maintain strong contrast across light and dark modes.
- Ensure interactive elements remain clearly visible on hover and focus.
- Keep content scannable with short sections and clear headings.
- Use consistent spacing and visual hierarchy to reduce cognitive load.

---

## 7. Implementation Notes
- Build UI using the existing Tailwind + theme variable setup from `app/globals.css`.
- Avoid hard-coded colors when a token already exists.
- Prefer reusable card, button, and panel styles instead of one-off styling.
- Keep the design aligned with the product goals listed in `project.md`.
