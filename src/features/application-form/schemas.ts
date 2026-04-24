import { z } from 'zod'

const phoneRegex = /^0\d{3} \d{3} \d{3}$/

export const personalSchema = z.object({
  phone: z.string().min(1, 'Phone is required').regex(phoneRegex, 'Phone must match 0XXX XXX XXX'),
  firstName: z.string().min(1, 'First name is required').max(50, 'Too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Too long'),
  gender: z.enum(['male', 'female'], {
    message: 'Gender is required',
  }),
})

export const addressSchema = z.object({
  workplace: z.string().min(1, 'Workplace is required'),
  address: z.string().min(1, 'Address is required').max(200, 'Too long'),
})

export const loanSchema = z.object({
  amount: z
    .number({ message: 'Amount is required' })
    .int()
    .min(200, 'Min $200')
    .max(1000, 'Max $1000')
    .refine((v) => v % 100 === 0, 'Step is $100'),
  term: z
    .number({ message: 'Term is required' })
    .int('Whole days only')
    .min(10, 'Min 10 days')
    .max(30, 'Max 30 days'),
})

export type PersonalInput = z.infer<typeof personalSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type LoanInput = z.infer<typeof loanSchema>
