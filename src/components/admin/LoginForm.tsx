'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/api/auth'

const LoginForm = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = await authService.login(formData)
      login(data)
      router.push('/admin/dashboard')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Invalid email or password')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="max-w-md w-full space-y-8 p-8 bg-white">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm">
              {error}
            </div>
          )}
          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full bg-[#1A5D3A] hover:bg-[#0F3622] text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
   
  )
}

export default LoginForm 