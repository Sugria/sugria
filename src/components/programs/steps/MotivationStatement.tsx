'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'

const MotivationStatement = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.motivation.statement) {
      newErrors.statement = 'Please explain why you want to participate'
    }
    if (!data.motivation.implementation) {
      newErrors.implementation = 'Please describe how you plan to apply the knowledge'
    }
    if (!data.motivation.identity) {
      newErrors.identity = 'Please upload your proof of identity'
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
      updateFields({ motivation: { ...data.motivation, identity: file } })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="textarea"
        label="Motivation Statement"
        name="statement"
        value={data.motivation.statement}
        onChange={e => updateFields({ motivation: { ...data.motivation, statement: e.target.value } })}
        error={errors.statement}
        required
        helpText="Explain why you want to participate in this program"
      />

      <Input
        type="textarea"
        label="Implementation Plan"
        name="implementation"
        value={data.motivation.implementation}
        onChange={e => updateFields({ motivation: { ...data.motivation, implementation: e.target.value } })}
        error={errors.implementation}
        required
        helpText="Describe how you plan to apply the knowledge and funding gained"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-black">
          Proof of Identity
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-[#1A5D3A] file:text-white hover:file:bg-[#0F3622] file:cursor-pointer cursor-pointer"
        />
        {errors.identity && (
          <p className="text-sm text-red-600">{errors.identity}</p>
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

export default MotivationStatement 