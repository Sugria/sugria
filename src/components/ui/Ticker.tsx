'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TickerProps {
  className?: string
  speed?: number
  children: React.ReactNode
}

const Ticker = ({ className, speed = 30, children }: TickerProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return
    
    const scrollerContent = contentRef.current
    const scrollerWidth = scrollerContent.offsetWidth

    // Create two clones for seamless looping
    const clone1 = scrollerContent.cloneNode(true) as HTMLElement
    const clone2 = scrollerContent.cloneNode(true) as HTMLElement
    scrollerRef.current.appendChild(clone1)
    scrollerRef.current.appendChild(clone2)

    let distance = 0
    let animationFrame: number

    const scroll = () => {
      distance -= speed / 60
      
      // Reset position when first clone is fully visible
      if (distance <= -scrollerWidth) {
        distance = 0
      }
      
      if (scrollerRef.current) {
        scrollerRef.current.style.transform = `translateX(${distance}px)`
      }
      
      animationFrame = requestAnimationFrame(scroll)
    }

    animationFrame = requestAnimationFrame(scroll)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [speed])

  return (
    <div className={cn("overflow-hidden", className)}>
      <div 
        ref={scrollerRef} 
        className="flex whitespace-nowrap"
        style={{ willChange: 'transform' }}
      >
        <div ref={contentRef} className="flex gap-16 flex-nowrap">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Ticker 