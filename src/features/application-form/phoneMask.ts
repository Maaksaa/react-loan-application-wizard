/**
 * Phone mask for format 0XXX XXX XXX.
 *
 * Implemented manually instead of pulling in react-imask/imask:
 * the mask is simple and singular in this app — a full masking library
 * would be ~15kb gzipped for zero real benefit here.
 *
 * Strategy: strip everything to digits, force leading 0, then slice
 * into groups. Handles paste, backspace, and partial input naturally
 * because we always re-derive the masked string from the digit pool.
 */
export function formatPhone(raw: string): string {
  // Keep digits only
  let digits = raw.replace(/\D/g, '')

  // Enforce leading 0; if user typed a different first digit, prepend 0
  if (digits.length > 0 && digits[0] !== '0') {
    digits = '0' + digits
  }

  // Cap at 10 digits total (0 + 9 more)
  digits = digits.slice(0, 10)

  const p1 = digits.slice(0, 4) // 0XXX
  const p2 = digits.slice(4, 7) // XXX
  const p3 = digits.slice(7, 10) // XXX

  if (digits.length <= 4) return p1
  if (digits.length <= 7) return `${p1} ${p2}`
  return `${p1} ${p2} ${p3}`
}
