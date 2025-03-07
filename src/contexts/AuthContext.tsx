'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie, deleteCookie } from 'cookies-next'

interface AuthData {
  email: string
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: AuthData | null
  login: (data: AuthData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth data on mount
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('auth')
      if (storedAuth) {
        setUser(JSON.parse(storedAuth))
      }
    }
  }, [])

  const login = (data: AuthData) => {
    setUser(data)
    localStorage.setItem('auth', JSON.stringify(data))
    setCookie('auth_token', JSON.stringify(data), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth')
    deleteCookie('auth_token')
    router.push('/admin')
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!user, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 