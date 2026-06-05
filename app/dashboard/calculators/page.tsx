export default function DashboardCalculatorsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Dashboard Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Calculators Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This dashboard page helps officers and members manage planning tools, efficiency estimates, and resource calculations.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Profit Tools', 'Estimate item value, tax, and expected margins.'],
            ['Resource Planning', 'Support crafting and gathering preparation.'],
            ['Fame Tracking', 'Measure progression and long-term goals.'],
            ['Refining Insights', 'Compare outcomes for smarter resource use.'],
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
