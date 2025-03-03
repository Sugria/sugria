'use client'
import { useState, useRef, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'
import { validateFile } from '@/utils/fileValidation'

const GrantPurpose = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Show file name if file is already uploaded
  const fileName = data.grant.budget?.name || ''

  useEffect(() => {
    // Validate existing file when component mounts
    if (data.grant.budget) {
      const validation = validateFile(data.grant.budget)
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
      const fileValidation = validateFile(data.grant.budget)
      if (!fileValidation.valid) {
        newErrors.budget = fileValidation.error || 'Invalid file'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validation = validateFile(file)
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, budget: validation.error || 'Invalid file' }))
        return
      }
      updateFields({ grant: { ...data.grant, budget: file } })
      setErrors(prev => ({ ...prev, budget: '' }))
    }
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

      <Input
        type="file"
        label="Budget Document"
        name="budget"
        onChange={handleFileChange}
        error={errors.budget}
        required={!data.grant.budget} // Not required if file already uploaded
        accept=".pdf,.doc,.docx"
        helpText={fileName || "Upload your detailed budget (PDF, DOC, or DOCX, max 5MB)"}
      />

      {fileName && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Current file: {fileName}</span>
          <button
            type="button"
            onClick={() => {
              updateFields({ grant: { ...data.grant, budget: null } })
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      )}

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