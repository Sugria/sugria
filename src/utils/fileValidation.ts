export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return {
      valid: false,
      error: `File ${file.name} is too large. Maximum size is 5MB.`
    };
  }

  // Check file type
  const acceptedTypes = [
    'application/pdf',
    'application/x-pdf',
    'application/acrobat',
    'application/vnd.pdf',
    'text/pdf',
    'text/x-pdf',
    'image/jpeg',
    'image/jpg',
    'image/png'
  ];

  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File ${file.name} must be a PDF, JPG, or PNG file.`
    };
  }

  // Check file extension
  const extension = file.name.toLowerCase().split('.').pop();
  const acceptedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
  
  if (!extension || !acceptedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `File ${file.name} must have a .pdf, .jpg, .jpeg, or .png extension.`
    };
  }

  return { valid: true };
} 