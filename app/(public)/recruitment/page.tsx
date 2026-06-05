export default function RecruitmentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 lg:px-10">
        <header className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Public Page</p>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl">Recruitment Page</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">This page manages recruitment pipelines, application forms, officer review flow, and the status of new member onboarding.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Open Positions', 'Highlight current needs for PvP, PvE, crafting, and support roles.'],
            ['Applications', 'Review candidate details, experience, and guild fit.'],
            ['Approval Flow', 'Track decisions, interviews, and onboarding tasks.'],
            ['Recruitment Metrics', 'Monitor conversion, response time, and applicant engagement.'],
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
