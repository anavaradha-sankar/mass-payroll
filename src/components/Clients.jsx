import { useEffect, useRef, useState } from 'react'
import { clients } from '../content'
import Reveal from './Reveal'
import { useCycle } from './HeroParts'

const totalEmployees = clients.reduce((n, c) => n + c.employees, 0)

const Logo = ({ c, className = '' }) => <img src={c.logo} alt={c.name} loading="lazy" className={`object-contain ${className}`} />

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

// Our clients: logo cards in a 3D carousel that turns every few seconds; the front client is named below
export default function Clients() {
  const n = clients.length
  const i = useCycle(n, 2600)
  const [ref, total] = useCountUp(totalEmployees)
  const c = clients[i]
  return (
    <section id="clients" className="relative isolate overflow-hidden pb-28 pt-8">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(95,195,238,.35),transparent)]" />
      <Reveal className="mx-auto max-w-4xl px-6 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent shadow-float"><span className="h-1.5 w-1.5 rounded-full bg-sky" />Our clients</p>
        <h2 className="mt-5 text-4xl md:text-6xl">Trusted by businesses that <span className="animate-shine bg-gradient-to-r from-primary via-sky to-primary bg-[length:200%_auto] bg-clip-text text-transparent">never miss a payday.</span></h2>
      </Reveal>
      <div className="relative mx-auto mt-14 h-52 max-w-6xl [perspective:1200px] sm:h-60">
        {clients.map((x, k) => {
          let d = k - i
          if (d > n / 2) d -= n
          if (d < -n / 2) d += n
          const ad = Math.abs(d)
          return (
            <div key={x.name} className="absolute left-1/2 top-1/2 h-36 w-48 transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] sm:h-44 sm:w-60"
              style={{ transform: `translate(-50%,-50%) translateX(calc(${d} * min(15rem, 40vw))) rotateY(${-d * 28}deg) scale(${1 - ad * 0.14})`, zIndex: 10 - ad, opacity: ad > 3 ? 0 : 1 - ad * 0.22, filter: ad ? `saturate(${1 - ad * 0.25})` : 'none' }}>
              <div className={`grid h-full w-full place-items-center rounded-3xl border bg-white p-6 transition duration-700 sm:p-7 ${ad === 0 ? 'border-sky/60 shadow-[0_30px_60px_-20px_rgba(0,95,143,.45)]' : 'border-border shadow-float'}`}>
                <Logo c={x} className="max-h-24 w-full sm:max-h-28" />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mx-auto mt-6 h-3 w-72 rounded-[100%] bg-primary/20 blur-md" />
      <div key={i} className="animate-rise mt-8 text-center">
        <p className="text-xl font-semibold">{c.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{c.business}</p>
      </div>
      <div className="mt-6 flex justify-center gap-1.5">
        {clients.map((x, k) => <span key={x.name} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-6 bg-primary' : 'w-1.5 bg-primary/25'}`} />)}
      </div>
      <div ref={ref} className="mx-6 mt-12 grid max-w-3xl grid-cols-3 sm:mx-auto divide-x divide-border rounded-2xl border border-border bg-card/80 px-2 py-5 text-center shadow-float backdrop-blur">
        <div><p className="text-3xl font-semibold tracking-tighter text-primary tabular-nums md:text-4xl">{total}</p><p className="mt-1 text-xs text-muted-foreground md:text-sm">employees paid monthly</p></div>
        <div><p className="text-3xl font-semibold tracking-tighter text-primary md:text-4xl">{n}</p><p className="mt-1 text-xs text-muted-foreground md:text-sm">top clients</p></div>
        <div><p className="text-3xl font-semibold tracking-tighter text-primary md:text-4xl">100%</p><p className="mt-1 text-xs text-muted-foreground md:text-sm">on-time remittances</p></div>
      </div>
    </section>
  )
}
