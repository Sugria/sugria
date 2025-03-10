import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true'
    
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    router.push('/admin')
  }

  return { logout }
} 