export default function BuildsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Public Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Builds Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This page showcases the build library for PvP, PvE, gathering, and crafting roles, with search and filtering for quick discovery.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['PvP Builds', 'Fast, high-impact setup guides for duels, wars, and open-field fights.'],
            ['PvE Builds', 'Efficient and durable loadouts for dungeons, bosses, and solo progression.'],
            ['Gathering Builds', 'Tools and setups that improve resource collection and efficiency.'],
            ['Crafting Builds', 'Specialized plans that improve crafting speed, success, and profits.'],
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
