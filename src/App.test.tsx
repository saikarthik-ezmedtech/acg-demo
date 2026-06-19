import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { physicians, legalPages } from './data/siteContent'

beforeEach(() => {
  window.history.pushState({}, '', '/')
})

afterEach(() => {
  window.history.pushState({}, '', '/')
})

describe('App', () => {
  it('renders the homepage shell with key navigation', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /southern indiana cardiology associates home/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /expert cardiovascular care/i })).toBeInTheDocument()
  })

  it('opens the accessibility panel and cookie preferences', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText(/accessibility helper sidebar/i))
    expect(screen.getByRole('complementary', { name: /accessibility settings/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /high contrast/i }))
    await user.click(screen.getByRole('button', { name: /close accessibility sidebar/i }))
    expect(screen.getByLabelText(/accessibility helper sidebar/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /cookie preferences/i }))
    expect(screen.getByRole('dialog', { name: /cookie preferences/i })).toBeInTheDocument()
  })

  it('navigates across app routes', () => {
    const originalPath = window.location.pathname
    const originalHash = window.location.hash

    window.history.pushState({}, '', `/physicians/${physicians[0].id}`)
    const first = render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    first.unmount()

    window.history.pushState({}, '', '/diagnostic-testing')
    const second = render(<App />)
    expect(screen.getByRole('heading', { name: /heart testing explained/i })).toBeInTheDocument()
    second.unmount()

    window.history.pushState({}, '', legalPages[0].path)
    const third = render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: legalPages[0].title })).toBeInTheDocument()
    third.unmount()

    window.history.pushState({}, '', `${originalPath}${originalHash}`)
  })

  it('loads saved preferences and honors reduced-motion scroll handling', async () => {
    window.localStorage.setItem('sica-cookie-preferences', JSON.stringify({ functional: false, analytics: false, marketing: false }))
    window.localStorage.setItem(
      'sica-accessibility-settings',
      JSON.stringify({
        fontScale: 1.1,
        keyboardNavigation: true,
        readableFont: true,
        underlineLinks: true,
        highlightLinks: true,
        grayscaleImages: true,
        invertColors: true,
        removeAnimations: true,
        highContrast: true,
      }),
    )

    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('accessible-remove-animations')).toBe(true)
      expect((globalThis as { __lenisInstances?: unknown[] }).__lenisInstances).toHaveLength(0)
    })

    await user.click(screen.getByLabelText(/scroll to top/i))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('uses Lenis for scroll-to-top and can clear cookies', async () => {
    window.localStorage.removeItem('sica-cookie-preferences')
    window.localStorage.removeItem('sica-accessibility-settings')
    document.cookie = 'alpha=1'

    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText(/accessibility helper sidebar/i))
    await user.click(screen.getByRole('button', { name: /clear cookies/i }))
    expect(screen.getByRole('dialog', { name: /cookie preferences/i })).toBeInTheDocument()
    expect(window.localStorage.getItem('sica-cookie-preferences')).toBeNull()

    await user.click(screen.getByLabelText(/scroll to top/i))
    const instances = (globalThis as { __lenisInstances?: Array<{ scrollTo: ReturnType<typeof vi.fn> }> }).__lenisInstances ?? []
    expect(instances[0]?.scrollTo).toHaveBeenCalledWith(0, { duration: 0.8 })
  })
})
