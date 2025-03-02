'use client'
import AnimatedSection from './AnimatedSection'
import NumberTicker from './ui/NumberTicker'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const StatsCard = () => {
  const [key, setKey] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView) {
      setKey(prev => prev + 1)
    }
  }, [inView])

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4" ref={ref}>
      <AnimatedSection className="bg-black/20 backdrop-blur-[19px] p-3 md:p-8">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 md:gap-2">
            <div className="w-[150px] md:w-[200px]"> {/* Reduced width for mobile */}
              <NumberTicker key={key} value={50000000} className="text-2xl md:text-4xl font-extrabold" />
            </div>
            <span className="text-white/80">+</span>
          </div>
          <span className="text-white/80 text-base md:text-m">Farmers Targeted</span>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-black/20 backdrop-blur-[19px] p-3 md:p-8">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-white text-2xl md:text-4xl font-extrabold">$</span>
            <div className="w-[45px] md:w-[60px]"> {/* Reduced width for mobile */}
              <NumberTicker key={key} value={300} className="text-2xl md:text-4xl font-extrabold" />
            </div>
            <span className="text-white/80 text-2xl md:text-4xl font-extrabold">M</span>
          </div>
          <span className="text-white/80 text-base md:text-m">Target Investment Through Partners</span>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default StatsCard