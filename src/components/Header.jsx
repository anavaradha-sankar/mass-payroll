// Header: clear over the navy hero, turns into a white bar once you scroll. Full-screen navy menu on phones.
import { useEffect, useState } from 'react'
import { company } from '../content'

const links = [
  ['#platform', 'Services'],
  ['#why', 'Why outsource'],
  ['#contact', 'Contact'],
]

function useScrolled(px = 24) {
  const [s, set] = useState(false)
  useEffect(() => {
    const on = () => set(window.scrollY > px)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [px])
  return s
}

// which section is in view, for the active-link marker
function useActive() {
  const [a, set] = useState('')
  useEffect(() => {
    const els = links.map(([h]) => document.querySelector(h)).filter(Boolean)
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && set('#' + e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return a
}

function useMenu() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])
  return [open, setOpen]
}

const Logo = ({ light, className = 'h-10' }) => (
  <a href="#top" className="flex shrink-0 items-center" aria-label="MASS Payroll Solutions home">
    <img src={light ? './logo-light.svg' : './logo.svg'} alt="MASS Payroll Solutions" width="109" height="40" className={`${className} w-auto transition`} />
  </a>
)

const Burger = ({ open, onClick, light }) => (
  <button type="button" onClick={onClick} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
    className={`relative grid h-10 w-10 place-items-center rounded-lg border transition md:hidden ${light ? 'border-white/20 bg-white/5 text-white' : 'border-border bg-card text-foreground'}`}>
    <span className={`absolute h-0.5 w-5 rounded bg-current transition ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
    <span className={`absolute h-0.5 w-5 rounded bg-current transition ${open ? 'opacity-0' : ''}`} />
    <span className={`absolute h-0.5 w-5 rounded bg-current transition ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
  </button>
)

const Phone = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
const Chat = (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" /></svg>

const wa = `https://wa.me/${company.whatsapp}`
const tel = company.phones[0]

// Contact buttons shown at the bottom of every mobile menu
const MenuContacts = ({ dark }) => (
  <div className="grid grid-cols-2 gap-3">
    <a href={`tel:${tel.tel}`} className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium ${dark ? 'border-white/15 bg-white/5 text-white' : 'border-border bg-card'}`}><Phone className="h-4 w-4" /> Call us</a>
    <a href={wa} target="_blank" rel="noopener" className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium ${dark ? 'border-white/15 bg-white/5 text-white' : 'border-border bg-card'}`}><Chat className="h-4 w-4" /> WhatsApp</a>
  </div>
)

export default function Header() {
  const scrolled = useScrolled()
  const active = useActive()
  const [open, setOpen] = useMenu()
  const dark = !scrolled || open
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${open ? 'bg-[#041826]' : scrolled ? 'border-b border-border bg-white/85 shadow-[0_8px_30px_-18px_rgba(0,62,94,.35)] backdrop-blur-xl' : 'border-b border-white/10 bg-transparent'}`}>
      <div className={`mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 transition-all ${scrolled ? 'h-16' : 'h-20'}`}>
        <Logo light={dark} className={scrolled ? 'h-9' : 'h-11'} />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([h, l]) => (
            <a key={h} href={h} className={`relative rounded-md px-3.5 py-2 text-sm font-medium transition ${dark ? 'text-white/75 hover:text-white' : 'text-muted-foreground hover:text-foreground'} ${active === h ? (dark ? '!text-white' : '!text-primary') : ''}`}>
              {l}
              <span className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-sky transition ${active === h ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${tel.tel}`} className={`hidden items-center gap-2 text-sm font-medium lg:flex ${dark ? 'text-white/80' : 'text-foreground'}`}><Phone className="h-4 w-4 text-sky" /> {tel.label}</a>
          <a href="#contact" className={`hidden rounded-lg px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 sm:inline-block ${dark ? 'bg-white text-[#004466]' : 'bg-primary text-white'}`}>Talk to us</a>
          <Burger open={open} onClick={() => setOpen(!open)} light={dark} />
        </div>
      </div>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-20 flex flex-col justify-between overflow-y-auto bg-[#041826] px-6 pb-8 pt-4 text-white md:hidden">
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#1A8FC4] opacity-30 blur-[100px]" />
          <nav className="relative">
            {links.map(([h, l], i) => (
              <a key={h} href={h} onClick={() => setOpen(false)} style={{ animationDelay: `${i * 60}ms` }} className="animate-rise flex items-center justify-between border-b border-white/10 py-5 text-2xl font-semibold">
                {l}<span className="text-sky">→</span>
              </a>
            ))}
            <a href={company.brochure} target="_blank" rel="noopener" className="animate-rise flex items-center justify-between border-b border-white/10 py-5 text-2xl font-semibold [animation-delay:180ms]">Brochure <span className="rounded-full bg-gradient-to-r from-[#1A8FC4] to-[#5FC3EE] px-2 py-0.5 text-[10px] font-bold text-[#04192A]">PDF</span></a>
          </nav>
          <div className="relative mt-10 space-y-3">
            <a href="#contact" onClick={() => setOpen(false)} className="block rounded-lg bg-white py-3.5 text-center text-sm font-semibold text-[#004466]">Talk to us →</a>
            <MenuContacts dark />
          </div>
        </div>
      )}
    </header>
  )
}
