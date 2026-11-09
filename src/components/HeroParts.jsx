import { useEffect, useRef, useState } from 'react'
import { company } from '../content'

export const Check = ({ className = 'h-3 w-3' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
)

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Counts from 0 to `to` once the element scrolls into view
export function CountUp({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [n, setN] = useState(reduced() ? to : 0)
  useEffect(() => {
    if (reduced()) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])
  return <span ref={ref} className="tabular-nums">{n.toLocaleString('en-IN')}{suffix}</span>
}

// Steps through 0..count-1 every `ms`
export function useCycle(count, ms = 1800) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced()) return
    const id = setInterval(() => setI((x) => (x + 1) % count), ms)
    return () => clearInterval(id)
  }, [count, ms])
  return i
}

export const heroStats = [
  { to: 20, suffix: '+', caption: 'Years of payroll expertise' },
  { to: 600000, suffix: '+', caption: 'Payroll transactions a year' },
  { to: 100, suffix: '%', caption: 'Statutory remittance accuracy' },
]

export function BrochurePill({ dark = false }) {
  return (
    <a href={company.brochure} target="_blank" rel="noopener"
      className={`animate-rise group inline-flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-medium transition ${dark ? 'border-white/15 bg-white/5 text-white/90 backdrop-blur hover:bg-white/10' : 'border-border bg-card shadow-float hover:border-primary/30'}`}>
      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${dark ? 'bg-gradient-to-r from-[#1A8FC4] to-[#5FC3EE] text-[#04192A]' : 'bg-primary text-primary-foreground'}`}>PDF</span>
      Download our brochure <span className="transition group-hover:translate-x-0.5">→</span>
    </a>
  )
}

export function Headline({ dark = false, className = '', gradient }) {
  return (
    <h1 className={`animate-rise text-[2.75rem] leading-[1.02] [animation-delay:100ms] sm:text-6xl md:text-7xl ${dark ? 'text-white' : ''} ${className}`}>
      Payroll and compliance,{' '}
      <span className={`animate-shine bg-[length:200%_auto] bg-clip-text text-transparent ${gradient}`}>handled end to end.</span>
    </h1>
  )
}

export const lede = 'Outsource salaries, PF, ESI and statutory filings to specialists with two decades of experience — and focus on growing your business.'
