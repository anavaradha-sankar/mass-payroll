import { clients } from '../content'
import Reveal from './Reveal'

// Mockup switch: ?clients=1 scrolling logo strip, ?clients=2 logo wall + stats, ?clients=3 client cards with details,
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

export default function Clients() {
  if (clientsStyle === '2') return <Wall />
  if (clientsStyle === '3') return <Cards />
  if (clientsStyle === '4') return <Bento />
  if (clientsStyle === '5') return <SkyBand />
  if (clientsStyle === '6') return <Navy />
  return <Strip />
}
