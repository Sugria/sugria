'use client'
import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/button'
import Spinner from '../ui/Spinner'
import { FormData } from '@/types/form'

interface EducationFormProps {
  data: FormData
  updateFields: (fields: Partial<FormData>) => void
  onSubmit: () => void
  prev: () => void
  isSubmitting?: boolean
}

const EducationForm = ({ data, updateFields, onSubmit, prev, isSubmitting }: EducationFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.education.level) {
      newErrors.level = 'Education level is required'
    }
    if (!data.education.institution) {
      newErrors.institution = 'Institution name is required'
    }
    if (!data.education.fieldOfStudy) {
      newErrors.fieldOfStudy = 'Field of study is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit()
    }
  }

  return (
    <div className="relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="bg-white/90 p-4 rounded-lg shadow-lg flex items-center">
            <Spinner className="text-[#1B4D32]" />
            <span className="text-gray-900">Submitting application...</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="level"
            label="Highest Level of Education"
            type="select"
            value={data.education.level}
            onChange={e => updateFields({ education: { ...data.education, level: e.target.value } })}
            error={errors.level}
            required
            options={[
              { value: "", label: "Select education level" },
              { value: "High School", label: "High School" },
              { value: "Bachelor's Degree", label: "Bachelor's Degree" },
              { value: "Master's Degree", label: "Master's Degree" },
              { value: "Doctorate", label: "Doctorate" },
              { value: "Other", label: "Other" }
            ]}
          />

          <Input
            name="institution"
            label="Institution Name"
            type="text"
            value={data.education.institution}
            onChange={e => updateFields({ education: { ...data.education, institution: e.target.value } })}
            error={errors.institution}
            required
          />

          <Input
            name="fieldOfStudy"
            label="Field of Study"
            type="text"
            value={data.education.fieldOfStudy}
            onChange={e => updateFields({ education: { ...data.education, fieldOfStudy: e.target.value } })}
            error={errors.fieldOfStudy}
            required
          />
        </div>

        <Input
          name="certifications"
          label="Other Certifications"
          type="text"
          value={data.education.certifications}
          onChange={e => updateFields({ education: { ...data.education, certifications: e.target.value } })}
          placeholder="Optional - List any relevant certifications"
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prev}
            disabled={isSubmitting}
            className="text-[#1B4D32] border-[#1B4D32] disabled:opacity-50 hover:bg-[#1B4D32] hover:text-white"
          >
            Previous Step
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="bg-[#1A5D3A] hover:bg-[#0F3622] text-white disabled:opacity-50 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner className="text-white" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EducationForm 