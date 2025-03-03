'use client'
import { useState, useRef, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'
import { validateFile } from '@/utils/fileValidation'

const MotivationStatement = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Show file name if file is already uploaded
  const fileName = data.motivation.identity?.name || ''

  useEffect(() => {
    // Validate existing file when component mounts
    if (data.motivation.identity) {
      const validation = validateFile(data.motivation.identity)
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, identity: validation.error || 'Invalid file' }))
      }
    }
  }, [data.motivation.identity])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.motivation.statement) {
      newErrors.statement = 'Please provide your motivation statement'
    }

    if (!data.motivation.implementation) {
      newErrors.implementation = 'Please describe your implementation plan'
    }

    // Validate identity document
    if (!data.motivation.identity) {
      newErrors.identity = 'Please upload your identification document'
    } else {
      const fileValidation = validateFile(data.motivation.identity)
      if (!fileValidation.valid) {
        newErrors.identity = fileValidation.error || 'Invalid file'
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
        setErrors(prev => ({ ...prev, identity: validation.error || 'Invalid file' }))
        return
      }
      updateFields({ motivation: { ...data.motivation, identity: file } })
      setErrors(prev => ({ ...prev, identity: '' }))
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

      <Input
        type="file"
        label="Identification Document"
        name="identity"
        onChange={handleFileChange}
        error={errors.identity}
        required={!data.motivation.identity} // Not required if file already uploaded
        accept=".pdf,.doc,.docx"
        helpText={fileName || "Upload a valid ID document (PDF, DOC, or DOCX, max 5MB)"}
      />

      {fileName && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Current file: {fileName}</span>
          <button
            type="button"
            onClick={() => {
              updateFields({ motivation: { ...data.motivation, identity: null } })
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

export default MotivationStatement 