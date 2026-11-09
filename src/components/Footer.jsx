import { company } from '../content'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-4"><img src="./logo.svg" alt="" width="76" height="28" className="h-7 w-auto" />© {new Date().getFullYear()} {company.name}</span>
        <span>Chennai, India</span>
      </div>
    </footer>
  )
}
