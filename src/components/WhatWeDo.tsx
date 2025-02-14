'use client'
import AnimatedSection from './AnimatedSection'

const WhatWeDo = () => {
  const services = [
    {
      icon: '🌱',
      title: 'Climate Smart Agriculture', 
      description: 'Sustainable techniques for increased productivity and resilience.'
    },
    {
      icon: '🌍',
      title: 'Soil Conservation',
      description: 'Healthy soil for thriving farms'
    },
    {
      icon: '💧',
      title: 'Water Management',
      description: 'Efficient irrigation and rainwater harvesting'
    },
    {
      icon: '🐞',
      title: 'Integrated Pest Management',
      description: 'Reducing chemical use for a safer environment.'
    },
    {
      icon: '👨‍🌾',
      title: 'Empowering Women & Youth',
      description: 'Inclusive programs for agricultural innovation.'
    },
    {
      icon: '📜',
      title: 'Policy Advocacy',
      description: 'Collaborating with stakeholders for a sustainable future.'
    }
  ]

  return (
    <AnimatedSection className="py-12 sm:py-20 bg-[#2E8A57] relative overflow-hidden">
      <div className="absolute inset-0 -top-[50%] -bottom-[50%] -left-1/4 -right-1/4 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="absolute top-0 bottom-0"
            style={{
              left: `${(i / 100) * 100}%`,
              transform: 'rotate(15deg)',
              transformOrigin: 'center',
              width: '2px',
              backgroundColor: 'rgba(0, 0, 0, 0.02)'
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 sm:mb-12 md:mb-16 tracking-[-1.5px] md:tracking-[-2px]">
          What we do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer hover:bg-gray-50"
            >
              <span className="text-3xl sm:text-4xl mb-4 sm:mb-6 block">{service.icon}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 tracking-[-1.5px] md:tracking-[-2px]">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default WhatWeDo