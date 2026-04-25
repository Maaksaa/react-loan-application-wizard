import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vitest doesn't auto-cleanup the DOM between tests like Jest does in some setups.
// Without this, queries can find elements from a previous test and tests pollute each other.
afterEach(() => {
  cleanup()
})
