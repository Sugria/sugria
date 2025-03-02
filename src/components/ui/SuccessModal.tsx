'use client'
import { motion } from 'framer-motion'
import Modal from './Modal'
import Button from './button'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center w-[400px] mx-auto py-4">
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
        <p className="text-gray-600 text-center">
          We&apos;ll review your application and get back to you soon.
        </p>
        
        <Button
          variant="primary"
          className="bg-[#2E8A57] hover:bg-[#133824] text-white"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  )
}

export default SuccessModal 