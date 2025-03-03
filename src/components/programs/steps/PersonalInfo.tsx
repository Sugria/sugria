'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps, PersonalFields } from '@/types/program'
import { validatePhoneNumber } from '@/utils/phoneValidation'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
]

const PersonalInfo = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    const fields: PersonalFields[] = ['fullName', 'email', 'phoneNumber', 'address', 'gender', 'dateOfBirth']
    
    fields.forEach(field => {
      if (!data.personal[field]) {
        newErrors[field] = `Please enter your ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`
      }
    })

    if (data.personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (data.personal.phoneNumber && !validatePhoneNumber(data.personal.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      next()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        name="fullName"
        value={data.personal.fullName}
        onChange={e => updateFields({ personal: { ...data.personal, fullName: e.target.value } })}
        error={errors.fullName}
        required
      />

      <Input
        type="email"
        label="Email Address"
        name="email"
        value={data.personal.email}
        onChange={e => updateFields({ personal: { ...data.personal, email: e.target.value } })}
        error={errors.email}
        required
      />

      <Input
        type="tel"
        label="Phone Number"
        name="phoneNumber"
        value={data.personal.phoneNumber}
        onChange={e => updateFields({ personal: { ...data.personal, phoneNumber: e.target.value } })}
        error={errors.phoneNumber}
        required
        helpText="Format: +234 or 0801234567"
      />

      <Input
        label="Residential Address"
        name="address"
        value={data.personal.address}
        onChange={e => updateFields({ personal: { ...data.personal, address: e.target.value } })}
        error={errors.address}
        required
      />

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          type="select"
          label="Gender"
          name="gender"
          value={data.personal.gender}
          onChange={e => updateFields({ personal: { ...data.personal, gender: e.target.value } })}
          options={genderOptions}
          error={errors.gender}
          required
        />

        <Input
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={data.personal.dateOfBirth}
          onChange={e => updateFields({ personal: { ...data.personal, dateOfBirth: e.target.value } })}
          error={errors.dateOfBirth}
          required
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          className="text-[#1A5D3A] border-[#1A5D3A] hover:bg-[#1A5D3A] hover:text-white"
        >
          Previous Step
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="bg-[#1A5D3A] hover:bg-[#0F3622] text-white"
        >
          Next Step
        </Button>
      </div>
    </form>
  )
}

export default PersonalInfo 