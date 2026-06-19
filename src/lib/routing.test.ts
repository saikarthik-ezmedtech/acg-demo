import { describe, expect, it, vi } from 'vitest'
import { getDiagnosticTestingPath, getLegalPage, getPhysicianFromPath, getPhysicianPath, getRouteState, isDiagnosticTestingPath, isHomePath } from './routing'
import { legalPages, physicians } from '../data/siteContent'

describe('routing helpers', () => {
  it('derives route state from window location', () => {
    const originalPath = window.location.pathname
    const originalHash = window.location.hash
    window.history.pushState({}, '', '/foo#bar')
    expect(getRouteState()).toEqual({ pathname: '/foo', hash: '#bar' })
    window.history.pushState({}, '', `${originalPath}${originalHash}`)
  })

  it('builds physician and diagnostic paths', () => {
    expect(getPhysicianPath('gondi')).toBe('/physicians/gondi')
    expect(getDiagnosticTestingPath()).toBe('/diagnostic-testing')
  })

  it('resolves physician and legal pages', () => {
    expect(getPhysicianFromPath(`/physicians/${physicians[0].id}`)).toEqual(physicians[0])
    expect(getLegalPage(legalPages[0].path)).toEqual(legalPages[0])
  })

  it('checks route predicates', () => {
    expect(isDiagnosticTestingPath('/diagnostic-testing')).toBe(true)
    expect(isHomePath('/')).toBe(true)
    expect(isHomePath('')).toBe(true)
  })
})
