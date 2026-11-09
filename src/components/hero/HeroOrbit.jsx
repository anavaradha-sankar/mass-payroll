// Option 3 · "Orbit": brand-blue gradient banner; services orbit the MASS mark, with glass stat badges
import { BrochurePill, CountUp, Headline, heroStats, lede } from './shared'

const inner = ['PF', 'ESI', 'PT', 'TDS']
const outer = ['Payslips', 'Salary computation', 'Bank transfer files', 'Compliance updates', 'Cloud records', '24/7 access']

function Ring({ items, size, dur, reverse, chip }) {
  return (
    <div className={`absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/20 ${reverse ? 'animate-orbit-rev' : 'animate-orbit'}`}
      style={{ width: size, height: size, marginLeft: `calc(${size} / -2)`, marginTop: `calc(${size} / -2)`, '--dur': dur }}>
      {items.map((t, i) => {
        const ang = (360 / items.length) * i
        return (
          <div key={t} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${ang}deg) translateY(calc(${size} / -2)) rotate(${-ang}deg)` }}>
            <div className={`-translate-x-1/2 -translate-y-1/2 ${reverse ? 'animate-orbit' : 'animate-orbit-rev'}`} style={{ '--dur': dur }}>
              <span className={chip}>{t}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function HeroOrbit() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-to-br from-[#003A57] via-[#005F8F] to-[#0A7DB5] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_80%_40%,rgba(95,195,238,.35),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,black,transparent_60%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <BrochurePill dark />
          <Headline dark className="mt-7" gradient="bg-gradient-to-r from-[#BFE8FA] via-white to-[#BFE8FA]" />
          <p className="animate-rise mt-6 max-w-lg text-lg text-white/75 [animation-delay:200ms]">{lede}</p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:300ms]">
            <a href="#contact" className="group rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#005F8F] shadow-[0_14px_40px_-12px_rgba(0,0,0,.5)] transition hover:-translate-y-0.5">Get started <span className="inline-block transition group-hover:translate-x-1">→</span></a>
            <a href="#platform" className="rounded-lg border border-white/30 px-6 py-3 text-sm font-medium transition hover:bg-white/10">See what's included</a>
          </div>
        </div>

        <div className="animate-rise relative mx-auto aspect-square w-full max-w-[30rem] [--big:min(30rem,64vw)] md:[--big:30rem] [--small:calc(var(--big)*.58)] [animation-delay:250ms]">
          <div className="absolute inset-[18%] rounded-full bg-[#5FC3EE]/25 blur-3xl" />
          <Ring items={outer} size="var(--big)" dur="60s" chip="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs font-medium backdrop-blur-md" />
          <Ring items={inner} size="var(--small)" dur="40s" reverse chip="grid h-9 w-9 place-items-center rounded-full bg-white font-mono text-[10px] sm:h-12 sm:w-12 sm:text-xs font-bold text-[#005F8F] shadow-[0_8px_30px_rgba(0,0,0,.3)]" />
          <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 md:h-28 md:w-28 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_0_0_10px_rgba(255,255,255,.12),0_0_80px_rgba(95,195,238,.8)]">
            <img src="./logo.svg" alt="" className="w-14 md:w-20" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-10 max-w-6xl px-6 pb-16">
        <dl className="animate-rise grid gap-3 [animation-delay:500ms] sm:grid-cols-3">
          {heroStats.map((s) => (
            <div key={s.caption} className="flex flex-col-reverse justify-end rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <dt className="mt-1 text-sm text-white/70">{s.caption}</dt>
              <dd className="text-3xl font-semibold tracking-tight md:text-4xl"><CountUp to={s.to} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>
      </div>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-10 w-full text-background md:h-14" aria-hidden="true"><path fill="currentColor" d="M0 60V30C240 0 480 0 720 20s480 40 720 10v30Z" /></svg>
    </section>
  )
}
