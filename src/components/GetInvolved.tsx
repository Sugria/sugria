'use client'
import AnimatedSection from './AnimatedSection'
import Button from './ui/button'

const GetInvolved = () => {
  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-light mb-16 text-gray-900">
          Get Involved
        </h2>

        <div className="grid md:grid-cols-2 gap-2 mb-8">
          <div className="bg-[#2E8A57] p-16">
            <h3 className="text-white text-3xl font-light mb-4">
              Partner with Us
            </h3>
            <p className="text-white mb-8">
              Drive sustainable agricultural projects
            </p>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#2E8A57] transition-colors"
            >
              Learn More
            </Button>
          </div>

          <div className="bg-[#F4811F] p-16">
            <h3 className="text-white text-3xl font-light mb-4">
              Volunteer
            </h3>
            <p className="text-white mb-8">
              Share your skills to support our mission
            </p>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#F4811F] transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>

        <p className="text-xl text-gray-800 font-light">
          Join the Movement – Together, we can create a sustainable green revolution in Africa!
        </p>
      </div>
    </AnimatedSection>
  )
}

export default GetInvolved