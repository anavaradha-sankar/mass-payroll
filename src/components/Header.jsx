export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center" aria-label="MASS Payroll Solutions home">
          <img src="./logo.svg" alt="MASS Payroll Solutions" width="109" height="40" className="h-10 w-auto" />
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#platform" className="hover:text-foreground">Services</a>
          <a href="#why" className="hover:text-foreground">Why outsource</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <a href="#contact" className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-85">Talk to us</a>
      </div>
    </header>
  )
}
