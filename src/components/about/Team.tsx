'use client'
import AnimatedSection from '../AnimatedSection'

const Team = () => {
  const team = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      image: '/placeholder.jpg'
    },
    {
      name: 'Jane Smith',
      role: 'Head of Operations',
      image: '/placeholder.jpg'
    },
    {
      name: 'Mike Johnson',
      role: 'Agricultural Expert',
      image: '/placeholder.jpg'
    },
    {
      name: 'Sarah Williams',
      role: 'Community Manager',
      image: '/placeholder.jpg'
    }
  ]

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-[-1.5px] md:tracking-[-2px] text-gray-900 text-left">
          Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-left">
              <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4"></div>
              <h3 className="text-xl font-bold tracking-[-1.5px] text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600 font-light">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Team 