'use client'
import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'
import { validateFile } from '@/utils/fileValidation'
import FileUpload from '@/components/ui/FileUpload'

const MotivationStatement = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Validate existing file when component mounts
    if (data.motivation.identity) {
      const validation = validateFile(data.motivation.identity, {
        allowedTypes: [
          'application/pdf',
          'image/jpeg',
          'image/jpg',
          'image/png'
        ]
      })
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, identity: validation.error || 'Invalid file' }))
      }
    }
  }, [data.motivation.identity])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.motivation.statement?.trim()) {
      newErrors.statement = 'Please provide your motivation statement'
    }

    if (!data.motivation.implementation?.trim()) {
      newErrors.implementation = 'Please describe your implementation plan'
    }

    // Validate identity document
    if (!data.motivation.identity) {
      newErrors.identity = 'Please upload your identification document'
    } else {
      const fileValidation = validateFile(data.motivation.identity, {
        allowedTypes: [
          'application/pdf',
          'image/jpeg',
          'image/jpg',
          'image/png'
        ]
      })
      if (!fileValidation.valid) {
        newErrors.identity = fileValidation.error || 'Invalid file'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (validate()) {
        await next()
      }
    } catch (error) {
      console.error('Error submitting form:', error)
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
        className="min-h-[120px]"
        helpText="Why do you want to participate in this program?"
      />

      <Input
        type="textarea"
        label="Implementation Plan"
        name="implementation"
        value={data.motivation.implementation}
        onChange={e => updateFields({ motivation: { ...data.motivation, implementation: e.target.value } })}
        error={errors.implementation}
        required
        className="min-h-[120px]"
        helpText="How will you implement what you learn?"
      />

      <FileUpload
        label="Identification Document"
        name="identity"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(file) => updateFields({ motivation: { ...data.motivation, identity: file } })}
        currentFileName={data.motivation.identity?.name}
        error={errors.identity}
        required={!data.motivation.identity}
        helpText="Upload a valid ID document (PDF, JPG, or PNG, max 5MB)"
      />

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