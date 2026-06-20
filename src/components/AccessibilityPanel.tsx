import type { AccessibilitySettings } from '../types/site'
import { AccessibilityIcon } from './icons'

type AccessibilityPanelProps = {
  accessibilityOpen: boolean
  accessibilitySettings: AccessibilitySettings
  onToggleOpen: (next: boolean) => void
  onAdjustFontScale: (delta: number) => void
  onSetToggle: (key: Exclude<keyof AccessibilitySettings, 'fontScale'>) => void
  onClearCookies: () => void
  onReset: () => void
}

export default function AccessibilityPanel({
  accessibilityOpen,
  accessibilitySettings,
  onToggleOpen,
  onAdjustFontScale,
  onSetToggle,
  onClearCookies,
  onReset,
}: AccessibilityPanelProps) {
  if (accessibilityOpen) {
    return (
      <aside className="accessibility-sidebar" aria-label="Accessibility settings">
        <div className="accessibility-sidebar__header">
          <p>Accessibility</p>
          <button type="button" aria-label="Close accessibility sidebar" onClick={() => onToggleOpen(false)}>
            ×
          </button>
        </div>
        <div className="accessibility-sidebar__font">
          <button type="button" onClick={() => onAdjustFontScale(-0.05)} disabled={accessibilitySettings.fontScale <= 0.9}>
            A-
          </button>
          <button type="button" onClick={() => onAdjustFontScale(0.05)} disabled={accessibilitySettings.fontScale >= 1.3}>
            A+
          </button>
          <span>{Math.round(accessibilitySettings.fontScale * 100)}%</span>
        </div>
        <div className="accessibility-sidebar__controls">
          <button type="button" onClick={() => onSetToggle('readableFont')}>
            Readable Font
          </button>
          <button type="button" onClick={() => onSetToggle('keyboardNavigation')}>
            Keyboard Navigation
          </button>
          <button type="button" onClick={() => onSetToggle('underlineLinks')}>
            Underline Links
          </button>
          <button type="button" onClick={() => onSetToggle('highlightLinks')}>
            Highlight Links
          </button>
          <button type="button" onClick={() => onSetToggle('grayscaleImages')}>
            Images Greyscale
          </button>
          <button type="button" onClick={() => onSetToggle('invertColors')}>
            Invert Colors
          </button>
          <button type="button" onClick={() => onSetToggle('removeAnimations')}>
            Remove Animations
          </button>
          <button type="button" onClick={() => onSetToggle('highContrast')}>
            High Contrast
          </button>
          <button type="button" onClick={onClearCookies}>
            Clear Cookies
          </button>
        </div>
        <button type="button" className="accessibility-sidebar__reset" onClick={onReset}>
          Reset
        </button>
      </aside>
    )
  }

  return (
    <button
      type="button"
      aria-label="Accessibility Helper sidebar"
      title="Accessibility Helper sidebar"
      className="accessibility-fab"
      onClick={() => onToggleOpen(true)}
    >
      <span className="accessibility-fab__icon" aria-hidden="true">
        <AccessibilityIcon />
      </span>
    </button>
  )
}
