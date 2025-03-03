'use client'
import { useState } from 'react'
import ProgramSelect from './steps/ProgramSelect'
import PersonalInfo from './steps/PersonalInfo'
import FarmDetails from './steps/FarmDetails'
import GrantPurpose from './steps/GrantPurpose'
import TrainingPreferences from './steps/TrainingPreferences'
import MotivationStatement from './steps/MotivationStatement'
import Declaration from './steps/Declaration'
import SuccessModal from '../ui/SuccessModal'
import { programsApi } from '@/services/api/programs'
import Toast from '../ui/Toast'
import { ProgramFormData } from '@/types/program'

type FormStepProps = {
  data: ProgramFormData
  updateFields: (fields: Partial<ProgramFormData>) => void
  next: () => void
  prev?: () => void
  isLastStep?: boolean
  isSubmitting?: boolean
}

type FormStep = {
  title: string
  Component: React.ComponentType<FormStepProps>
}

const steps: FormStep[] = [
  {
    title: 'Select Program',
    Component: ProgramSelect
  },
  {
    title: 'Personal Information',
    Component: PersonalInfo
  },
  {
    title: 'Farm Details',
    Component: FarmDetails
  },
  {
    title: 'Grant Purpose',
    Component: GrantPurpose
  },
  {
    title: 'Training Preferences',
    Component: TrainingPreferences
  },
  {
    title: 'Motivation Statement',
    Component: MotivationStatement
  },
  {
    title: 'Declaration',
    Component: Declaration
  }
]

const INITIAL_DATA: ProgramFormData = {
  program: {
    category: '',
    previousTraining: false,
    trainingId: undefined
  },
  personal: {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: '',
    dateOfBirth: ''
  },
  farm: {
    location: '',
    size: '',
    type: '',
    practices: '',
    challenges: ''
  },
  grant: {
    outcomes: '',
    budget: null
  },
  training: {
    preference: ''
  },
  motivation: {
    statement: '',
    implementation: '',
    identity: null
  },
  declaration: {
    agreed: false,
    officerName: ''
  }
}

interface FileCache {
  budget?: File | null
  identity?: File | null
}

const ProgramForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<ProgramFormData>(INITIAL_DATA)
  const [fileCache, setFileCache] = useState<FileCache>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFields = (fields: Partial<ProgramFormData>) => {
    setFormData(prev => {
      const newData = { ...prev, ...fields }
      
      // Cache files when they're added
      if (fields.grant?.budget !== undefined) {
        setFileCache(prev => ({ ...prev, budget: fields.grant?.budget }))
      }
      if (fields.motivation?.identity !== undefined) {
        setFileCache(prev => ({ ...prev, identity: fields.motivation?.identity }))
      }
      
      return newData
    })
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => {
    // Restore files from cache when going back
    if (step === steps.length - 1) {
      setFormData(prev => ({
        ...prev,
        grant: { 
          ...prev.grant, 
          budget: fileCache.budget ?? null  // Use nullish coalescing to ensure null if undefined
        },
        motivation: { 
          ...prev.motivation, 
          identity: fileCache.identity ?? null  // Use nullish coalescing to ensure null if undefined
        }
      }))
    }
    setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Add validation for required files
      if (!formData.grant.budget) {
        throw new Error('Budget document is required')
      }
      if (!formData.motivation.identity) {
        throw new Error('Identification document is required')
      }

      // Validate all required fields
      const missingFields = validateAllFields(formData)
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields:\n${missingFields.join('\n')}`)
      }

      // Validate file formats
      if (!validateFiles(formData)) {
        throw new Error('Please ensure all files are in the correct format (PDF, DOC, or DOCX) and under 5MB')
      }

      await programsApi.submitApplication(formData)
      setShowSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateAllFields = (data: ProgramFormData): string[] => {
    const missingFields: string[] = []
    
    // Program validation
    if (!data.program.category) missingFields.push('Program Category')
    if (data.program.previousTraining && !data.program.trainingId) {
      missingFields.push('Previous Training ID')
    }

    // Personal information validation
    if (!data.personal.fullName) missingFields.push('Full Name')
    if (!data.personal.email) missingFields.push('Email')
    if (!data.personal.phoneNumber) missingFields.push('Phone Number')
    if (!data.personal.address) missingFields.push('Address')
    if (!data.personal.gender) missingFields.push('Gender')
    if (!data.personal.dateOfBirth) missingFields.push('Date of Birth')

    // Farm details validation
    if (!data.farm.location) missingFields.push('Farm Location')
    if (!data.farm.size) missingFields.push('Farm Size')
    if (!data.farm.type) missingFields.push('Farm Type')
    if (!data.farm.practices) missingFields.push('Farming Practices')
    if (!data.farm.challenges) missingFields.push('Farm Challenges')

    // Grant validation
    if (!data.grant.outcomes) missingFields.push('Grant Outcomes')
    if (!data.grant.budget) missingFields.push('Budget Document')

    // Training validation
    if (!data.training.preference) missingFields.push('Training Preference')

    // Motivation validation
    if (!data.motivation.statement) missingFields.push('Motivation Statement')
    if (!data.motivation.implementation) missingFields.push('Implementation Plan')
    if (!data.motivation.identity) missingFields.push('Identification Document')

    // Declaration validation
    if (!data.declaration.agreed) missingFields.push('Declaration Agreement')
    if (!data.declaration.officerName) missingFields.push('Officer Name')

    return missingFields
  }

  // Helper function to validate files
  const validateFiles = (data: ProgramFormData): boolean => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

    // Check budget file
    if (data.grant.budget && (
      data.grant.budget.size > maxSize ||
      !allowedTypes.includes(data.grant.budget.type)
    )) {
      return false
    }

    // Check identity file
    if (data.motivation.identity && (
      data.motivation.identity.size > maxSize ||
      !allowedTypes.includes(data.motivation.identity.type)
    )) {
      return false
    }

    return true
  }

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2  overflow-hidden bg-gray-200"
          >
            <div
              className={`h-full transition-all duration-300 ${
                i <= step ? 'bg-[#1A6B3C]' : 'bg-transparent'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Step Title */}
      <h2 className="text-2xl font-bold tracking-[-1.5px] text-gray-900 mb-6">
        {steps[step].title}
      </h2>

      {/* Form Steps */}
      <div className="mt-6">
        {(() => {
          const StepComponent = steps[step].Component
          return (
            <StepComponent
              data={formData}
              updateFields={updateFields}
              next={step < steps.length - 1 ? nextStep : handleSubmit}
              prev={step > 0 ? prevStep : undefined}
              isLastStep={step === steps.length - 1}
              isSubmitting={isSubmitting}
            />
          )
        })()}
      </div>

      {/* Error Toast */}
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/50" />
          <SuccessModal
            isOpen={showSuccess}
            onClose={() => {
              setShowSuccess(false)
              setStep(0)
              setFormData(INITIAL_DATA)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ProgramForm