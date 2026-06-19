import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import LegalPage from './LegalPage'
import { legalPages } from '../data/siteContent'

describe('LegalPage', () => {
  it('renders legal page sections and cookie action', () => {
    render(<LegalPage page={legalPages[0]} onNavigate={vi.fn()} onOpenCookiePreferences={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/acceptance of terms/i)).toBeInTheDocument()
  })

  it('renders the cookie policy actions', () => {
    const onOpenCookiePreferences = vi.fn()
    const onNavigate = vi.fn()
    render(<LegalPage page={legalPages[1]} onNavigate={onNavigate} onOpenCookiePreferences={onOpenCookiePreferences} />)
    expect(screen.getByRole('button', { name: /change cookie preferences/i })).toBeInTheDocument()
  })
})
