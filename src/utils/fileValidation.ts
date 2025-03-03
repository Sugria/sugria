export const validateFile = (file: File) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  if (!file) {
    return { valid: false, error: 'Please select a file' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File must be PDF, DOC, or DOCX' }
  }

  return { valid: true, error: null }
} 