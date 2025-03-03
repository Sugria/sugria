'use client'
import AnimatedSection from '../AnimatedSection'
import Image from 'next/image'

const Partners = () => {
  const partners = [
    {
      name: 'GRC',
      logo: '/logos/grc.png',
      description: 'A leading organization dedicated to sustainable agricultural development and rural transformation in Africa.'
    },
    {
      name: 'IFAD',
      logo: '/logos/ifad.png',
      description: 'The International Fund for Agricultural Development works to empower rural communities and improve food security worldwide.'
    },
    {
      name: 'Heifer International',
      logo: '/logos/heifer.png',
      description: 'Working with communities to end hunger and poverty by promoting sustainable agriculture and supporting local farmers.'
    },
    {
      name: 'IITA',
      logo: '/logos/iita.png',
      description: 'The International Institute of Tropical Agriculture leads agricultural research and innovation for food security in Africa.'
    }
  ]

  return (
    <AnimatedSection className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-900">
          Our Partners
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-white border border-gray-200 shadow-sm">
              <div className="w-32 h-32 relative mb-4 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-bold mb-2 text-center text-gray-900 tracking-[-1.07px] whitespace-nowrap overflow-hidden text-ellipsis w-full">{partner.name}</h3>
              <p className="text-sm text-gray-700 text-center leading-relaxed line-clamp-2">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Partners