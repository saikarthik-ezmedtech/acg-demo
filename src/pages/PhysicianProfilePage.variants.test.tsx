import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PhysicianProfilePage from './PhysicianProfilePage'
import { physicians } from '../data/siteContent'

describe('PhysicianProfilePage variants', () => {
  it('renders every physician profile variant', () => {
    physicians.forEach((physician) => {
      const { unmount } = render(<PhysicianProfilePage physician={physician} onNavigate={vi.fn()} onOpenAppointment={vi.fn()} />)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: /request appointment/i }).length).toBeGreaterThan(0)
      unmount()
    })
  })
})
