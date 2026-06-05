export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16 lg:px-10">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Albion Online Community Hub</p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">Home Page</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            This landing page introduces the Albion Online guild platform, its main areas, and the community tools that support guild leaders, officers, and players.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Guild Management", "/guild-management"],
            ["Alliance Management", "/alliance"],
            ["Recruitment", "/recruitment"],
            ["Build Library", "/builds"],
            ["Marketplace", "/marketplace"],
            ["Calculators", "/calculators"],
            ["Events", "/events"],
            ["Guides", "/guides"],
            ["Player Profiles", "/profiles"],
          ].map(([title, href]) => (
            <a
              key={title}
              href={href}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:bg-accent/40"
            >
              <h2 className="text-xl font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">Open this section to view the page content designed for the Albion Online platform.</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}