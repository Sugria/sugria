import { api } from './client'
import axios from 'axios'
import { validateFile } from '@/utils/fileValidation'
import { ProgramFormData } from '@/types/program'

export const programsApi = {
  submitApplication: async (data: ProgramFormData) => {
    try {
      // Validate files before submission
      if (data.grant.budget) {
        const budgetValidation = validateFile(data.grant.budget)
        if (!budgetValidation.valid) {
          throw new Error(budgetValidation.error)
        }
      }

      if (data.motivation.identity) {
        const identityValidation = validateFile(data.motivation.identity)
        if (!identityValidation.valid) {
          throw new Error(identityValidation.error)
        }
      }

      // Create FormData and append fields exactly as in curl request
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
      formData.append('farm[size]', data.farm.size)
      formData.append('farm[type]', data.farm.type)
      formData.append('farm[practices]', data.farm.practices)
      formData.append('farm[challenges]', data.farm.challenges)

      // Grant data
      formData.append('grant[outcomes]', data.grant.outcomes)
      if (data.grant.budget) {
        formData.append('grant.budget', data.grant.budget)
      }

      // Training data
      formData.append('training[preference]', data.training.preference)

      // Motivation data
      formData.append('motivation[statement]', data.motivation.statement)
      formData.append('motivation[implementation]', data.motivation.implementation)
      if (data.motivation.identity) {
        formData.append('motivation.identity', data.motivation.identity)
      }

      // Declaration data
      formData.append('declaration[agreed]', String(data.declaration.agreed))
      formData.append('declaration[officerName]', data.declaration.officerName)

      const response = await api.post('/programs/applications', formData)
      return response.data
    } catch (error) {
      console.error('Error submitting application:', error)
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to submit application')
      }
      throw error
    }
  }
} 