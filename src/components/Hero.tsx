'use client'
import AnimatedSection from './AnimatedSection'
import Button from './ui/button'

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
        <div className="h-[30vh] md:h-[10vh] sm:h-[10vh]" /> {/* Increased spacer height on mobile */}
        <h1 className="text-4xl md:text-7xl font-light mb-4 leading-[100%]">
          Cultivating<br />
          Sustainability,<br />
          Harvesting Hope
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Empowering African Farmers for a Greener Future
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            variant="primary"
            className="bg-white text-black hover:bg-gray-100 w-full sm:w-auto"
          >
            Join the Movement
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black w-full sm:w-auto"
          >
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-row gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-xl md:text-2xl">👨‍🌾</span>
            <span className="text-xs sm:text-base md:text-lg whitespace-nowrap">50,000+ farmers trained</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-xl md:text-2xl">🌱</span>
            <span className="text-xs sm:text-base md:text-lg whitespace-nowrap">5,000 hectares restored</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Hero