export const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error('API_URL environment variable is not defined')
}

export const API_ENDPOINTS = {
  JOIN_MOVEMENT: `${API_URL}/members/join-movement`
} as const 