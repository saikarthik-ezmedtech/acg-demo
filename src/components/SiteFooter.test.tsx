import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SiteFooter from './SiteFooter'

describe('SiteFooter', () => {
  it('renders footer navigation and cookie preferences action', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    const onOpenCookiePreferences = vi.fn()
    render(<SiteFooter pathname="/" currentYear={2026} onNavigate={onNavigate} onOpenCookiePreferences={onOpenCookiePreferences} />)

    expect(screen.getByText('Southern Indiana Cardiology Associates')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /cookie preferences/i }))
    expect(onOpenCookiePreferences).toHaveBeenCalled()
  })
})
