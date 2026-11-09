import HeroCurrent from './hero/HeroCurrent'
import HeroCommand from './hero/HeroCommand'
import HeroPipeline from './hero/HeroPipeline'
import HeroOrbit from './hero/HeroOrbit'

const variants = { '1': HeroCommand, '2': HeroPipeline, '3': HeroOrbit }

export default function Hero() {
  const v = new URLSearchParams(location.search).get('hero')
  const C = variants[v] || HeroCurrent
  return <C />
}
