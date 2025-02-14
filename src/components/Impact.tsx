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
      <span className="text-2xl">{stat.icon}</span>
      <div className="flex items-center gap-2">
        <span className="text-xl font-light">{stat.number}</span>
        <span className="text-xl font-light">{stat.label}</span>
      </div>
    </div>
  )

  return (
    <AnimatedSection className="bg-black py-16">
      <div className="container mx-auto px-4">
        <Ticker speed={2}>
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </Ticker>
      </div>
    </AnimatedSection>
  )
}

export default Impact