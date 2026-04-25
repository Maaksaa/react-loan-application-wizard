import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders the label and associates it with the input', () => {
    render(<Input label="Phone" name="phone" />)

    // getByLabelText — exactly how a screen reader user would find the field.
    // If the label/htmlFor wiring breaks, this query fails.
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
  })

  it('shows the error message and links it via aria-describedby', () => {
    render(<Input label="Phone" name="phone" error="Required field" />)

    const input = screen.getByLabelText('Phone')
    const errorMessage = screen.getByRole('alert')

    expect(errorMessage).toHaveTextContent('Required field')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', errorMessage.id)
  })

  it('forwards onChange events', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input label="Name" name="name" onChange={handleChange} />)

    await user.type(screen.getByLabelText('Name'), 'Alex')

    // 4 keystrokes → 4 onChange calls
    expect(handleChange).toHaveBeenCalledTimes(4)
  })
})
