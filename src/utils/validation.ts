export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates contact form data
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate message
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
