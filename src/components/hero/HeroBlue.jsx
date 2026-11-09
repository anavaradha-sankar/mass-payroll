// Option B: bold full-bleed brand-blue banner with white text
import { BrochurePill, StatRow } from './shared'

const chips = ['PF', 'ESI', 'PT', 'TDS', 'Payslips', 'Bank transfer files']

export default function HeroBlue() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#004466] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_0%,#0A7DB5_0%,#005F8F_40%,transparent_80%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(60%_70%_at_50%_30%,black,transparent)]" />
      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-20 text-center md:pt-28">
        <BrochurePill dark />
        <h1 className="animate-rise mt-8 text-5xl text-white [animation-delay:100ms] md:text-7xl">
          Payroll and compliance,<br />
          <span className="text-[#8FD3F5]">handled end to end.</span>
        </h1>
        <p className="animate-rise mx-auto mt-6 max-w-xl text-lg text-white/75 [animation-delay:200ms]">
          Outsource salaries, PF, ESI and statutory filings to specialists with two decades of experience — and focus on growing your business.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap justify-center gap-3 [animation-delay:300ms]">
          <a href="#contact" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5">Get started</a>
          <a href="#platform" className="rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15">See what's included</a>
        </div>
        <div className="animate-rise mt-10 flex flex-wrap justify-center gap-2 [animation-delay:400ms]">
          {chips.map((c) => (
            <span key={c} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-xs text-white/85">✓ {c}</span>
          ))}
        </div>
        <StatRow dark className="animate-rise mx-auto mt-12 max-w-2xl rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur [animation-delay:500ms]" />
      </div>
      <div className="relative h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
    </section>
  )
}
