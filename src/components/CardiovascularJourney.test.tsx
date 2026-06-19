import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import CardiovascularJourney from './CardiovascularJourney'

describe('CardiovascularJourney', () => {
  it('renders the journey section', () => {
    render(<CardiovascularJourney />)
    expect(screen.getByLabelText(/cardiovascular care journey/i)).toBeInTheDocument()
  })
})
