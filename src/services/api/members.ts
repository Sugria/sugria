import axios from 'axios'
import { API_BASE_URL } from './config'
import { apiClient } from './client'

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

export interface Member {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  nationality: string
  createdAt: string
}

interface PaginatedResponse<T> {
  data: {
    data: T[]
    meta: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
  timestamp: string
  path: string
}

export const membersService = {
  getMembers: async (): Promise<Member[]> => {
    const response = await apiClient('/admin/members') as PaginatedResponse<Member>
    return response.data.data
  },

  getMember: async (id: string | number) => {
    const response = await apiClient(`/admin/members/${id}`)
    return response.data
  }
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
  },

  updateMember: async (token: string, data: {
    firstName: string
    lastName: string
    email: string
    workEmail: string
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
      otherCertifications: string | null
    }
  }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members/update/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          workEmail: data.workEmail,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          nationality: data.nationality,
          phoneNumber: data.phoneNumber,
          residentialAddress: data.residentialAddress,
          emergencyContact: {
            name: data.emergencyContact.name,
            relationship: data.emergencyContact.relationship,
            phoneNumber: data.emergencyContact.phoneNumber
          },
          education: {
            highestLevel: data.education.highestLevel,
            institutionName: data.education.institutionName,
            fieldOfStudy: data.education.fieldOfStudy,
            otherCertifications: data.education.otherCertifications || null
          }
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        const errorMessage = typeof responseData.message === 'string' 
          ? responseData.message 
          : 'Failed to update member information'
        throw new Error(errorMessage)
      }

      return responseData
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }
} 