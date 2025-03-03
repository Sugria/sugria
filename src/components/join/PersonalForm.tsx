'use client'
import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/button'
import { FormData } from '@/types/form'

interface PersonalFormProps {
  data: FormData
  updateFields: (fields: Partial<FormData>) => void
  next: () => void
}

const PersonalForm = ({ data, updateFields, next }: PersonalFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.personal.fullName) {
      newErrors.fullName = 'Full name is required'
    }
    if (!data.personal.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!data.personal.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }
    if (!data.personal.gender) {
      newErrors.gender = 'Gender is required'
    }
    if (!data.personal.nationality) {
      newErrors.nationality = 'Nationality is required'
    }
    if (!data.personal.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    if (!data.personal.address) {
      newErrors.address = 'Address is required'
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
        name="fullName"
        label="Full Name"
        type="text"
        value={data.personal.fullName}
        onChange={e => updateFields({ personal: { ...data.personal, fullName: e.target.value } })}
        error={errors.fullName}
        required
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={data.personal.email}
        onChange={e => updateFields({ personal: { ...data.personal, email: e.target.value } })}
        error={errors.email}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={data.personal.dateOfBirth}
          onChange={e => updateFields({ personal: { ...data.personal, dateOfBirth: e.target.value } })}
          error={errors.dateOfBirth}
          required
        />

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
      </div>

      <Input
        name="nationality"
        label="Nationality"
        type="text"
        value={data.personal.nationality}
        onChange={e => updateFields({ personal: { ...data.personal, nationality: e.target.value } })}
        error={errors.nationality}
        required
      />

      <Input
        name="phoneNumber"
        label="Phone Number"
        type="tel"
        value={data.personal.phoneNumber}
        onChange={e => updateFields({ personal: { ...data.personal, phoneNumber: e.target.value } })}
        error={errors.phoneNumber}
        required
        placeholder="e.g., 08012345678"
      />

      <Input
        name="address"
        label="Residential Address"
        type="text"
        value={data.personal.address}
        onChange={e => updateFields({ personal: { ...data.personal, address: e.target.value } })}
        error={errors.address}
        required
      />

      <div className="flex justify-end">
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

export default PersonalForm 