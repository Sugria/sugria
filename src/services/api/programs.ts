import axios, { AxiosRequestTransformer } from 'axios'
import { API_BASE_URL } from './config'
import { validateFile } from '@/utils/fileValidation'
import { ProgramFormData } from '@/types/program'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

type ApiError = {
  response?: {
    status: number;
    data: {
      message?: string;
      error?: {
        message?: string;
        details?: Record<string, string>;
      };
    };
  };
  request?: unknown;
  message: string;
}

export const programsApi = {
  submitApplication: async (data: ProgramFormData) => {
    try {
      // Validate files before submission
      if (data.grant.budget) {
        const budgetValidation = validateFile(data.grant.budget)
        if (!budgetValidation.valid) {
          throw new Error(budgetValidation.error || 'Invalid budget file')
        }
      }

      if (data.motivation.identity) {
        const identityValidation = validateFile(data.motivation.identity, {
          allowedTypes: [
            'application/pdf',
            'image/jpeg',
            'image/jpg',
            'image/png'
          ]
        })
        if (!identityValidation.valid) {
          throw new Error(identityValidation.error || 'Invalid identity file')
        }
      }

      const form = new FormData()

      // Program
      form.append('program[category]', data.program.category)
      form.append('program[previousTraining]', data.program.previousTraining.toString())
      if (data.program.trainingId) {
        form.append('program[trainingId]', data.program.trainingId)
      }

      // Personal
      const formattedPhone = formatPhoneToE164(data.personal.phoneNumber)
      form.append('personal[fullName]', data.personal.fullName)
      form.append('personal[email]', data.personal.email)
      form.append('personal[phoneNumber]', formattedPhone)
      form.append('personal[address]', data.personal.address)
      form.append('personal[gender]', data.personal.gender)
      form.append('personal[dateOfBirth]', data.personal.dateOfBirth)

      // Farm
      form.append('farm[location]', data.farm.location)
      form.append('farm[size]', data.farm.size)
      form.append('farm[type]', data.farm.type)
      form.append('farm[practices]', data.farm.practices)
      form.append('farm[challenges]', data.farm.challenges)

      // Grant
      form.append('grant[outcomes]', data.grant.outcomes)
      if (data.grant.budget instanceof File) {
        form.append('grant.budgetFile', data.grant.budget)
      }

      // Training
      form.append('training[preference]', data.training.preference)

      // Motivation
      form.append('motivation[statement]', data.motivation.statement)
      form.append('motivation[implementation]', data.motivation.implementation)
      if (data.motivation.identity instanceof File) {
        form.append('motivation.identityFile', data.motivation.identity)
      }

      // Declaration
      form.append('declaration[agreed]', data.declaration.agreed.toString())
      form.append('declaration[officerName]', data.declaration.officerName)

      // Log FormData entries for debugging
      console.log('FormData entries:')
      for (const [key, value] of form.entries()) {
        console.log(`${key}: ${value instanceof File ? 'File: ' + value.name : value}`)
      }

      const response = await api.post('/programs/applications', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [
          ((data: FormData): FormData => {
            const transformedData = new FormData()
            for (const [key, value] of data.entries()) {
              if (key.includes('previousTraining') || key.includes('agreed')) {
                transformedData.append(key, value === 'true' ? 'true' : 'false')
              } else {
                transformedData.append(key, value)
              }
            }
            return transformedData
          }) as AxiosRequestTransformer,
          ...(axios.defaults.transformRequest || []) as AxiosRequestTransformer[]
        ],
      })
      
      return response.data
    } catch (error) {
      const err = error as ApiError
      console.error('API Error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        details: err.response?.data?.error?.details || err.response?.data?.error
      })

      if (err.response) {
        if (err.response.status === 400) {
          const errorMessage = 
            err.response.data.error?.message || 
            err.response.data.message || 
            'Invalid application data'
          throw new Error(errorMessage)
        }
        if (err.response.status === 409) {
          throw new Error('You have already submitted an application for this program')
        }
        throw new Error(err.response.data.message || 'Server error')
      } else if (err.request) {
        throw new Error('Network Error')
      }
      throw err
    }
  }
}

// Helper function to format phone number to E.164
function formatPhoneToE164(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // If the number starts with '0', replace it with '+234'
  if (digits.startsWith('0')) {
    return '+234' + digits.slice(1)
  }
  
  // If the number doesn't start with '+234', add it
  if (!phone.startsWith('+234')) {
    return '+234' + digits
  }
  
  return phone
} 