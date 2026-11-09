import { included, netPayBars, payslip, remittances, stats } from '../content'
import Reveal from './Reveal'

const card = 'lift relative overflow-hidden rounded-2xl border border-border bg-card p-6'

function CardHead({ kicker, title, text }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{kicker}</p>
      <h3 className="mt-2 text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

const Check = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
)

export default function Platform() {
  return (
    <section id="platform" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid gap-4 md:grid-cols-6">
        <Reveal className={`${card} md:col-span-4`}>
          <CardHead kicker="End-to-end payroll" title="Every salary, on time, every month" text="Salary computation, payslips and bank transfer files — accurate and on time." />
          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Net pay · this month</p>
                <p className="text-2xl font-semibold tracking-tight">₹42,18,900</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-xs font-medium text-accent">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" /> Processed
              </span>
            </div>
            <div className="mt-5 flex h-28 items-end gap-1.5">
              {netPayBars.map((h, i) => (
                <span key={i} style={{ height: `${h}%`, animationDelay: `${300 + i * 60}ms` }}
                  className={`animate-grow-y flex-1 rounded-t-sm ${i === netPayBars.length - 1 ? 'bg-primary' : 'bg-primary/20'}`} />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground"><span>12 months ago</span><span>This month</span></div>
          </div>
        </Reveal>

        <Reveal delay={100} className={`${card} md:col-span-2`}>
          <CardHead kicker="Statutory remittances" title="PF · ESI · PT · TDS" text="Filed with 100% accuracy." />
          <ul className="mt-6 space-y-2">
            {remittances.map(([code, text], i) => (
              <li key={code} style={{ animationDelay: `${400 + i * 150}ms` }} className="animate-rise flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground"><Check /></span>
                <span className="w-9 font-mono text-xs font-medium">{code}</span>
                <span className="text-muted-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className={`${card} flex flex-col justify-between md:col-span-2 ${s.dark ? 'bg-foreground text-background' : ''}`}>
            <p className={`font-mono text-[11px] uppercase tracking-wider ${s.dark ? 'opacity-60' : 'text-muted-foreground'}`}>{s.label}</p>
            <p className="mt-10 text-6xl font-semibold tracking-tighter"><span className="tabular-nums">{s.value}</span></p>
            <p className={`text-sm ${s.dark ? 'opacity-60' : 'text-muted-foreground'}`}>{s.caption}</p>
          </Reveal>
        ))}

        <Reveal className={`${card} md:col-span-2 md:row-span-2`}>
          <CardHead kicker="Employee payslips" title="Clear, correct payslips" text="Every employee, every month." />
          <div className="mt-6 rounded-xl border border-border bg-background p-4 text-sm">
            <div className="flex justify-between border-b border-dashed border-border pb-3">
              <span className="font-medium">Payslip</span>
              <span className="font-mono text-xs text-muted-foreground">{payslip.id}</span>
            </div>
            <dl className="divide-y divide-border">
              {payslip.rows.map(([label, amount, neg]) => (
                <div key={label} className="flex justify-between py-2">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className={`tabular-nums ${neg ? 'text-muted-foreground' : ''}`}>{amount}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-2 flex justify-between rounded-md bg-secondary px-3 py-2 font-semibold"><span>Net pay</span><span className="tabular-nums">{payslip.net}</span></div>
          </div>
        </Reveal>

        <Reveal delay={100} className={`${card} md:col-span-4`}>
          <div className="grid gap-6 sm:grid-cols-2">
            <CardHead kicker="Secure cloud records" title="Records kept safe" text="Employee database maintained on a safe, trusted and secure cloud platform." />
            <div className="flex items-center gap-3 self-center rounded-xl border border-border bg-background p-4">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              </span>
              <div className="text-sm"><p className="font-medium">Encrypted storage</p><p className="text-muted-foreground">186 employee records</p></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className={`${card} md:col-span-2`}>
          <CardHead kicker="24/7 access" title="Always available" text="Employee information, anytime, from anywhere." />
          <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted-foreground"><span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent" /> Online · 24/7</div>
        </Reveal>

        <Reveal delay={200} className={`${card} md:col-span-2`}>
          <CardHead kicker="Compliance updates" title="Never miss a rule change" text="Timely updates on acts and rule benefits." />
        </Reveal>
      </div>

      <Reveal as="ul" className="mt-16 grid gap-x-8 gap-y-6 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {included.map(([t, d]) => (
          <li key={t}><p className="text-sm font-medium">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></li>
        ))}
      </Reveal>
    </section>
  )
}
