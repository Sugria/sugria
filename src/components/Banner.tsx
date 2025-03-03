'use client'
import AnimatedSection from './AnimatedSection'
import Button from './ui/button'
import Image from 'next/image'

const Banner = () => {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-bg.jpg"
          alt="SUGRIA Webinar"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 tracking-[-1px] md:tracking-[-2px] text-white">
            SUGRIA Quarterly Webinar
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed">
            The SUGRIA webinar, held every three months, is a valuable platform dedicated to advancing sustainable agriculture in Africa. For a nominal attendance fee of $2, participants gain access to insightful discussions, expert presentations, certificate of attendance and practical solutions aimed at promoting eco-friendly farming practices and food security across the continent. The small fee helps SUGRIA bootstrap operational funds, complementing donor support to sustain its mission of driving impactful agricultural innovation and resilience in Africa.
          </p>
          <Button 
            variant="primary"
            className="bg-[#1A5D3A] hover:bg-[#0F3622] text-white py-3 px-6 text-base opacity-50 cursor-not-allowed"
            disabled
          >
            Get A Ticket To Our Webinar
          </Button>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Banner 