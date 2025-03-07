'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/admin/LoginForm'
import { useAuth } from '@/hooks/useAuth'

export default function AdminPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  )
}
