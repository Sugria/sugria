export interface FormData {
  personal: {
    fullName: string
    email: string
    workEmail: string
    dateOfBirth: string
    gender: string
    nationality: string
    phoneNumber: string
    address: string
  }
  emergency: {
    name: string
    relationship: string
    phoneNumber: string
  }
  education: {
    level: string
    institution: string
    fieldOfStudy: string
    certifications: string
  }
  recoveryToken?: string
} 