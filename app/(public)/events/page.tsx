export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Public Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Events Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This page keeps the community informed about guild events, alliance operations, call-to-arms, and event attendance.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Upcoming Events', 'Publish the next guild raids, training sessions, and special activities.'],
            ['Call to Arms', 'Coordinate urgent requests, rally points, and participation reminders.'],
            ['Event Calendar', 'Show dates, durations, and scheduling details in one place.'],
            ['Attendance Tracking', 'Keep leaders aligned on who is participating and who needs follow-up.'],
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
