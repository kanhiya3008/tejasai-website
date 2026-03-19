import HomeNavbar  from '@/components/home/HomeNavbar'
import HomeHero    from '@/components/home/HomeHero'
import TechStrip   from '@/components/home/TechStrip'
import Products    from '@/components/home/Products'
import ComingSoon  from '@/components/home/ComingSoon'
import HomeContact from '@/components/home/HomeContact'
import HomeFooter  from '@/components/home/HomeFooter'

export default function Home() {
  return (
    <div style={{ background: 'var(--t-bg)', minHeight: '100vh' }}>
      <HomeNavbar />
      <main>
        <HomeHero />
        <TechStrip />
        <Products />
        <ComingSoon />
        <HomeContact />
      </main>
      <HomeFooter />
    </div>
  )
}
