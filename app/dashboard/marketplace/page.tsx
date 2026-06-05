export default function DashboardMarketplacePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Dashboard Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Marketplace Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This dashboard page helps officers review guild trading activity, open listings, and marketplace opportunities.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Open Listings', 'Track current market items and available offers.'],
            ['Buy and Sell', 'Monitor trader requests and trade activity.'],
            ['Price Trends', 'Support smarter decisions for guild traders.'],
            ['Market Notes', 'Store deal insights and group trade planning.'],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
