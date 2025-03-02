'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface NumberTickerProps {
  value: number
  duration?: number
  className?: string
}

const NumberTicker = ({ value, duration = 2, className = '' }: NumberTickerProps) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  useEffect(() => {
    const element = ref.current
    
    if (!element) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && element) {
        setIsInView(true)
      }
    })

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <div ref={ref}>
      <motion.span className={`text-2xl md:text-3xl font-extrabold ${className}`}>{displayValue}</motion.span>
    </div>
  )
}

export default NumberTicker 