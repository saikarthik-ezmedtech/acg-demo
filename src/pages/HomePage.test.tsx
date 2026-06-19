import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders the landing sections', () => {
    render(<HomePage heroLift={{} as never} heroOpacity={{} as never} activeServiceIndex={0} cardRefs={{ current: [] }} onNavigate={vi.fn()} onOpenAppointment={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /expert cardiovascular care/i })).toBeInTheDocument()
    expect(screen.getByText(/services/i)).toBeInTheDocument()
  })
})
