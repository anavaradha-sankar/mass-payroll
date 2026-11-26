import { clients } from '../content'
import Reveal from './Reveal'

// Mockup switch: ?clients=1 scrolling logo strip, ?clients=2 logo wall + stats, ?clients=3 client cards with details
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

export default function Clients() {
  if (clientsStyle === '2') return <Wall />
  if (clientsStyle === '3') return <Cards />
  return <Strip />
}
