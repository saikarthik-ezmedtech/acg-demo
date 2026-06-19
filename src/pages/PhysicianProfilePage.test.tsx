import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhysicianProfilePage from './PhysicianProfilePage'
import { physicians } from '../data/siteContent'

describe('PhysicianProfilePage', () => {
  it('renders a physician profile', () => {
    render(<PhysicianProfilePage physician={physicians[0]} onNavigate={vi.fn()} onOpenAppointment={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /overview/i })).toBeInTheDocument()
  })
})
