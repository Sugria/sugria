import Header from '@/components/Header'
import AboutHero from '@/components/about/AboutHero'
import Mission from '@/components/about/Mission'
import Team from '@/components/about/Team'
import Values from '@/components/about/Values'
import Partners from '@/components/about/Partners'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <Mission />
      <Values />
      <Partners />
      <Team />
      <Footer />
    </main>
  )
} 