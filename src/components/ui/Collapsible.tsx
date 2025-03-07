'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border bg-white">
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bold tracking-[-0.02em] text-gray-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <div className="space-y-4">
            {React.Children.map(children, (child) => (
              <div className="bg-[#FAFAFB] p-4 rounded-lg">
                {child}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}