'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'

const GrantPurpose = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.grant.outcomes) {
      newErrors.outcomes = 'Please describe your expected outcomes'
    }
    if (!data.grant.budget) {
      newErrors.budget = 'Please upload your budget document'
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFields({ grant: { ...data.grant, budget: file } })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="textarea"
        label="Expected Outcomes"
        name="outcomes"
        value={data.grant.outcomes}
        onChange={e => updateFields({ grant: { ...data.grant, outcomes: e.target.value } })}
        error={errors.outcomes}
        required
        helpText="Describe what you aim to achieve with this funding"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-black">
          Budget Document
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileChange}
          className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-[#1A5D3A] file:text-white hover:file:bg-[#0F3622] file:cursor-pointer cursor-pointer"
        />
        {errors.budget && (
          <p className="text-sm text-red-600">{errors.budget}</p>
        )}
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

export default GrantPurpose 