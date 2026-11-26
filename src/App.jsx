import Header from './components/Header'
import Hero from './components/Hero'
import Platform from './components/Platform'
import Clients, { clientsStyle } from './components/Clients'
import Why from './components/Why'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="design-d min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <Hero />
      {/* service cards rise over the hero's curved bottom edge */}
      <div className="relative z-10 -mt-16 md:-mt-24"><Platform /></div>
      {clientsStyle !== '5' && <Clients />}
      <Why />
      {clientsStyle === '5' && <Clients />}
      <Contact />
      <Footer />
    </div>
  )
}
