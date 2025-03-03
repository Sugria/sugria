'use client'
import AnimatedSection from '../AnimatedSection'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Mission = () => {
  return (
    <AnimatedSection className="py-16 md:py-32 bg-[#FFFFFF]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Image Container */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <Image 
                src="/1.jpg"
                alt="Approach Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-[100%] tracking-[-1px] md:tracking-[-3px] text-gray-900">
                Our Approach
              </h2>
              <p className="text-base md:text-lg tracking-[-0.5px] md:tracking-[-1px] text-gray-800">
                The Sustainable Green Revolution in Africa (SUGRiA) is transforming African agriculture through sustainable practices, innovation, and inclusive development. We empower smallholder farmers especially women and youth to adopt climate-smart farming, boost productivity, and achieve food security while safeguarding the environment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Mission