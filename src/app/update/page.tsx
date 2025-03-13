'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import JoinForm from '@/components/JoinForm-update'
import AnimatedSection from '@/components/AnimatedSection'
import { API_BASE_URL } from '@/services/api/config'

interface ValidationResponse {
  data: {
    email: string
    type: string
  }
  timestamp: string
  path: string
}

function UpdateFormContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use test token in development, otherwise use token from URL
  const token = process.env.NODE_ENV === 'development' 
    ? '86ea3c6f-e622-47b0-978b-455c97c2b240' 
    : searchParams.get('token')

  useEffect(() => {
    const validateToken = async () => {
      if (!token) return
      
      try {
        const response = await fetch(`${API_BASE_URL}/members/validate/${token}`)
        if (!response.ok) {
          throw new Error('Invalid token')
        }
        const data: ValidationResponse = await response.json()
        console.log('Validation response:', data) // For debugging
        setEmail(data.data.email)
      } catch (err) {
        console.error('Validation error:', err)
        setError('Invalid or expired link')
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [token])

  if (!token || error) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Update Link</h1>
          <p className="text-gray-600">{error || 'Please use the link provided in your email.'}</p>
        </div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-700">Loading...</h2>
        </div>
      </main>
    )
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-700">No email found for this token</h2>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="relative">
        <AnimatedSection className="pt-[20px] md:py-12 relative z-10 flex-grow">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-gray-900 mb-4 hover:text-gray-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 lg:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 tracking-[-1px] md:tracking-[-1.5px] lg:tracking-[-3px] text-gray-900">
                  Update Your Information
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">
                  Apologies for the inconvenience, this is just to make sure your information is correct{' '}
                  <span className="hidden md:inline"></span> and to keep our records updated.
                </p>
              </div>
              
              <div className="bg-white p-4 sm:p-6 md:p-8 shadow-lg w-full lg:w-[580px]">
                <JoinForm initialEmail={email} />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  )
}

// Wrap the component that uses useSearchParams in Suspense
export default function UpdatePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-gray-700">Loading...</h2>
        </div>
      </main>
    }>
      <UpdateFormContent />
    </Suspense>
  )
}