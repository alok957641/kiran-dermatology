import { z } from 'zod'

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters'),
  phone: z.string().min(10, 'Phone must be 10 digits').max(15, 'Phone number is too long')
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  preferred_date: z.string().min(1, 'Please select a preferred date')
    .refine((date) => {
      const selected = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selected >= today
    }, { message: 'Date cannot be in the past' }),
  preferred_time: z.string().min(1, 'Please select a preferred time'),
  message: z.string().max(500, 'Message is too long').optional().or(z.literal('')),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Phone must be 10 digits').max(15, 'Phone number is too long')
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(100, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
})

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default { appointmentSchema, contactSchema, loginSchema }