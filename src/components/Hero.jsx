import { company } from '../content'

export default function Hero() {
  return (
    <section id="top" className="bg-hero relative">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-24 text-center md:pt-32">
        <a href={company.brochure} target="_blank" rel="noopener" className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium shadow-float">
          <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">PDF</span>
          Download our brochure →
        </a>
        <h1 className="animate-rise mt-8 text-5xl [animation-delay:100ms] md:text-7xl">
          Payroll and compliance,<br />
          <span className="text-muted-foreground">handled end to end.</span>
        </h1>
        <p className="animate-rise mx-auto mt-6 max-w-xl text-lg text-muted-foreground [animation-delay:200ms]">
          Outsource salaries, PF, ESI and statutory filings to specialists with two decades of experience — and focus on growing your business.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap justify-center gap-3 [animation-delay:300ms]">
          <a href="#contact" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-float transition hover:-translate-y-0.5">Get started</a>
          <a href="#platform" className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition hover:bg-secondary">See what's included</a>
        </div>
      </div>
    </section>
  )
}
