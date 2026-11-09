import HeroCurrent from './hero/HeroCurrent'
import HeroSplit from './hero/HeroSplit'
import HeroBlue from './hero/HeroBlue'
import HeroTicker from './hero/HeroTicker'

const variants = { a: HeroSplit, b: HeroBlue, c: HeroTicker }

export default function Hero() {
  const v = new URLSearchParams(location.search).get('hero')
  const C = variants[v] || HeroCurrent
  return <C />
}
