import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DiagnosticTestingPage from './DiagnosticTestingPage'

describe('DiagnosticTestingPage', () => {
  it('renders the diagnostic testing content', () => {
    render(<DiagnosticTestingPage onNavigate={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /heart testing explained/i })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /what is it\?/i })).toHaveLength(8)
  })
})
