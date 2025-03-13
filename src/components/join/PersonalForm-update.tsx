'use client'
import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/button'
import { FormData } from '@/types/form'

interface PersonalFormProps {
  data: FormData
  updateFields: (fields: Partial<FormData>) => void
  next: () => void
  fields?: {
    fullName?: boolean
    email?: boolean
    workEmail?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    nationality?: boolean
    phoneNumber?: boolean
    address?: boolean
  }
}

const PersonalForm = ({ data, updateFields, next, fields }: PersonalFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  // Default all fields to true if no fields prop provided
  const displayFields = fields || {
    fullName: true,
    email: true, 
    dateOfBirth: true,
    gender: true,
    nationality: true,
    phoneNumber: true,
    address: true
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (displayFields.fullName && !data.personal.fullName) {
      newErrors.fullName = 'Full name is required'
    }
    if (displayFields.email && !data.personal.workEmail) {
      newErrors.email = 'Work email is required'
    } else if (displayFields.email && !data.personal.workEmail.endsWith('@sugria.com')) {
      newErrors.email = 'Please enter a valid @sugria.com email address'
    }
    if (displayFields.dateOfBirth && !data.personal.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }
    if (displayFields.gender && !data.personal.gender) {
      newErrors.gender = 'Gender is required'
    }
    if (displayFields.nationality && !data.personal.nationality) {
      newErrors.nationality = 'Nationality is required'
    }
    if (displayFields.phoneNumber && !data.personal.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    if (displayFields.address && !data.personal.address) {
      newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setLoading(true)
      try {
        // Just update the form data and move to next step
        // No API call here
        next()
      } catch (error) {
        console.error('Validation failed:', error)
        setErrors({ submit: 'Failed to validate information' })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailValue = e.target.value
    if (emailValue && !emailValue.endsWith('@sugria.com')) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid @sugria.com email address'
      }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.email
        return newErrors
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Work email input */}
      <Input
        name="workEmail"
        label="Sugria Work Email"
        type="email"
        value={data.personal.workEmail}
        onChange={e => updateFields({ personal: { ...data.personal, workEmail: e.target.value } })}
        onBlur={handleEmailBlur}
        error={errors.email}
        required
        placeholder="example@sugria.com"
      />

      {displayFields.fullName && (
        <Input
          name="fullName"
          label="Full Name"
          type="text"
          value={data.personal.fullName}
          onChange={e => updateFields({ personal: { ...data.personal, fullName: e.target.value } })}
          error={errors.fullName}
          required
        />
      )}

      {(displayFields.dateOfBirth || displayFields.gender) && (
        <div className="grid grid-cols-2 gap-4">
          {displayFields.dateOfBirth && (
            <Input
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={data.personal.dateOfBirth}
              onChange={e => updateFields({ personal: { ...data.personal, dateOfBirth: e.target.value } })}
              error={errors.dateOfBirth}
              required
            />
          )}

          {displayFields.gender && (
            <Input
              name="gender"
              label="Gender"
              type="select"
              value={data.personal.gender}
              onChange={e => updateFields({ personal: { ...data.personal, gender: e.target.value } })}
              error={errors.gender}
              required
              options={[
                { value: "", label: "Select gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" }
              ]}
            />
          )}
        </div>
      )}

      {displayFields.nationality && (
        <Input
          name="nationality"
          label="Nationality"
          type="text"
          value={data.personal.nationality}
          onChange={e => updateFields({ personal: { ...data.personal, nationality: e.target.value } })}
          error={errors.nationality}
          required
        />
      )}

      {displayFields.phoneNumber && (
        <Input
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          value={data.personal.phoneNumber}
          onChange={e => updateFields({ personal: { ...data.personal, phoneNumber: e.target.value } })}
          error={errors.phoneNumber}
          required
          placeholder="type your phone number"
        />
      )}

      {displayFields.address && (
        <Input
          name="address"
          label="Residential Address"
          type="text"
          value={data.personal.address}
          onChange={e => updateFields({ personal: { ...data.personal, address: e.target.value } })}
          error={errors.address}
          required
        />
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="bg-[#1A5D3A] hover:bg-[#0F3622] text-white disabled:opacity-20 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Next Step'}
        </Button>
      </div>
      
      {errors.submit && (
        <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
      )}
    </form>
  )
}

export default PersonalForm