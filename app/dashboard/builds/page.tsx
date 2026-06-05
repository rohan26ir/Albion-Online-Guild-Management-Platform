export default function DashboardBuildsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Dashboard Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Builds Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This dashboard page supports build curation, role recommendations, and community build management.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Featured Builds', 'Spotlight the best community builds for each role.'],
            ['Role Groups', 'Organize PvP, PvE, gathering, and crafting setups.'],
            ['Reviews', 'Gather member feedback and update build notes.'],
            ['Build Tags', 'Keep builds searchable and easy to compare.'],
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
