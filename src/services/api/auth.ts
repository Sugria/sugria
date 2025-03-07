import { apiClient } from './client'

interface LoginCredentials {
  email: string
  password: string
}

export const authService = {
  login: (credentials: LoginCredentials) => 
    apiClient('/admin/login', {
      method: 'POST',
      body: credentials,
    }),
} 