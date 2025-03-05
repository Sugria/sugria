'use client'
import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/button'
import { FormStepProps, FarmFields } from '@/types/program'

const FarmDetails = ({ data, updateFields, next, prev }: FormStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    const fields: FarmFields[] = ['location', 'size', 'type', 'practices', 'challenges']
    
    fields.forEach(field => {
      if (!data.farm[field]) {
        newErrors[field] = `Please enter your farm ${field}`
      }
    })

    // Validate farm size specifically
    if (data.farm.size) {
      const sizeNum = Number(data.farm.size)
      if (isNaN(sizeNum) || sizeNum <= 0) {
        newErrors.size = 'Please enter a valid farm size (must be greater than 0)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      // Convert size to number before proceeding
      updateFields({
        farm: {
          ...data.farm,
          size: Number(data.farm.size).toString() // Convert to number and back to string for consistency
        }
      })
      next()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Farm Location"
        name="location"
        value={data.farm.location}
        onChange={e => updateFields({ farm: { ...data.farm, location: e.target.value } })}
        error={errors.location}
        required
        helpText="Enter village, district, and region"
      />

      <div className="space-y-1">
        <Input
          type="number"
          label="Farm Size"
          name="size"
          value={data.farm.size}
          onChange={e => updateFields({ farm: { ...data.farm, size: e.target.value } })}
          error={errors.size}
          required
          min="0.01"
          step="0.01"
        />
        <p className="text-orange-500 text-sm">Enter size in hectares</p>
      </div>

      <Input
        label="Types of Crops/Livestock"
        name="type"
        value={data.farm.type}
        onChange={e => updateFields({ farm: { ...data.farm, type: e.target.value } })}
        error={errors.type}
        required
        helpText="List all crops and/or livestock you currently raise"
      />

      <Input
        label="Current Farming Practices"
        name="practices"
        value={data.farm.practices}
        onChange={e => updateFields({ farm: { ...data.farm, practices: e.target.value } })}
        error={errors.practices}
        required
        helpText="Describe your current farming methods and techniques"
      />

      <Input
        label="Current Challenges"
        name="challenges"
        value={data.farm.challenges}
        onChange={e => updateFields({ farm: { ...data.farm, challenges: e.target.value } })}
        error={errors.challenges}
        required
        helpText="Describe challenges like low yields, pests, market access, etc."
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

export default FarmDetails 