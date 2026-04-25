import { z } from 'zod'
import type { TFunction } from 'i18next'

const phoneRegex = /^0\d{3} \d{3} \d{3}$/

/**
 * Schema factories take t() so error messages are localized at validation time,
 * not at module load time. Each form rebuilds its schema via useMemo bound to
 * the active language.
 */

export const buildPersonalSchema = (t: TFunction) =>
  z.object({
    phone: z
      .string()
      .min(1, t('validation.required'))
      .regex(phoneRegex, t('validation.phoneFormat')),
    firstName: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .max(50, t('validation.nameTooLong')),
    lastName: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .max(50, t('validation.nameTooLong')),
    gender: z.enum(['male', 'female'], { message: t('validation.required') }),
  })

export const buildAddressSchema = (t: TFunction) =>
  z.object({
    workplace: z.string().min(1, t('validation.required')),
    address: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .max(200, t('validation.nameTooLong')),
  })

export const buildLoanSchema = (t: TFunction) =>
  z.object({
    amount: z
      .number({ message: t('validation.required') })
      .int()
      .min(200, t('validation.amountMin'))
      .max(1000, t('validation.amountMax'))
      .refine((v) => v % 100 === 0, t('validation.amountStep')),
    term: z
      .number({ message: t('validation.required') })
      .int(t('validation.termInt'))
      .min(10, t('validation.termMin'))
      .max(30, t('validation.termMax')),
  })

// Inferring types from one canonical instance — all locales share shape, so
// any t works here.
export type PersonalInput = z.infer<ReturnType<typeof buildPersonalSchema>>
export type AddressInput = z.infer<ReturnType<typeof buildAddressSchema>>
export type LoanInput = z.infer<ReturnType<typeof buildLoanSchema>>
