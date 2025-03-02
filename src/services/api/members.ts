import { API_ENDPOINTS } from './config'

interface ApiError extends Error {
  status?: number
  details?: Record<string, string>
}

interface ErrorResponse {
  statusCode: number
  timestamp: string
  error: {
    message?: string
    details?: Record<string, string>
  }
}

interface JoinMovementData {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: string
  nationality: string
  phoneNumber: string
  residentialAddress: string
  emergencyContact: {
    name: string
    relationship: string
    phoneNumber: string
  }
  education: {
    highestLevel: string
    institutionName: string
    fieldOfStudy: string
    otherCertifications: string
  }
}

export const membersApi = {
  joinMovement: async (data: JoinMovementData) => {
    try {
      console.log('Request URL:', API_ENDPOINTS.JOIN_MOVEMENT)
      console.log('Request Data:', data)

      const response = await fetch(API_ENDPOINTS.JOIN_MOVEMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(data),
      })

      console.log('Response Status:', response.status)
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()))

      const responseData = await response.json()
      console.log('Response Data:', responseData)

      if (!response.ok) {
        const errorResponse = responseData as ErrorResponse
        const errorMessage = errorResponse.error?.message || 'Failed to submit application'
        const error = new Error(errorMessage) as ApiError
        error.status = response.status
        error.details = errorResponse.error?.details
        throw error
      }

      return responseData
    } catch (error) {
      console.log('Caught Error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }
} 