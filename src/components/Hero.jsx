// Hero: dark aurora banner, tilted live payroll dashboard with floating cards and cycling notifications
import { BrochurePill, Check, Headline, lede, useCycle } from './HeroParts'

const bars = [38, 52, 46, 61, 57, 70, 64, 77, 72, 85, 80, 96]
const toasts = [
  ['PF', 'ECR filed with EPFO'],
  ['ESI', 'Contribution remitted'],
  ['TDS', 'Deducted & deposited'],
  ['PT', 'Professional tax paid'],
  ['₹', 'Bank transfer file sent'],
]
const dues = [['PF', '15 Nov'], ['ESI', '15 Nov'], ['TDS', '07 Nov'], ['PT', '30 Nov']]

export default function Hero() {
  const t = useCycle(toasts.length, 2200)
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#041826] text-white">
      {/* aurora */}
      <div className="animate-drift absolute -left-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-[#005F8F] opacity-60 blur-[120px]" />
      <div className="animate-drift-slow absolute -right-32 top-20 -z-10 h-[32rem] w-[32rem] rounded-full bg-[#1A8FC4] opacity-40 blur-[120px]" />
      <div className="absolute inset-0 -z-10 opacity-[.14] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-36 pt-36 md:pb-52 md:pt-44 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <BrochurePill dark />
          <Headline dark className="mt-7" gradient="bg-gradient-to-r from-[#5FC3EE] via-white to-[#5FC3EE]" />
          <p className="animate-rise mt-6 max-w-lg text-lg text-white/70 [animation-delay:200ms]">{lede}</p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:300ms]">
            <a href="#contact" className="group relative overflow-hidden rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#004466] shadow-[0_10px_40px_-10px_rgba(95,195,238,.7)] transition hover:-translate-y-0.5">
              Get started <span className="inline-block transition group-hover:translate-x-1">→</span>
            </a>
            <a href="#platform" className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/10">See what's included</a>
          </div>
        </div>

        {/* dashboard composition */}
        <div className="animate-rise relative [animation-delay:250ms] [perspective:1600px]">
          <div className="relative rounded-2xl border border-white/10 bg-white/[.06] p-1.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl lg:[transform:rotateY(-12deg)_rotateX(6deg)]">
            <div className="rounded-xl bg-[#071F30]/90 p-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-[11px] text-white/45">MASS payroll · this month</span>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                  <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-300" /> Live
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[['Net pay', '₹42.2L'], ['Payslips', '100%'], ['Filings', '4 / 4']].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-white/10 bg-white/[.04] p-3">
                    <p className="text-[11px] text-white/50">{k}</p>
                    <p className="mt-1 text-lg font-semibold">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[.03] p-4">
                <div className="flex items-center justify-between text-[11px] text-white/50"><span>Net pay · 12 months</span><span className="text-[#5FC3EE]">▲ on time, every month</span></div>
                <div className="mt-3 flex h-28 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <span key={i} style={{ height: `${h}%`, animationDelay: `${400 + i * 60}ms` }}
                      className={`animate-grow-y flex-1 rounded-t-[3px] ${i === bars.length - 1 ? 'bg-gradient-to-t from-[#1A8FC4] to-[#5FC3EE] shadow-[0_0_20px_rgba(95,195,238,.6)]' : 'bg-white/15'}`} />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {dues.map(([c, d], i) => (
                  <div key={c} style={{ animationDelay: `${900 + i * 120}ms` }} className="animate-rise rounded-lg border border-white/10 bg-white/[.03] px-2.5 py-2">
                    <div className="flex items-center justify-between"><span className="font-mono text-xs font-semibold">{c}</span><span className="grid h-4 w-4 place-items-center rounded-full bg-[#1A8FC4]"><Check className="h-2.5 w-2.5" /></span></div>
                    <p className="mt-1 text-[10px] text-white/45">Due {d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* floating payslip */}
          <div className="animate-float absolute -bottom-20 -left-12 hidden w-52 rounded-xl border border-border bg-white p-4 text-foreground shadow-2xl sm:block">
            <div className="flex items-center justify-between"><p className="text-xs font-semibold">Payslip</p><span className="font-mono text-[10px] text-muted-foreground">EMP-0142</span></div>
            <div className="mt-3 space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Basic</span><span>₹32,000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">HRA</span><span>₹12,800</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">PF</span><span className="text-rose-600">−₹3,840</span></div>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-2 text-sm font-semibold"><span>Net pay</span><span className="text-primary">₹47,160</span></div>
          </div>

          {/* cycling notification */}
          <div className="absolute -right-3 -top-10 w-64 sm:-right-8 lg:-top-16" aria-live="polite">
            <div key={t} className="animate-toast flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#1A8FC4] to-[#5FC3EE] font-mono text-[11px] font-bold text-[#04192A]">{toasts[t][0]}</span>
              <div className="min-w-0"><p className="truncate text-sm font-medium">{toasts[t][1]}</p><p className="text-[11px] text-white/50">Just now · by MASS team</p></div>
            </div>
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 block h-16 w-full text-background md:h-28" aria-hidden="true">
        <path fill="currentColor" d="M0 120V70C360 10 1080 10 1440 70V120Z" />
      </svg>
    </section>
  )
}
