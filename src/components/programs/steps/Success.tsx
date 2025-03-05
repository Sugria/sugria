'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Success = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center"
      >
        <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-900">Application Submitted!</h3>
      <p className="text-gray-600 text-center mb-8">
        We&apos;ll review your application and get back to you soon.
      </p>
      
      <Button
        variant="primary"
        className="bg-[#2E8A57] hover:bg-[#133824] text-white"
        onClick={() => router.push('/about')}
      >
        Go to About
      </Button>
    </div>
  )
}

export default Success 