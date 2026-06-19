import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InternalLink from './InternalLink'

describe('InternalLink', () => {
  it('delegates internal navigation', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<InternalLink href="#services" onNavigate={onNavigate}>Services</InternalLink>)

    await user.click(screen.getByRole('link', { name: 'Services' }))
    expect(onNavigate).toHaveBeenCalledWith('#services')
  })

  it('keeps external links default behavior', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<InternalLink href="https://example.com" onNavigate={onNavigate}>External</InternalLink>)

    await user.click(screen.getByRole('link', { name: 'External' }))
    expect(onNavigate).not.toHaveBeenCalled()
  })
})
