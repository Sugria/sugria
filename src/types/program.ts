export interface ProgramFormData {
  program: {
    category: string
    previousTraining: boolean
    trainingId?: string
  }
  personal: {
    fullName: string
    email: string
    phoneNumber: string
    address: string
    gender: string
    dateOfBirth: string
  }
  farm: {
    location: string
    size: string
    type: string
    practices: string
    challenges: string
  }
  grant: {
    outcomes: string
    budget: File | null
  }
  training: {
    preference: string
  }
  motivation: {
    statement: string
    implementation: string
    identity: File | null
  }
  declaration: {
    agreed: boolean
    officerName: string
  }
}

export interface FormStepProps {
  data: ProgramFormData
  updateFields: (fields: Partial<ProgramFormData>) => void
  next: () => void
  prev?: () => void
  isLastStep?: boolean
  isSubmitting?: boolean
}

// Add utility types for form fields
export type PersonalFields = keyof ProgramFormData['personal']
export type FarmFields = keyof ProgramFormData['farm']
export type GrantFields = keyof ProgramFormData['grant']
export type MotivationFields = keyof ProgramFormData['motivation']
export type DeclarationFields = keyof ProgramFormData['declaration'] 