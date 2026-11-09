// Option 2 · "Payroll pipeline": light aurora banner; an animated flow shows each month's payroll moving from attendance to filed returns
import { BrochurePill, Check, CountUp, Headline, heroStats, lede, useCycle } from './shared'

const steps = [
  { t: 'Attendance in', d: 'Inputs collected', icon: 'M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z' },
  { t: 'Salary computed', d: 'Every allowance & deduction', icon: 'M4 4h16v16H4zM8 8h8M8 12h2m4 0h2m-8 4h2m4 0h2' },
  { t: 'Payslips issued', d: 'To every employee', icon: 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M9 13h6m-6 4h4' },
  { t: 'Salaries paid', d: 'Bank transfer file sent', icon: 'M3 10l9-6 9 6M5 10v8m4-8v8m6-8v8m4-8v8M3 20h18' },
  { t: 'Compliance filed', d: 'PF · ESI · PT · TDS', icon: 'M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6l7-3Zm-3 9 2 2 4-4' },
]

export default function HeroPipeline() {
  const a = useCycle(steps.length + 1, 1100) // last tick = all done
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="animate-drift absolute -left-40 -top-56 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#5FC3EE]/40 blur-[110px]" />
      <div className="animate-drift-slow absolute -right-40 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#005F8F]/25 blur-[110px]" />
      <div className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(60%_55%_at_50%_10%,black,transparent)]" />

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 text-center md:pt-28">
        <BrochurePill />
        <Headline className="mx-auto mt-8 max-w-4xl" gradient="bg-gradient-to-r from-[#005F8F] via-[#1A8FC4] to-[#005F8F]" />
        <p className="animate-rise mx-auto mt-6 max-w-xl text-lg text-muted-foreground [animation-delay:200ms]">{lede}</p>
        <div className="animate-rise mt-9 flex flex-wrap justify-center gap-3 [animation-delay:300ms]">
          <a href="#contact" className="group rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-10px_rgba(0,95,143,.7)] transition hover:-translate-y-0.5">Get started <span className="inline-block transition group-hover:translate-x-1">→</span></a>
          <a href="#platform" className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-secondary">See what's included</a>
        </div>

        {/* pipeline */}
        <div className="animate-rise relative mx-auto mt-16 max-w-5xl rounded-3xl border border-border bg-card/70 p-6 text-left shadow-[0_30px_80px_-30px_rgba(0,62,94,.35)] backdrop-blur-xl [animation-delay:450ms] md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Your monthly payroll, with MASS</p>
            <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition ${a === steps.length ? 'bg-emerald-500/12 text-emerald-700' : 'bg-accent/12 text-accent'}`}>
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-current" /> {a === steps.length ? 'All done, on time' : 'In progress…'}
            </span>
          </div>
          <div className="relative">
            {/* rail */}
            <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-0.5 bg-border md:left-[10%] md:right-[10%] md:top-5 md:h-0.5 md:w-auto" />
            <div style={{ '--p': `${Math.min(a, steps.length - 1) / (steps.length - 1)}` }}
              className="absolute left-5 top-5 h-[calc((100%-2.5rem)*var(--p))] w-0.5 bg-gradient-to-b from-primary to-accent transition-all duration-700 md:left-[10%] md:top-5 md:h-0.5 md:w-[calc(80%*var(--p))] md:bg-gradient-to-r" />
            <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
              {steps.map((s, i) => {
                const done = i < a, now = i === a
                return (
                  <li key={s.t} className="flex items-center gap-4 md:flex-col md:text-center">
                    <span className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition duration-500 ${done ? 'border-primary bg-primary text-white' : now ? 'border-accent bg-card text-accent shadow-[0_0_0_6px_rgba(26,143,196,.15)]' : 'border-border bg-card text-muted-foreground'}`}>
                      {done ? <Check className="h-4 w-4" /> : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
                      )}
                      {now && <span className="absolute inset-0 animate-ping rounded-full border-2 border-accent/50" />}
                    </span>
                    <div>
                      <p className={`text-sm font-semibold transition ${done || now ? 'text-foreground' : 'text-muted-foreground'}`}>{s.t}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
            {heroStats.map((s) => (
              <div key={s.caption} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-xs text-muted-foreground">{s.caption}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-primary md:text-4xl"><CountUp to={s.to} suffix={s.suffix} /></dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
