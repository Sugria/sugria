'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { toast } from 'sonner'

const ADMIN_CREDENTIALS = {
  email: 'admin@sugria.com',
  password: 'admin@sugria2025'
}

interface LoginFormProps {
  onSuccess: () => void
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('Login attempt:', {
        enteredEmail: formData.email.trim(),
        expectedEmail: ADMIN_CREDENTIALS.email,
        emailMatch: formData.email.trim() === ADMIN_CREDENTIALS.email,
        passwordMatch: formData.password === ADMIN_CREDENTIALS.password
      })

      // Simple credential check
      if (
        formData.email.trim() === ADMIN_CREDENTIALS.email && 
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        console.log('Credentials matched, calling onSuccess')
        toast.success('Login successful')
        onSuccess()
      } else {
        console.log('Invalid credentials')
        toast.error('Invalid email or password')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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