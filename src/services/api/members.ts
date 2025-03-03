import axios from 'axios'
import { API_BASE_URL } from './config'

interface MemberFormData {
  personal: {
    fullName: string
    email: string
    dateOfBirth: string
    gender: string
    nationality: string
    phoneNumber: string
    address: string
  }
  emergency: {
    name: string
    relationship: string
    phone: string
  }
  education: {
    level: string
    institution: string
    fieldOfStudy: string
    certifications?: string
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
    otherCertifications?: string
  }
}

type ApiError = {
  response?: {
    status: number;
    data: {
      message?: string | string[];
      error?: {
        message?: string;
      };
    };
  };
  request?: unknown;
  message: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // Handle different formats
  if (digits.length === 10) {
    return `+234${digits}` // Format: 8012345678
  }
  
  if (digits.length === 11 && digits.startsWith('0')) {
    return `+234${digits.slice(1)}` // Format: 08012345678
  }
  
  if (digits.length === 13 && digits.startsWith('234')) {
    return `+${digits}` // Format: 2348012345678
  }
  
  throw new Error('Invalid phone number format')
}

export const membersApi = {
  joinMovement: async (data: MemberFormData) => {
    try {
      // Format the full name into first and last name
      const nameParts = data.personal.fullName.trim().split(/\s+/)
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ')

      // Format phone numbers
      const formattedPhoneNumber = formatPhoneNumber(data.personal.phoneNumber)
      const formattedEmergencyPhone = formatPhoneNumber(data.emergency.phone)

      const requestData: JoinMovementData = {
        firstName,
        lastName,
        email: data.personal.email,
        dateOfBirth: new Date(data.personal.dateOfBirth).toISOString(),
        gender: data.personal.gender.toLowerCase(),
        nationality: data.personal.nationality,
        phoneNumber: formattedPhoneNumber,
        residentialAddress: data.personal.address,
        emergencyContact: {
          name: data.emergency.name,
          relationship: data.emergency.relationship,
          phoneNumber: formattedEmergencyPhone
        },
        education: {
          highestLevel: data.education.level,
          institutionName: data.education.institution,
          fieldOfStudy: data.education.fieldOfStudy,
          otherCertifications: data.education.certifications || 'None'
        }
      }

      console.log('Submitting member data:', requestData)

      const response = await api.post('/members/join-movement', requestData)
      return response.data
    } catch (error) {
      const err = error as ApiError
      console.error('API Error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      })

      if (err.response) {
        // Handle specific error responses
        if (err.response.status === 400) {
          const messages = err.response.data.message
          if (Array.isArray(messages)) {
            throw new Error(messages.join('\n'))
          }
          throw new Error(messages || 'Invalid data provided')
        }
        if (err.response.status === 409) {
          throw new Error('A member with this email already exists')
        }
        if (err.response.status === 403) {
          throw new Error('Membership registration is currently disabled')
        }
        // Convert message to string if it's an array
        const errorMessage = Array.isArray(err.response.data.message) 
          ? err.response.data.message.join('\n')
          : err.response.data.message
        throw new Error(errorMessage || 'Server error')
      } else if (err.request) {
        throw new Error('Unable to connect to the server. Please try again later.')
      }
      throw err
    }
  }
} 