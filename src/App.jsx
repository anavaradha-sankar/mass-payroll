import Header from './components/Header'
import Hero from './components/Hero'
import Platform from './components/Platform'
import Why from './components/Why'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Mockup switch: ?end=1 curve + overlapping cards, ?end=2 services stay on navy
const end = new URLSearchParams(location.search).get('end') || '1'

export default function App() {
  return (
    <div className="design-d min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      {end === '2' ? (
        <>
          <Hero edge="none" />
          <div className="theme-navy relative isolate overflow-hidden bg-background pt-4 text-foreground">
            <div className="animate-drift-slow absolute -right-40 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#005F8F] opacity-40 blur-[140px]" />
            <div className="animate-drift absolute -left-40 bottom-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#1A8FC4] opacity-20 blur-[140px]" />
            <Platform />
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-16 w-full text-white md:h-28" aria-hidden="true">
              <path fill="currentColor" d="M0 120V70C360 10 1080 10 1440 70V120Z" />
            </svg>
          </div>
        </>
      ) : (
        <>
          <Hero edge="curve" />
          <div className="relative z-10 -mt-16 md:-mt-24"><Platform /></div>
        </>
      )}
      <Why />
      <Contact />
      <Footer />
    </div>
  )
}
