import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentModal from './AppointmentModal'

describe('AppointmentModal', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('validates and submits the form successfully', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<AppointmentModal isOpen onClose={onClose} />)

    await user.type(screen.getByLabelText(/first name/i), 'Ada')
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace')
    await user.type(screen.getByLabelText(/phone/i), '812-555-1212')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/reason/i), 'Checkup')
    await user.click(screen.getByRole('button', { name: /^send request$/i }))

    expect(await screen.findByText(/request received/i)).toBeInTheDocument()
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://ffqy4uu5g5.execute-api.us-east-1.amazonaws.com/appointments',
      expect.objectContaining({
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          first_name: 'Ada',
          last_name: 'Lovelace',
          phone_number: '812-555-1212',
          email: 'ada@example.com',
          reason_for_visit: 'Checkup',
        }),
      })
    )
  })

  it('handles API submit errors', async () => {
    vi.mocked(globalThis.fetch).mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to request appointment. Please try again.'))
    )

    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<AppointmentModal isOpen onClose={onClose} />)

    await user.type(screen.getByLabelText(/first name/i), 'Ada')
    await user.type(screen.getByLabelText(/last name/i), 'Lovelace')
    await user.type(screen.getByLabelText(/phone/i), '812-555-1212')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/reason/i), 'Checkup')
    await user.click(screen.getByRole('button', { name: /^send request$/i }))

    expect(await screen.findByText(/Failed to request appointment. Please try again./i)).toBeInTheDocument()
  })
})
