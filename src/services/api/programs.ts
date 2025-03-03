import axios from 'axios'
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
      // Log the data being sent
      console.log('Submitting application data:', {
        program: data.program,
        personal: data.personal,
        farm: data.farm,
        grant: {
          ...data.grant,
          budget: data.grant.budget ? 'File present' : 'No file'
        },
        training: data.training,
        motivation: {
          ...data.motivation,
          identity: data.motivation.identity ? 'File present' : 'No file'
        },
        declaration: data.declaration
      })

      // Validate files before submission
      if (data.grant.budget) {
        const budgetValidation = validateFile(data.grant.budget)
        if (!budgetValidation.valid) {
          throw new Error(budgetValidation.error || 'Invalid budget file')
        }
      }

      if (data.motivation.identity) {
        const identityValidation = validateFile(data.motivation.identity)
        if (!identityValidation.valid) {
          throw new Error(identityValidation.error || 'Invalid identity file')
        }
      }

      const formData = new FormData()

      // Program data
      formData.append('program[category]', data.program.category)
      formData.append('program[previousTraining]', String(data.program.previousTraining))
      if (data.program.trainingId) {
        formData.append('program[trainingId]', data.program.trainingId)
      }

      // Personal data
      formData.append('personal[fullName]', data.personal.fullName)
      formData.append('personal[email]', data.personal.email)
      formData.append('personal[phoneNumber]', data.personal.phoneNumber)
      formData.append('personal[address]', data.personal.address)
      formData.append('personal[gender]', data.personal.gender)
      formData.append('personal[dateOfBirth]', data.personal.dateOfBirth)

      // Farm data
      formData.append('farm[location]', data.farm.location)
      formData.append('farm[size]', Number(data.farm.size).toString())
      formData.append('farm[type]', data.farm.type)
      formData.append('farm[practices]', data.farm.practices)
      formData.append('farm[challenges]', data.farm.challenges)

      // Grant data
      formData.append('grant[outcomes]', data.grant.outcomes)
      if (data.grant.budget) {
        formData.append('budget', data.grant.budget)
      }

      // Training data
      formData.append('training[preference]', data.training.preference)

      // Motivation data
      formData.append('motivation[statement]', data.motivation.statement)
      formData.append('motivation[implementation]', data.motivation.implementation)
      if (data.motivation.identity) {
        formData.append('identity', data.motivation.identity)
      }

      // Declaration data
      formData.append('declaration[agreed]', String(data.declaration.agreed))
      formData.append('declaration[officerName]', data.declaration.officerName)

      // Log FormData entries
      console.log('FormData entries:')
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? 'File: ' + value.name : value}`)
      }

      const response = await api.post('/programs/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
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