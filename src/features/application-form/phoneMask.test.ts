import { describe, expect, it } from 'vitest'
import { formatPhone } from './phoneMask'

describe('formatPhone', () => {
  it('returns empty string for empty input', () => {
    expect(formatPhone('')).toBe('')
  })

  it('formats a complete 10-digit number', () => {
    expect(formatPhone('0991234567')).toBe('0991 234 567')
  })

  it('strips non-digits', () => {
    expect(formatPhone('(099) 123-45-67')).toBe('0991 234 567')
  })

  it('forces leading zero', () => {
    expect(formatPhone('991234567')).toBe('0991 234 567')
  })

  it('caps at 10 digits', () => {
    expect(formatPhone('09912345678901')).toBe('0991 234 567')
  })

  it('formats partial input progressively', () => {
    expect(formatPhone('099')).toBe('099')
    expect(formatPhone('0991')).toBe('0991')
    expect(formatPhone('09912')).toBe('0991 2')
    expect(formatPhone('0991234')).toBe('0991 234')
    expect(formatPhone('09912345')).toBe('0991 234 5')
  })
})
