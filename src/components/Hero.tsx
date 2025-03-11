'use client'
import AnimatedSection from './AnimatedSection'
import Button from './ui/button'
import StatsCard from './StatsCard'
import Link from 'next/link'

const Hero = () => {
  return (
    <AnimatedSection className="relative min-h-screen flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="h-[20vh] md:h-[10vh]" /> {/* Adjusted spacer height */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
          {/* Left Content Container */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px]">
              Cultivating<br />
              Sustainability,<br />
              Harvesting Hope
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">
              Empowering African Farmers for a Greener Future
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto mb-6 md:mb-8">
              <Link href="/join">
                <Button className="w-full sm:w-auto text-sm md:text-base bg-white text-black disabled:opacity-20 disabled:cursor-not-allowed" disabled>
                  Join the Movement
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black w-full sm:w-auto text-sm md:text-base"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl md:text-2xl">👨‍🌾</span>
                <span className="text-sm sm:text-base md:text-lg whitespace-normal sm:whitespace-nowrap">50,000+ farmers trained</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl md:text-2xl">🌱</span>
                <span className="text-sm sm:text-base md:text-lg whitespace-normal sm:whitespace-nowrap">5,000 hectares restored</span>
              </div>
            </div>
          </div>

          {/* Right Content Container */}
          <div className="flex-1 flex items-center lg:items-end justify-center lg:-translate-y-20">
            <div className="w-full">
              <StatsCard />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Hero