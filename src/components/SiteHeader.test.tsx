import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SiteHeader from './SiteHeader'

describe('SiteHeader', () => {
  it('renders navigation and action controls', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    const onToggleNav = vi.fn()
    const onCloseNav = vi.fn()
    const onOpenAppointment = vi.fn()

    render(
      <SiteHeader
        pathname="/"
        navOpen={false}
        onToggleNav={onToggleNav}
        onCloseNav={onCloseNav}
        onNavigate={onNavigate}
        onOpenAppointment={onOpenAppointment}
      />,
    )

    expect(screen.getByLabelText(/southern indiana cardiology associates home/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /toggle navigation menu/i }))
    expect(onToggleNav).toHaveBeenCalled()
    await user.click(within(screen.getByText('812-924-7065').closest('.nav-actions') as HTMLElement).getByRole('button', { name: /request appointment/i }))
    expect(onOpenAppointment).toHaveBeenCalled()
  })
})
