import { API_BASE_URL } from './config'

interface RequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: unknown
}

interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export const fetchData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return apiClient(endpoint)
}

export async function apiClient(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', headers = {}, body } = options

  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // This is important for cookies
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
} 