'use client'
import AnimatedSection from './AnimatedSection'
import Ticker from './ui/Ticker'

const Impact = () => {
  const stats = [
    { icon: '👨‍🌾', number: '50,000+', label: 'farmers trained' },
    { icon: '🌱', number: '5,000', label: 'hectares restored' },
    { icon: '🌾', number: '30%', label: 'increase in crop yields' },
    { icon: '👩‍🌾', number: '10,000', label: 'women farmers empowered' }
  ]

  const StatItem = ({ stat }: { stat: typeof stats[0] }) => (
    <div className="flex items-center gap-2 text-white whitespace-nowrap flex-shrink-0">
      <span className="text-4xl">{stat.icon}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold tracking-[-1.5px]">{stat.number}</span>
        <span className="text-lg font-bold tracking-[-1.5px]">{stat.label}</span>
      </div>
    </div>
  )

  return (
    <AnimatedSection className="bg-black py-16">
      <div className="container mx-auto px-4 relative">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <Ticker speed={2}>
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </Ticker>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10" />
      </div>
    </AnimatedSection>
  )
}

export default Impact