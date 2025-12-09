import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import LiveDemo from '@/components/LiveDemo'
import Features from '@/components/Features'
import Benefits from '@/components/ForClinics' // Renamed conceptually to Benefits
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import Security from '@/components/Security'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <LiveDemo />
      <Features />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Security />
      <FAQ />
      <Footer />
    </>
  )
}
