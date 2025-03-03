'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface ProgramCardProps {
  title: string
  description: string
  fundingAmount: string
  index: number
  image: string
}

const ProgramCard = ({ title, description, fundingAmount, index, image }: ProgramCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative bg-white overflow-hidden hover:shadow-xl transition-all duration-300 group h-[500px]"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover brightness-[0.6]"
        />
      </div>

      <div className="absolute inset-0 bg-black/60" />

      {/* Mobile Content */}
      <div className="relative p-6 md:p-8 h-full flex flex-col justify-end md:hidden">
        <h3 className="text-xl font-bold mb-4 tracking-[-0.5px] text-white">
          {title}
        </h3>
        <div className="text-white font-semibold mb-4">
          Up to {fundingAmount} in funding
        </div>
        <Link href="/programs">
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            Apply Now
          </Button>
        </Link>
      </div>

      {/* Desktop Default State Content */}
      <div className="relative p-6 md:p-8 h-full flex-col justify-end hidden md:flex">
        <h3 className="text-2xl font-bold mb-4 tracking-[-0.5px] text-white">
          {title}
        </h3>
        <div className="text-white font-semibold">
          Up to {fundingAmount} in funding
        </div>
      </div>

      {/* Desktop Hover State Content */}
      <div className="absolute inset-0 bg-white p-6 md:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
        <h3 className="text-xl font-bold mb-4 tracking-[-0.5px] text-gray-900">
          {title}
        </h3>
        <p className="text-gray-700 mb-6">
          {description}
        </p>
        <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
          <div className="text-[#1A5D3A] font-semibold">
            Up to {fundingAmount} in funding
          </div>
          <Link href="/programs">
            <Button variant="outline" className="text-[#1A5D3A] border-[#1A5D3A] hover:bg-[#1A5D3A] hover:text-white">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProgramCard