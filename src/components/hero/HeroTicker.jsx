// Option C: keeps today's centred layout, adds gradient headline, trust strip and a scrolling compliance ticker
import { BrochurePill, StatRow } from './shared'

const items = ['Salary computation', 'Payslips', 'Bank transfer files', 'PF challan & ECR', 'ESI contribution', 'Professional tax', 'TDS deposit', 'Compliance updates', 'Secure cloud records']

export default function HeroTicker() {
  const row = [...items, ...items]
  return (
    <section id="top" className="bg-hero relative overflow-hidden">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-24 text-center md:pt-32">
        <BrochurePill />
        <h1 className="animate-rise mt-8 text-5xl [animation-delay:100ms] md:text-7xl">
          Payroll and compliance,<br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">handled end to end.</span>
        </h1>
        <p className="animate-rise mx-auto mt-6 max-w-xl text-lg text-muted-foreground [animation-delay:200ms]">
          Outsource salaries, PF, ESI and statutory filings to specialists with two decades of experience — and focus on growing your business.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap justify-center gap-3 [animation-delay:300ms]">
          <a href="#contact" className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-float transition hover:-translate-y-0.5">Get started</a>
          <a href="#platform" className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-secondary">See what's included</a>
        </div>
        <StatRow className="animate-rise mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card/80 p-6 shadow-float backdrop-blur [animation-delay:400ms]" />
      </div>
      <div className="relative border-y border-border bg-card/60 py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{t}</span>
          ))}
        </div>
      </div>
      <div className="h-16" />
    </section>
  )
}
