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

    const clone = scrollerContent.cloneNode(true) as HTMLElement
    scrollerRef.current.appendChild(clone)

    let distance = 0
    const scroll = () => {
      distance -= (1 / speed) * 2
      if (distance <= -scrollerWidth) {
        distance = 0
      }
      if (scrollerRef.current) {
        scrollerRef.current.style.transform = `translateX(${distance}px)`
      }
      requestAnimationFrame(scroll)
    }

    const animation = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animation)
  }, [speed])

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={scrollerRef} className="flex whitespace-nowrap smooth-scroll">
        <div ref={contentRef} className="flex gap-16 flex-nowrap">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Ticker 