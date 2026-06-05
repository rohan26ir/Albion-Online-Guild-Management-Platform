export default function DashboardEventsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Dashboard Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Events Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This dashboard page manages guild events, call-to-arms, schedules, and attendance planning.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Weekly Schedule', 'Plan raids, training, and alliance coordination.'],
            ['Call to Arms', 'Issue urgent participation requests quickly.'],
            ['Attendance', 'See who joined and who still needs reminders.'],
            ['Event Notes', 'Store event summaries and leadership updates.'],
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
