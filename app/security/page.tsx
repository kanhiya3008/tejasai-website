import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'
import Stats    from '@/components/Stats'
import Features from '@/components/Features'
import Pricing  from '@/components/Pricing'
import Compare  from '@/components/Compare'
import Trial    from '@/components/Trial'
import FAQ      from '@/components/FAQ'
import Footer   from '@/components/Footer'

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Compare />
        <Trial />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
