export default function ProfilesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Public Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Profiles Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This page displays player profiles, character summaries, achievements, and community history for members and visitors.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Player Profile', 'Show player identity, guild role, and activity snapshot.'],
            ['Character Overview', 'List favorite builds, roles, and progression milestones.'],
            ['Achievements', 'Highlight notable accomplishments and notable community contributions.'],
            ['Guild History', 'Track members, alliances, and long-term participation records.'],
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
