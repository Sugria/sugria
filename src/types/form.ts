export interface FormData {
  personal: {
    fullName: string
    email: string
    dateOfBirth: string
    gender: string
    nationality: string
    phoneNumber: string
    address: string
  }
  emergency: {
    name: string
    relationship: string
    phone: string
  }
  education: {
    level: string
    institution: string
    fieldOfStudy: string
    certifications: string
  }
} 