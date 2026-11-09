import { benefits } from '../content'
import Reveal from './Reveal'

export default function Why() {
  return (
    <section id="why" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-4xl md:text-5xl">Outsource to grow your business</h2>
          <p className="mt-6 text-lg text-muted-foreground">Payroll and statutory compliance are crucial processes. Accurate and timely processing helps your business grow better — and our qualified experts deliver with quick turnaround so you can focus on your core activities.</p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b} delay={i * 80} className="lift rounded-xl border border-border bg-background p-5">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-3 font-medium">{b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
