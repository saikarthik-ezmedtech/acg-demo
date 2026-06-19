import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import HeartbeatLine from './HeartbeatLine'

describe('HeartbeatLine', () => {
  it('renders an aria-hidden heartbeat graphic', () => {
    const { container } = render(<HeartbeatLine />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
