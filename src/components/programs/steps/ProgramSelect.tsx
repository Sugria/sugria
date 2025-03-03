'use client'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { useState } from 'react'
import { FormStepProps } from '@/types/program'

const programs = [
  {
    value: 'rural',
    label: 'Rural Farmers Program',
  },
  {
    value: 'suburban',
    label: 'Suburban Farmers Program',
  },
  {
    value: 'pioneer',
    label: 'Pioneer Pathways',
  },
]

const ProgramSelect = ({ data, updateFields, next }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.program.category) {
      newErrors.category = 'Please select a program'
    }

    if (data.program.previousTraining && !data.program.trainingId) {
      newErrors.trainingId = 'Please enter your Training Ticket ID'
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
        type="select"
        label="Program Category"
        name="category"
        value={data.program.category}
        onChange={e => updateFields({ program: { ...data.program, category: e.target.value } })}
        options={programs}
        error={errors.category}
        required
      />

      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-900">
          Have you ever enrolled in any SUGRiA trainings?
        </p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-900">
            <input
              type="radio"
              name="previousTraining"
              checked={data.program.previousTraining}
              onChange={() => updateFields({ program: { ...data.program, previousTraining: true } })}
              className="text-[#1A5D3A] focus:ring-[#1A5D3A]"
            />
            <span className="text-black">Yes</span>
          </label>
          <label className="flex items-center gap-2 text-gray-900">
            <input
              type="radio"
              name="previousTraining"
              checked={!data.program.previousTraining}
              onChange={() => updateFields({ program: { ...data.program, previousTraining: false, trainingId: '' } })}
              className="text-[#1A5D3A] focus:ring-[#1A5D3A]"
            />
            <span className="text-black">No</span>
          </label>
        </div>
      </div>

      {data.program.previousTraining && (
        <Input
          label="Training Ticket ID"
          name="trainingId"
          value={data.program.trainingId}
          onChange={e => updateFields({ program: { ...data.program, trainingId: e.target.value } })}
          error={errors.trainingId}
          required
        />
      )}

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto bg-[#1A5D3A] hover:bg-[#0F3622] text-white py-3 px-6 focus:ring-2 focus:ring-[#1A5D3A] focus:ring-offset-2"
        >
          Next Step
        </Button>
      </div>
    </form>
  )
}

export default ProgramSelect