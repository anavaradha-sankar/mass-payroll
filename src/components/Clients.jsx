import { useEffect, useRef, useState } from 'react'
import { clients } from '../content'
import Reveal from './Reveal'
import { Check, useCycle } from './HeroParts'

// Mockup switch: ?clients=1 scrolling logo strip, ?clients=2 logo wall + stats, ?clients=3 client cards with details,
// ?clients=7 spotlight, ?clients=8 dark payroll-run board, ?clients=9 orbit
// ?clients=4 bento like service cards, ?clients=5 sky band like Why, ?clients=6 navy panel like Contact
export const clientsStyle = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('clients') || '1') : '1'

const totalEmployees = clients.reduce((n, c) => n + c.employees, 0)

const Logo = ({ c, className = '' }) => <img src={c.logo} alt={c.name} loading="lazy" className={`object-contain ${className}`} />

function Kicker({ children }) {
  return <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-accent"><span className="h-1.5 w-1.5 rounded-full bg-sky" />{children}</p>
}

// Option 1: a slim band of logos that scrolls sideways, sitting between the service cards and "Why"
function Strip() {
  const row = [...clients, ...clients]
  return (
    <section id="clients" className="border-y border-border bg-card py-12">
      <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">Trusted by businesses we run payroll for every month</p>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-[marquee_35s_linear_infinite] items-center gap-16 hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <li key={i} aria-hidden={i >= clients.length} className="grid h-16 w-44 place-items-center">
              <Logo c={c} className="max-h-16 max-w-44" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Option 2: heading + numbers on the left, a grid of logo tiles on the right
function Wall() {
  return (
    <section id="clients" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-10 rounded-[2rem] border border-border bg-card p-8 sm:p-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
        <Reveal>
          <Kicker>Our clients</Kicker>
          <h2 className="mt-3 text-4xl md:text-5xl">Businesses that trust MASS with payroll</h2>
          <p className="mt-5 text-muted-foreground">From restaurants to manpower agencies and manufacturers, we run payroll and statutory compliance every month.</p>
          <div className="mt-8 flex gap-10">
            <div><p className="text-5xl font-semibold tracking-tighter text-primary tabular-nums">{totalEmployees}</p><p className="mt-1 text-sm text-muted-foreground">Employees paid each month<br />across our top clients</p></div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 50} className={`lift grid h-28 place-items-center rounded-xl border border-border bg-white p-4 ${i === clients.length - 1 && clients.length % 3 === 1 ? 'sm:col-start-2' : ''}`}>
              <Logo c={c} className="max-h-20 w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Option 3: one card per client with logo, business type and employees paid
function Cards() {
  return (
    <section id="clients" className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Kicker>Our clients</Kicker>
          <h2 className="mt-3 text-4xl md:text-5xl">Trusted across industries</h2>
        </div>
        <p className="max-w-md text-muted-foreground">Some of the companies whose payroll and compliance we handle every month: <span className="font-semibold text-foreground">{totalEmployees} employees</span> paid on time.</p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clients.map((c, i) => (
          <Reveal key={c.name} delay={i * 60} className="lift flex flex-col rounded-2xl border border-border bg-card p-5">
            <div className="grid h-24 place-items-center rounded-xl bg-white p-3 ring-1 ring-border"><Logo c={c} className="max-h-[4.5rem] w-full" /></div>
            <p className="mt-5 font-semibold leading-snug">{c.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{c.business}</p>
            <p className="mt-auto pt-4 font-mono text-xs text-accent">{c.employees} employees</p>
          </Reveal>
        ))}
        <Reveal delay={clients.length * 60} className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-primary via-accent to-sky p-5 text-white">
          <p className="font-mono text-[11px] uppercase tracking-wider text-white/80">Every month</p>
          <p className="mt-6 text-5xl font-semibold tracking-tighter tabular-nums">{totalEmployees}</p>
          <p className="text-sm text-white/85">employees paid across our top clients</p>
        </Reveal>
      </div>
    </section>
  )
}

// Option 4: bento cards in the same style as the service cards (gradient stat card + logo cards)
function Bento() {
  const card = 'lift relative grid place-items-center overflow-hidden rounded-2xl border border-border bg-white p-6'
  return (
    <section id="clients" className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal className="mb-8 max-w-2xl">
        <Kicker>Our clients</Kicker>
        <h2 className="mt-3 text-4xl md:text-5xl">Businesses that trust MASS with payroll</h2>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-6">
        <Reveal className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-primary via-accent to-sky p-6 text-white md:col-span-2 md:row-span-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-white/80">Every month</p>
          <p className="mt-10 text-6xl font-semibold tracking-tighter tabular-nums">{totalEmployees}</p>
          <p className="text-sm text-white/80">Employees paid across our top clients, from restaurants to manpower agencies and manufacturers.</p>
        </Reveal>
        {clients.map((c, i) => (
          <Reveal key={c.name} delay={i * 60} className={`${card} h-32 md:col-span-2`}>
            <Logo c={c} className="max-h-20 w-full" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// Option 5: light sky band like the "Why outsource" section, logo tiles with sky borders
function SkyBand() {
  return (
    <section id="clients" className="relative isolate overflow-hidden bg-sky-soft">
      <div className="absolute -left-40 -bottom-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-sky/30 blur-[120px]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl">Trusted by growing businesses</h2>
          <p className="mt-6 text-lg text-muted-foreground">Restaurants, manpower agencies, facility managers and manufacturers rely on MASS for accurate payroll and compliance.</p>
          <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-sky/40 bg-card px-4 py-2 text-sm"><span className="font-semibold text-primary tabular-nums">{totalEmployees}</span> employees paid every month</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 60} className={`lift grid h-28 place-items-center rounded-xl border border-sky/30 bg-white p-4 ${i === 6 ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}>
              <Logo c={c} className="max-h-20 w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Option 6: dark navy panel like the contact section, logos on white chips
function Navy() {
  return (
    <section id="clients" className="mx-auto max-w-[96rem] px-4 pb-24 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-[#0F2533] bg-[radial-gradient(60%_80%_at_100%_0%,rgba(95,195,238,.22),transparent_70%)] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-20 xl:px-24">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-sky">Our clients</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Payroll trusted by growing businesses<span className="text-sky">.</span></h2>
          </div>
          <div className="shrink-0"><p className="text-5xl font-semibold tracking-tighter tabular-nums">{totalEmployees}</p><p className="text-sm text-white/65">employees paid every month</p></div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 60} className={`grid h-24 place-items-center rounded-xl bg-white p-3 transition hover:-translate-y-1 ${i === 6 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <Logo c={c} className="max-h-16 w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Counts up from 0 to `to` once the element scrolls into view
function useCountUp(to, ms = 1400) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t) => { const k = Math.min(1, (t - t0) / ms); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step) }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.3 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, ms])
  return [ref, v]
}

const Aurora = () => (
  <>
    <div className="animate-drift absolute -left-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#005F8F] opacity-60 blur-[120px]" />
    <div className="animate-drift-slow absolute -right-32 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#1A8FC4] opacity-40 blur-[120px]" />
    <div className="absolute inset-0 -z-10 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_50%,black,transparent)]" />
  </>
)

// Option 7: client spotlight. Logo tabs on the left, a large card that auto-rotates through clients on the right
function Spotlight() {
  const auto = useCycle(clients.length, 3800)
  const [picked, setPicked] = useState(null)
  const i = picked ?? auto
  const c = clients[i]
  const [ref, total] = useCountUp(totalEmployees)
  return (
    <section id="clients" className="relative isolate mx-auto max-w-6xl px-6 pb-24">
      <div className="absolute -right-20 top-10 -z-10 h-80 w-80 rounded-full bg-sky/30 blur-[100px]" />
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Kicker>Our clients</Kicker>
          <h2 className="mt-3 text-4xl md:text-5xl">The businesses we pay, every month</h2>
        </div>
        <p ref={ref} className="text-muted-foreground"><span className="text-5xl font-semibold tracking-tighter text-primary tabular-nums">{total}</span><br />employees across our top clients</p>
      </Reveal>
      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.35fr]">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
          {clients.map((x, k) => (
            <li key={x.name}>
              <button type="button" onClick={() => setPicked(k)} aria-pressed={k === i}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border p-2.5 text-left transition ${k === i ? 'border-primary/40 bg-card shadow-float' : 'border-border bg-card/60 hover:bg-card'}`}>
                <span className="grid h-12 w-full shrink-0 place-items-center rounded-lg bg-white lg:h-10 lg:w-16 lg:ring-1 lg:ring-border"><Logo c={x} className="max-h-10 max-w-[85%] lg:max-h-8 lg:max-w-14" /></span>
                <span className="hidden min-w-0 lg:block"><span className="block truncate text-sm font-medium">{x.name}</span><span className="block truncate text-xs text-muted-foreground">{x.business}</span></span>
                {k === i && picked === null && <span key={i} className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[progress_3.8s_linear] bg-gradient-to-r from-primary to-sky" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-10">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_70%_at_100%_0%,rgba(95,195,238,.22),transparent_70%)]" />
          <div key={i} className="animate-rise relative">
            <div className="grid h-40 place-items-center rounded-2xl bg-white p-6 ring-1 ring-border sm:h-48"><Logo c={c} className="max-h-32 w-full sm:max-h-36" /></div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-wider text-accent">{c.business}</p>
            <h3 className="mt-2 text-2xl md:text-3xl">{c.name}</h3>
            <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-3"><p className="text-xs text-muted-foreground">Employees</p><p className="mt-1 text-xl font-semibold tabular-nums">{c.employees}</p></div>
              <div className="rounded-xl border border-border bg-background p-3"><p className="text-xs text-muted-foreground">Payroll</p><p className="mt-1 flex items-center gap-1.5 text-xl font-semibold">Monthly</p></div>
              <div className="rounded-xl border border-border bg-background p-3"><p className="text-xs text-muted-foreground">Filings</p><p className="mt-1 flex items-center gap-1.5 text-sm font-semibold"><span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-white"><Check className="h-2.5 w-2.5" /></span>PF · ESI · PT</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Option 8: dark "payroll run" board like the hero dashboard. Each client is a row that ticks over to Paid in turn
function RunBoard() {
  const step = useCycle(clients.length + 3, 900)
  const [ref, total] = useCountUp(totalEmployees, 1800)
  const max = Math.max(...clients.map((c) => c.employees))
  return (
    <section id="clients" className="relative isolate mt-4 overflow-hidden bg-[#041826] text-white">
      <Aurora />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-sky">Our clients</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Trusted to pay <span className="animate-shine bg-gradient-to-r from-[#5FC3EE] via-white to-[#5FC3EE] bg-[length:200%_auto] bg-clip-text text-transparent">{total} people</span> every month.</h2>
          <p className="mt-6 text-lg text-white/65">Restaurants, manpower agencies, facility managers and manufacturers hand MASS their payroll and statutory filings.</p>
        </Reveal>
        <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[.06] p-1.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl">
          <div className="rounded-xl bg-[#071F30]/90 p-5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] text-white/45">Payroll run · top clients</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300"><span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-300" /> Live</span>
            </div>
            <ul className="mt-4 space-y-2">
              {clients.map((c, k) => {
                const paid = k < step
                return (
                  <li key={c.name} className="grid grid-cols-[3.25rem_1fr_auto] sm:grid-cols-[4.5rem_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[.03] px-2.5 py-2">
                    <span className="grid h-9 place-items-center rounded-md bg-white px-1.5"><Logo c={c} className="max-h-7 w-full" /></span>
                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-2"><p className="truncate text-sm font-medium">{c.name}</p><p className="shrink-0 font-mono text-[11px] text-white/50 tabular-nums">{c.employees}</p></div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10"><div style={{ width: `${Math.max(6, (c.employees / max) * 100)}%`, transitionDelay: `${k * 80}ms` }} className={`h-full rounded-full transition-all duration-700 ${paid ? 'bg-gradient-to-r from-[#1A8FC4] to-[#5FC3EE]' : 'bg-white/25'}`} /></div>
                    </div>
                    <span className={`flex w-14 sm:w-[4.75rem] items-center justify-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition ${paid ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/50'}`}>{paid ? <><Check className="h-2.5 w-2.5" />Paid</> : <><span className="sm:hidden">…</span><span className="hidden sm:inline">Processing</span></>}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-[#005F8F] to-[#1A8FC4] px-4 py-3 text-sm"><span>Employees paid</span><span className="text-lg font-semibold tabular-nums">{total}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Option 9: orbit. The MASS mark in the centre with client logos circling on a ring
function Orbit() {
  const [ref, total] = useCountUp(totalEmployees)
  return (
    <section id="clients" className="relative isolate overflow-hidden bg-[#041826] text-white">
      <Aurora />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-sky">Our clients</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Every business we serve, <span className="text-sky">at the centre</span> of what we do.</h2>
          <p className="mt-6 text-lg text-white/65">From restaurants to manpower agencies and precision manufacturers, our clients count on MASS for payroll that is right, on time, every month.</p>
          <div ref={ref} className="mt-8 flex gap-8">
            <div><p className="text-5xl font-semibold tracking-tighter tabular-nums">{total}</p><p className="text-sm text-white/60">employees paid monthly</p></div>
            <div><p className="text-5xl font-semibold tracking-tighter">20+</p><p className="text-sm text-white/60">years of payroll</p></div>
          </div>
        </Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
          <div className="absolute inset-[6%] rounded-full border border-white/10" />
          <div className="absolute inset-[24%] rounded-full border border-dashed border-white/15" />
          <div className="absolute inset-[38%] grid place-items-center rounded-full bg-white shadow-[0_0_80px_rgba(95,195,238,.45)]">
            <img src="./logo.svg" alt="MASS Payroll" className="w-3/4" />
          </div>
          <div className="absolute inset-0 animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
            {clients.map((c, k) => {
              const a = (k / clients.length) * 2 * Math.PI - Math.PI / 2
              return (
                <div key={c.name} style={{ left: `${50 + 44 * Math.cos(a)}%`, top: `${50 + 44 * Math.sin(a)}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
                  <div className="grid h-12 w-20 animate-[spin_60s_linear_infinite_reverse] place-items-center rounded-2xl bg-white p-2 shadow-[0_10px_40px_-10px_rgba(95,195,238,.6)] motion-reduce:animate-none sm:h-20 sm:w-32 sm:p-2.5">
                    <Logo c={c} className="max-h-9 max-w-full sm:max-h-14" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Clients() {
  if (clientsStyle === '7') return <Spotlight />
  if (clientsStyle === '8') return <RunBoard />
  if (clientsStyle === '9') return <Orbit />

  if (clientsStyle === '2') return <Wall />
  if (clientsStyle === '3') return <Cards />
  if (clientsStyle === '4') return <Bento />
  if (clientsStyle === '5') return <SkyBand />
  if (clientsStyle === '6') return <Navy />
  return <Strip />
}
