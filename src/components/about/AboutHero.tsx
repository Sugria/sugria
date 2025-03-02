'use client'
import AnimatedSection from '../AnimatedSection'
import Image from 'next/image'

const AboutHero = () => {
  return (
    <AnimatedSection className="relative h-[60vh] flex items-end pb-16">
      {/* Background Image */}
      <Image
        src="/hero-bg.jpg"
        alt="Agricultural landscape with mountains"
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-[100%] tracking-[-1.5px] md:tracking-[-3px]">
            Sustainable Green<br />
            Revolution in Africa
          </h1>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default AboutHero