export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const API_ENDPOINTS = {
  JOIN_MOVEMENT: `${API_BASE_URL}/members/join-movement`,
  SUBMIT_APPLICATION: `${API_BASE_URL}/programs/applications`,
  // ... other endpoints
} as const

export const API_URL = process.env.NEXT_PUBLIC_API_URL 