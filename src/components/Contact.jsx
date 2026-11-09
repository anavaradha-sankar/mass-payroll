import { company } from '../content'
import Reveal from './Reveal'

const input = 'mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/15'

// S3 hosting has no backend, so the form opens WhatsApp with the visitor's details filled in.
function onSubmit(e) {
  e.preventDefault()
  const f = new FormData(e.currentTarget)
  const text = [
    'Hello MASS Payroll, I would like to know more.',
    `Name: ${f.get('name')}`,
    `Email: ${f.get('email')}`,
    `Company: ${f.get('company')}`,
  ].join('\n')
  window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2">
      <Reveal>
        <h2 className="text-4xl md:text-5xl">Let's work together</h2>
        <p className="mt-4 text-lg text-muted-foreground">Share your details and we'll reach out on WhatsApp.</p>
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
        <button className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5">Connect on WhatsApp</button>
      </Reveal>
    </section>
  )
}
