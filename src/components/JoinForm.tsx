'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PersonalForm from './join/PersonalForm'
import EmergencyForm from './join/EmergencyForm'
import EducationForm from './join/EducationForm'
import SuccessModal from './ui/SuccessModal'
import { membersApi } from '@/services/api/members'
import Toast from './ui/Toast'

interface FormData {
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
    certifications: string
  }
  recoveryToken?: string
}

interface JoinFormProps {
  isUpdate?: boolean
  initialEmail?: string
}

const INITIAL_DATA: FormData = {
  personal: {
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    phoneNumber: '',
    address: ''
  },
  emergency: {
    name: '',
    relationship: '',
    phone: ''
  },
  education: {
    level: '',
    institution: '',
    fieldOfStudy: '',
    certifications: ''
  }
}

const JoinForm = ({ isUpdate = false, initialEmail = '' }: JoinFormProps) => {
  const searchParams = useSearchParams()
  const recoveryToken = process.env.NODE_ENV === 'development' 
    ? 'test-token-123' 
    : searchParams.get('token')
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_DATA,
    personal: {
      ...INITIAL_DATA.personal,
      email: initialEmail
    },
    recoveryToken: recoveryToken || ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateFields = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = async () => {
    if (!validateForm()) return
    setIsSubmitting(true)
    setError(null)

    try {
      if (isUpdate && recoveryToken) {
        await membersApi.updateMember(recoveryToken, {
          firstName: formData.personal.fullName.split(' ')[0],
          lastName: formData.personal.fullName.split(' ').slice(1).join(' '),
          email: formData.personal.email,
          dateOfBirth: formData.personal.dateOfBirth,
          gender: formData.personal.gender,
          nationality: formData.personal.nationality,
          phoneNumber: formData.personal.phoneNumber,
          residentialAddress: formData.personal.address,
          emergencyContact: {
            name: formData.emergency.name,
            relationship: formData.emergency.relationship,
            phoneNumber: formData.emergency.phone
          },
          education: {
            highestLevel: formData.education.level,
            institutionName: formData.education.institution,
            fieldOfStudy: formData.education.fieldOfStudy,
            otherCertifications: formData.education.certifications
          }
        })
      } else {
        await membersApi.joinMovement(formData)
      }
      setShowSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    // Validate personal information
    if (!formData.personal.fullName || !formData.personal.email || 
        !formData.personal.dateOfBirth || !formData.personal.gender || 
        !formData.personal.nationality || !formData.personal.phoneNumber || 
        !formData.personal.address) {
      setError('Please fill in all personal information fields')
      return false
    }

    // Validate emergency contact
    if (!formData.emergency.name || !formData.emergency.relationship || 
        !formData.emergency.phone) {
      setError('Please fill in all emergency contact fields')
      return false
    }

    // Validate education
    if (!formData.education.level || !formData.education.institution || 
        !formData.education.fieldOfStudy) {
      setError('Please fill in all education fields')
      return false
    }

    return true
  }

  const steps = [
    <PersonalForm 
      key="personal"
      data={formData} 
      updateFields={updateFields} 
      next={nextStep}
      fields={{
        fullName: true,
        email: true,
        dateOfBirth: true,
        gender: true,
        nationality: true,
        phoneNumber: true,
        address: true
      }}
    />,
    <EmergencyForm 
      key="emergency"
      data={formData} 
      updateFields={updateFields} 
      next={nextStep} 
      prev={prevStep} 
    />,
    <EducationForm 
      key="education"
      data={formData} 
      updateFields={updateFields} 
      onSubmit={handleSubmit} 
      prev={prevStep}
      isSubmitting={isSubmitting} 
    />
  ]

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2 overflow-hidden bg-gray-200"
          >
            <div
              className={`h-full transition-all duration-300 ${
                i <= step ? 'bg-[#1A6B3C]' : 'bg-transparent'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Form Steps */}
      {steps[step]}

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

export default JoinForm