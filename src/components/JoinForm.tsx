'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

const JoinForm = () => {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateFields = (fields: Partial<FormData[keyof FormData]>, section: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...fields }
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Format phone numbers to include country code if not present
      const formatPhoneNumber = (phone: string) => {
        // Remove any non-digit characters
        const digits = phone.replace(/\D/g, '')
        
        // Check if the number has enough digits
        if (digits.length < 11) {
          throw new Error('Phone number must have at least 11 digits')
        }

        // If it starts with 0, remove it and add +234
        if (digits.startsWith('0')) {
          return `+234${digits.slice(1)}`
        }
        
        // If it starts with 234, add +
        if (digits.startsWith('234')) {
          return `+${digits}`
        }
        
        // If it doesn't have country code, add it
        if (!digits.startsWith('234')) {
          // If the number is exactly 10 digits (without country code)
          if (digits.length === 10) {
            return `+234${digits}`
          }
          // If the number is 11 digits (with leading 0)
          if (digits.length === 11 && digits.startsWith('0')) {
            return `+234${digits.slice(1)}`
          }
        }

        // If none of the above, throw error
        throw new Error('Invalid phone number format. Please enter a valid Nigerian phone number')
      }

      // Format date to ISO string
      const formatDate = (date: string) => {
        const d = new Date(date)
        return d.toISOString()
      }

      // Validate phone numbers before making the API call
      try {
        const formattedPhoneNumber = formatPhoneNumber(formData.personal.phoneNumber)
        const formattedEmergencyPhone = formatPhoneNumber(formData.emergency.phone)

        const apiData = {
          firstName: formData.personal.fullName.split(' ')[0],
          lastName: formData.personal.fullName.split(' ').slice(1).join(' '),
          email: formData.personal.email,
          dateOfBirth: formatDate(formData.personal.dateOfBirth),
          gender: formData.personal.gender.toLowerCase(),
          nationality: formData.personal.nationality,
          phoneNumber: formattedPhoneNumber,
          residentialAddress: formData.personal.address,
          emergencyContact: {
            name: formData.emergency.name,
            relationship: formData.emergency.relationship,
            phoneNumber: formattedEmergencyPhone
          },
          education: {
            highestLevel: formData.education.level,
            institutionName: formData.education.institution,
            fieldOfStudy: formData.education.fieldOfStudy,
            otherCertifications: formData.education.certifications || 'None'
          }
        }

        console.log('Submitting data:', apiData)
        await membersApi.joinMovement(apiData)
        setShowSuccess(true)
      } catch (phoneError) {
        if (phoneError instanceof Error) {
          throw new Error(phoneError.message)
        }
        throw new Error('Invalid phone number format')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      if (error instanceof Error) {
        const message = error.message.split(',').join('\n')
        setError(message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      title: 'Personal Information',
      component: (
        <PersonalForm
          data={formData.personal}
          onChange={(data) => updateFields(data, 'personal')}
          onNext={() => !isSubmitting && setStep(1)}
        />
      )
    },
    {
      title: 'Emergency Contact',
      component: (
        <EmergencyForm
          data={formData.emergency}
          onChange={(data) => updateFields(data, 'emergency')}
          onNext={() => !isSubmitting && setStep(2)}
          onBack={() => !isSubmitting && setStep(0)}
        />
      )
    },
    {
      title: 'Education & Certifications',
      component: (
        <EducationForm
          data={formData.education}
          onChange={(data) => updateFields(data, 'education')}
          onSubmit={handleSubmit}
          onBack={() => !isSubmitting && setStep(1)}
          isSubmitting={isSubmitting}
        />
      )
    }
  ]

  return (
    <div className={`space-y-6 ${isSubmitting ? 'pointer-events-none' : ''}`}>
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
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

      {/* Step Title */}
      <h2 className="text-2xl font-bold tracking-[-1.5px] text-gray-900">
        {steps[step].title}
      </h2>

      {/* Form Steps */}
      {steps[step].component}

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
          <SuccessModal
            isOpen={showSuccess}
            onClose={() => {
              setShowSuccess(false)
              setStep(0)
              setFormData(INITIAL_DATA)
              router.push('/')
            }}
          />
        </div>
      )}
    </div>
  )
}

export default JoinForm