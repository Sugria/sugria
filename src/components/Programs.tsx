import ProgramCard from './ui/ProgramCard'
import AnimatedSection from './AnimatedSection'

const programs = [
  {
    title: 'Rural Farmers Program',
    description: 'This program is dedicated to funding and training smallholder farmers in rural Africa. Farmers enrolled in this program receive funding and training to enhance their agricultural practices and improve their livelihoods.',
    fundingAmount: '$1,500',
    image: '/programs/rural-farmers.jpg'
  },
  {
    title: 'Suburban Farmers Program', 
    description: 'This initiative focuses on funding and training educated farmers in suburban areas across Africa. Participants in this program benefit from funding and training, empowering them to adopt advanced farming techniques and increase productivity.',
    fundingAmount: '$3,000',
    image: '/programs/suburban-farmers.jpg'
  },
  {
    title: 'Pioneer Pathways',
    description: "This program supports academics and independent researchers who are driving innovative solutions and leading transformative change in Africa. Professionals in this category are eligible for funding to advance their groundbreaking work and contribute to the continent's development.",
    fundingAmount: '$5,000',
    image: '/programs/pioneer-pathways.jpg'
  }
]

const Programs = () => {
  return (
    <AnimatedSection className="py-16 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-[-1.5px] md:tracking-[-2px] text-gray-900">
            Our Programs
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Empowering farmers and researchers across Africa through targeted funding and comprehensive training initiatives.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <ProgramCard
              key={program.title}
              title={program.title}
              description={program.description}
              fundingAmount={program.fundingAmount}
              index={index}
              image={program.image}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Programs