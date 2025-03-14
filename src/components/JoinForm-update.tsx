'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import PersonalForm from './join/PersonalForm-update'
import EmergencyForm from './join/EmergencyForm'
import EducationForm from './join/EducationForm'
import { membersApi } from '@/services/api/members'
import Toast from './ui/Toast'

interface FormData {
  personal: {
    fullName: string
    email: string
    workEmail: string
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
  initialEmail?: string
}

const INITIAL_DATA: FormData = {
  personal: {
    fullName: '',
    email: '',
    workEmail: '',
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

const JoinForm = ({ initialEmail = '' }: JoinFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryToken = process.env.NODE_ENV === 'development' 
    ? '86ea3c6f-e622-47b0-978b-455c97c2b240' 
    : searchParams.get('token')
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_DATA,
    personal: {
      ...INITIAL_DATA.personal,
      email: initialEmail,
      workEmail: ''
    },
    recoveryToken: recoveryToken || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const updateFields = (fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }))
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = async () => {
    if (!validateForm()) return
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      await membersApi.updateMember(recoveryToken!, {
        firstName: formData.personal.fullName.split(' ')[0],
        lastName: formData.personal.fullName.split(' ').slice(1).join(' '),
        email: formData.personal.email,
        workEmail: formData.personal.workEmail,
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
          otherCertifications: formData.education.certifications || null
        }
      })
      setSuccess('Your information has been successfully updated!')
      setStep(0)
      setFormData(INITIAL_DATA)
      // Redirect to home page after successful submission
      router.push('/')
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred while updating your information')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateForm = () => {
    // Validate personal information
    if (!formData.personal.fullName || !formData.personal.workEmail || 
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
        workEmail: true,
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

       {/* Show prefilled email from validation */}
       <div className="mb-6">
        <input
          type="email"
          value={initialEmail}
          disabled
          className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 cursor-not-allowed"
        />
        <p className="mt-1 text-sm text-orange-500">
          This email was used to send you the update link
        </p>
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

      {/* Success Toast */}
      {success && (
        <Toast
          message={success}
          type="success" 
          onClose={() => setSuccess(null)}
        />
      )}
    </div>
  )
}

export default JoinForm