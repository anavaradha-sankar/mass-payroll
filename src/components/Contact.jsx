import { useState } from 'react'
import { company } from '../content'
import Reveal from './Reveal'

// Mockup switch: ?tg=1 button under WhatsApp, ?tg=2 row in contact details, ?tg=3 join card under details
export const tg = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('tg') : null

export const TelegramIcon = (p) => <svg viewBox="0 0 24 24" aria-hidden="true" {...p}><circle cx="12" cy="12" r="12" fill="#229ED9" /><path fill="#fff" d="M5.4 11.7 16.9 7.3c.5-.2 1 .1.8.9l-2 9.3c-.1.6-.5.8-1 .5l-3-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3.1 5.6-5c.2-.2 0-.3-.4-.1l-6.9 4.3-3-.9c-.6-.2-.7-.6.2-1Z" /></svg>

const teamSizes = ['1–50 employees', '51–200 employees', '201–500 employees', '500+ employees']

const input = 'mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/15'

// S3 hosting has no backend, so enquiries are emailed through FormSubmit (formsubmit.co).
// The first enquiry triggers a one-time activation email to company.email.
async function sendEnquiry(form) {
  const f = new FormData(form)
  const res = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `Website enquiry from ${f.get('name')} (${f.get('company')})`,
      _template: 'table',
      _replyto: f.get('email'),
      _honey: f.get('_honey'),
      Name: f.get('name'),
      Email: f.get('email'),
      Company: f.get('company'),
      'Team size': f.get('teamSize') || 'Not given',
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Send failed')
}

// Opens WhatsApp with whatever the visitor has typed so far.
function openWhatsApp(form) {
  const f = new FormData(form)
  const lines = ['Hello MASS Payroll, I would like to know more.']
  for (const [label, key] of [['Name', 'name'], ['Email', 'email'], ['Company', 'company'], ['Team size', 'teamSize']]) {
    if (f.get(key)) lines.push(`${label}: ${f.get(key)}`)
  }
  window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
}

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      await sendEnquiry(form)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-[96rem] px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 rounded-[2rem] bg-[#0F2533] bg-[radial-gradient(60%_80%_at_0%_0%,rgba(95,195,238,.22),transparent_70%)] px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-20 xl:px-24">
        <Reveal>
          <h2 className="text-5xl md:text-6xl">Let's build a business relationship<span className="text-sky">.</span></h2>
          <p className="mt-6 text-lg text-white/65">Share your details and our team will get back to you by email, or chat with us on WhatsApp.</p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-sky">Phone</dt>
              <dd className="mt-1.5 text-lg font-medium">
                {company.phones.map((p, i) => <span key={p.tel}>{i > 0 && ' / '}<a href={`tel:${p.tel}`} className="hover:text-sky">{p.label}</a></span>)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-sky">Email</dt>
              <dd className="mt-1.5 text-lg font-medium"><a href={`mailto:${company.email}`} className="hover:text-sky">{company.email}</a></dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-sky">Office</dt>
              <dd className="mt-1.5 text-lg font-medium">{company.address}</dd>
            </div>
            {tg === '2' && (
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-sky">Telegram</dt>
                <dd className="mt-1.5 text-lg font-medium"><a href={company.telegram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-sky"><TelegramIcon className="size-5" />t.me/MASSPayroll</a></dd>
              </div>
            )}
          </dl>
          {tg === '3' && (
            <div className="mt-10 flex items-center gap-4 rounded-2xl sm:gap-5 border border-white/15 bg-white/5 p-5">
              <img src="./telegram-qr.svg" alt="QR code to join the MASS Payroll Telegram group" width="112" height="112" className="size-24 shrink-0 rounded-xl bg-white p-1.5 sm:size-28" />
              <div>
                <p className="flex items-start gap-2 text-base font-semibold"><TelegramIcon className="mt-0.5 size-5 shrink-0" />Join our Telegram group</p>
                <p className="mt-1 text-sm text-white/60">Scan the code, or tap below, for payroll and compliance updates.</p>
                <a href={company.telegram} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sky hover:text-white">t.me/MASSPayroll <span aria-hidden="true">→</span></a>
              </div>
            </div>
          )}
        </Reveal>
        <Reveal as="form" onSubmit={onSubmit} className="rounded-3xl bg-card p-6 text-foreground shadow-float sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">Full name<input required name="name" autoComplete="name" className={input} /></label>
            <label className="block text-sm font-medium">Work email<input required type="email" name="email" autoComplete="email" className={input} /></label>
          </div>
          <label className="mt-5 block text-sm font-medium">Company<input required name="company" autoComplete="organization" className={input} /></label>
          <label className="mt-5 block text-sm font-medium">Team size
            <select name="teamSize" defaultValue="" className={`${input} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20fill=%22none%22%20stroke=%22%235B6B76%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m4%206%204%204%204-4%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
              <option value="" disabled>Select</option>
              {teamSizes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button type="submit" disabled={status === 'sending'} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:bg-[#004d75] disabled:opacity-60 disabled:hover:translate-y-0">
            {status === 'sending' ? 'Sending…' : <>Send enquiry <span aria-hidden="true">→</span></>}
          </button>
          <button type="button" onClick={(e) => openWhatsApp(e.currentTarget.form)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-input px-6 py-4 text-base font-medium transition hover:-translate-y-0.5 hover:border-[#25D366]">
            <svg viewBox="0 0 24 24" className="size-5 fill-[#25D366]" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>
            Chat on WhatsApp
          </button>
          {tg === '1' && (
            <a href={company.telegram} target="_blank" rel="noopener" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-input px-6 py-4 text-base font-medium transition hover:-translate-y-0.5 hover:border-[#229ED9]">
              <TelegramIcon className="size-5" />
              Join our Telegram group
            </a>
          )}
          <p role="status" aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
            {status === 'sent' && <span className="text-primary">Thank you! Your enquiry has been sent. We'll be in touch soon.</span>}
            {status === 'error' && <span className="text-red-600">Sorry, that didn't go through. Please try again, email us at <a href={`mailto:${company.email}`} className="underline">{company.email}</a>, or use WhatsApp.</span>}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
