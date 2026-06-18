import InternalLink from './InternalLink'
import type { CookiePreferences } from '../types/site'

type CookiePreferencesPanelProps = {
  cookiePreferences: CookiePreferences
  onNavigate: (href: string) => void
  onUpdateCookiePreference: (key: Exclude<keyof CookiePreferences, 'essential'>, value: boolean) => void
  onClose: () => void
  onRejectOptional: () => void
  onSaveChoices: () => void
  onAcceptAll: () => void
}

export default function CookiePreferencesPanel({
  cookiePreferences,
  onNavigate,
  onUpdateCookiePreference,
  onClose,
  onRejectOptional,
  onSaveChoices,
  onAcceptAll,
}: CookiePreferencesPanelProps) {
  return (
    <div className="cookie-preferences" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <div className="cookie-preferences__panel">
        <div className="cookie-preferences__grid">
          <div>
            <h2>Cookie Preferences</h2>
            <p>
              We use essential cookies to keep this website secure and accessible. Optional cookies help us improve
              site performance and understand how visitors use the website.
            </p>
            <p className="cookie-preferences__links">
              Read more in our{' '}
              <InternalLink href="/cookie-policy" onNavigate={onNavigate}>
                Cookie Policy
              </InternalLink>{' '}
              and{' '}
              <InternalLink href="/privacy-policy" onNavigate={onNavigate}>
                Privacy Policy
              </InternalLink>
              .
            </p>

            <div className="cookie-preferences__options">
              <label>
                <input type="checkbox" checked disabled />
                <span>
                  <strong>Essential cookies</strong>
                  <small>Always active for core site functionality.</small>
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={cookiePreferences.functional}
                  onChange={(event) => onUpdateCookiePreference('functional', event.target.checked)}
                />
                <span>
                  <strong>Functional cookies</strong>
                  <small>Remember selected preferences for future visits.</small>
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={cookiePreferences.analytics}
                  onChange={(event) => onUpdateCookiePreference('analytics', event.target.checked)}
                />
                <span>
                  <strong>Analytics cookies</strong>
                  <small>Help us measure traffic and improve pages.</small>
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={cookiePreferences.marketing}
                  onChange={(event) => onUpdateCookiePreference('marketing', event.target.checked)}
                />
                <span>
                  <strong>Marketing cookies</strong>
                  <small>Support relevant outreach and campaign reporting.</small>
                </span>
              </label>
            </div>
          </div>

          <div className="cookie-preferences__actions">
            <button type="button" className="button secondary" onClick={onClose}>
              Hide Settings
            </button>
            <button type="button" className="button secondary" onClick={onRejectOptional}>
              Reject Optional
            </button>
            <button type="button" className="button primary" onClick={onSaveChoices}>
              Save Choices
            </button>
            <button type="button" className="button primary button-primary-alt" onClick={onAcceptAll}>
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
