'use client'

import {
	createContext,
	Fragment,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'
import DraggableWidgetGrid, { type WidgetItem } from '@/components/ui/draggable-widget-grid'

/* ------------------------------------------------------------------ *
 * Demo: a guild management dashboard with eight widgets.
 *
 * All data is simulated and updates every few seconds.
 * ------------------------------------------------------------------ */

type Kind =
	| 'members'
	| 'profit'
	| 'market'
	| 'auction'
	| 'events'
	| 'crafting'
	| 'activities'
	| 'rrr'

interface Widget extends WidgetItem {
	kind: Kind
}

const WIDGETS: Widget[] = [
	{ id: 'members', kind: 'members', size: 'wide', label: 'Active Members Today' },
	{ id: 'profit', kind: 'profit', size: 'sm', label: 'Profit Tracker' },
	{ id: 'market', kind: 'market', size: 'sm', label: 'Market Trading' },
	{ id: 'auction', kind: 'auction', size: 'sm', label: 'Auction Bidding' },
	{ id: 'events', kind: 'events', size: 'wide', label: 'Recent ZvZ Events' },
	{ id: 'crafting', kind: 'crafting', size: 'sm', label: 'Crafting Output' },
	{ id: 'activities', kind: 'activities', size: 'wide', label: 'Activity Breakdown' },
	{ id: 'rrr', kind: 'rrr', size: 'wide', label: 'Resource Return Rate' },
]

/* ------------------------------------------------------------------ *
 * Live data
 * ------------------------------------------------------------------ */

const LiveContext = createContext(true)

const PALETTE = [
	'[--background:#ffffff] [--color-background:#ffffff] [--foreground:#09090b] [--color-foreground:#09090b] [--card:#ffffff] [--color-card:#ffffff] [--card-foreground:#09090b] [--color-card-foreground:#09090b] [--muted-foreground:#71717a] [--color-muted-foreground:#71717a] [--border:#e4e4e7] [--color-border:#e4e4e7] [--ring:#18181b] [--color-ring:#18181b]',
	'dark:[--background:#0a0a0b] dark:[--color-background:#0a0a0b] dark:[--foreground:#fafafa] dark:[--color-foreground:#fafafa] dark:[--card:#141417] dark:[--color-card:#141417] dark:[--card-foreground:#fafafa] dark:[--color-card-foreground:#fafafa] dark:[--muted-foreground:#a1a1aa] dark:[--color-muted-foreground:#a1a1aa] dark:[--border:#27272a] dark:[--color-border:#27272a] dark:[--ring:#d4d4d8] dark:[--color-ring:#d4d4d8]',
].join(' ')

const FONT_URL =
	'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'
const FONT =
	"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

/** A counter that advances while live data is on and the page is visible. */
function useTick(ms = 2000) {
	const live = useContext(LiveContext)
	const [tick, setTick] = useState(0)
	useEffect(() => {
		if (!live) return
		const id = window.setInterval(() => {
			if (!document.hidden) setTick((t) => t + 1)
		}, ms)
		return () => window.clearInterval(id)
	}, [live, ms])
	return tick
}

function noise(seed: number) {
	const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
	return x - Math.floor(x)
}

const fmt = (v: number) => v.toLocaleString('en-US')

const median = (values: number[]) => {
	const sorted = [...values].sort((a, b) => a - b)
	const mid = Math.floor(sorted.length / 2)
	return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

const duration = (v: number) =>
	v >= 1000 ? `${(v / 1000).toFixed(2)}s` : `${Math.round(v)}ms`

/* ------------------------------------------------------------------ *
 * Palette
 * ------------------------------------------------------------------ */

type Tone = 'ok' | 'warn' | 'err' | 'idle'

const DOT: Record<Tone, string> = {
	ok: 'bg-emerald-500',
	warn: 'bg-amber-500',
	err: 'bg-rose-500',
	idle: 'bg-muted-foreground/60',
}

const TEXT: Record<Tone, string> = {
	ok: 'text-emerald-600 dark:text-emerald-400',
	warn: 'text-amber-600 dark:text-amber-300',
	err: 'text-rose-600 dark:text-rose-400',
	idle: 'text-muted-foreground',
}

const ACCENT = 'bg-blue-500 dark:bg-blue-400'

const HEAT = [
	'bg-foreground/[0.06]',
	'bg-blue-500/20',
	'bg-blue-500/35',
	'bg-blue-500/55',
	'bg-blue-500/85 dark:bg-blue-400/85',
]

/* ------------------------------------------------------------------ *
 * Building blocks
 * ------------------------------------------------------------------ */

function Shell({
	title,
	meta,
	children,
}: {
	title: string
	meta?: ReactNode
	children: ReactNode
}) {
	return (
		<section className="@container flex h-full flex-col gap-4 p-4 sm:p-[22px]">
			<header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-[14px] leading-none">
				<h3 className="truncate text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
					{title}
				</h3>
				{meta && <span className="shrink-0 text-muted-foreground">{meta}</span>}
			</header>
			<div className="flex min-h-0 flex-1 flex-col">{children}</div>
		</section>
	)
}

function Big({
	children,
	unit,
	unitWide = false,
}: {
	children: ReactNode
	unit?: string
	unitWide?: boolean
}) {
	return (
		<p className="text-[28px] leading-none font-normal tracking-tight text-foreground tabular-nums @[240px]:text-[30px]">
			{children}
			{unit && (
				<span
					className={`text-[13px] tracking-normal text-muted-foreground ${
						unitWide ? 'sr-only @[200px]:not-sr-only' : ''
					}`}>
					{'\u00a0'}
					{unit}
				</span>
			)}
		</p>
	)
}

function Delta({
	value,
	against,
	suffix,
	good = 'up',
}: {
	value: number
	against: string
	suffix?: string
	good?: 'up' | 'down'
}) {
	const up = value >= 0
	const tone: Tone = up === (good === 'up') ? 'ok' : 'err'
	return (
		<span className={`text-[14px] tabular-nums ${TEXT[tone]}`}>
			<span aria-hidden="true">{up ? '↑' : '↓'} </span>
			{Math.abs(value)}%
			{suffix && (
				<span aria-hidden="true" className="text-muted-foreground">
					{' '}
					{suffix}
				</span>
			)}
			<span className="sr-only"> {against}</span>
		</span>
	)
}

function Dot({ tone, pulse = false }: { tone: Tone; pulse?: boolean }) {
	return (
		<span aria-hidden="true" className="relative inline-flex size-2 shrink-0">
			{pulse && (
				<span
					className={`absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden ${DOT[tone]}`}
				/>
			)}
			<span className={`relative size-2 rounded-full ${DOT[tone]}`} />
		</span>
	)
}

function Row({
	children,
	value,
	className = '',
}: {
	children: ReactNode
	value: ReactNode
	className?: string
}) {
	return (
		<div className={`flex items-center gap-2 text-[13px] ${className}`}>
			<dt className="flex min-w-0 items-center gap-2 truncate text-foreground">
				{children}
			</dt>
			<dd className="ml-auto text-muted-foreground tabular-nums">{value}</dd>
		</div>
	)
}

/* ------------------------------------------------------------------ *
 * Members (Adapted from Runs)
 * ------------------------------------------------------------------ */

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Today']
const SLOTS = 32
const SLOT_MINUTES = 45
const NOW = 28
const HOURS = ['00 UTC', '06 UTC', '12 UTC', '18 UTC']

function membersAt(day: number, slot: number) {
	const hour = (slot * SLOT_MINUTES) / 60
	const weekend = DAYS[day] === 'Sat' || DAYS[day] === 'Sun'
	const shape =
		3.5 +
		Math.exp(-((hour - 18) ** 2) / 20) * 22 +
		Math.exp(-((hour - 10) ** 2) / 10) * 11
	return Math.max(
		0,
		Math.round(
			shape * 1.5 * (weekend ? 1.2 : 1) * (0.5 + noise(day * 97 + slot)),
		),
	)
}

const slotClock = (slot: number) => {
	const minutes = slot * SLOT_MINUTES
	return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

function Members() {
	const t = useTick(2500)
	const today = DAYS.length - 1
	const grid = DAYS.map((_, d) =>
		Array.from({ length: SLOTS }, (_, s) =>
			d === today && s > NOW
				? null
				: membersAt(d, s) + (d === today && s === NOW ? t % 8 : 0),
		),
	)
	const peak = Math.max(...grid.flat().map((v) => v ?? 0))
	const total = grid[today].reduce<number>((a, v) => a + (v ?? 0), 0)

	return (
		<Shell
			title="Active Members"
			meta={
				<Delta
					value={5}
					against="compared with yesterday"
					suffix="vs yesterday"
				/>
			}>
			<Big>{fmt(total)}</Big>
			<div className="mt-auto">
				<div
					role="img"
					aria-label={`Active members per 45 minutes over the last 5 days. ${fmt(total)} logins so far today.`}
					className="grid grid-cols-1 items-center gap-x-3 gap-y-[3px] @[480px]:grid-cols-[auto_minmax(0,1fr)]">
					{grid.map((row, d) => (
						<Fragment key={DAYS[d]}>
							<span
								aria-hidden="true"
								className={`hidden text-[12px] leading-none @[480px]:block ${
									d === today ? 'text-foreground' : 'text-muted-foreground'
								}`}>
								{DAYS[d]}
							</span>
							<span className="grid grid-cols-[repeat(32,minmax(0,1fr))] gap-[3px]">
								{row.map((v, s) => {
									const level =
										v === null || v === 0
											? 0
											: Math.max(1, Math.ceil((v / peak) * 4))
									return (
										<span
											key={s}
											title={
												v === null
													? undefined
													: `${DAYS[d]} ${slotClock(s)} · ${v} members online`
											}
											className={`aspect-square rounded-[2.5px] transition-colors duration-700 motion-reduce:transition-none ${
												d === today && s === NOW
													? 'bg-blue-600 dark:bg-blue-300'
													: HEAT[level]
											}`}
										/>
									)
								})}
							</span>
						</Fragment>
					))}
					<span aria-hidden="true" className="hidden @[480px]:block" />
					<span
						aria-hidden="true"
						className="mt-2 hidden grid-cols-4 text-[12px] text-muted-foreground @[480px]:grid">
						{HOURS.map((h) => (
							<span key={h}>{h}</span>
						))}
					</span>
				</div>
			</div>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Profit Tracker (Adapted from Health)
 * ------------------------------------------------------------------ */

const PROFIT_DROPS: Record<number, Tone> = { 8: 'warn', 21: 'warn' }

function Profit() {
	const t = useTick(5000)
	const belowMargin = t % 6 === 5
	return (
		<Shell title="Profit Tracker" meta="30d">
			<Big unit="margin" unitWide>
				24.5%
			</Big>
			<p
				className={`mt-3 flex items-center gap-2 text-[13px] ${
					belowMargin ? TEXT.warn : 'text-foreground'
				}`}>
				<Dot tone={belowMargin ? 'warn' : 'ok'} pulse />
				<span className="truncate">
					{belowMargin ? 'Below Target Margin' : 'Optimal Profitability'}
				</span>
			</p>
			<div className="mt-auto">
				<div
					role="img"
					aria-label="Profit margins over the last 30 days."
					className="flex h-5 gap-[2px] @[240px]:h-6">
					{Array.from({ length: 30 }, (_, i) => (
						<span
							key={i}
							className={`flex-1 rounded-[1.5px] ${
								PROFIT_DROPS[i] ? 'bg-amber-400/80' : 'bg-foreground/15'
							}`}
						/>
					))}
				</div>
			</div>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Market (Adapted from Cost)
 * ------------------------------------------------------------------ */

function Market() {
	const t = useTick(3000)
	const days = Array.from({ length: 14 }, (_, i) =>
		Math.round(20 + noise(i * 5) * 15 + i * 1.5),
	)
	days[13] = Math.round(25 + (t % 30) * 0.5)
	const month = 485.2 + (t % 30) * 0.15
	const max = Math.max(...days)
	return (
		<Shell
			title="Market Trading"
			meta={
				<Delta
					value={12}
					against="compared with last month"
					suffix="MoM"
					good="up"
				/>
			}>
			<Big unit="M MTD">{month.toFixed(1)}</Big>
			<div
				role="img"
				aria-label={`Daily market volume over the last 14 days, up to ${max}M.`}
				className="mt-auto flex h-10 items-end gap-[3px]">
				{days.map((d, i) => (
					<span
						key={i}
						className={`flex-1 rounded-full transition-[height] duration-700 motion-reduce:transition-none ${
							i === days.length - 1 ? ACCENT : 'bg-foreground/15'
						}`}
						style={{ height: `${(d / max) * 100}%` }}
					/>
				))}
			</div>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Auction (Adapted from Failures)
 * ------------------------------------------------------------------ */

function Auction() {
	const t = useTick(6000)
	const bids = [
		{ name: 'Dragonfire', amount: '1.2B', status: 'warn' as Tone },
		{ name: "Elder's Mammoth", amount: '515M', status: 'ok' as Tone },
		{ name: 'Mammoth', amount: '335M', status: 'idle' as Tone },
	]
	const activeBids = 14 + (t % 3)
	
	return (
		<Shell title="Auction Bidding" meta="Live">
			<Big unit="active bids">{activeBids}</Big>
			<dl className="mt-auto space-y-2">
				{bids.map((b) => (
					<Row key={b.name} value={b.amount}>
						<Dot tone={b.status} pulse={b.status === 'warn'} />
						<span className="truncate">{b.name}</span>
					</Row>
				))}
			</dl>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Events (Adapted from Traces)
 * ------------------------------------------------------------------ */

const ZVZ_ZONES = [
	"Arthur's Rest",
	"Morgana's Rest",
	'Hightree Enclave',
	'Dryvein Cross',
	'Everwinter Reach',
]

function zvzEvent(n: number) {
	const r = noise(n * 3)
	const tone: Tone = r > 0.85 ? 'err' : r > 0.6 ? 'warn' : 'ok'
	return {
		n,
		id: `zvz_${Math.floor(noise(n) * 0xffffff)
			.toString(16)
			.padStart(6, '0')}`,
		zone: ZVZ_ZONES[Math.floor(noise(n * 7) * ZVZ_ZONES.length)],
		kills: Math.floor(10 + noise(n * 13) * 50),
		tone,
	}
}

const EVENT_RESULT: Record<Tone, string> = {
	ok: 'Victory',
	warn: 'Draw',
	err: 'Defeat',
	idle: 'Ongoing',
}

function Events() {
	const t = useTick(2200)
	const rows = Array.from({ length: 4 }, (_, i) => zvzEvent(t + 40 - i))
	const mostKills = 60
	return (
		<Shell
			title="Recent ZvZ Events"
			meta={
				<span className="flex items-center gap-1.5">
					<Dot tone="ok" pulse />
					live
				</span>
			}>
			<Big unit="kills (avg)">{Math.round(median(rows.map((r) => r.kills)))}</Big>
			<ol
				aria-label="Most recent ZvZ battles"
				className="mt-auto space-y-2 text-[13px]">
				{rows.map((r, i) => (
					<li
						key={r.n}
						className={`grid-cols-[6px_minmax(0,1fr)_60px] items-center gap-3 @[440px]:grid-cols-[6px_84px_minmax(0,1fr)_26%_60px] ${
							i === 0 ? 'text-foreground' : 'text-muted-foreground'
						} ${
							i >= 3
								? 'hidden @[520px]:grid'
								: i === 2
									? 'hidden @[360px]:grid'
									: 'grid'
						}`}>
						<Dot tone={r.tone} />
						<span className="truncate">
							{r.id}
							<span className="sr-only">
								, {EVENT_RESULT[r.tone]}, {r.zone},
							</span>
						</span>
						<span aria-hidden="true" className="hidden truncate @[440px]:block">
							{r.zone}
						</span>
						<span
							aria-hidden="true"
							className="hidden h-[3px] rounded-full bg-foreground/10 @[440px]:block">
							<span
								className={`block h-full rounded-full ${i === 0 ? ACCENT : 'bg-foreground/25'}`}
								style={{ width: `${(r.kills / mostKills) * 100}%` }}
							/>
						</span>
						<span className="text-right tabular-nums">{r.kills} K</span>
					</li>
				))}
			</ol>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Crafting (Adapted from Evals)
 * ------------------------------------------------------------------ */

const CRAFTING_TYPES = [
	{ name: 'Weapons', value: 840 },
	{ name: 'Armor', value: 320 },
	{ name: 'Consumables', value: 195 },
]

function Crafting() {
	const total = CRAFTING_TYPES.reduce((a, e) => a + e.value, 0)
	return (
		<Shell title="Crafting Output">
			<div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
				<Big unit="Items">{total.toFixed(0)}</Big>
				<span className={`text-[14px] tabular-nums ${TEXT.ok}`}>
					<span aria-hidden="true">↑ </span>154
					<span className="sr-only"> this week</span>
				</span>
			</div>
			<dl className="mt-auto space-y-2">
				{CRAFTING_TYPES.map((e) => (
					<Row key={e.name} value={e.value}>
						{e.name}
					</Row>
				))}
			</dl>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Activities (Adapted from Tools)
 * ------------------------------------------------------------------ */

const ACTIVITIES = [
	{ name: 'Fame Farming (Static)', hours: 412 },
	{ name: 'ZvZ Roaming', hours: 268 },
	{ name: 'Gathering (T8)', hours: 197 },
	{ name: 'Ganking / PvP', hours: 143 },
]

function Activities() {
	const t = useTick(3000)
	const rows = ACTIVITIES.map((act, i) => ({
		...act,
		hours: act.hours + Math.floor((t % 50) * (4 - i) * 0.6),
	}))
	const max = Math.max(...rows.map((r) => r.hours))
	const total = rows.reduce((a, r) => a + r.hours, 0)
	return (
		<Shell title="Activity Breakdown" meta="24h">
			<Big unit="hours">{fmt(total)}</Big>
			<table className="mt-auto w-full table-fixed text-left text-[13px]">
				<caption className="sr-only">Activity hours in the last 24 hours</caption>
				<thead className="sr-only">
					<tr>
						<th scope="col">Activity</th>
						<th scope="col">share</th>
						<th scope="col">hours</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r, i) => (
						<tr
							key={r.name}
							className={
								i >= 3
									? 'hidden @[520px]:table-row'
									: i === 2
										? 'hidden @[360px]:table-row'
										: ''
							}>
							<th
								scope="row"
								className={`w-[140px] truncate py-[6px] pr-3 font-normal ${
									i === 0 ? 'text-foreground' : 'text-muted-foreground'
								}`}>
								{r.name}
							</th>
							<td className="py-[6px]">
								<span
									aria-hidden="true"
									className="block h-[3px] rounded-full bg-foreground/10">
									<span
										className={`block h-full rounded-full transition-[width] duration-700 motion-reduce:transition-none ${
											i === 0 ? ACCENT : 'bg-foreground/25'
										}`}
										style={{ width: `${(r.hours / max) * 100}%` }}
									/>
								</span>
							</td>
							<td className="w-[56px] py-[6px] text-right text-muted-foreground tabular-nums">
								{r.hours}h
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Resource Return Rate (RRR)
 * ------------------------------------------------------------------ */

const RRR_RATES = [
	{ city: 'Martlock', rate: '36.7%', item: 'Hide', swatch: ACCENT },
	{ city: 'Bridgewatch', rate: '42.1%', item: 'Stone', swatch: 'bg-blue-500/70 dark:bg-blue-400/70' },
	{ city: 'Lymhurst', rate: '36.7%', item: 'Wood', swatch: 'bg-blue-500/45 dark:bg-blue-400/45' },
	{ city: 'Fort Sterling', rate: '36.7%', item: 'Ore', swatch: 'bg-foreground/20' },
	{ city: 'Thetford', rate: '45.3%', item: 'Fiber', swatch: 'bg-foreground/15' },
	{ city: 'Caerleon', rate: '24.8%', item: 'Food', swatch: 'bg-foreground/10' },
]

function RRR() {
	return (
		<Shell title="Return Rate (RRR)" meta="Daily Bonus">
			<Big unit="Focus Base">53.9%</Big>
			<dl className="mt-auto grid grid-cols-1 @[380px]:grid-cols-2 gap-x-6 gap-y-2">
				{RRR_RATES.map((r, i) => (
					<Row key={r.city} value={r.rate}>
						<span
							aria-hidden="true"
							className={`size-1.5 shrink-0 rounded-full ${r.swatch}`}
						/>
						<span className="truncate">{r.city} <span className="text-muted-foreground">({r.item})</span></span>
					</Row>
				))}
			</dl>
			<div
				role="img"
				aria-label={`RRR base rate: ${RRR_RATES.map((m) => `${m.city} ${m.rate}`).join(', ')}.`}
				className="mt-4 flex h-[3px] gap-[3px]">
				{RRR_RATES.map((m) => (
					<span
						key={m.city}
						className={`h-full rounded-full ${m.swatch}`}
						style={{ width: `${100 / RRR_RATES.length}%` }}
					/>
				))}
			</div>
		</Shell>
	)
}

/* ------------------------------------------------------------------ *
 * Board
 * ------------------------------------------------------------------ */

const VIEWS: Record<Kind, () => ReactNode> = {
	members: Members,
	profit: Profit,
	market: Market,
	auction: Auction,
	events: Events,
	crafting: Crafting,
	activities: Activities,
	rrr: RRR,
}

const renderWidget = (item: Widget) => {
	const View = VIEWS[item.kind]
	return <View />
}

export default function DashboardWidgetDemo() {
	const [live, setLive] = useState(true)

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			setLive(false)
	}, [])

	return (
		<div className="w-full">
			<p className="mb-4 text-[14px] text-muted-foreground">
				<span className="[@media(pointer:coarse)]:hidden">
					Drag and rearrange widgets to customize the layout.
				</span>
				<span className="hidden [@media(pointer:coarse)]:inline">
					Press and hold a widget, then drag to rearrange the layout.
				</span>
			</p>
			<section aria-labelledby="agent-observability-title">
				<h2 id="agent-observability-title" className="sr-only">
					Guild observability
				</h2>
				<LiveContext.Provider value={live}>
					<DraggableWidgetGrid
						items={WIDGETS}
						renderItem={(item) => renderWidget(item as Widget)}
					/>
				</LiveContext.Provider>
			</section>
		</div>
	)
}
