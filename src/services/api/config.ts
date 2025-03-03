const DEV_URL = 'http://localhost:5001'
const PROD_URL = 'https://sugria-backend.onrender.com'

export const API_BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL

export const API_ENDPOINTS = {
  JOIN_MOVEMENT: `${API_BASE_URL}/members/join-movement`,
  SUBMIT_APPLICATION: `${API_BASE_URL}/programs/applications`,
  // ... other endpoints
} as const 