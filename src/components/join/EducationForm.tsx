'use client'
import Input from '../ui/Input'
import Button from '../ui/button'
import Spinner from '../ui/Spinner'

interface EducationFormData {
  level: string
  institution: string
  fieldOfStudy: string
  certifications: string
}

interface EducationFormProps {
  data: EducationFormData
  onChange: (data: EducationFormData) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
}

const EducationForm = ({ data, onChange, onSubmit, onBack, isSubmitting = false }: EducationFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name.split('.')[1] || name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
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
            type="select"
            label="Highest Level of Education"
            name="education.level"
            value={data.level}
            onChange={handleChange}
            options={[
              { value: 'certificate', label: 'Certificate' },
              { value: 'diploma', label: 'Diploma' },
              { value: 'degree', label: 'Degree' },
              { value: 'masters', label: 'Masters' },
              { value: 'phd', label: 'PhD' }
            ]}
            required
          />

          <Input
            label="Institution Name"
            name="education.institution"
            value={data.institution}
            onChange={handleChange}
            required
          />

          <Input
            label="Field of Study"
            name="education.fieldOfStudy"
            value={data.fieldOfStudy}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          type="textarea"
          label="Other Relevant Certifications"
          name="certifications"
          value={data.certifications}
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="text-[#1B4D32] border-[#1B4D32] disabled:opacity-50 hover:bg-[#1B4D32] hover:text-white"
          >
            Previous Step
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="bg-[#1B4D32] hover:bg-[#133824] text-white disabled:opacity-50 flex items-center"
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