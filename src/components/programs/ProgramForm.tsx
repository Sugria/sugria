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

const ProgramForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<ProgramFormData>(INITIAL_DATA)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFields = (fields: Partial<ProgramFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      await programsApi.submitApplication(formData)
      setShowSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
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