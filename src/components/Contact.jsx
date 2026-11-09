import { useState } from 'react'
import { company } from '../content'
import Reveal from './Reveal'

const input = 'mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/15'

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
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Send failed')
}

// Opens WhatsApp with whatever the visitor has typed so far.
function openWhatsApp(form) {
  const f = new FormData(form)
  const lines = ['Hello MASS Payroll, I would like to know more.']
  for (const [label, key] of [['Name', 'name'], ['Email', 'email'], ['Company', 'company']]) {
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
    <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
      <Reveal>
        <h2 className="text-4xl md:text-5xl">Let's work together</h2>
        <p className="mt-4 text-lg text-muted-foreground">Share your details and we'll get back to you by email, or message us on WhatsApp.</p>
        <dl className="mt-10 divide-y divide-border border-y border-border text-sm">
          <div className="flex gap-6 py-4">
            <dt className="w-16 shrink-0 text-muted-foreground">Phone</dt>
            <dd className="font-medium">
              {company.phones.map((p, i) => <span key={p.tel}>{i > 0 && ' / '}<a href={`tel:${p.tel}`} className="hover:text-primary">{p.label}</a></span>)}
            </dd>
          </div>
          <div className="flex gap-6 py-4">
            <dt className="w-16 shrink-0 text-muted-foreground">Email</dt>
            <dd className="font-medium"><a href={`mailto:${company.email}`} className="hover:text-primary">{company.email}</a></dd>
          </div>
          <div className="flex gap-6 py-4">
            <dt className="w-16 shrink-0 text-muted-foreground">Office</dt>
            <dd className="font-medium">{company.address}</dd>
          </div>
        </dl>
      </Reveal>
      <Reveal as="form" onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-7 shadow-float">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">Full name<input required name="name" autoComplete="name" className={input} /></label>
          <label className="block text-sm font-medium">Work email<input required type="email" name="email" autoComplete="email" className={input} /></label>
        </div>
        <label className="mt-4 block text-sm font-medium">Company<input required name="company" autoComplete="organization" className={input} /></label>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="submit" disabled={status === 'sending'} className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0">
            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
          <button type="button" onClick={(e) => openWhatsApp(e.currentTarget.form)} className="w-full rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
            Chat on WhatsApp
          </button>
        </div>
        <p role="status" aria-live="polite" className="mt-4 min-h-5 text-sm">
          {status === 'sent' && <span className="text-primary">Thank you! Your enquiry has been sent. We'll be in touch soon.</span>}
          {status === 'error' && <span className="text-red-600">Sorry, that didn't go through. Please try again, email us at <a href={`mailto:${company.email}`} className="underline">{company.email}</a>, or use WhatsApp.</span>}
        </p>
      </Reveal>
    </section>
  )
}
