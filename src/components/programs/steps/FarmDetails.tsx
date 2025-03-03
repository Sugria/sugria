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
        label="Farm Location"
        name="location"
        value={data.farm.location}
        onChange={e => updateFields({ farm: { ...data.farm, location: e.target.value } })}
        error={errors.location}
        required
        helpText="Enter village, district, and region"
      />

      <Input
        label="Farm Size"
        name="size"
        value={data.farm.size}
        onChange={e => updateFields({ farm: { ...data.farm, size: e.target.value } })}
        error={errors.size}
        required
        helpText="Enter size in hectares or acres"
      />

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