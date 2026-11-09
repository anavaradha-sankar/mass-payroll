// Option A: split layout, headline left, live "payroll run" card right
import { remittances } from '../../content'
import { BrochurePill, Check, StatRow } from './shared'

export default function HeroSplit() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_85%_10%,rgba(26,143,196,.22),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(0,95,143,.14),transparent_70%)]" />
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(70%_60%_at_70%_20%,black,transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_1fr] md:pt-24">
        <div>
          <BrochurePill />
          <h1 className="animate-rise mt-7 text-5xl [animation-delay:100ms] md:text-6xl">
            Payroll and compliance,{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">handled end to end.</span>
          </h1>
          <p className="animate-rise mt-6 max-w-lg text-lg text-muted-foreground [animation-delay:200ms]">
            Outsource salaries, PF, ESI and statutory filings to specialists with two decades of experience — and focus on growing your business.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:300ms]">
            <a href="#contact" className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-float transition hover:-translate-y-0.5">Get started</a>
            <a href="#platform" className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-secondary">See what's included</a>
          </div>
          <StatRow className="animate-rise mt-10 max-w-md border-t border-border pt-6 [animation-delay:400ms]" />
        </div>

        <div className="animate-rise relative [animation-delay:250ms]">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
          <div className="relative rounded-2xl border border-border bg-card p-5 shadow-float">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Payroll run · this month</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">₹42,18,900</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-xs font-medium text-accent">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" /> Processed
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="animate-grow-x h-full w-full rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <ul className="mt-5 space-y-2">
              {remittances.map(([code, text], i) => (
                <li key={code} style={{ animationDelay: `${500 + i * 150}ms` }} className="animate-rise flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground"><Check /></span>
                  <span className="w-9 font-mono text-xs font-medium">{code}</span>
                  <span className="text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-float absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-float md:flex">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></span>
            Payslips sent to all employees
          </div>
        </div>
      </div>
    </section>
  )
}
