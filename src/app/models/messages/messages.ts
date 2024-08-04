export const MESSAGES = {
  FORM_ERRORS: {
    email_required: 'Email is required',
    email_input: 'Please enter a valid email',
    required: 'This field is required',
    min_password_length: `Minimum length is 6 characters`,
    pattern: 'Invalid format',
    password_mismatch: 'Passwords do not match',
    phone_number: 'Please enter a valid phone number',
    url: 'Please enter a valid URL',
    date: 'Please enter a valid date',
    age: 'You must be at least 18 years old',
    passwords_mismatch: 'Passwords do not match.',
  },
  ERROR_HTTP: {
    400: 'Bad Request: Please check your input.',
    401: 'Unauthorized: Please log in again.',
    403: 'Forbidden: You do not have access.',
    404: 'Not Found: The resource was not found.',
    500: 'Internal Server Error: Please try again later.',
    default: 'An unknown error occurred.',
  },
};
