import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentModal from './AppointmentModal'

describe('AppointmentModal', () => {
  it('validates and submits the form', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<AppointmentModal isOpen onClose={onClose} />)

    await user.type(screen.getByLabelText(/first name/i), 'Ada')
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace')
    await user.type(screen.getByLabelText(/phone/i), '812-555-1212')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/reason/i), 'Checkup')
    await user.click(screen.getByRole('button', { name: /^send request$/i }))

    expect(screen.getByText(/request received/i)).toBeInTheDocument()
  })
})
