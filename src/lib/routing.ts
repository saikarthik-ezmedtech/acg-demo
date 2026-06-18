import { legalPages, physicians } from '../data/siteContent'
import type { RouteState } from '../types/site'

export function getRouteState(): RouteState {
  return {
    pathname: window.location.pathname || '/',
    hash: window.location.hash || '',
  }
}

export function getPhysicianPath(id: string) {
  return `/physicians/${id}`
}

export function getDiagnosticTestingPath() {
  return '/diagnostic-testing'
}

export function getPhysicianFromPath(pathname: string) {
  const match = pathname.match(/^\/physicians\/([^/]+)$/)
  if (!match) return null

  return physicians.find((physician) => physician.id === match[1]) ?? null
}

export function isDiagnosticTestingPath(pathname: string) {
  return pathname === getDiagnosticTestingPath()
}

export function getLegalPage(pathname: string) {
  return legalPages.find((page) => page.path === pathname) ?? null
}

export function isHomePath(pathname: string) {
  return pathname === '/' || pathname === ''
}
