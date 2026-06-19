import { describe, expect, it } from 'vitest'
import { accessibilityStorageKey, defaultAccessibilitySettings, defaultCookiePreferences, diagnosticTests, physicianCards, physicians, serviceFeatures, servicePhoneMeta } from './siteContent'

describe('site content', () => {
  it('exposes default preferences', () => {
    expect(defaultCookiePreferences).toMatchObject({ essential: true, functional: true, analytics: true, marketing: true })
    expect(defaultAccessibilitySettings.fontScale).toBe(1)
    expect(accessibilityStorageKey).toBe('sica-accessibility-settings')
  })

  it('contains provider and service metadata', () => {
    expect(physicians.length).toBeGreaterThan(0)
    expect(physicianCards.length).toBeGreaterThan(0)
    expect(serviceFeatures.some((item) => item.id === 'diagnostic-testing')).toBe(true)
    expect(diagnosticTests.some((item) => item.id === 'ekg')).toBe(true)
    expect(servicePhoneMeta['cardiac-diagnostics']).toBeDefined()
  })
})
