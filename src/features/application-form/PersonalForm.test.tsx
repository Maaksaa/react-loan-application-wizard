import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useApplicationStore } from '@/store/applicationStore'
import { renderWithProviders } from '@/test/utils'
import { PersonalForm } from './PersonalForm'

describe('PersonalForm', () => {
  beforeEach(() => {
    // Each test starts from a clean store — without this, state leaks
    // between tests, and we'd be debugging order-dependent failures.
    useApplicationStore.getState().reset()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PersonalForm />)

    await user.click(screen.getByRole('button', { name: /next/i }))

    // We expect 4 alert nodes — one per required field.
    // Using findAllByRole because RHF resolves errors asynchronously.
    const errors = await screen.findAllByRole('alert')
    expect(errors.length).toBeGreaterThanOrEqual(4)
  })

  it('saves data to the store and proceeds on valid submit', async () => {
    const user = userEvent.setup()
    renderWithProviders(<PersonalForm />)

    await user.type(screen.getByLabelText(/phone/i), '0991234567')
    await user.type(screen.getByLabelText(/first name/i), 'Alex')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.selectOptions(screen.getByLabelText(/gender/i), 'male')

    await user.click(screen.getByRole('button', { name: /next/i }))

    await waitFor(() => {
      const stored = useApplicationStore.getState().personal
      expect(stored).toEqual({
        phone: '0991 234 567',
        firstName: 'Alex',
        lastName: 'Doe',
        gender: 'male',
      })
    })
  })
})
