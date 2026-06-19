import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CookiePreferencesPanel from './CookiePreferencesPanel'

describe('CookiePreferencesPanel', () => {
  it('allows updating and saving preferences', async () => {
    const user = userEvent.setup()
    const onUpdateCookiePreference = vi.fn()
    const onSaveChoices = vi.fn()
    render(
      <CookiePreferencesPanel
        cookiePreferences={{ essential: true, functional: true, analytics: false, marketing: false }}
        onNavigate={vi.fn()}
        onUpdateCookiePreference={onUpdateCookiePreference}
        onClose={vi.fn()}
        onRejectOptional={vi.fn()}
        onSaveChoices={onSaveChoices}
        onAcceptAll={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('checkbox', { name: /functional cookies/i }))
    expect(onUpdateCookiePreference).toHaveBeenCalledWith('functional', false)
    await user.click(screen.getByRole('button', { name: /save choices/i }))
    expect(onSaveChoices).toHaveBeenCalled()
  })
})
