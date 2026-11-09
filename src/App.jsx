import Header from './components/Header'
import Hero from './components/Hero'
import Platform from './components/Platform'
import Why from './components/Why'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="design-d min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <Platform />
      <Why />
      <Contact />
      <Footer />
    </div>
  )
}
