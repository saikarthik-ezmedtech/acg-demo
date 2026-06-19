import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentModal from './AppointmentModal'

describe('AppointmentModal validation', () => {
  it('shows validation errors and handles escape close', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<AppointmentModal isOpen onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /send request/i }))
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument()
    expect(screen.getByText(/reason for visit is required/i)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
})
