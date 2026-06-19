import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServicePhoneMockup from './ServicePhoneMockup'
import { servicePhoneMeta } from '../data/siteContent'

describe('ServicePhoneMockup', () => {
  it('falls back to diagnostic content for unknown services', () => {
    render(<ServicePhoneMockup serviceId="unknown-service" />)
    expect(screen.getByText(/SICA Digital Portal/i)).toBeInTheDocument()
    expect(screen.getByText(/Diagnostic review/i)).toBeInTheDocument()
  })

  it('renders each service variant', () => {
    Object.keys(servicePhoneMeta).forEach((serviceId) => {
      const { unmount } = render(<ServicePhoneMockup serviceId={serviceId} />)
      expect(screen.getByText(servicePhoneMeta[serviceId].label)).toBeInTheDocument()
      unmount()
    })
  })
})
