'use client'
import Input from '../ui/Input'
import Button from '../ui/button'

interface EmergencyFormData {
  name: string
  relationship: string
  phone: string
}

interface EmergencyFormProps {
  data: EmergencyFormData
  onChange: (data: EmergencyFormData) => void
  onNext: () => void
  onBack: () => void
}

const EmergencyForm = ({ data, onChange, onNext, onBack }: EmergencyFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({ ...data, [name.split('.')[1]]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Contact Name"
          name="emergencyContact.name"
          value={data.name}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Relationship"
          name="emergencyContact.relationship"
          value={data.relationship}
          onChange={handleChange}
          required
        />

        <Input
          type="tel"
          label="Contact Phone"
          name="emergencyContact.phone"
          value={data.phone}
          onChange={handleChange}
          required
          helpText="Format: 0801234567 or +2348012345678"
          placeholder="0801234567"
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="text-[#1B4D32] border-[#1B4D32] hover:bg-[#1B4D32] hover:text-white"
        >
          Previous Step
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="bg-[#1B4D32] hover:bg-[#133824] text-white" 
        >
          Next Step
        </Button>
      </div>
    </form>
  )
}

export default EmergencyForm