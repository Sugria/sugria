type ValidationOptions = {
  maxSize?: number;
  allowedTypes?: string[];
}

const DEFAULT_OPTIONS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
}

export const validateFile = (file: File, options?: ValidationOptions) => {
  const maxSize = options?.maxSize ?? DEFAULT_OPTIONS.maxSize
  const allowedTypes = options?.allowedTypes ?? DEFAULT_OPTIONS.allowedTypes

  if (!file) {
    return { valid: false, error: 'Please select a file' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' }
  }

  // Type assertion to string[] to fix TypeScript error
  if (!(allowedTypes as string[]).includes(file.type)) {
    const typeNames = allowedTypes.map(type => {
      if (type.includes('pdf')) return 'PDF'
      if (type.includes('jpeg') || type.includes('jpg')) return 'JPG'
      if (type.includes('png')) return 'PNG'
      if (type.includes('msword') || type.includes('wordprocessingml')) return 'DOC/DOCX'
      return type
    })
    return { valid: false, error: `File must be ${typeNames.join(', ')}` }
  }

  return { valid: true, error: null }
} 