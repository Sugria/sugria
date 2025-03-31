import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Transform from '@/components/Transform'
import WhatWeDo from '@/components/WhatWeDo'
import Impact from '@/components/Impact'
import Programs from '@/components/Programs'
import Banner from '@/components/Banner'
import GetInvolved from '@/components/GetInvolved'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Transform />
      <WhatWeDo />
      <Impact />
      <Programs />
      {/* <Banner /> */}
      <GetInvolved />
      <Footer />
    </main>
  )
}