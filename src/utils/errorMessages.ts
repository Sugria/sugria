type ErrorMapping = {
  [key: string]: string;
};

const ERROR_MESSAGES: ErrorMapping = {
  // Authentication errors
  'Email already exists': 'An account with this email already exists. Please try logging in instead.',
  'Failed to fetch': 'Unable to connect to our servers. Please check your internet connection and try again.',
  'Network Error': 'You appear to be offline. Please check your internet connection and try again.',
  
  // Validation errors
  'Invalid email format': 'Please enter a valid email address.',
  'Invalid phone number': 'Please enter a valid phone number starting with 0 or +234.',
  'Please check your form details': 'Some of your information appears to be incorrect. Please review and try again.',
  
  // Form submission errors
  'Failed to join': 'We couldn\'t complete your registration at this time. Please try again in a few minutes.',
  'Failed to submit application': 'We couldn\'t submit your application. Please try again in a few minutes.',
  
  // Phone number errors
  'Please enter valid phone numbers for both personal and emergency contacts': 'Please ensure both phone numbers start with 0 or +234.',
  
  // Program application errors
  'Invalid application data': 'Please ensure all required fields are filled correctly.',
  'You have already submitted an application for this program': 'You have already applied for this program. Please check your email for updates.',
  'Missing required fields': 'Please fill in all required fields before submitting.',
  'Invalid file format': 'Please upload files in the correct format (PDF, DOC, or DOCX).',
  'File size too large': 'Please ensure all uploaded files are under 5MB.',
  'Invalid date format': 'Please enter dates in the correct format.',
  'Invalid program selection': 'Please select a valid program.',
  
  // Default error
  'default': 'Something unexpected happened. Please try again or contact support if the problem persists.'
};

interface ApiError {
  response?: {
    status: number;
    data: {
      message?: string;
      error?: {
        message?: string;
      };
    };
  };
  message: string;
}

export const getErrorMessage = (error: ApiError): string => {
  if (typeof error.response?.data?.message === 'string') {
    return ERROR_MESSAGES[error.response.data.message] || error.response.data.message;
  }
  
  if (error instanceof Error) {
    const message = ERROR_MESSAGES[error.message];
    return message || error.message;
  }
  
  return ERROR_MESSAGES.default;
}; 