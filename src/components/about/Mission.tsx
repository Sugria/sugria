'use client'
import AnimatedSection from '../AnimatedSection'
import Image from 'next/image'
import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const Mission = () => {
  const [activeSection, setActiveSection] = useState(0)
  
  // Create refs directly in the component
  const firstSectionRef = useRef<HTMLDivElement>(null)
  const secondSectionRef = useRef<HTMLDivElement>(null)
  const thirdSectionRef = useRef<HTMLDivElement>(null)
  const fourthSectionRef = useRef<HTMLDivElement>(null)
  
  // Use useMemo to prevent recreation on every render
  const sectionRefs = useMemo(() => ({
    first: firstSectionRef,
    second: secondSectionRef,
    third: thirdSectionRef,
    fourth: fourthSectionRef
  }), [])

  const images = [
    {
      src: '/1.jpg',
      alt: 'Mission Image'
    },
    {
      src: '/2.jpg',
      alt: 'Vision Image'
    },
    {
      src: '/3.jpg',
      alt: 'Approach Image'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement
            const index = Object.keys(sectionRefs).find(key => {
              const ref = sectionRefs[key as keyof typeof sectionRefs]
              return ref.current === target
            })
            if (index !== undefined) {
              setActiveSection(parseInt(index))
            }
          }
        })
      },
      {
        threshold: 0.75
      }
    )

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current)
      })
    }
  }, [sectionRefs])

  return (
    <AnimatedSection 
      className={`py-16 md:py-32 transition-all duration-1000 ${
        activeSection === 3 
          ? "md:bg-[url('/4.jpg')] bg-[url('/4.jpg')] md:bg-cover bg-cover md:bg-center bg-center md:bg-no-repeat bg-no-repeat md:bg-fixed bg-fixed md:bg-[length:100%_auto] bg-[length:100%_auto]" 
          : "bg-[#FFFFFF]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Sticky Image Container - Hidden on Mobile */}
          <div className={`relative hidden md:block ${activeSection === 3 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <div className="sticky top-32 aspect-[4/3] overflow-hidden">
              {images.map((image, index) => (
                <Image 
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${
                    activeSection === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:space-y-72 space-y-8"> {/* Changed space-y-12 to space-y-8 for mobile */}
            {/* Mobile Images */}
            <div className="md:hidden overflow-hidden mb-4"> {/* Added mb-4 to move content up */}
              <motion.div 
                className="flex gap-4"
                animate={{ x: `-${activeSection * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full"
                  >
                    <Image 
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={450}
                      className="w-full h-auto rounded-lg"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              ref={firstSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === 0 ? 1 : 1 }}
              transition={{ duration: 0.5 }}
              className="md:opacity-0"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-[100%] tracking-[-1px] md:tracking-[-3px] text-gray-900">
                Our Mission
              </h2>
              <p className="text-base md:text-lg tracking-[-0.5px] md:tracking-[-1px] text-gray-800">
                The Sustainable Green Revolution in Africa (SUGRiA) is transforming African agriculture through sustainable practices, innovation, and inclusive development. We empower smallholder farmers especially women and youth to adopt climate-smart farming, boost productivity, and achieve food security while safeguarding the environment.
              </p>
            </motion.div>
            <motion.div 
              ref={secondSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === 1 ? 1 : 1 }}
              transition={{ duration: 0.5 }}
              className="md:opacity-0"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-[100%] tracking-[-1px] md:tracking-[-3px] text-gray-900">
                Our Vision
              </h2>
              <p className="text-base md:text-lg tracking-[-0.5px] md:tracking-[-1px] text-gray-800">
                The Sustainable Green Revolution in Africa (SUGRiA) is transforming African agriculture through sustainable practices, innovation, and inclusive development. We empower smallholder farmers especially women and youth to adopt climate-smart farming, boost productivity, and achieve food security while safeguarding the environment.
              </p>
            </motion.div>
            <motion.div 
              ref={thirdSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === 2 ? 1 : 1 }}
              transition={{ duration: 0.5 }}
              className="md:opacity-0"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-[100%] tracking-[-1px] md:tracking-[-3px] text-gray-900">
                Our Approach
              </h2>
              <p className="text-base md:text-lg tracking-[-0.5px] md:tracking-[-1px] text-gray-800">
                The Sustainable Green Revolution in Africa (SUGRiA) is transforming African agriculture through sustainable practices, innovation, and inclusive development. We empower smallholder farmers especially women and youth to adopt climate-smart farming, boost productivity, and achieve food security while safeguarding the environment.
              </p>
            </motion.div>
            {/* Empty fourth section for triggering background change - Hidden on Mobile */}
            <div 
              ref={fourthSectionRef}
              className="h-screen hidden md:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default Mission