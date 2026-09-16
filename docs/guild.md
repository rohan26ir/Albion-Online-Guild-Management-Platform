# Title: Guild

The **Guild** module serves as the command center for guild leaders, officers, and members to coordinate operations, track the Top 100 Guilds, manage rosters, generate public recruitment URLs, process join applications, and organize Call To Arms (CTA) events.

---

## Key Pages & Sub-modules

### 1. Top 100 Guilds Leaderboard (`/dashboard/guild/top-100`)
- **Global Rankings**: Live leaderboard ranking the Top 100 guilds by seasonal points, total members (e.g. 295/300), alliance tags, and PvP Kill Fame.
- **Server Filtering**: Segment rankings by server regions (Americas, Europe, Asia).
- **Search & Inspection**: Search guilds by name or alliance tag with direct links to view or apply.

### 2. Join Application Form & Public URL Generator (`/dashboard/applications/public-url`)
- **Shareable Public Recruitment Link**: Instant generation of shareable URLs (e.g. `https://albiongame.netlify.app/apply?guild=my-guild`) with one-click copy and live preview.
- **Form Question Configuration**: Custom recruitment benchmarks (minimum Item Power IP requirement, required role checkboxes, Discord voice/microphone confirmation, character stats screenshots).
- **Discord Webhook Alerts**: Automatic webhook notification integration to broadcast new candidate submissions directly to officer Discord channels.

### 3. Application Review Board (`/dashboard/applications`)
- **See & Inspect Applications**: Detailed modal inspection displaying character name, Discord tag, role, Item Power (IP), submission date, and applicant comments.
- **Accept / Approve**: One-click candidate approval transitioning status to `Approved`.
- **Reject**: One-click rejection transitioning status to `Rejected` with reason logging.
- **Update & Edit**: Edit officer notes, feedback, and interview records.
- **Delete Application**: Remove expired or spam submissions from the review board.
- **New Create**: Manual recruitment submission form to record walk-in or vouched candidates.
- **Status Filtering**: Instant tab filtering across Total Applications, Pending Reviews (with pulse badge), Accepted, and Rejected.

### 4. Guild Overview & Management (`/dashboard/guild`)
- **Guild Overview**: Guild profile, bio, level, tax rate, and active member counter.
- **Create New Guild (`/dashboard/guild/create`)**: Multi-step guild creation wizard (name, tag, crest icon, focus activities, tax rates).
- **Update & Manage Guild**: Manage guild settings, banner colors, and alliance liaisons.
- **Announcements & Dispatches (`/dashboard/guild/announcements`)**: Internal guild notices and pinned officer dispatches.
- **Guild Statistics (`/dashboard/guild/stats`)**: Fame breakdown charts (PvP, PvE, Crafting, Gathering), seasonal progress, and member activity heatmaps.

### 5. Members & Role Permissions (`/dashboard/members`)
- **Roster Directory**: Full member list with ranks (Leader, Right Hand, Master of Coin, Warmaster, Officer, Member, Initiate).
- **Permissions Control (`/dashboard/members/roles`)**: Granular role-based permissions for recruitment, treasury, and event dispatch.

### 6. Events & CTA Coordinator (`/dashboard/events`)
- **CTA Scheduling**: Mandatory and optional CTA timers, party compositions, and gear IP requirements.
- **Attendance Tracker (`/dashboard/events/attendance`)**: Automated member attendance percentages and seasonal participation ratings.
