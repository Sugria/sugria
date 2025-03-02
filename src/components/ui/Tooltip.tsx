'use client'
import { useState } from 'react'

interface TooltipProps {
  text: string
}

const InfoIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const Tooltip = ({ text }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block ml-1">
      <span
        className="text-gray-400 hover:text-gray-600 cursor-help inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <InfoIcon />
      </span>
      {isVisible && (
        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-gray-700 bg-white border rounded-lg shadow-lg -right-2 top-6">
          <div className="absolute -top-1 right-3 w-2 h-2 bg-white border-t border-l transform rotate-45" />
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip 