import { company, stats } from '../../content'

export const Check = ({ className = 'h-3 w-3' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
)

export function BrochurePill({ dark = false }) {
  return (
    <a href={company.brochure} target="_blank" rel="noopener"
      className={`animate-rise inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${dark ? 'border-white/20 bg-white/10 text-white backdrop-blur' : 'border-border bg-card shadow-float'}`}>
      <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${dark ? 'bg-white text-primary' : 'bg-primary text-primary-foreground'}`}>PDF</span>
      Download our brochure →
    </a>
  )
}

export function StatRow({ dark = false, className = '' }) {
  return (
    <dl className={`grid grid-cols-3 gap-4 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse justify-end">
          <dt className={`mt-1 text-xs ${dark ? 'text-white/70' : 'text-muted-foreground'}`}>{s.caption}</dt>
          <dd className={`text-2xl font-semibold tracking-tight md:text-3xl ${dark ? 'text-white' : 'text-foreground'}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}
