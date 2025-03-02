'use client'
import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/button'

interface PersonalFormData {
  fullName: string
  email: string
  dateOfBirth: string
  gender: string
  nationality: string
  phoneNumber: string
  address: string
}

interface PersonalFormProps {
  data: PersonalFormData
  onChange: (data: PersonalFormData) => void
  onNext: () => void
}

const PersonalForm = ({ data, onChange, onNext }: PersonalFormProps) => {
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalFormData, string>>>({})

  const validateField = (name: keyof PersonalFormData, value: string): string => {
    switch (name) {
      case 'fullName':
        return value.split(' ').length < 2 ? 'Please enter both first and last name' : ''
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : ''
      case 'phoneNumber':
        return !/^(\+234|0)[0-9]{10}$/.test(value.replace(/\s/g, '')) 
          ? 'Please enter a valid Nigerian phone number' 
          : ''
      case 'dateOfBirth':
        const date = new Date(value)
        const age = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
        return age < 18 ? 'You must be at least 18 years old' : ''
      default:
        return value.trim() === '' ? 'This field is required' : ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof PersonalFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
    onChange({ ...data, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Partial<Record<keyof PersonalFormData, string>> = {}
    let hasErrors = false
    
    Object.entries(data).forEach(([key, value]) => {
      const error = validateField(key as keyof PersonalFormData, value)
      if (error) {
        newErrors[key as keyof PersonalFormData] = error
        hasErrors = true
      }
    })
    
    setErrors(newErrors)
    
    if (!hasErrors) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 sm:px-0 max-w-2xl mx-auto">
      <Input
        label="Full Name"
        name="fullName"
        value={data.fullName}
        onChange={handleChange}
        required
        error={errors.fullName}
        helpText="Enter your full name as it appears on official documents"
        className="text-base sm:text-sm"
      />
      
      <Input
        type="email"
        label="Email Address"
        name="email"
        value={data.email}
        onChange={handleChange}
        required
        error={errors.email}
        helpText="We'll use this email to send you important information about your application"
        className="text-base sm:text-sm"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={data.dateOfBirth}
          onChange={handleChange}
          required
          error={errors.dateOfBirth}
          helpText="You must be at least 18 years old to join"
          className="text-base sm:text-sm"
        />

        <Input
          type="select"
          label="Gender"
          name="gender"
          value={data.gender}
          onChange={handleChange}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
          required
          error={errors.gender}
          className="text-base sm:text-sm"
        />

        <Input
          label="Nationality"
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          required
          error={errors.nationality}
          className="text-base sm:text-sm"
        />

        <Input
          type="tel"
          label="Phone Number"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleChange}
          required
          error={errors.phoneNumber}
          helpText="Enter a valid Nigerian phone number (e.g., 0801234567 or +2348012345678)"
          placeholder="0801234567"
          className="text-base sm:text-sm"
        />
      </div>

      <Input
        type="textarea"
        label="Residential Address"
        name="address"
        value={data.address}
        onChange={handleChange}
        required
        error={errors.address}
        helpText="Enter your current residential address"
        className="min-h-[80px] text-base sm:text-sm"
      />

      <div className="flex justify-end mt-6">
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto bg-[#1A5D3A] hover:bg-[#0F3622] text-white py-3 px-6 text-base sm:text-sm"
        >
          Next Step
        </Button>
      </div>
    </form>
  )
}

export default PersonalForm 