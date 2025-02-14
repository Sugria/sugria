'use client'
import AnimatedSection from './AnimatedSection'

const Transform = () => {
  const challenges = [
    {
      icon: '🌾',
      title: 'Food Insecurity',
      description: 'Over 250 million people in Africa are undernourished'
    },
    {
      icon: '🌍', 
      title: 'Climate Change',
      description: 'Erratic weather patterns threaten farming and livelihoods'
    },
    {
      icon: '🌱',
      title: 'Environmental Degradation', 
      description: 'Over 250 million people in Africa are undernourished'
    }
  ]

  return (
    <AnimatedSection className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-4 text-gray-900">
              Transforming African Agriculture for a Sustainable Future
            </h2>
          </div>
          <div>
            <p className="text-base sm:text-lg text-gray-700">
              The Sustainable Green Revolution in Africa (SUGRiA) is transforming African agriculture through sustainable practices, innovation, and inclusive development. We empower smallholder farmers especially women and youth to adopt climate-smart farming, boost productivity, and achieve food security while safeguarding the environment.
            </p>
          </div>
        </div>

        <h3 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-400 mb-8 md:mb-16">Why?...</h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {challenges.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 sm:p-8 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <span className="text-3xl sm:text-4xl mb-4 sm:mb-6 block">{item.icon}</span>
              <h4 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-gray-900">{item.title}</h4>
              <p className="text-sm sm:text-base text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="text-base sm:text-lg text-gray-700 mt-8 sm:mt-12 md:mt-16">
          At SUGRiA, we equip farmers with knowledge, tools, and resources to build resilient, sustainable agricultural systems. By investing in smallholder farmers, we invest in Africa&apos;s future.
        </p>
      </div>
    </AnimatedSection>
  )
}

export default Transform