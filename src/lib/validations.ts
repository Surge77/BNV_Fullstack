import { z } from 'zod';

export const userFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(
      /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
      'Please enter a valid phone number (e.g., (555) 123-4567)'
    ),
  address: z
    .string()
    .trim()
    .min(1, 'Address is required')
    .max(200, 'Address must be less than 200 characters'),
  city: z
    .string()
    .trim()
    .min(1, 'City is required')
    .max(100, 'City must be less than 100 characters'),
  state: z
    .string()
    .trim()
    .min(1, 'State is required')
    .max(50, 'State must be less than 50 characters'),
  zipCode: z
    .string()
    .trim()
    .min(1, 'ZIP code is required')
    .regex(/^[0-9]{5}(-[0-9]{4})?$/, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
