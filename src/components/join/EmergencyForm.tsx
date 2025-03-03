'use client'
import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/button'
import { FormData } from '@/types/form'

interface EmergencyFormProps {
  data: FormData
  updateFields: (fields: Partial<FormData>) => void
  next: () => void
  prev: () => void
}

const EmergencyForm = ({ data, updateFields, next, prev }: EmergencyFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.emergency.name) {
      newErrors.name = 'Emergency contact name is required'
    }
    if (!data.emergency.relationship) {
      newErrors.relationship = 'Relationship is required'
    }
    if (!data.emergency.phone) {
      newErrors.phone = 'Phone number is required'
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
        name="name"
        label="Emergency Contact Name"
        type="text"
        value={data.emergency.name}
        onChange={e => updateFields({ emergency: { ...data.emergency, name: e.target.value } })}
        error={errors.name}
        required
      />

      <Input
        name="relationship"
        label="Relationship"
        type="text"
        value={data.emergency.relationship}
        onChange={e => updateFields({ emergency: { ...data.emergency, relationship: e.target.value } })}
        error={errors.relationship}
        required
      />

      <Input
        name="phone"
        label="Emergency Contact Phone"
        type="tel"
        value={data.emergency.phone}
        onChange={e => updateFields({ emergency: { ...data.emergency, phone: e.target.value } })}
        error={errors.phone}
        required
        placeholder="e.g., 08012345678"
      />

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
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

export default EmergencyForm