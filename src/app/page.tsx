import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Transform from '@/components/Transform'
import WhatWeDo from '@/components/WhatWeDo'
import Impact from '@/components/Impact'
import GetInvolved from '@/components/GetInvolved'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Transform />
      <WhatWeDo />
      <Impact />
      <GetInvolved />
      <Footer />
    </main>
  )
}