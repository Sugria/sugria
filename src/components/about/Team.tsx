'use client'
import AnimatedSection from '../AnimatedSection'
import Image from 'next/image'

const Team = () => {
  const team = [
    {
      name: 'Mikel T.G Niyomahoro, PhD',
      role: 'Director General, SUGRiA',
      image: '/team/1.jpg'
    },
    {
      name: 'Mrs Natalie J Gasheri', 
      role: 'Registrar, SUGRiA',
      image: '/team/2.jpg'
    },
    {
      name: 'Mrs R.O Dall\'omo, PhD',
      role: 'Human Resources Manager, SUGRiA',
      image: '/team/3.jpg'
    }
  ]

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-[-1.5px] md:tracking-[-2px] text-gray-900 text-left">
          Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-left">
              <div className="w-full aspect-square relative mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
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