'use client'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/admin/LoginForm'
import { toast } from 'sonner'

export default function AdminPage() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    try {
      console.log('Login success handler called')
      // Set both localStorage and cookie
      localStorage.setItem('isAdminAuthenticated', 'true')
      document.cookie = 'isAdminAuthenticated=true; path=/;'
      
      console.log('Auth set, navigating to dashboard...')
      // Use router.push first, fallback to window.location
      router.push('/admin/dashboard')
      
      // Fallback navigation after a short delay if router.push doesn't work
      setTimeout(() => {
        if (window.location.pathname !== '/admin/dashboard') {
          window.location.href = '/admin/dashboard'
        }
      }, 100)
    } catch (error) {
      console.error('Navigation error:', error)
      toast.error('Failed to navigate to dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}
