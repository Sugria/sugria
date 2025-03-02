'use client'
import AnimatedSection from '../AnimatedSection'

const Values = () => {
  const values = [
    {
      title: 'Sustainability',
      description: 'We prioritize environmental stewardship in all our practices',
      icon: '🌱'
    },
    {
      title: 'Innovation', 
      description: 'Embracing new technologies and methods for better results',
      icon: '💡'
    },
    {
      title: 'Community',
      description: 'Building strong networks of support and knowledge sharing',
      icon: '🤝'
    },
    {
      title: 'Empowerment',
      description: 'Enabling farmers to take control of their future',
      icon: '💪'
    }
  ]

  return (
    <AnimatedSection className="py-32 bg-[#F4F8FC]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-[-1.5px] md:tracking-[-3px] text-gray-900 text-center">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
              <span className="text-4xl mb-6 block">{value.icon}</span>
              <h3 className="text-2xl font-bold mb-4 tracking-[-1px] text-gray-900">
                {value.title}
              </h3>
              <p className="text-gray-800 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Values