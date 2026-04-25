import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with conflict resolution.
 * E.g. cn('p-2', condition && 'p-4') correctly yields 'p-4' (not 'p-2 p-4').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
