'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'

const Declaration = ({ data, updateFields, next, prev, isLastStep, isSubmitting }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.declaration.agreed) {
      newErrors.agreed = 'Please agree to the terms and conditions'
    }
    if (!data.declaration.officerName) {
      newErrors.officerName = 'Please enter the SUGRiA Officer/Community Leader name'
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
      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={data.declaration.agreed}
            onChange={(e) => updateFields({ 
              declaration: { 
                ...data.declaration, 
                agreed: e.target.checked 
              } 
            })}
            className="mt-1 text-[#1A5D3A] focus:ring-[#1A5D3A]"
          />
          <span className="text-sm text-gray-700">
            I declare that all information provided in this application is true and accurate. I understand that any false statements may result in the rejection of my application or termination of participation in the program.
          </span>
        </label>
        {errors.agreed && (
          <p className="text-sm text-red-600">{errors.agreed}</p>
        )}
      </div>

      <Input
        label="SUGRiA Officer/Community Leader Name"
        name="officerName"
        value={data.declaration.officerName}
        onChange={e => updateFields({ 
          declaration: { 
            ...data.declaration, 
            officerName: e.target.value 
          } 
        })}
        error={errors.officerName}
        required
        helpText="Enter the name of your SUGRiA Officer or Community Leader"
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          disabled={isSubmitting}
          className="text-[#1A5D3A] border-[#1A5D3A] hover:bg-[#1A5D3A] hover:text-white"
        >
          Previous Step
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="bg-[#1A5D3A] hover:bg-[#0F3622] text-white"
        >
          {isSubmitting ? 'Submitting...' : (isLastStep ? 'Submit Application' : 'Next Step')}
        </Button>
      </div>
    </form>
  )
}

export default Declaration 