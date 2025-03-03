'use client'
import { useState } from 'react'
import Button from '@/components/ui/button'
import { FormStepProps } from '@/types/program'

const TrainingPreferences = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [error, setError] = useState<string>('')

  const validate = () => {
    if (!data.training.preference) {
      setError('Please select a training preference')
      return false
    }
    return true
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
        <p className="text-sm font-medium text-gray-900">
          Select your preferred training format:
        </p>
        <div className="space-y-4">
          <label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="preference"
              value="in-person"
              checked={data.training.preference === 'in-person'}
              onChange={e => updateFields({ training: { preference: e.target.value } })}
              className="text-[#1A6B3C] focus:ring-[#1A6B3C]"
            />
            <div>
              <h3 className="font-medium text-gray-900">In-person Workshop</h3>
              <p className="text-sm text-gray-600">Attend physical training sessions with hands-on experience</p>
            </div>
          </label>
          
          <label className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="preference"
              value="virtual"
              checked={data.training.preference === 'virtual'}
              onChange={e => updateFields({ training: { preference: e.target.value } })}
              className="text-[#1A6B3C] focus:ring-[#1A6B3C]"
            />
            <div>
              <h3 className="font-medium text-gray-900">Virtual Workshop</h3>
              <p className="text-sm text-gray-600">Participate in online training sessions from anywhere</p>
            </div>
          </label>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
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

export default TrainingPreferences 