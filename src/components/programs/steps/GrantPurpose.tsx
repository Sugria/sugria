'use client'
import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'
import { validateFile } from '@/utils/fileValidation'
import FileUpload from '@/components/ui/FileUpload'

const GrantPurpose = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Validate existing file when component mounts
    if (data.grant.budget) {
      const validation = validateFile(data.grant.budget, {
        allowedTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
      })
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, budget: validation.error || 'Invalid file' }))
      }
    }
  }, [data.grant.budget])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.grant.outcomes) {
      newErrors.outcomes = 'Please describe your expected outcomes'
    }

    // Validate budget file
    if (!data.grant.budget) {
      newErrors.budget = 'Please upload your budget document'
    } else {
      const fileValidation = validateFile(data.grant.budget, {
        allowedTypes: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
      })
      if (!fileValidation.valid) {
        newErrors.budget = fileValidation.error || 'Invalid file'
      }
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
        type="textarea"
        label="Expected Outcomes"
        name="outcomes"
        value={data.grant.outcomes}
        onChange={e => updateFields({ grant: { ...data.grant, outcomes: e.target.value } })}
        error={errors.outcomes}
        required
        className="min-h-[120px]"
        helpText="Describe what you hope to achieve with this grant"
      />

      <FileUpload
        label="Budget Document"
        name="budget"
        accept=".pdf,.doc,.docx"
        onChange={(file) => updateFields({ grant: { ...data.grant, budget: file } })}
        currentFileName={data.grant.budget?.name}
        error={errors.budget}
        required={!data.grant.budget}
        helpText="Upload your detailed budget (PDF, DOC, or DOCX, max 5MB)"
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

export default GrantPurpose 