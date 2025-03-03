/**
 * Validates and formats Nigerian phone numbers
 * Accepts formats:
 * - 0801234567
 * - 08012345678
 * - +2348012345678
 * - 2348012345678
 */

export const validatePhoneNumber = (phone: string): boolean => {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // Check if it's a valid Nigerian number
  if (digits.length === 10 && /^[7-9]/.test(digits)) {
    return true // Format: 8012345678
  }
  
  if (digits.length === 11 && digits.startsWith('0')) {
    return true // Format: 08012345678
  }
  
  if (digits.length === 13 && digits.startsWith('234')) {
    return true // Format: 2348012345678
  }
  
  if (digits.length === 14 && digits.startsWith('2340')) {
    return true // Format: 23408012345678
  }
  
  return false
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // If it doesn't match any valid format, throw error
  if (!validatePhoneNumber(digits)) {
    throw new Error('Invalid phone number')
  }
  
  // Convert to international format (+234...)
  if (digits.length === 10) {
    return `+234${digits}`
  }
  
  if (digits.length === 11 && digits.startsWith('0')) {
    return `+234${digits.slice(1)}`
  }
  
  if (digits.length === 13 && digits.startsWith('234')) {
    return `+${digits}`
  }
  
  if (digits.length === 14 && digits.startsWith('2340')) {
    return `+234${digits.slice(4)}`
  }
  
  throw new Error('Invalid phone number format')
} 