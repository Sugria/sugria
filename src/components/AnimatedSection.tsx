'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Changed to false so animation repeats
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection