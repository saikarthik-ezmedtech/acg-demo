import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccessibilityPanel from './AccessibilityPanel'

describe('AccessibilityPanel', () => {
  const settings = {
    fontScale: 1,
    keyboardNavigation: false,
    readableFont: false,
    underlineLinks: false,
    highlightLinks: false,
    grayscaleImages: false,
    invertColors: false,
    removeAnimations: false,
    highContrast: false,
  }

  it('renders fab when closed', async () => {
    const user = userEvent.setup()
    const onToggleOpen = vi.fn()
    render(<AccessibilityPanel accessibilityOpen={false} accessibilitySettings={settings} onToggleOpen={onToggleOpen} onAdjustFontScale={vi.fn()} onSetToggle={vi.fn()} onClearCookies={vi.fn()} onReset={vi.fn()} />)
    await user.click(screen.getByLabelText(/accessibility helper sidebar/i))
    expect(onToggleOpen).toHaveBeenCalledWith(true)
  })

  it('renders controls when open', async () => {
    const onToggleOpen = vi.fn()
    render(<AccessibilityPanel accessibilityOpen accessibilitySettings={settings} onToggleOpen={onToggleOpen} onAdjustFontScale={vi.fn()} onSetToggle={vi.fn()} onClearCookies={vi.fn()} onReset={vi.fn()} />)
    expect(screen.getByRole('complementary', { name: /accessibility settings/i })).toBeInTheDocument()
  })
})
